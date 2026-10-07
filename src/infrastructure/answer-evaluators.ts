import { InterviewError } from '../domain/errors.ts'
import { isVerdict, type Grade } from '../domain/grade.ts'
import type { Question } from '../domain/question.ts'
import type { AnswerEvaluator } from '../application/ports.ts'

export class ExactChoiceEvaluator implements AnswerEvaluator {
  async evaluate(question: Question, response: string): Promise<Grade> {
    const correct = question.options.find((option) => option.id === question.answerId)
    const picked = question.options.find((option) => option.id === response)
    if (response === question.answerId) {
      return {
        verdict: 'correct',
        comment: correct ? `Has elegido «${correct.text}».` : 'Respuesta correcta.',
        source: 'exact',
      }
    }
    const pickedText = picked ? `Has elegido «${picked.text}». ` : ''
    const expected = correct ? `La opción que encaja es «${correct.text}».` : 'Esa no es la opción que encaja.'
    return {
      verdict: 'incorrect',
      comment: `${pickedText}${expected}`,
      source: 'exact',
    }
  }
}

export class HttpAnswerEvaluator implements AnswerEvaluator {
  private readonly endpoint: string

  constructor(endpoint = '/api/grade') {
    this.endpoint = endpoint
  }

  async evaluate(question: Question, response: string): Promise<Grade> {
    let http: Response
    try {
      http = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: question.prompt,
          modelAnswer: question.modelAnswer,
          explanation: question.explanation,
          response,
        }),
        signal: AbortSignal.timeout(25_000),
      })
    } catch {
      throw new InterviewError('ai-unavailable', 'No hay conexión para valorar la respuesta.')
    }

    if (!http.ok) {
      throw new InterviewError('ai-unavailable', 'No se ha podido valorar la respuesta con la IA.')
    }

    const payload: unknown = await http.json()
    if (typeof payload !== 'object' || payload === null) {
      throw new InterviewError('invalid-payload', 'La valoración no tiene el formato esperado.')
    }
    const record = payload as Record<string, unknown>
    if (typeof record.verdict !== 'string' || !isVerdict(record.verdict) || typeof record.comment !== 'string') {
      throw new InterviewError('invalid-payload', 'La valoración no tiene el formato esperado.')
    }
    const comment = record.comment.trim()
    if (!comment) {
      throw new InterviewError('invalid-payload', 'La valoración no tiene el formato esperado.')
    }
    return { verdict: record.verdict, comment, source: 'model' }
  }
}

const STOP_WORDS = new Set([
  'para',
  'como',
  'donde',
  'cuando',
  'porque',
  'esta',
  'este',
  'esto',
  'esa',
  'ese',
  'que',
  'con',
  'una',
  'uno',
  'los',
  'las',
  'del',
  'por',
  'sus',
  'pero',
  'sobre',
  'desde',
  'hasta',
  'tiene',
  'puede',
  'entre',
  'cada',
  'todo',
  'toda',
])

function keywords(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word))
}

export class HeuristicAnswerEvaluator implements AnswerEvaluator {
  async evaluate(question: Question, response: string): Promise<Grade> {
    const expected = keywords(question.modelAnswer)
    const given = new Set(keywords(response))
    const hits = expected.filter((word) => given.has(word)).length
    const ratio = expected.length === 0 ? 0 : hits / expected.length
    if (ratio >= 0.45) {
      return {
        verdict: 'partial',
        comment:
          'Hay ideas que coinciden con la respuesta esperada. Contrástala con la explicación: esta valoración es orientativa, sin el modelo.',
        source: 'heuristic',
      }
    }
    return {
      verdict: 'incorrect',
      comment:
        'La respuesta se aleja de lo que se esperaba. Revisa la explicación. Esta valoración es orientativa, sin el modelo.',
      source: 'heuristic',
    }
  }
}

export class ResilientAnswerEvaluator implements AnswerEvaluator {
  private readonly primary: AnswerEvaluator
  private readonly fallback: AnswerEvaluator

  constructor(primary: AnswerEvaluator, fallback: AnswerEvaluator) {
    this.primary = primary
    this.fallback = fallback
  }

  async evaluate(question: Question, response: string): Promise<Grade> {
    try {
      return await this.primary.evaluate(question, response)
    } catch {
      return this.fallback.evaluate(question, response)
    }
  }
}

export class RoutingAnswerEvaluator implements AnswerEvaluator {
  private readonly choice: AnswerEvaluator
  private readonly open: AnswerEvaluator

  constructor(choice: AnswerEvaluator, open: AnswerEvaluator) {
    this.choice = choice
    this.open = open
  }

  evaluate(question: Question, response: string): Promise<Grade> {
    if (question.kind === 'choice') return this.choice.evaluate(question, response)
    return this.open.evaluate(question, response)
  }
}

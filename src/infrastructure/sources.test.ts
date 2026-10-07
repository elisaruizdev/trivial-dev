import { describe, expect, it } from 'vitest'
import { levels } from '../domain/level.ts'
import { topics } from '../domain/topic.ts'
import { ExactChoiceEvaluator } from './answer-evaluators.ts'
import { BankQuestionSource } from './bank-question-source.ts'
import { fallbackBank } from './fallback-bank.ts'
import { ResilientQuestionSource } from './resilient-question-source.ts'
import { InterviewError } from '../domain/errors.ts'
import type { QuestionBatch, QuestionSource } from '../application/ports.ts'

const shipped = ['html', 'css', 'scss', 'typescript', 'javascript', 'angular', 'vue', 'react', 'ai', 'laravel', 'kotlin', 'swift']

describe('banco de ejemplo', () => {
  it('cubre los temas que ya vienen, en los tres niveles', () => {
    const grown = ['ai', 'angular', 'css', 'html', 'javascript', 'kotlin', 'laravel', 'react', 'scss', 'swift', 'typescript', 'vue']
    const short: string[] = []
    const ids = new Set<string>()
    for (const question of fallbackBank) {
      if (ids.has(question.id)) short.push(`id repetido ${question.id}`)
      ids.add(question.id)
    }
    for (const topicId of shipped) {
      for (const level of levels) {
        const found = fallbackBank.filter((question) => question.topicId === topicId && question.level === level)
        const least = grown.includes(topicId) ? 120 : 2
        if (found.length < least) short.push(`${topicId} ${level}: ${found.length}`)
      }
    }
    expect(short).toEqual([])
  })

  it('mantiene cada pregunta de opción múltiple cerrada', () => {
    for (const question of fallbackBank) {
      expect(topics.some((topic) => topic.id === question.topicId)).toBe(true)
      expect(question.sourceUrl?.startsWith('https://')).toBe(true)
      if (question.kind === 'choice') {
        expect(question.options.some((option) => option.id === question.answerId)).toBe(true)
      } else {
        expect(question.modelAnswer.length).toBeGreaterThan(0)
        expect(question.options).toHaveLength(0)
      }
    }
  })
})

describe('BankQuestionSource', () => {
  it('baraja el banco para no repetir siempre el mismo orden', async () => {
    const source = new BankQuestionSource(fallbackBank, () => 0)
    const topic = topics.find((item) => item.id === 'html')
    if (!topic) throw new Error('falta HTML')
    const batch = await source.load({ topic, level: 'junior', count: 6 })
    const bankOrder = fallbackBank
      .filter((question) => question.topicId === 'html' && question.level === 'junior')
      .slice(0, 6)
      .map((question) => question.id)
    expect(batch.questions.map((question) => question.id)).not.toEqual(bankOrder)
  })

  it('avisa si el tema todavía no tiene preguntas de ejemplo', async () => {
    const source = new BankQuestionSource(fallbackBank)
    const topic = { id: 'bootstrap', label: 'Bootstrap', summary: 'Rejilla', guidance: 'Utilidades' }
    await expect(source.load({ topic, level: 'junior', count: 6 })).rejects.toBeInstanceOf(InterviewError)
  })
})

describe('ResilientQuestionSource', () => {
  it('usa el banco cuando la IA no responde y lo dice', async () => {
    const remote: QuestionSource = {
      async load(): Promise<QuestionBatch> {
        throw new InterviewError('ai-unavailable', 'sin clave')
      },
    }
    const source = new ResilientQuestionSource(remote, new BankQuestionSource(fallbackBank))
    const topic = topics[0]
    if (!topic) throw new Error('falta el primer tema')
    const batch = await source.load({ topic, level: 'junior', count: 6 })
    expect(batch.origin).toBe('bank')
    expect(batch.notice).toContain('banco de ejemplo')
  })
})

describe('ExactChoiceEvaluator', () => {
  it('marca la opción correcta sin llamar a la IA', async () => {
    const question = fallbackBank.find((item) => item.kind === 'choice')
    if (!question) throw new Error('falta una pregunta de opción múltiple')
    const evaluator = new ExactChoiceEvaluator()
    const right = await evaluator.evaluate(question, question.answerId)
    const wrong = await evaluator.evaluate(question, 'no-es')
    expect(right.verdict).toBe('correct')
    expect(right.source).toBe('exact')
    expect(wrong.verdict).toBe('incorrect')
  })
})

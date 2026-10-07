import { InterviewError } from '../domain/errors.ts'
import { isQuestionKind, type ChoiceOption, type CodeSnippet, type Question } from '../domain/question.ts'
import type { InterviewRequest } from './ports.ts'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > max) return null
  return trimmed
}

function parseOptions(value: unknown): ChoiceOption[] | null {
  if (!Array.isArray(value) || value.length < 2 || value.length > 4) return null
  const options: ChoiceOption[] = []
  for (const item of value) {
    if (!isRecord(item)) return null
    const id = text(item.id, 8)
    const label = text(item.text, 280)
    if (!id || !label) return null
    options.push({ id, text: label })
  }
  const ids = new Set(options.map((option) => option.id))
  if (ids.size !== options.length) return null
  return options
}

function parseSnippet(value: unknown): CodeSnippet | null {
  if (value == null) return null
  if (!isRecord(value)) return null
  const language = text(value.language, 20)
  const source = text(value.source, 4000)
  if (!language || !source) return null
  return { language: language.toLowerCase(), source }
}

function parseOne(item: unknown, request: InterviewRequest, index: number): Question | null {
  if (!isRecord(item)) return null
  const kind = text(item.kind, 16)
  const prompt = text(item.prompt, 700)
  const explanation = text(item.explanation, 1600)
  if (!kind || !isQuestionKind(kind) || !prompt || !explanation) return null

  if (kind === 'choice') {
    const options = parseOptions(item.options)
    const answerId = text(item.answerId, 8)
    if (!options || !answerId || !options.some((option) => option.id === answerId)) return null
    const correct = options.find((option) => option.id === answerId)
    return {
      id: `${request.topic.id}-${request.level}-${index}`,
      topicId: request.topic.id,
      level: request.level,
      kind,
      prompt,
      options,
      answerId,
      modelAnswer: correct?.text ?? '',
      explanation,
      snippet: parseSnippet(item.snippet),
      sourceUrl: null,
    }
  }

  const modelAnswer = text(item.modelAnswer, 1600)
  if (!modelAnswer) return null
  return {
    id: `${request.topic.id}-${request.level}-${index}`,
    topicId: request.topic.id,
    level: request.level,
    kind,
    prompt,
    options: [],
    answerId: '',
    modelAnswer,
    explanation,
    snippet: parseSnippet(item.snippet),
    sourceUrl: null,
  }
}

export function parseQuestions(payload: unknown, request: InterviewRequest, startIndex = 0): Question[] {
  if (!isRecord(payload) || !Array.isArray(payload.questions)) {
    throw new InterviewError('invalid-payload', 'El formato de las preguntas no es válido.')
  }

  const questions: Question[] = []
  for (const item of payload.questions) {
    const question = parseOne(item, request, startIndex + questions.length)
    if (!question) continue
    questions.push(question)
    if (questions.length >= request.count) break
  }
  return questions
}

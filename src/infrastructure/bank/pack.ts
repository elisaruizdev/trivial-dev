import type { Level } from '../../domain/level.ts'
import type { Question } from '../../domain/question.ts'

export type Letter = 'a' | 'b' | 'c' | 'd'

const letters = ['a', 'b', 'c', 'd'] as const

export interface ChoiceSpec {
  n: number
  kind: 'choice'
  prompt: string
  options: readonly [string, string, string, string]
  answer: Letter
  explanation: string
  snippet?: readonly [string, string]
}

export interface OpenSpec {
  n: number
  kind: 'written' | 'voice'
  prompt: string
  modelAnswer: string
  explanation: string
  snippet?: readonly [string, string]
}

export function c(
  n: number,
  prompt: string,
  options: readonly [string, string, string, string],
  answer: Letter,
  explanation: string,
  snippet?: readonly [string, string],
): ChoiceSpec {
  return { n, kind: 'choice', prompt, options, answer, explanation, snippet }
}

export function w(
  n: number,
  prompt: string,
  modelAnswer: string,
  explanation: string,
  snippet?: readonly [string, string],
): OpenSpec {
  return { n, kind: 'written', prompt, modelAnswer, explanation, snippet }
}

export type Line = readonly [
  prompt: string,
  options: readonly [string, string, string, string],
  answer: Letter,
  explanation: string,
  sourceUrl: string,
]

export function lines(topicId: string, level: Level, start: number, items: readonly Line[]): Question[] {
  return items.map((item, index) => {
    const [prompt, options, answer, explanation, sourceUrl] = item
    const n = start + index
    if (!sourceUrl.startsWith('https://')) {
      throw new Error(`falta la fuente de ${topicId} ${level} ${n}`)
    }
    const built = options.map((text, optionIndex) => ({ id: letters[optionIndex] ?? 'a', text }))
    const correct = built.find((option) => option.id === answer)
    return {
      id: `${topicId}-${level}-${n}`,
      topicId,
      level,
      kind: 'choice' as const,
      prompt,
      options: built,
      answerId: answer,
      modelAnswer: correct?.text ?? '',
      explanation,
      snippet: null,
      sourceUrl,
    }
  })
}

export function pack(
  topicId: string,
  level: Level,
  items: readonly (ChoiceSpec | OpenSpec)[],
  sources: Readonly<Record<number, string>>,
): Question[] {
  return items.map((item) => {
    const sourceUrl = sources[item.n]
    if (!sourceUrl?.startsWith('https://')) {
      throw new Error(`falta la fuente de ${topicId} ${level} ${item.n}`)
    }
    const snippet = item.snippet ? { language: item.snippet[0], source: item.snippet[1] } : null
    const id = `${topicId}-${level}-${item.n}`
    if (item.kind === 'choice') {
      const options = item.options.map((text, index) => ({ id: letters[index] ?? 'a', text }))
      const correct = options.find((option) => option.id === item.answer)
      return {
        id,
        topicId,
        level,
        kind: 'choice' as const,
        prompt: item.prompt,
        options,
        answerId: item.answer,
        modelAnswer: correct?.text ?? '',
        explanation: item.explanation,
        snippet,
        sourceUrl,
      }
    }
    return {
      id,
      topicId,
      level,
      kind: item.kind,
      prompt: item.prompt,
      options: [],
      answerId: '',
      modelAnswer: item.modelAnswer,
      explanation: item.explanation,
      snippet,
      sourceUrl,
    }
  })
}

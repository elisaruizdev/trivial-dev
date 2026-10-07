import type { Level } from './level.ts'

export const questionKinds = ['choice', 'written', 'voice'] as const

export type QuestionKind = (typeof questionKinds)[number]

export function isQuestionKind(value: string): value is QuestionKind {
  return (questionKinds as readonly string[]).includes(value)
}

export interface ChoiceOption {
  id: string
  text: string
}

export interface CodeSnippet {
  language: string
  source: string
}

export interface Question {
  id: string
  topicId: string
  level: Level
  kind: QuestionKind
  prompt: string
  options: ChoiceOption[]
  answerId: string
  modelAnswer: string
  explanation: string
  snippet: CodeSnippet | null
  sourceUrl: string | null
}

export function responseLabel(question: Question, response: string): string {
  if (question.kind !== 'choice') return response
  return question.options.find((option) => option.id === response)?.text ?? response
}

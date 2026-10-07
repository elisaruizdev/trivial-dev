import type { Grade } from '../domain/grade.ts'
import type { Level } from '../domain/level.ts'
import type { Question } from '../domain/question.ts'
import type { Topic } from '../domain/topic.ts'

export const INTERVIEW_LENGTH = 30
export const QUESTION_BATCH_SIZE = 10

export interface InterviewRequest {
  topic: Topic
  level: Level
  count: number
}

export interface QuestionBatch {
  questions: Question[]
  origin: 'ai' | 'bank'
  notice?: string
}

export interface QuestionSource {
  load(request: InterviewRequest): Promise<QuestionBatch>
}

export interface AnswerEvaluator {
  evaluate(question: Question, response: string): Promise<Grade>
}

export interface SpeechHandlers {
  onTranscript: (text: string, isFinal: boolean) => void
  onEnd: () => void
  onError: (message: string) => void
}

export interface SpeechTranscriber {
  isSupported(): boolean
  start(handlers: SpeechHandlers): void
  stop(): void
}

export interface Services {
  questions: QuestionSource
  evaluator: AnswerEvaluator
  speech: SpeechTranscriber
}

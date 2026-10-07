import type { AnswerRecord } from './interview-state.ts'

export interface InterviewSummary {
  correct: number
  partial: number
  incorrect: number
  total: number
}

export function summarize(records: readonly AnswerRecord[]): InterviewSummary {
  return {
    correct: records.filter((record) => record.grade.verdict === 'correct').length,
    partial: records.filter((record) => record.grade.verdict === 'partial').length,
    incorrect: records.filter((record) => record.grade.verdict === 'incorrect').length,
    total: records.length,
  }
}

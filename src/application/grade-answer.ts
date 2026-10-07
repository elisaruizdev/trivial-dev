import type { Grade } from '../domain/grade.ts'
import type { Question } from '../domain/question.ts'
import type { AnswerEvaluator } from './ports.ts'

export async function gradeAnswer(
  evaluator: AnswerEvaluator,
  question: Question,
  response: string,
): Promise<Grade> {
  const trimmed = response.trim()
  if (!trimmed) {
    return {
      verdict: 'incorrect',
      comment: 'No has respondido.',
      source: 'exact',
    }
  }
  return evaluator.evaluate(question, trimmed)
}

import { InterviewError } from '../domain/errors.ts'
import type { InterviewRequest, QuestionBatch, QuestionSource } from './ports.ts'

export async function loadInterview(
  source: QuestionSource,
  request: InterviewRequest,
): Promise<QuestionBatch> {
  if (request.count < 1) {
    throw new InterviewError('invalid-payload', 'La entrevista no tiene preguntas.')
  }
  const batch = await source.load(request)
  if (batch.questions.length === 0) {
    throw new InterviewError('invalid-payload', 'No han llegado preguntas.')
  }
  return batch
}

import { InterviewError } from '../domain/errors.ts'
import { levelBrief } from '../domain/level.ts'
import type { Question } from '../domain/question.ts'
import { parseQuestions } from '../application/parse-questions.ts'
import { QUESTION_BATCH_SIZE, type InterviewRequest, type QuestionBatch, type QuestionSource } from '../application/ports.ts'

const MAX_ATTEMPTS = 4

export class HttpQuestionSource implements QuestionSource {
  private readonly endpoint: string

  constructor(endpoint = '/api/questions') {
    this.endpoint = endpoint
  }

  async load(request: InterviewRequest): Promise<QuestionBatch> {
    const questions: Question[] = []
    const seen = new Set<string>()
    let attempts = 0

    while (questions.length < request.count && attempts < MAX_ATTEMPTS) {
      attempts += 1
      const remaining = request.count - questions.length
      try {
        const chunk = await this.fetchBatch(
          request,
          Math.min(QUESTION_BATCH_SIZE, remaining),
          questions.length,
          [...seen],
        )
        if (chunk.length === 0) break
        for (const question of chunk) {
          if (seen.has(question.prompt)) continue
          seen.add(question.prompt)
          questions.push(question)
        }
      } catch (error) {
        if (questions.length > 0) break
        throw error
      }
    }

    if (questions.length === 0) {
      throw new InterviewError('invalid-payload', 'La IA no ha devuelto preguntas válidas.')
    }
    return { questions, origin: 'ai' }
  }

  private async fetchBatch(
    request: InterviewRequest,
    count: number,
    startIndex: number,
    avoid: string[],
  ): Promise<Question[]> {
    let response: Response
    try {
      response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicLabel: request.topic.label,
          guidance: request.topic.guidance,
          level: request.level,
          calibration: levelBrief[request.level].calibration,
          count,
          avoid,
        }),
        signal: AbortSignal.timeout(50_000),
      })
    } catch {
      throw new InterviewError('ai-unavailable', 'No hay conexión con el servidor de preguntas.')
    }

    if (response.status === 401) {
      throw new InterviewError('ai-unauthorized', 'La clave de IA no es válida.')
    }
    if (response.status === 422) {
      throw new InterviewError('invalid-payload', 'La IA no ha devuelto preguntas válidas.')
    }
    if (!response.ok) {
      throw new InterviewError('ai-unavailable', 'El servidor de preguntas no está disponible.')
    }

    const payload: unknown = await response.json()
    return parseQuestions(payload, { ...request, count }, startIndex)
  }
}

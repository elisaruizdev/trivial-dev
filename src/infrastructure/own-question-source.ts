import { mixOwnQuestions, ownQuestionNotice } from '../application/own-questions.ts'
import type { InterviewRequest, OwnQuestionStore, QuestionBatch, QuestionSource } from '../application/ports.ts'

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = copy[index]
    const other = copy[swap]
    if (current === undefined || other === undefined) continue
    copy[index] = other
    copy[swap] = current
  }
  return copy
}

/**
 * Mete las preguntas guardadas en la ronda de ese tema y nivel.
 * Si no hay ninguna, la ronda sale igual que sin esta capa.
 */
export class OwnQuestionSource implements QuestionSource {
  private readonly inner: QuestionSource
  private readonly store: OwnQuestionStore
  private readonly random: () => number

  constructor(inner: QuestionSource, store: OwnQuestionStore, random: () => number = Math.random) {
    this.inner = inner
    this.store = store
    this.random = random
  }

  async load(request: InterviewRequest): Promise<QuestionBatch> {
    const own = (await this.store.load()).filter(
      (question) => question.topicId === request.topic.id && question.level === request.level,
    )
    if (own.length === 0) return this.inner.load(request)
    if (own.length >= request.count) {
      return {
        questions: shuffle(own, this.random).slice(0, request.count),
        origin: 'bank',
        notice: ownQuestionNotice(request.count),
      }
    }

    try {
      const batch = await this.inner.load(request)
      return mixOwnQuestions(own, batch, request.count, this.random)
    } catch {
      return {
        questions: shuffle(own, this.random),
        origin: 'bank',
        notice: `${ownQuestionNotice(own.length)} No se han podido añadir más.`,
      }
    }
  }
}

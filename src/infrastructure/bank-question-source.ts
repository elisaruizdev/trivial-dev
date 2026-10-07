import { InterviewError } from '../domain/errors.ts'
import type { Question } from '../domain/question.ts'
import type { InterviewRequest, QuestionBatch, QuestionSource } from '../application/ports.ts'

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

export class BankQuestionSource implements QuestionSource {
  private readonly bank: readonly Question[]
  private readonly random: () => number

  constructor(bank: readonly Question[], random: () => number = Math.random) {
    this.bank = bank
    this.random = random
  }

  async load(request: InterviewRequest): Promise<QuestionBatch> {
    const questions = shuffle(
      this.bank.filter((question) => question.topicId === request.topic.id && question.level === request.level),
      this.random,
    ).slice(0, request.count)

    if (questions.length === 0) {
      throw new InterviewError('bank-missing', request.topic.label)
    }

    return { questions, origin: 'bank' }
  }
}

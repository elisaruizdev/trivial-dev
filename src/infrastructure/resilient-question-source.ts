import { bankNotice } from '../application/messages.ts'
import type { InterviewRequest, QuestionBatch, QuestionSource } from '../application/ports.ts'
import type { Question } from '../domain/question.ts'

export class ResilientQuestionSource implements QuestionSource {
  private readonly remote: QuestionSource
  private readonly bank: QuestionSource

  constructor(remote: QuestionSource, bank: QuestionSource) {
    this.remote = remote
    this.bank = bank
  }

  async load(request: InterviewRequest): Promise<QuestionBatch> {
    try {
      const remote = await this.remote.load(request)
      if (remote.questions.length >= request.count) return remote
      const filled = await this.topUp(request, remote.questions)
      return { ...remote, questions: filled }
    } catch (error) {
      const batch = await this.bank.load(request)
      return { ...batch, notice: bankNotice(error) }
    }
  }

  private async topUp(request: InterviewRequest, questions: Question[]): Promise<Question[]> {
    let spare: Question[] = []
    try {
      spare = (await this.bank.load(request)).questions
    } catch {
      return questions
    }
    const seen = new Set(questions.map((question) => question.prompt))
    const filled = [...questions]
    for (const question of spare) {
      if (filled.length >= request.count) break
      if (seen.has(question.prompt)) continue
      seen.add(question.prompt)
      filled.push(question)
    }
    return filled
  }
}

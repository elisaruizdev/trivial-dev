import { readStoredQuestions } from '../application/own-questions.ts'
import type { OwnQuestionStore } from '../application/ports.ts'
import type { Question } from '../domain/question.ts'

const storageKey = 'trivial-dev.own-questions'

export class BrowserOwnQuestionStore implements OwnQuestionStore {
  private readonly storage: Pick<Storage, 'getItem' | 'setItem'>

  constructor(storage: Pick<Storage, 'getItem' | 'setItem'> = localStorage) {
    this.storage = storage
  }

  async load(): Promise<Question[]> {
    const raw = this.storage.getItem(storageKey)
    if (!raw) return []
    try {
      return readStoredQuestions(JSON.parse(raw) as unknown)
    } catch {
      return []
    }
  }

  async save(questions: Question[]): Promise<void> {
    this.storage.setItem(storageKey, JSON.stringify(questions))
  }
}

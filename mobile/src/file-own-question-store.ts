import { File, Paths } from 'expo-file-system'
import { readStoredQuestions } from '../../src/application/own-questions.ts'
import type { OwnQuestionStore } from '../../src/application/ports.ts'
import type { Question } from '../../src/domain/question.ts'

export class FileOwnQuestionStore implements OwnQuestionStore {
  private readonly filename: string

  constructor(filename = 'own-questions.json') {
    this.filename = filename
  }

  private open(): File {
    return new File(Paths.document, this.filename)
  }

  async load(): Promise<Question[]> {
    const file = this.open()
    if (!file.exists) return []
    try {
      return readStoredQuestions(JSON.parse(await file.text()) as unknown)
    } catch {
      return []
    }
  }

  async save(questions: Question[]): Promise<void> {
    const file = this.open()
    if (!file.exists) file.create()
    file.write(JSON.stringify(questions))
  }
}

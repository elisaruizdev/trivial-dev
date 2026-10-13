import { File, Paths } from 'expo-file-system'
import { readQuestionCounts, type QuestionCount } from '../../src/application/question-counts.ts'

export class FileQuestionCountStore {
  private readonly filename: string

  constructor(filename = 'question-counts.json') {
    this.filename = filename
  }

  private open(): File {
    return new File(Paths.document, this.filename)
  }

  async load(): Promise<QuestionCount[]> {
    const file = this.open()
    if (!file.exists) return []
    try {
      return readQuestionCounts(JSON.parse(await file.text()) as unknown)
    } catch {
      return []
    }
  }

  async save(counts: QuestionCount[]): Promise<void> {
    const file = this.open()
    if (!file.exists) file.create()
    file.write(JSON.stringify(counts))
  }
}

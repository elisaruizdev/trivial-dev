import { describe, expect, it } from 'vitest'
import type { OwnQuestionStore } from './ports.ts'
import type { Question } from '../domain/question.ts'
import { InterviewError } from '../domain/errors.ts'
import {
  addOwnQuestion,
  buildOwnQuestion,
  describeOwnImport,
  importOwnQuestions,
  mixOwnQuestions,
  ownQuestionExample,
  readStoredQuestions,
  type OwnQuestionDraft,
} from './own-questions.ts'

const choice: OwnQuestionDraft = {
  topicId: 'html',
  level: 'junior',
  kind: 'choice',
  prompt: '¿Qué elemento marca el contenido principal?',
  options: [
    { id: 'a', text: 'main' },
    { id: 'b', text: 'div' },
    { id: 'c', text: '' },
    { id: 'd', text: '' },
  ],
  answerId: 'a',
  modelAnswer: '',
  explanation: 'main es el contenido principal.',
  snippet: null,
}

class MemoryStore implements OwnQuestionStore {
  questions: Question[] = []

  async load(): Promise<Question[]> {
    return this.questions
  }

  async save(questions: Question[]): Promise<void> {
    this.questions = questions
  }
}

describe('preguntas propias', () => {
  it('cierra una de opción múltiple y descarta las respuestas vacías', () => {
    const question = buildOwnQuestion(choice, 'own-html-1')
    expect(question).toMatchObject({
      id: 'own-html-1',
      topicId: 'html',
      level: 'junior',
      kind: 'choice',
      answerId: 'a',
      modelAnswer: 'main',
    })
    expect(question.options.map((option) => option.text)).toEqual(['main', 'div'])
  })

  it('guarda un enlace https y rechaza el que no lo es', () => {
    const url = 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/main'
    expect(buildOwnQuestion({ ...choice, sourceUrl: url }, 'own-html-1').sourceUrl).toBe(url)
    expect(() => buildOwnQuestion({ ...choice, sourceUrl: 'http://example.com' })).toThrow(InterviewError)
  })

  it('exige la respuesta en una pregunta escrita', () => {
    expect(() =>
      buildOwnQuestion({
        ...choice,
        kind: 'written',
        modelAnswer: '',
      }),
    ).toThrow(InterviewError)
  })

  it('no vuelve a guardar el mismo enunciado', async () => {
    const store = new MemoryStore()
    await addOwnQuestion(store, choice)
    await expect(addOwnQuestion(store, choice)).rejects.toBeInstanceOf(InterviewError)
    expect(store.questions).toHaveLength(1)
  })

  it('importa las que encajan y se salta el resto', async () => {
    const store = new MemoryStore()
    const report = await importOwnQuestions(store, {
      questions: [
        choice,
        { ...choice, prompt: 'Otra', answerId: 'z' },
        { prompt: '¿Qué fija const?', topicId: 'javascript', level: 'mid', kind: 'written', modelAnswer: 'el binding', explanation: 'const fija el binding.' },
      ],
    })
    expect(report.added).toBe(2)
    expect(report.skipped).toBe(1)
    expect(describeOwnImport(report)).toContain('2 preguntas')

    const again = await importOwnQuestions(store, { questions: [choice] })
    expect(again.added).toBe(0)
    expect(again.skipped).toBe(1)
    expect(store.questions).toHaveLength(2)
  })

  it('acepta el ejemplo que se enseña en la pantalla', async () => {
    const store = new MemoryStore()
    const report = await importOwnQuestions(store, JSON.parse(ownQuestionExample) as unknown)
    expect(report.added).toBe(2)
    expect(report.skipped).toBe(0)
  })

  it('recupera una pregunta guardada y tira la que está rota', () => {
    const saved = buildOwnQuestion(choice, 'own-html-1')
    const loaded = readStoredQuestions([saved, { prompt: 'sin tema' }])
    expect(loaded).toEqual([saved])
  })

  it('mezcla las tuyas y no repite el enunciado', () => {
    const own = buildOwnQuestion(choice, 'own-html-1')
    const other = buildOwnQuestion(
      { ...choice, prompt: '¿Qué elemento agrupa un tema?', answerId: 'b', options: choice.options.map((option) => ({ ...option, text: option.text || 'x' })) },
      'own-html-2',
    )
    const bank: Question = { ...own, id: 'bank-1', prompt: 'Desde el banco' }
    const duplicate: Question = { ...own, id: 'bank-2' }
    const mixed = mixOwnQuestions(
      [own, other],
      { origin: 'ai', questions: [bank, duplicate], notice: 'Aviso del banco.' },
      3,
      () => 0.999,
    )
    expect(mixed.origin).toBe('ai')
    expect(mixed.questions.map((question) => question.id)).toEqual(['own-html-1', 'own-html-2', 'bank-1'])
    expect(mixed.notice).toBe('Aviso del banco. Esta ronda incluye 2 preguntas tuyas.')
  })
})

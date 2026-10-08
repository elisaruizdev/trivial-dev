import { describe, expect, it } from 'vitest'
import type { OwnQuestionStore, QuestionBatch, QuestionSource } from '../application/ports.ts'
import { InterviewError } from '../domain/errors.ts'
import type { Question } from '../domain/question.ts'
import { topics } from '../domain/topic.ts'
import { BrowserOwnQuestionStore } from './browser-own-question-store.ts'
import { OwnQuestionSource } from './own-question-source.ts'

const html = topics.find((topic) => topic.id === 'html')
if (!html) throw new Error('falta HTML')

const own: Question = {
  id: 'own-html-1',
  topicId: 'html',
  level: 'junior',
  kind: 'choice',
  prompt: '¿Qué elemento marca el contenido principal?',
  options: [
    { id: 'a', text: 'main' },
    { id: 'b', text: 'div' },
  ],
  answerId: 'a',
  modelAnswer: 'main',
  explanation: 'main es el contenido principal.',
  snippet: null,
  sourceUrl: null,
}

const bank: Question = { ...own, id: 'bank-1', prompt: 'Desde el banco' }

function storeWith(questions: Question[]): OwnQuestionStore {
  return {
    async load() {
      return questions
    },
    async save() {
      return undefined
    },
  }
}

describe('OwnQuestionSource', () => {
  it('deja la ronda como está si no hay preguntas tuyas', async () => {
    let called = false
    const inner: QuestionSource = {
      async load(): Promise<QuestionBatch> {
        called = true
        return { origin: 'ai', questions: [bank] }
      },
    }
    const batch = await new OwnQuestionSource(inner, storeWith([])).load({ topic: html, level: 'junior', count: 2 })
    expect(called).toBe(true)
    expect(batch.questions).toEqual([bank])
    expect(batch.notice).toBeUndefined()
  })

  it('incluye la pregunta tuya y completa con las demás', async () => {
    const inner: QuestionSource = {
      async load(): Promise<QuestionBatch> {
        return { origin: 'bank', questions: [bank, { ...bank, id: 'bank-2', prompt: 'Otra del banco' }] }
      },
    }
    const batch = await new OwnQuestionSource(inner, storeWith([own, { ...own, id: 'own-css', topicId: 'css' }]), () => 0.999).load({
      topic: html,
      level: 'junior',
      count: 2,
    })
    expect(batch.questions.map((question) => question.id)).toEqual(['own-html-1', 'bank-1'])
    expect(batch.notice).toBe('Esta ronda incluye 1 pregunta tuya.')
  })

  it('llena la ronda solo con las tuyas si ya cubren el cupo', async () => {
    let called = false
    const inner: QuestionSource = {
      async load(): Promise<QuestionBatch> {
        called = true
        return { origin: 'ai', questions: [bank] }
      },
    }
    const second: Question = { ...own, id: 'own-html-2', prompt: 'Otra pregunta tuya' }
    const batch = await new OwnQuestionSource(inner, storeWith([own, second]), () => 0.999).load({
      topic: html,
      level: 'junior',
      count: 2,
    })
    expect(called).toBe(false)
    expect(batch.questions.map((question) => question.id)).toEqual(['own-html-1', 'own-html-2'])
    expect(batch.notice).toBe('Esta ronda incluye 2 preguntas tuyas.')
  })

  it('sigue la ronda con las tuyas si el resto no llega', async () => {
    const inner: QuestionSource = {
      async load(): Promise<QuestionBatch> {
        throw new InterviewError('bank-missing', 'HTML')
      },
    }
    const batch = await new OwnQuestionSource(inner, storeWith([own])).load({ topic: html, level: 'junior', count: 6 })
    expect(batch.questions).toEqual([own])
    expect(batch.notice).toContain('No se han podido añadir más.')
  })
})

describe('BrowserOwnQuestionStore', () => {
  it('guarda y vuelve a leer', async () => {
    const data = new Map<string, string>()
    const storage = {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => {
        data.set(key, value)
      },
    }
    const store = new BrowserOwnQuestionStore(storage)
    await store.save([own])
    await expect(store.load()).resolves.toEqual([own])
  })

  it('ignora un archivo ilegible', async () => {
    const store = new BrowserOwnQuestionStore({
      getItem: () => '{',
      setItem: () => undefined,
    })
    await expect(store.load()).resolves.toEqual([])
  })
})

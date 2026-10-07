import { describe, expect, it } from 'vitest'
import { InterviewError } from '../domain/errors.ts'
import type { Topic } from '../domain/topic.ts'
import { parseQuestions } from './parse-questions.ts'

const topic: Topic = {
  id: 'css',
  label: 'CSS',
  summary: 'Caja',
  guidance: 'Modelo de caja',
}

const request = { topic, level: 'junior' as const, count: 6 }

describe('parseQuestions', () => {
  it('acepta una pregunta de opción múltiple y descarta la que no cierra', () => {
    const questions = parseQuestions(
      {
        questions: [
          {
            kind: 'choice',
            prompt: '¿Qué espacio queda fuera del borde?',
            options: [
              { id: 'a', text: 'margin' },
              { id: 'b', text: 'padding' },
            ],
            answerId: 'a',
            explanation: 'El margin queda fuera del borde.',
          },
          {
            kind: 'choice',
            prompt: 'Esta no tiene respuesta válida',
            options: [
              { id: 'a', text: 'una' },
              { id: 'b', text: 'otra' },
            ],
            answerId: 'z',
            explanation: 'No debería entrar.',
          },
        ],
      },
      request,
    )

    expect(questions).toHaveLength(1)
    expect(questions[0]?.answerId).toBe('a')
    expect(questions[0]?.topicId).toBe('css')
    expect(questions[0]?.modelAnswer).toBe('margin')
  })

  it('rechaza un sobre que no es el contrato', () => {
    expect(() => parseQuestions({ items: [] }, request)).toThrow(InterviewError)
  })

  it('exige respuesta modelo en una pregunta escrita', () => {
    const questions = parseQuestions(
      {
        questions: [
          {
            kind: 'written',
            prompt: '¿Cuándo usarías Grid?',
            modelAnswer: '',
            explanation: 'Falta la respuesta modelo.',
          },
        ],
      },
      request,
    )
    expect(questions).toHaveLength(0)
  })

  it('guarda el fragmento y numera el lote siguiente aparte', () => {
    const questions = parseQuestions(
      {
        questions: [
          {
            kind: 'choice',
            prompt: '¿Qué imprime la consola?',
            options: [
              { id: 'a', text: 'true y false' },
              { id: 'b', text: 'false y false' },
            ],
            answerId: 'a',
            explanation: '== convierte y === no.',
            snippet: { language: 'JavaScript', source: "console.log(1 == '1')" },
          },
        ],
      },
      request,
      10,
    )
    expect(questions[0]?.id).toBe('css-junior-10')
    expect(questions[0]?.snippet).toEqual({ language: 'javascript', source: "console.log(1 == '1')" })
  })
})

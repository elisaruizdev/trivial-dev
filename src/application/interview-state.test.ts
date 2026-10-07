import { describe, expect, it } from 'vitest'
import type { Grade } from '../domain/grade.ts'
import type { Question } from '../domain/question.ts'
import type { Topic } from '../domain/topic.ts'
import { interviewReducer, initialInterviewState } from './interview-state.ts'

const topic: Topic = { id: 'html', label: 'HTML', summary: 'Semántica', guidance: 'Formularios' }

const question: Question = {
  id: 'html-junior-1',
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

const grade: Grade = { verdict: 'correct', comment: 'Bien.', source: 'exact' }

describe('interviewReducer', () => {
  it('pasa de la pregunta al resumen cuando no queda ninguna', () => {
    const ready = interviewReducer(initialInterviewState, {
      type: 'ready',
      interview: { topic, level: 'junior', origin: 'bank', questions: [question] },
    })
    const feedback = interviewReducer(ready, { type: 'answer', response: 'a', grade })
    const summary = interviewReducer(feedback, { type: 'next' })

    expect(summary.status).toBe('summary')
    if (summary.status !== 'summary') return
    expect(summary.interview.records).toHaveLength(1)
  })

  it('ignora una respuesta si la partida no está en una pregunta', () => {
    const next = interviewReducer(initialInterviewState, { type: 'answer', response: 'a', grade })
    expect(next).toEqual(initialInterviewState)
  })
})

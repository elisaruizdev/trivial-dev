import { describe, expect, it } from 'vitest'
import {
  noteAnswer,
  planReminders,
  readQuestionCounts,
  reminderInstants,
  type AnswerNote,
  type QuestionCount,
} from './question-counts.ts'

const miss: AnswerNote = {
  id: 'react-junior-1',
  prompt: '¿Qué hace useEffect si no le pasas dependencias?',
  topicLabel: 'React',
  level: 'junior',
  verdict: 'incorrect',
}

describe('conteo de preguntas falladas', () => {
  it('cuenta un fallo y una parcial, y cierra el recordatorio al acertar', () => {
    const once = noteAnswer([], miss, 10)
    expect(once).toEqual([
      {
        id: miss.id,
        prompt: miss.prompt,
        topicLabel: 'React',
        level: 'junior',
        misses: 1,
        last: 'miss',
        updatedAt: 10,
      },
    ])

    const twice = noteAnswer(once, { ...miss, verdict: 'partial' }, 20)
    expect(twice[0]?.misses).toBe(2)
    expect(twice[0]?.last).toBe('miss')

    const cleared = noteAnswer(twice, { ...miss, verdict: 'correct' }, 30)
    expect(cleared[0]?.misses).toBe(2)
    expect(cleared[0]?.last).toBe('hit')

    const again = noteAnswer(cleared, miss, 40)
    expect(again[0]?.misses).toBe(3)
    expect(again[0]?.last).toBe('miss')
  })

  it('no guarda un acierto de una pregunta que no estaba fallada', () => {
    const counts = noteAnswer([], { ...miss, verdict: 'correct' }, 10)
    expect(counts).toEqual([])
  })

  it('no modifica la lista que recibe', () => {
    const original: QuestionCount[] = []
    noteAnswer(original, miss, 10)
    expect(original).toEqual([])
  })

  it('descarta un archivo ilegible y se queda con las filas válidas', () => {
    const counts = readQuestionCounts([
      { id: '', prompt: 'vacía', topicLabel: 'React', level: 'junior', misses: 1, last: 'miss' },
      { id: 'css-mid-2', prompt: '  ¿Qué es la cascada?  ', topicLabel: 'CSS', level: 'mid', misses: 2, last: 'miss', updatedAt: 5 },
      { id: 'html-junior-1', prompt: 'mal nivel', topicLabel: 'HTML', level: 'expert', misses: 1, last: 'miss' },
      { id: 'vue-senior-1', prompt: 'sin conteo', topicLabel: 'Vue', level: 'senior', misses: 0, last: 'miss' },
    ])
    expect(counts).toEqual([
      {
        id: 'css-mid-2',
        prompt: '¿Qué es la cascada?',
        topicLabel: 'CSS',
        level: 'mid',
        misses: 2,
        last: 'miss',
        updatedAt: 5,
      },
    ])
  })
})

describe('avisos de práctica', () => {
  it('deja el primer aviso dentro del día y salta la noche', () => {
    const times = reminderInstants(new Date(2026, 9, 8, 10, 15, 0), 7)
    expect(times.map((time) => [time.getDate(), time.getHours(), time.getMinutes()])).toEqual([
      [8, 10, 16],
      [8, 12, 16],
      [8, 14, 16],
      [8, 16, 16],
      [8, 18, 16],
      [8, 20, 16],
      [9, 9, 0],
    ])
  })

  it('si aún es pronto, espera a las 9', () => {
    const [first] = reminderInstants(new Date(2026, 9, 8, 7, 0, 0), 1)
    expect(first?.getHours()).toBe(9)
    expect(first?.getMinutes()).toBe(0)
  })

  it('mezcla un empujón y la pregunta con más fallos', () => {
    const counts: QuestionCount[] = [
      {
        id: 'a',
        prompt: '¿Qué devuelve map?',
        topicLabel: 'JavaScript',
        level: 'junior',
        misses: 1,
        last: 'miss',
        updatedAt: 1,
      },
      {
        id: 'b',
        prompt: '¿Cuándo se ejecuta un efecto?',
        topicLabel: 'React',
        level: 'mid',
        misses: 4,
        last: 'miss',
        updatedAt: 2,
      },
      {
        id: 'c',
        prompt: 'ya resuelta',
        topicLabel: 'HTML',
        level: 'junior',
        misses: 9,
        last: 'hit',
        updatedAt: 3,
      },
    ]
    const plan = planReminders(counts, new Date(2026, 9, 8, 10, 0, 0), 4)
    expect(plan.map((item) => item.kind)).toEqual(['nudge', 'review', 'nudge', 'review'])
    expect(plan[1]?.title).toBe('Te ha costado 4 veces')
    expect(plan[1]?.body).toContain('¿Cuándo se ejecuta un efecto?')
    expect(plan[3]?.body).toContain('¿Qué devuelve map?')
    expect(plan.some((item) => item.body.includes('ya resuelta'))).toBe(false)
  })

  it('sin fallos pendientes solo anima a practicar', () => {
    const plan = planReminders([], new Date(2026, 9, 8, 12, 0, 0), 3)
    expect(plan.every((item) => item.kind === 'nudge')).toBe(true)
    expect(new Set(plan.map((item) => item.title)).size).toBe(3)
  })
})

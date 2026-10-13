import { describe, expect, it } from 'vitest'
import { addInterviewResult, compareInterview, readInterviewHistory, type InterviewResult } from './interview-history.ts'
import { noteRun, noteSolutionViewed, readCodingProgress } from './coding-progress.ts'

function result(at: number, correct: number, incorrect: number, extra: Partial<InterviewResult> = {}): InterviewResult {
  return {
    topicId: 'react',
    topicLabel: 'React',
    level: 'junior',
    correct,
    partial: 0,
    incorrect,
    total: correct + incorrect,
    at,
    ...extra,
  }
}

describe('historial de entrevistas', () => {
  it('compara con la anterior del mismo tema y nivel', () => {
    const history = [result(1, 2, 3), result(2, 5, 0, { level: 'senior' }), result(3, 3, 2)]
    expect(compareInterview(history, result(4, 4, 1)).trend).toBe('better')
    expect(compareInterview(history, result(4, 1, 4)).trend).toBe('worse')
    expect(compareInterview(history, result(4, 3, 2)).trend).toBe('same')
    const first = compareInterview(history, result(4, 1, 1, { topicId: 'css' }))
    expect(first.trend).toBe('first')
    expect(compareInterview(history, result(4, 4, 1)).recent.map((item) => item.at)).toEqual([3, 1])
  })

  it('descarta entradas rotas al leer', () => {
    const good = result(1, 2, 3)
    expect(readInterviewHistory([good, { ...good, total: 9 }, 'x', null])).toEqual([good])
    expect(readInterviewHistory('nope')).toEqual([])
    expect(addInterviewResult([], good)).toEqual([good])
  })
})

describe('progreso de código', () => {
  it('marca bien o para repasar', () => {
    let progress = noteSolutionViewed({}, 'a')
    expect(progress.a).toBe('review')
    progress = noteRun(progress, 'a', true)
    expect(noteSolutionViewed(progress, 'a').a).toBe('passed')
    expect(noteRun(progress, 'a', false).a).toBe('review')
    expect(readCodingProgress({ a: 'passed', b: 'x', c: 'review' })).toEqual({ a: 'passed', c: 'review' })
  })
})

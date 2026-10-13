import { describe, expect, it } from 'vitest'
import type { InterviewResult } from './interview-history.ts'
import { interviewStats, practiceStreak } from './interview-stats.ts'

const DAY = 24 * 60 * 60 * 1000
const now = new Date(2026, 9, 13, 12).getTime()

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

describe('interviewStats', () => {
  it('averages the last three rounds per topic and level', () => {
    const stats = interviewStats(
      [result(1, 0, 10), result(2, 5, 5), result(3, 10, 0), result(4, 10, 0), result(5, 3, 7, { level: 'mid' })],
      now,
    )
    const react = stats.topics[0]
    expect(react.levels.junior?.rounds).toBe(4)
    expect(react.levels.junior?.recentRate).toBeCloseTo((0.5 + 1 + 1) / 3)
    expect(react.levels.junior?.bestRate).toBe(1)
    expect(react.levels.junior?.lastDelta).toBe(0)
    expect(react.levels.junior?.incorrect).toBe(15)
    expect(react.levels.senior).toBeNull()
    expect(stats.weakest).toEqual({ topicLabel: 'React', level: 'mid', rate: 0.3 })
    expect(stats.rounds).toBe(5)
    expect(stats.incorrect).toBe(22)
  })

  it('has no weakest topic when everything is at 70 % or more', () => {
    expect(interviewStats([result(1, 7, 3)], now).weakest).toBeNull()
  })
})

describe('practiceStreak', () => {
  it('counts consecutive days up to today or yesterday', () => {
    expect(practiceStreak([result(now, 1, 0), result(now - DAY, 1, 0), result(now - 3 * DAY, 1, 0)], now)).toBe(2)
    expect(practiceStreak([result(now - DAY, 1, 0), result(now - 2 * DAY, 1, 0)], now)).toBe(2)
    expect(practiceStreak([result(now - 2 * DAY, 1, 0)], now)).toBe(0)
  })
})

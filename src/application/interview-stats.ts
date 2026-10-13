import { levels, type Level } from '../domain/level.ts'
import { hitRate, type InterviewResult } from './interview-history.ts'

/** Cuántas rondas recientes cuentan para el acierto actual de un tema y nivel. */
const RECENT = 3

export interface LevelStats {
  rounds: number
  /** Acierto medio de las últimas rondas, sobre 1. */
  recentRate: number
  bestRate: number
  /** Diferencia entre la última ronda y la anterior, sobre 1. Null si solo hay una. */
  lastDelta: number | null
  incorrect: number
  partial: number
  answered: number
  lastAt: number
}

export interface TopicStats {
  topicId: string
  topicLabel: string
  levels: Record<Level, LevelStats | null>
}

export interface Weakness {
  topicLabel: string
  level: Level
  rate: number
}

export interface InterviewStats {
  rounds: number
  answered: number
  correct: number
  partial: number
  incorrect: number
  /** Días seguidos con alguna ronda, contando hasta hoy o ayer. */
  streak: number
  topics: TopicStats[]
  /** El tema y nivel con menos acierto reciente, si hay alguno por debajo del 70 %. */
  weakest: Weakness | null
}

function levelStats(results: InterviewResult[]): LevelStats {
  const sorted = [...results].sort((a, b) => b.at - a.at)
  const recent = sorted.slice(0, RECENT)
  const rates = sorted.map(hitRate)
  return {
    rounds: sorted.length,
    recentRate: recent.reduce((sum, item) => sum + hitRate(item), 0) / recent.length,
    bestRate: Math.max(...rates),
    lastDelta: rates.length > 1 ? rates[0] - rates[1] : null,
    incorrect: sorted.reduce((sum, item) => sum + item.incorrect, 0),
    partial: sorted.reduce((sum, item) => sum + item.partial, 0),
    answered: sorted.reduce((sum, item) => sum + item.total, 0),
    lastAt: sorted[0].at,
  }
}

function dayKey(at: number): string {
  const date = new Date(at)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function practiceStreak(history: readonly InterviewResult[], now: number): number {
  const days = new Set(history.map((item) => dayKey(item.at)))
  const cursor = new Date(now)
  if (!days.has(dayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (days.has(dayKey(cursor.getTime()))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function interviewStats(history: readonly InterviewResult[], now: number): InterviewStats {
  const byTopic = new Map<string, InterviewResult[]>()
  for (const item of history) byTopic.set(item.topicId, [...(byTopic.get(item.topicId) ?? []), item])

  const topics: TopicStats[] = []
  let weakest: Weakness | null = null
  for (const [topicId, results] of byTopic) {
    const latest = results.reduce((a, b) => (b.at > a.at ? b : a))
    const perLevel = {} as Record<Level, LevelStats | null>
    for (const level of levels) {
      const matching = results.filter((item) => item.level === level)
      const stats = matching.length ? levelStats(matching) : null
      perLevel[level] = stats
      if (stats && stats.recentRate < 0.7 && (!weakest || stats.recentRate < weakest.rate)) {
        weakest = { topicLabel: latest.topicLabel, level, rate: stats.recentRate }
      }
    }
    topics.push({ topicId, topicLabel: latest.topicLabel, levels: perLevel })
  }
  topics.sort((a, b) => a.topicLabel.localeCompare(b.topicLabel, 'es'))

  return {
    rounds: history.length,
    answered: history.reduce((sum, item) => sum + item.total, 0),
    correct: history.reduce((sum, item) => sum + item.correct, 0),
    partial: history.reduce((sum, item) => sum + item.partial, 0),
    incorrect: history.reduce((sum, item) => sum + item.incorrect, 0),
    streak: practiceStreak(history, now),
    topics,
    weakest,
  }
}

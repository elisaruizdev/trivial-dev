import { isLevel, type Level } from '../domain/level.ts'
import type { InterviewSummary } from './summarize.ts'

export interface InterviewResult extends InterviewSummary {
  topicId: string
  topicLabel: string
  level: Level
  at: number
}

export type Trend = 'first' | 'better' | 'worse' | 'same'

export interface InterviewComparison {
  trend: Trend
  previous: InterviewResult | null
  /** Las últimas del mismo tema y nivel, de la más reciente a la más antigua, sin contar la actual. */
  recent: InterviewResult[]
}

const MAX_RESULTS = 300
const RECENT = 5

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 999
}

export function readInterviewHistory(value: unknown): InterviewResult[] {
  if (!Array.isArray(value)) return []
  const results: InterviewResult[] = []
  for (const item of value) {
    if (!isRecord(item)) continue
    if (typeof item.topicId !== 'string' || !item.topicId.trim()) continue
    if (typeof item.topicLabel !== 'string' || !item.topicLabel.trim()) continue
    if (typeof item.level !== 'string' || !isLevel(item.level)) continue
    if (!isCount(item.correct) || !isCount(item.partial) || !isCount(item.incorrect) || !isCount(item.total)) continue
    if (item.total < 1 || item.correct + item.partial + item.incorrect !== item.total) continue
    if (typeof item.at !== 'number' || !Number.isFinite(item.at)) continue
    results.push({
      topicId: item.topicId.trim(),
      topicLabel: item.topicLabel.trim().slice(0, 40),
      level: item.level,
      correct: item.correct,
      partial: item.partial,
      incorrect: item.incorrect,
      total: item.total,
      at: item.at,
    })
  }
  return results.slice(-MAX_RESULTS)
}

export function addInterviewResult(history: readonly InterviewResult[], result: InterviewResult): InterviewResult[] {
  return [...history, result].slice(-MAX_RESULTS)
}

/** Acierto sobre 1: las parciales cuentan la mitad. */
export function hitRate(result: InterviewSummary): number {
  if (result.total === 0) return 0
  return (result.correct + result.partial / 2) / result.total
}

export function compareInterview(history: readonly InterviewResult[], current: InterviewResult): InterviewComparison {
  const recent = history
    .filter((item) => item.topicId === current.topicId && item.level === current.level && item.at < current.at)
    .sort((a, b) => b.at - a.at)
    .slice(0, RECENT)
  const previous = recent[0] ?? null
  if (!previous) return { trend: 'first', previous, recent }
  const delta = hitRate(current) - hitRate(previous)
  const trend: Trend = Math.abs(delta) < 1e-9 ? 'same' : delta > 0 ? 'better' : 'worse'
  return { trend, previous, recent }
}

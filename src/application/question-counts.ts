import type { Verdict } from '../domain/grade.ts'
import { isLevel, levelBrief, type Level } from '../domain/level.ts'

export interface QuestionCount {
  id: string
  prompt: string
  topicLabel: string
  level: Level
  misses: number
  last: 'miss' | 'hit'
  updatedAt: number
}

export interface AnswerNote {
  id: string
  prompt: string
  topicLabel: string
  level: Level
  verdict: Verdict
}

export interface PlannedReminder {
  at: Date
  title: string
  body: string
  kind: 'nudge' | 'review'
}

const MAX_COUNTS = 200
const DAY_START_HOUR = 9
const DAY_END_HOUR = 21
const GAP_MS = 2 * 60 * 60 * 1000
const MIN_LEAD_MS = 60 * 1000
export const REMINDER_SLOTS = 30

const nudges = [
  {
    title: 'Un par de preguntas',
    body: 'Abre Trivial Dev y haz unas pocas. Con eso basta.',
  },
  {
    title: 'Toca practicar',
    body: 'Cinco minutos. Elige un tema y responde.',
  },
  {
    title: 'No lo dejes frío',
    body: 'Una ronda corta mantiene la entrevista a mano.',
  },
] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function storedPrompt(prompt: string): string {
  const trimmed = prompt.trim().replace(/\s+/g, ' ')
  if (trimmed.length <= 400) return trimmed
  return `${trimmed.slice(0, 399).trimEnd()}…`
}

function clipPrompt(prompt: string): string {
  if (prompt.length <= 140) return prompt
  const cut = prompt.slice(0, 139)
  const space = cut.lastIndexOf(' ')
  const base = space > 80 ? cut.slice(0, space) : cut.trimEnd()
  return `${base}…`
}

export function readQuestionCounts(value: unknown): QuestionCount[] {
  if (!Array.isArray(value)) return []
  const counts: QuestionCount[] = []
  for (const item of value) {
    if (!isRecord(item)) continue
    if (typeof item.id !== 'string' || !item.id.trim()) continue
    if (typeof item.prompt !== 'string' || !item.prompt.trim()) continue
    if (typeof item.topicLabel !== 'string' || !item.topicLabel.trim()) continue
    if (typeof item.level !== 'string' || !isLevel(item.level)) continue
    if (typeof item.misses !== 'number' || !Number.isInteger(item.misses) || item.misses < 1 || item.misses > 999) {
      continue
    }
    if (item.last !== 'miss' && item.last !== 'hit') continue
    const updatedAt = typeof item.updatedAt === 'number' && Number.isFinite(item.updatedAt) ? item.updatedAt : 0
    counts.push({
      id: item.id.trim(),
      prompt: storedPrompt(item.prompt),
      topicLabel: item.topicLabel.trim().slice(0, 40),
      level: item.level,
      misses: item.misses,
      last: item.last,
      updatedAt,
    })
  }
  return counts.slice(0, MAX_COUNTS)
}

export function noteAnswer(counts: readonly QuestionCount[], note: AnswerNote, now = Date.now()): QuestionCount[] {
  const missed = note.verdict !== 'correct'
  const index = counts.findIndex((item) => item.id === note.id)
  if (!missed && index === -1) return [...counts]
  const next = counts.map((item) => ({ ...item }))
  const prompt = storedPrompt(note.prompt)
  const topicLabel = note.topicLabel.trim().slice(0, 40)
  if (index === -1) {
    next.push({
      id: note.id,
      prompt,
      topicLabel,
      level: note.level,
      misses: 1,
      last: 'miss',
      updatedAt: now,
    })
  } else {
    const current = next[index]
    if (!current) return next
    next[index] = {
      ...current,
      prompt: prompt || current.prompt,
      topicLabel: topicLabel || current.topicLabel,
      level: note.level,
      misses: missed ? Math.min(999, current.misses + 1) : current.misses,
      last: missed ? 'miss' : 'hit',
      updatedAt: now,
    }
  }
  if (next.length <= MAX_COUNTS) return next
  return next.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_COUNTS)
}

function reviewCopy(count: QuestionCount): { title: string; body: string } {
  const title = count.misses === 1 ? 'Esta te costó' : `Te ha costado ${count.misses} veces`
  return {
    title,
    body: `${count.topicLabel} · ${levelBrief[count.level].label}. ${clipPrompt(count.prompt)}`,
  }
}

export function reminderInstants(from: Date, count: number): Date[] {
  const times: Date[] = []
  let cursor = from.getTime() + MIN_LEAD_MS
  while (times.length < count) {
    const candidate = new Date(cursor)
    const hour = candidate.getHours()
    if (hour < DAY_START_HOUR) {
      candidate.setHours(DAY_START_HOUR, 0, 0, 0)
      cursor = candidate.getTime()
      continue
    }
    if (hour >= DAY_END_HOUR) {
      candidate.setDate(candidate.getDate() + 1)
      candidate.setHours(DAY_START_HOUR, 0, 0, 0)
      cursor = candidate.getTime()
      continue
    }
    times.push(candidate)
    cursor = candidate.getTime() + GAP_MS
  }
  return times
}

export function planReminders(
  counts: readonly QuestionCount[],
  from: Date,
  slots = REMINDER_SLOTS,
): PlannedReminder[] {
  const times = reminderInstants(from, slots)
  const due = counts
    .filter((item) => item.last === 'miss' && item.misses > 0)
    .sort((a, b) => b.misses - a.misses || b.updatedAt - a.updatedAt || a.prompt.localeCompare(b.prompt, 'es'))
  let nudgeCursor = 0
  let reviewCursor = 0
  return times.map((at, index) => {
    if (due.length > 0 && index % 2 === 1) {
      const count = due[reviewCursor % due.length]
      reviewCursor += 1
      if (!count) return { at, kind: 'nudge', title: nudges[0].title, body: nudges[0].body }
      return { at, kind: 'review', ...reviewCopy(count) }
    }
    const nudge = nudges[nudgeCursor % nudges.length] ?? nudges[0]
    nudgeCursor += 1
    return { at, kind: 'nudge', title: nudge.title, body: nudge.body }
  })
}

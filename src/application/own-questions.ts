import type { OwnQuestionStore, QuestionBatch } from './ports.ts'
import { InterviewError } from '../domain/errors.ts'
import { isLevel } from '../domain/level.ts'
import { isQuestionKind, type ChoiceOption, type CodeSnippet, type Question } from '../domain/question.ts'
import { findTopic } from '../domain/topic.ts'

export interface OwnQuestionDraft {
  topicId: string
  level: string
  kind: string
  prompt: string
  options: { id: string; text: string }[]
  answerId: string
  modelAnswer: string
  explanation: string
  snippet: { language: string; source: string } | null
  sourceUrl?: string
}

export interface OwnQuestionImport {
  questions: Question[]
  added: number
  skipped: number
}

export const ownQuestionExample = `{
  "questions": [
    {
      "topicId": "html",
      "level": "junior",
      "kind": "choice",
      "prompt": "¿Qué elemento marca el contenido principal?",
      "options": [
        { "id": "a", "text": "main" },
        { "id": "b", "text": "div" }
      ],
      "answerId": "a",
      "explanation": "main es el contenido principal de la página.",
      "sourceUrl": "https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/main"
    },
    {
      "topicId": "javascript",
      "level": "mid",
      "kind": "written",
      "prompt": "¿Qué diferencia hay entre == y ===?",
      "modelAnswer": "=== compara valor y tipo. == convierte los tipos antes de comparar.",
      "explanation": "En una entrevista importa decir que == puede convertir y === no."
    }
  ]
}`

const letters = ['a', 'b', 'c', 'd'] as const

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function clip(value: unknown, max: number): { ok: string } | { error: 'missing' | 'long' } {
  if (typeof value !== 'string') return { error: 'missing' }
  const trimmed = value.trim()
  if (!trimmed) return { error: 'missing' }
  if (trimmed.length > max) return { error: 'long' }
  return { ok: trimmed }
}

function ownId(value: unknown, fallback: string): string {
  if (typeof value === 'string' && /^own-[a-z0-9-]{4,48}$/i.test(value.trim())) return value.trim()
  return fallback
}

export function ownQuestionId(now = Date.now(), salt = Math.random()): string {
  return `own-${Math.floor(now).toString(36)}-${Math.floor(salt * 1e9).toString(36)}`
}

function questionKey(question: Pick<Question, 'topicId' | 'level' | 'prompt'>): string {
  return `${question.topicId}\n${question.level}\n${question.prompt.trim().toLowerCase()}`
}

function readOptions(value: unknown): { options: ChoiceOption[] } | { error: string } {
  if (!Array.isArray(value)) return { error: 'Escribe al menos dos respuestas y marca la correcta.' }
  if (value.length > 4) return { error: 'Como máximo cuatro respuestas.' }
  const options: ChoiceOption[] = []
  for (const [index, item] of value.entries()) {
    if (!isRecord(item)) return { error: 'Una respuesta no tiene el formato esperado.' }
    const label = clip(item.text, 280)
    if ('error' in label && label.error === 'missing') continue
    if ('error' in label) return { error: 'Una respuesta es demasiado larga.' }
    const fallback = letters[index]
    if (!fallback) return { error: 'Como máximo cuatro respuestas.' }
    const id = clip(item.id, 8)
    options.push({ id: 'error' in id ? fallback : id.ok, text: label.ok })
  }
  if (options.length < 2) return { error: 'Escribe al menos dos respuestas y marca la correcta.' }
  const ids = new Set(options.map((option) => option.id))
  if (ids.size !== options.length) return { error: 'Las respuestas no pueden repetir id.' }
  return { options }
}

function readSnippet(value: unknown): { snippet: CodeSnippet | null } | { error: string } {
  if (value == null) return { snippet: null }
  if (!isRecord(value)) return { error: 'El fragmento necesita un lenguaje y el código.' }
  const language = clip(value.language, 20)
  const source = clip(value.source, 4000)
  if ('error' in language || 'error' in source) {
    const languageLong = 'error' in language && language.error === 'long'
    const sourceLong = 'error' in source && source.error === 'long'
    if (languageLong || sourceLong) return { error: 'El fragmento es demasiado largo.' }
    return { error: 'El fragmento necesita un lenguaje y el código.' }
  }
  return { snippet: { language: language.ok.toLowerCase(), source: source.ok } }
}

function readSourceUrl(value: unknown): { sourceUrl: string | null } | { error: string } {
  if (value == null) return { sourceUrl: null }
  const text = clip(value, 500)
  if ('error' in text && text.error === 'missing') return { sourceUrl: null }
  if ('error' in text) return { error: 'La fuente es demasiado larga.' }
  try {
    const url = new URL(text.ok)
    if (url.protocol !== 'https:') return { error: 'La fuente tiene que ser un enlace https.' }
  } catch {
    return { error: 'La fuente tiene que ser un enlace https.' }
  }
  return { sourceUrl: text.ok }
}

function assemble(item: unknown, id: string): Question | string {
  if (!isRecord(item)) return 'Cada pregunta tiene que ser un objeto.'
  const topicId = clip(item.topicId, 40)
  if ('error' in topicId) return 'Elige un tema de la lista.'
  const topic = findTopic(topicId.ok)
  if (!topic) return 'Elige un tema de la lista.'
  const level = clip(item.level, 16)
  if ('error' in level) return 'Elige junior, mid o senior.'
  if (!isLevel(level.ok)) return 'Elige junior, mid o senior.'
  const kind = clip(item.kind, 16)
  if ('error' in kind) return 'Elige el tipo de pregunta.'
  if (!isQuestionKind(kind.ok)) return 'Elige el tipo de pregunta.'
  const prompt = clip(item.prompt, 700)
  if ('error' in prompt && prompt.error === 'missing') return 'Escribe el enunciado.'
  if ('error' in prompt) return 'El enunciado es demasiado largo.'
  const explanation = clip(item.explanation, 1600)
  if ('error' in explanation && explanation.error === 'missing') return 'Escribe por qué esa es la respuesta.'
  if ('error' in explanation) return 'La explicación es demasiado larga.'
  const snippet = readSnippet(item.snippet)
  if ('error' in snippet) return snippet.error
  const sourceUrl = readSourceUrl(item.sourceUrl)
  if ('error' in sourceUrl) return sourceUrl.error

  if (kind.ok === 'choice') {
    const options = readOptions(item.options)
    if ('error' in options) return options.error
    const answerId = clip(item.answerId, 8)
    if ('error' in answerId || !options.options.some((option) => option.id === answerId.ok)) {
      return 'Marca una respuesta que tenga texto.'
    }
    const correct = options.options.find((option) => option.id === answerId.ok)
    return {
      id: ownId(item.id, id),
      topicId: topic.id,
      level: level.ok,
      kind: 'choice',
      prompt: prompt.ok,
      options: options.options,
      answerId: answerId.ok,
      modelAnswer: correct?.text ?? '',
      explanation: explanation.ok,
      snippet: snippet.snippet,
      sourceUrl: sourceUrl.sourceUrl,
    }
  }

  const modelAnswer = clip(item.modelAnswer, 1600)
  if ('error' in modelAnswer && modelAnswer.error === 'missing') return 'Escribe la respuesta que das por buena.'
  if ('error' in modelAnswer) return 'La respuesta es demasiado larga.'
  return {
    id: ownId(item.id, id),
    topicId: topic.id,
    level: level.ok,
    kind: kind.ok,
    prompt: prompt.ok,
    options: [],
    answerId: '',
    modelAnswer: modelAnswer.ok,
    explanation: explanation.ok,
    snippet: snippet.snippet,
    sourceUrl: sourceUrl.sourceUrl,
  }
}

export function buildOwnQuestion(draft: OwnQuestionDraft, id = ownQuestionId()): Question {
  const question = assemble(draft, id)
  if (typeof question === 'string') throw new InterviewError('invalid-payload', question)
  return question
}

function itemsFrom(payload: unknown): unknown[] | null {
  if (Array.isArray(payload)) return payload
  if (!isRecord(payload)) return null
  if (Array.isArray(payload.questions)) return payload.questions
  if (typeof payload.prompt === 'string') return [payload]
  return null
}

export function readStoredQuestions(payload: unknown): Question[] {
  const items = itemsFrom(payload)
  if (!items) return []
  const questions: Question[] = []
  for (const item of items) {
    const question = assemble(item, ownQuestionId())
    if (typeof question === 'string') continue
    questions.push(question)
  }
  return questions
}

export function ownQuestionNotice(count: number): string {
  if (count === 1) return 'Esta ronda incluye 1 pregunta tuya.'
  return `Esta ronda incluye ${count} preguntas tuyas.`
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = copy[index]
    const other = copy[swap]
    if (current === undefined || other === undefined) continue
    copy[index] = other
    copy[swap] = current
  }
  return copy
}

export function mixOwnQuestions(
  own: readonly Question[],
  batch: QuestionBatch,
  count: number,
  random: () => number,
): QuestionBatch {
  const picked = shuffle(own, random).slice(0, count)
  const seen = new Set(picked.map((question) => question.prompt.trim().toLowerCase()))
  const rest: Question[] = []
  for (const question of batch.questions) {
    if (picked.length + rest.length >= count) break
    const key = question.prompt.trim().toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    rest.push(question)
  }
  const notice = picked.length === 0 ? batch.notice : joinNotice(batch.notice, picked.length)
  return {
    questions: shuffle([...picked, ...rest], random),
    origin: batch.origin,
    notice,
  }
}

function joinNotice(current: string | undefined, count: number): string {
  const extra = ownQuestionNotice(count)
  return current ? `${current} ${extra}` : extra
}

export async function addOwnQuestion(store: OwnQuestionStore, draft: OwnQuestionDraft): Promise<Question[]> {
  const question = buildOwnQuestion(draft)
  const current = await store.load()
  if (current.some((item) => questionKey(item) === questionKey(question))) {
    throw new InterviewError('invalid-payload', 'Esa pregunta ya está guardada para ese tema y nivel.')
  }
  const next = [question, ...current]
  await store.save(next)
  return next
}

export async function removeOwnQuestion(store: OwnQuestionStore, id: string): Promise<Question[]> {
  const next = (await store.load()).filter((question) => question.id !== id)
  await store.save(next)
  return next
}

export async function importOwnQuestions(store: OwnQuestionStore, payload: unknown): Promise<OwnQuestionImport> {
  const items = itemsFrom(payload)
  if (!items) throw new InterviewError('invalid-payload', 'El archivo no tiene una lista de preguntas.')
  const current = await store.load()
  const keys = new Set(current.map(questionKey))
  const fresh: Question[] = []
  let skipped = 0
  for (const item of items) {
    const question = assemble(item, ownQuestionId())
    if (typeof question === 'string') {
      skipped += 1
      continue
    }
    const key = questionKey(question)
    if (keys.has(key)) {
      skipped += 1
      continue
    }
    keys.add(key)
    fresh.push(question)
  }
  const questions = fresh.length > 0 ? [...fresh, ...current] : current
  if (fresh.length > 0) await store.save(questions)
  return { questions, added: fresh.length, skipped }
}

export function describeOwnImport(report: Pick<OwnQuestionImport, 'added' | 'skipped'>): string {
  if (report.added === 0 && report.skipped === 0) return 'El archivo no trae preguntas.'
  const added = report.added === 1 ? 'Se ha añadido 1 pregunta.' : `Se han añadido ${report.added} preguntas.`
  if (report.skipped === 0) return added
  const skipped =
    report.skipped === 1
      ? '1 no se ha añadido porque no encaja o ya estaba.'
      : `${report.skipped} no se han añadido porque no encajan o ya estaban.`
  if (report.added === 0) return skipped
  return `${added} ${skipped}`
}

export function exportOwnQuestions(questions: readonly Question[]): string {
  return JSON.stringify(
    {
      questions: questions.map((question) => ({
        id: question.id,
        topicId: question.topicId,
        level: question.level,
        kind: question.kind,
        prompt: question.prompt,
        options: question.options,
        answerId: question.answerId,
        modelAnswer: question.modelAnswer,
        explanation: question.explanation,
        snippet: question.snippet,
        sourceUrl: question.sourceUrl,
      })),
    },
    null,
    2,
  )
}

const OPENERS: Record<string, string> = {
  '{': '}',
  '(': ')',
  '[': ']',
  '"': '"',
  "'": "'",
  '`': '`',
}

const SKIP_OVER = new Set(['}', ')', ']', '"', "'", '`'])

export interface CaretEdit {
  text: string
  caret: number
}

export function insertPair(source: string, start: number, end: number, key: string): CaretEdit | null {
  if (start === end && SKIP_OVER.has(key) && source[start] === key) {
    return { text: source, caret: start + 1 }
  }
  const closer = OPENERS[key]
  if (!closer) return null
  const selected = source.slice(start, end)
  return {
    text: source.slice(0, start) + key + selected + closer + source.slice(end),
    caret: start + 1 + selected.length,
  }
}

export function backspacePair(source: string, start: number, end: number): CaretEdit | null {
  if (start !== end || start <= 0 || start > source.length) return null
  const opener = source[start - 1]
  if (!opener) return null
  const closer = OPENERS[opener]
  if (!closer || source[start] !== closer) return null
  return {
    text: source.slice(0, start - 1) + source.slice(start + 1),
    caret: start - 1,
  }
}

/**
 * Cierra {}, (), [], comillas y el acento grave al escribir el carácter de apertura.
 * `selection` puede ser la de antes del cambio o la de después: se prueban las dos.
 */
export function applyAutoClose(
  previous: string,
  next: string,
  selection: { start: number; end: number },
): CaretEdit | null {
  if (next === previous) return null
  const delta = next.length - previous.length
  const attempts = [selection]
  if (selection.start === selection.end && delta !== 0) {
    const shifted = selection.start - delta
    attempts.push({ start: shifted, end: shifted })
  }

  for (const sel of attempts) {
    if (sel.start < 0 || sel.end < sel.start || sel.end > previous.length) continue
    const before = previous.slice(0, sel.start)
    const after = previous.slice(sel.end)
    if (!next.startsWith(before) || !next.endsWith(after)) continue
    const inserted = next.slice(sel.start, next.length - after.length)
    if (inserted.length === 1) {
      const paired = insertPair(previous, sel.start, sel.end, inserted)
      if (paired && paired.text !== next) return paired
    }
    if (inserted.length === 0 && delta === -1 && sel.start === sel.end) {
      const paired = backspacePair(previous, sel.start, sel.end)
      if (paired && paired.text !== next) return paired
    }
  }
  return null
}

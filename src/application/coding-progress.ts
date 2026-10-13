export type CodingMark = 'passed' | 'review'

/** Estado de cada enunciado de código por id. Si no está, no se ha hecho. */
export type CodingProgress = Record<string, CodingMark>

export function readCodingProgress(value: unknown): CodingProgress {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {}
  const progress: CodingProgress = {}
  for (const [id, mark] of Object.entries(value)) {
    if (!id.trim()) continue
    if (mark === 'passed' || mark === 'review') progress[id] = mark
  }
  return progress
}

/** Al ejecutar, queda bien si pasa los casos y para repasar si no. */
export function noteRun(progress: CodingProgress, id: string, passed: boolean): CodingProgress {
  return { ...progress, [id]: passed ? 'passed' : 'review' }
}

/** Ver la solución sin haberlo resuelto lo deja para repasar. */
export function noteSolutionViewed(progress: CodingProgress, id: string): CodingProgress {
  if (progress[id] === 'passed') return progress
  return { ...progress, [id]: 'review' }
}

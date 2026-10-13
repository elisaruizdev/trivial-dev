import type { Level } from './level.ts'

export interface PracticeCase {
  args: readonly unknown[]
  expected: unknown
}

export interface PracticeForbid {
  pattern: string
  message: string
}

/** Un enunciado para escribir código en la terminal. */
export interface CodingExercise {
  id: string
  level: Level
  title: string
  prompt: string
  /** Vacío si el enunciado no pide una función, como el bucle del 1 al 100. */
  names: readonly string[]
  starter: string
  explanation: string
  /** Qué construcciones o ideas usa la solución. */
  used: string
  javascript: string
  typescript: string
  cases?: readonly PracticeCase[]
  /** Comprobación propia. Si no está, se generan los casos. */
  probe?: string
  captureLogs?: boolean
  forbid?: readonly PracticeForbid[]
}

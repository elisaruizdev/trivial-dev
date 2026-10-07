import type { Verdict } from '../domain/grade.ts'
import type { QuestionKind } from '../domain/question.ts'

export const kindLabel: Record<QuestionKind, string> = {
  choice: 'Opción múltiple',
  written: 'Respuesta escrita',
  voice: 'Respuesta oral',
}

export const verdictLabel: Record<Verdict, string> = {
  correct: 'Correcta',
  partial: 'Parcial',
  incorrect: 'Incorrecta',
}

import { InterviewError } from '../domain/errors.ts'

export function messageFrom(error: unknown, topicLabel: string): string {
  if (error instanceof InterviewError && error.code === 'bank-missing') {
    return `${topicLabel} todavía no tiene preguntas de ejemplo. Configura OPENAI_API_KEY en un archivo .env, o añade preguntas de ese tema en src/infrastructure/fallback-bank.ts.`
  }
  return 'No se ha podido preparar la entrevista.'
}

export function bankNotice(error: unknown): string {
  if (error instanceof InterviewError && error.code === 'ai-unauthorized') {
    return 'La clave de IA no es válida. Esta ronda usa el banco de ejemplo.'
  }
  if (error instanceof InterviewError && error.code === 'invalid-payload') {
    return 'La IA ha devuelto preguntas que no encajan. Esta ronda usa el banco de ejemplo.'
  }
  return 'Esta ronda usa el banco de ejemplo. Con OPENAI_API_KEY en .env las preguntas se generan en cada partida.'
}

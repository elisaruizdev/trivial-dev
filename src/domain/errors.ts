export type InterviewErrorCode =
  | 'ai-unavailable'
  | 'ai-unauthorized'
  | 'invalid-payload'
  | 'bank-missing'

export class InterviewError extends Error {
  readonly code: InterviewErrorCode

  constructor(code: InterviewErrorCode, message: string) {
    super(message)
    this.name = 'InterviewError'
    this.code = code
  }
}

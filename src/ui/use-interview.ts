import { createContext, useContext } from 'react'
import type { interviewReducer } from '../application/interview-state.ts'
import type { Level } from '../domain/level.ts'
import type { Topic } from '../domain/topic.ts'

export interface InterviewController {
  state: ReturnType<typeof interviewReducer>
  start: (topic: Topic, level: Level) => Promise<boolean>
  submit: (response: string) => Promise<void>
  next: () => void
  reset: () => void
}

export const InterviewContext = createContext<InterviewController | null>(null)

export function useInterview(): InterviewController {
  const controller = useContext(InterviewContext)
  if (!controller) {
    throw new Error('useInterview tiene que vivir dentro de InterviewProvider')
  }
  return controller
}

import { useCallback, useMemo, useReducer, type ReactNode } from 'react'
import { gradeAnswer } from '../application/grade-answer.ts'
import { initialInterviewState, interviewReducer } from '../application/interview-state.ts'
import { loadInterview } from '../application/load-interview.ts'
import { messageFrom } from '../application/messages.ts'
import { INTERVIEW_LENGTH } from '../application/ports.ts'
import type { Level } from '../domain/level.ts'
import type { Topic } from '../domain/topic.ts'
import { InterviewContext, type InterviewController } from './use-interview.ts'
import { useServices } from './use-services.ts'

export function InterviewProvider({ children }: { children: ReactNode }) {
  const services = useServices()
  const [state, dispatch] = useReducer(interviewReducer, initialInterviewState)

  const start = useCallback(
    async (topic: Topic, level: Level) => {
      dispatch({ type: 'load', topic, level })
      try {
        const batch = await loadInterview(services.questions, {
          topic,
          level,
          count: INTERVIEW_LENGTH,
        })
        dispatch({
          type: 'ready',
          interview: {
            topic,
            level,
            origin: batch.origin,
            notice: batch.notice,
            questions: batch.questions,
          },
        })
        return true
      } catch (error) {
        dispatch({ type: 'fail', message: messageFrom(error, topic.label) })
        return false
      }
    },
    [services],
  )

  const submit = useCallback(
    async (response: string) => {
      if (state.status !== 'question') return
      const question = state.interview.questions[state.interview.index]
      if (!question) return
      const grade = await gradeAnswer(services.evaluator, question, response)
      dispatch({ type: 'answer', response, grade })
    },
    [services, state],
  )

  const next = useCallback(() => {
    dispatch({ type: 'next' })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  const value = useMemo<InterviewController>(
    () => ({ state, start, submit, next, reset }),
    [state, start, submit, next, reset],
  )

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>
}

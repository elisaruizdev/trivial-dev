import type { Grade } from '../domain/grade.ts'
import type { Level } from '../domain/level.ts'
import type { Question } from '../domain/question.ts'
import type { Topic } from '../domain/topic.ts'

export interface AnswerRecord {
  question: Question
  response: string
  grade: Grade
}

export interface RunningInterview {
  topic: Topic
  level: Level
  origin: 'ai' | 'bank'
  notice?: string
  questions: Question[]
  index: number
  records: AnswerRecord[]
}

export type InterviewState =
  | { status: 'idle' }
  | { status: 'loading'; topic: Topic; level: Level }
  | { status: 'question'; interview: RunningInterview }
  | { status: 'feedback'; interview: RunningInterview; grade: Grade; response: string }
  | { status: 'summary'; interview: RunningInterview }
  | { status: 'error'; message: string }

export type InterviewAction =
  | { type: 'load'; topic: Topic; level: Level }
  | { type: 'ready'; interview: Omit<RunningInterview, 'index' | 'records'> }
  | { type: 'fail'; message: string }
  | { type: 'answer'; response: string; grade: Grade }
  | { type: 'next' }
  | { type: 'reset' }

export const initialInterviewState: InterviewState = { status: 'idle' }

export function interviewReducer(state: InterviewState, action: InterviewAction): InterviewState {
  switch (action.type) {
    case 'load':
      return { status: 'loading', topic: action.topic, level: action.level }
    case 'ready':
      return {
        status: 'question',
        interview: { ...action.interview, index: 0, records: [] },
      }
    case 'fail':
      return { status: 'error', message: action.message }
    case 'answer': {
      if (state.status !== 'question') return state
      const question = state.interview.questions[state.interview.index]
      if (!question) return state
      return {
        status: 'feedback',
        interview: {
          ...state.interview,
          records: [
            ...state.interview.records,
            { question, response: action.response, grade: action.grade },
          ],
        },
        grade: action.grade,
        response: action.response,
      }
    }
    case 'next': {
      if (state.status !== 'feedback') return state
      const nextIndex = state.interview.index + 1
      if (nextIndex >= state.interview.questions.length) {
        return { status: 'summary', interview: state.interview }
      }
      return {
        status: 'question',
        interview: { ...state.interview, index: nextIndex },
      }
    }
    case 'reset':
      return initialInterviewState
    default: {
      const unreachable: never = action
      void unreachable
      return state
    }
  }
}

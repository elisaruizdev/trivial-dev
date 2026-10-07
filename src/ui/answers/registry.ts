import type { ComponentType } from 'react'
import type { Question } from '../../domain/question.ts'
import { ChoiceAnswer } from './choice-answer.tsx'
import { VoiceAnswer } from './voice-answer.tsx'
import { WrittenAnswer } from './written-answer.tsx'

export interface AnswerViewProps {
  question: Question
  disabled: boolean
  revealed: boolean
  value: string
  onChange: (value: string) => void
}

export const answerViews: Record<Question['kind'], ComponentType<AnswerViewProps>> = {
  choice: ChoiceAnswer,
  written: WrittenAnswer,
  voice: VoiceAnswer,
}

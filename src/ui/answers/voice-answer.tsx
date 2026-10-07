import type { AnswerViewProps } from './registry.ts'
import { SpeechField } from './speech-field.tsx'

export function VoiceAnswer({ question, disabled, value, onChange }: AnswerViewProps) {
  return (
    <SpeechField
      name={question.id}
      value={value}
      disabled={disabled}
      label="Transcripción de la respuesta"
      placeholder="Pulsa Hablar. La transcripción queda como respuesta y puedes corregirla."
      onChange={onChange}
    />
  )
}

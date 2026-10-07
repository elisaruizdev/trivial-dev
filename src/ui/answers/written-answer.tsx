import type { AnswerViewProps } from './registry.ts'
import { SpeechField } from './speech-field.tsx'

export function WrittenAnswer({ question, disabled, value, onChange }: AnswerViewProps) {
  return (
    <SpeechField
      name={question.id}
      value={value}
      disabled={disabled}
      label="Tu respuesta"
      placeholder="Escríbela o díctala. El micrófono la pasa a texto."
      onChange={onChange}
    />
  )
}

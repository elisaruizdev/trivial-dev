import type { AnswerViewProps } from './registry.ts'

export function ChoiceAnswer({ question, disabled, revealed, value, onChange }: AnswerViewProps) {
  return (
    <fieldset className="options">
      <legend className="sr-only">Opciones</legend>
      {question.options.map((option) => {
        const selected = value === option.id
        const showCorrect = revealed && option.id === question.answerId
        const showWrong = revealed && selected && option.id !== question.answerId
        const className = ['option', selected ? 'is-selected' : '', showCorrect ? 'is-correct' : '', showWrong ? 'is-wrong' : '']
          .filter(Boolean)
          .join(' ')
        return (
          <label key={option.id} className={className}>
            <input
              type="radio"
              name={question.id}
              value={option.id}
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(option.id)}
            />
            <span>{option.text}</span>
          </label>
        )
      })}
    </fieldset>
  )
}

import type { FormEvent } from 'react'
import { useState } from 'react'
import type { Question } from '../domain/question.ts'
import { answerViews } from './answers/registry.ts'

interface AnswerFormProps {
  question: Question
  locked: boolean
  onSubmit: (response: string) => Promise<void>
}

export function AnswerForm({ question, locked, onSubmit }: AnswerFormProps) {
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)
  const View = answerViews[question.kind]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = draft.trim()
    if (locked || pending || !response) return
    setPending(true)
    try {
      await onSubmit(response)
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="answer-form" onSubmit={(event) => void handleSubmit(event)}>
      <View
        question={question}
        disabled={locked || pending}
        revealed={locked}
        value={draft}
        onChange={setDraft}
      />
      {locked ? null : (
        <button className="primary" type="submit" disabled={pending || draft.trim().length === 0}>
          {pending ? 'Valorando…' : 'Responder'}
        </button>
      )}
    </form>
  )
}

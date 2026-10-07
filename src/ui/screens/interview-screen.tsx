import { Fragment } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { levelBrief } from '../../domain/level.ts'
import { AnswerForm } from '../answer-form.tsx'
import { CodeWorkspace } from '../code/code-workspace.tsx'
import { useInterview } from '../use-interview.ts'
import { kindLabel } from '../labels.ts'
import { FeedbackPanel } from './feedback-panel.tsx'

export function InterviewScreen() {
  const { state, submit, next, reset } = useInterview()
  const navigate = useNavigate()

  if (state.status === 'summary') return <Navigate to="/resultado" replace />
  if (state.status !== 'question' && state.status !== 'feedback') return <Navigate to="/" replace />

  const { interview } = state
  const question = interview.questions[interview.index]
  if (!question) return <Navigate to="/" replace />

  const total = interview.questions.length
  const position = interview.index + 1
  const feedback = state.status === 'feedback' ? state : null

  function abandon() {
    reset()
    void navigate('/')
  }

  return (
    <main className="desk">
      <article className="sheet">
        <header className="sheet-bar">
          <div>
            <p className="eyebrow">
              {interview.topic.label} · {levelBrief[interview.level].label}
            </p>
            <p className="progress-label">
              Pregunta {position} de {total}
            </p>
          </div>
          <button className="text-button" type="button" onClick={abandon}>
            Abandonar
          </button>
        </header>
        <progress className="progress" value={position} max={total}>
          Pregunta {position} de {total}
        </progress>
        {interview.notice ? <p className="banner">{interview.notice}</p> : null}
        <Fragment key={interview.index}>
          <p className="kind">{kindLabel[question.kind]}</p>
          <h1 className="prompt">{question.prompt}</h1>
          {question.snippet ? (
            <CodeWorkspace snippet={question.snippet} locked={feedback !== null} />
          ) : null}
          <AnswerForm question={question} locked={feedback !== null} onSubmit={submit} />
          {feedback ? (
            <FeedbackPanel
              grade={feedback.grade}
              explanation={question.explanation}
              sourceUrl={question.sourceUrl}
              isLast={position === total}
              onNext={next}
            />
          ) : null}
        </Fragment>
      </article>
    </main>
  )
}

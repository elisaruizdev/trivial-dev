import { Navigate, useNavigate } from 'react-router-dom'
import { responseLabel } from '../../domain/question.ts'
import { levelBrief } from '../../domain/level.ts'
import { summarize } from '../../application/summarize.ts'
import { useInterview } from '../use-interview.ts'
import { verdictLabel } from '../labels.ts'
import { SourceLink } from '../source-link.tsx'

export function ResultScreen() {
  const { state, reset } = useInterview()
  const navigate = useNavigate()

  if (state.status !== 'summary') return <Navigate to="/" replace />

  const { interview } = state
  const summary = summarize(interview.records)

  function again() {
    reset()
    void navigate('/')
  }

  return (
    <main className="desk">
      <article className="sheet">
        <p className="eyebrow">
          {interview.topic.label} · {levelBrief[interview.level].label}
        </p>
        <h1 className="score">
          {summary.correct}
          <span> / {summary.total}</span>
        </h1>
        <p className="score-detail">
          {summary.correct} correctas · {summary.partial} parciales · {summary.incorrect} incorrectas
        </p>
        <ol className="review">
          {interview.records.map((record, index) => (
            <li key={record.question.id}>
              <p className="eyebrow">
                {index + 1}. {verdictLabel[record.grade.verdict]}
              </p>
              <h2>{record.question.prompt}</h2>
              <p>
                <span className="review-label">Tu respuesta. </span>
                {responseLabel(record.question, record.response)}
              </p>
              <p>{record.grade.comment}</p>
              <p>{record.question.explanation}</p>
              <SourceLink url={record.question.sourceUrl} />
            </li>
          ))}
        </ol>
        <button className="primary" type="button" onClick={again}>
          Otra entrevista
        </button>
      </article>
    </main>
  )
}

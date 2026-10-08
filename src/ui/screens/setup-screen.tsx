import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { levelBrief, levels, type Level } from '../../domain/level.ts'
import { topics } from '../../domain/topic.ts'
import { useInterview } from '../use-interview.ts'

export function SetupScreen() {
  const { state, start } = useInterview()
  const navigate = useNavigate()
  const [topicId, setTopicId] = useState<string | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const ready = topicId !== null && level !== null
  const loading = state.status === 'loading'
  const error = state.status === 'error' ? state.message : null

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const topic = topics.find((item) => item.id === topicId)
    if (!topic || !level) return
    const started = await start(topic, level)
    if (started) navigate('/entrevista')
  }

  return (
    <main className="setup">
      <div className="setup-copy">
        <p className="eyebrow">Prepara tu entrevista técnica</p>
        <h1 className="mark-title">
          <span className="mark-line">
            <span className="mark-word mark-pink">Trivial</span>{' '}
            <span className="mark-word mark-yellow">para</span>
          </span>
          <span className="mark-line">
            <span className="mark-word mark-mint">desarrolladores</span>
          </span>
          <span className="mark-line">
            <span className="mark-word mark-blue">inquietos</span>
          </span>
        </h1>
        <p className="setup-lead">
          Elige el tema y el nivel. A partir de ahí, las preguntas llegan como en una entrevista:
          algunas se marcan, otras se escriben y, en senior, alguna se dice en voz alta.
        </p>
      </div>
      <form className="setup-form" onSubmit={(event) => void onSubmit(event)}>
        {!ready ? (
          <p className="hint" id="start-hint">
            Elige un tema y un nivel.
          </p>
        ) : null}
        <fieldset>
          <legend>Tema</legend>
          <div className="topic-grid">
            {topics.map((topic) => {
              const selected = topicId === topic.id
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={selected ? 'topic-card is-selected' : 'topic-card'}
                  aria-pressed={selected}
                  aria-label={`${topic.label}. ${topic.summary}`}
                  onClick={() => setTopicId(topic.id)}
                >
                  <span className="topic-label">{topic.label}</span>
                  <span className="topic-summary">{topic.summary}</span>
                </button>
              )
            })}
          </div>
        </fieldset>
        <fieldset>
          <legend>Nivel</legend>
          <div className="level-list" role="radiogroup" aria-label="Nivel">
            {levels.map((item) => {
              const brief = levelBrief[item]
              const selected = level === item
              return (
                <label key={item} className={selected ? 'level-card is-selected' : 'level-card'}>
                  <input
                    type="radio"
                    name="level"
                    value={item}
                    checked={selected}
                    aria-label={`${brief.label}. ${brief.summary}`}
                    onChange={() => setLevel(item)}
                  />
                  <span className="topic-label">{brief.label}</span>
                  <span className="topic-summary">{brief.summary}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
        {loading ? <p className="hint">Son 30 preguntas. Puede tardar un momento.</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        <div className="setup-actions">
          <button
            className="primary"
            type="submit"
            disabled={!ready || loading}
            aria-describedby={ready ? undefined : 'start-hint'}
          >
            {loading ? 'Preparando preguntas…' : 'Empezar entrevista'}
          </button>
          <Link className="setup-link" to="/mis-preguntas">
            Mis preguntas
          </Link>
        </div>
      </form>
    </main>
  )
}

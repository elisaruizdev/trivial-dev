import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { InterviewError } from '../../domain/errors.ts'
import { levelBrief, levels } from '../../domain/level.ts'
import { questionKinds, type Question } from '../../domain/question.ts'
import { findTopic, topics } from '../../domain/topic.ts'
import {
  addOwnQuestion,
  describeOwnImport,
  exportOwnQuestions,
  importOwnQuestions,
  ownQuestionExample,
  removeOwnQuestion,
} from '../../application/own-questions.ts'
import { kindLabel } from '../labels.ts'
import { ownOptionSlots, useOwnQuestionDraft } from '../use-own-question-draft.ts'
import { useServices } from '../use-services.ts'

function failure(error: unknown, fallback: string): string {
  if (error instanceof InterviewError) return error.message
  return fallback
}

export function OwnQuestionsScreen() {
  const services = useServices()
  const draft = useOwnQuestionDraft()
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let alive = true
    void services.ownQuestions.load().then((loaded) => {
      if (alive) setQuestions(loaded)
    })
    return () => {
      alive = false
    }
  }, [services.ownQuestions])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setNotice(null)
    setSaving(true)
    try {
      const next = await addOwnQuestion(services.ownQuestions, draft.toDraft())
      setQuestions(next)
      draft.clearText()
      setNotice('Guardada. Entrará en las rondas de ese tema y nivel.')
    } catch (caught) {
      setError(failure(caught, 'No se ha podido guardar.'))
    } finally {
      setSaving(false)
    }
  }

  async function onFile(file: File | undefined) {
    if (!file) return
    setError(null)
    setNotice(null)
    if (file.size > 500_000) {
      setError('El archivo es demasiado grande.')
      return
    }
    let payload: unknown
    try {
      payload = JSON.parse(await file.text()) as unknown
    } catch {
      setError('Ese archivo no es JSON válido.')
      return
    }
    try {
      const report = await importOwnQuestions(services.ownQuestions, payload)
      setQuestions(report.questions)
      setNotice(describeOwnImport(report))
    } catch (caught) {
      setError(failure(caught, 'No se ha podido leer el archivo.'))
    }
  }

  function onExport() {
    const blob = new Blob([exportOwnQuestions(questions)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'mis-preguntas.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  async function onRemove(id: string) {
    setError(null)
    setQuestions(await removeOwnQuestion(services.ownQuestions, id))
  }

  return (
    <main className="desk">
      <article className="sheet library">
        <Link className="text-button" to="/">
          Volver
        </Link>
        <h1>Mis preguntas</h1>
        <p className="hint">
          Escribe una o sube un JSON. Se quedan en este navegador. Si el tema y el nivel coinciden, entra en la ronda
          mezclada con las demás. La respuesta que marques es la que puntúa.
        </p>
        <div className="library-actions">
          <label className="ghost file-button">
            Subir un archivo JSON
            <input
              className="sr-only"
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                const file = event.target.files?.[0]
                event.target.value = ''
                void onFile(file)
              }}
            />
          </label>
          <button type="button" className="ghost" disabled={questions.length === 0} onClick={onExport}>
            Descargar las mías
          </button>
        </div>
        <details>
          <summary>Formato del archivo</summary>
          <pre>{ownQuestionExample}</pre>
        </details>
        {notice ? <p className="banner">{notice}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        <form className="own-form" onSubmit={(event) => void onSubmit(event)}>
          <h2>Añadir una</h2>
          <label className="field">
            <span>Tema</span>
            <select value={draft.topicId} onChange={(event) => draft.setTopicId(event.target.value)}>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Nivel</span>
            <select value={draft.level} onChange={(event) => draft.setLevel(event.target.value as typeof draft.level)}>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {levelBrief[level].label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Tipo</span>
            <select value={draft.kind} onChange={(event) => draft.setKind(event.target.value as typeof draft.kind)}>
              {questionKinds.map((kind) => (
                <option key={kind} value={kind}>
                  {kindLabel[kind]}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Enunciado</span>
            <textarea value={draft.prompt} rows={3} onChange={(event) => draft.setPrompt(event.target.value)} />
          </label>
          {draft.kind === 'choice' ? (
            <fieldset className="choice-options">
              <legend>Respuestas</legend>
              <p className="hint">Deja vacías las que no uses. Marca la correcta.</p>
              {ownOptionSlots.map((id, index) => (
                <div className="choice-option" key={id}>
                  <input
                    type="radio"
                    name="correct-option"
                    value={id}
                    checked={draft.answerId === id}
                    aria-label={`La respuesta ${id} es la correcta`}
                    onChange={() => draft.setAnswerId(id)}
                  />
                  <input
                    type="text"
                    aria-label={`Respuesta ${id}`}
                    value={draft.options[index] ?? ''}
                    onChange={(event) => draft.setOption(index, event.target.value)}
                  />
                </div>
              ))}
            </fieldset>
          ) : (
            <label className="field">
              <span>Respuesta que das por buena</span>
              <textarea
                value={draft.modelAnswer}
                rows={4}
                onChange={(event) => draft.setModelAnswer(event.target.value)}
              />
            </label>
          )}
          <label className="field">
            <span>Por qué es esa la respuesta</span>
            <textarea
              value={draft.explanation}
              rows={3}
              onChange={(event) => draft.setExplanation(event.target.value)}
            />
          </label>
          <details>
            <summary>Fragmento de código, si hace falta</summary>
            <div className="own-form">
              <label className="field">
                <span>Lenguaje</span>
                <input
                  type="text"
                  value={draft.language}
                  placeholder="javascript"
                  onChange={(event) => draft.setLanguage(event.target.value)}
                />
              </label>
              <label className="field">
                <span>Código</span>
                <textarea value={draft.source} rows={5} onChange={(event) => draft.setSource(event.target.value)} />
              </label>
            </div>
          </details>
          <button className="primary" type="submit" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar pregunta'}
          </button>
        </form>

        <h2>Guardadas ({questions.length})</h2>
        {questions.length === 0 ? (
          <p className="hint">Todavía no hay ninguna. Cuando elijas su tema y su nivel, entrarán en la ronda.</p>
        ) : (
          <ul className="own-list">
            {questions.map((question) => {
              const topic = findTopic(question.topicId)
              return (
                <li className="own-item" key={question.id}>
                  <p className="eyebrow">
                    {topic?.label ?? question.topicId} · {levelBrief[question.level].label} · {kindLabel[question.kind]}
                  </p>
                  <p className="own-prompt">{question.prompt}</p>
                  <p className="own-answer">
                    {question.kind === 'choice'
                      ? question.options.find((option) => option.id === question.answerId)?.text
                      : question.modelAnswer}
                  </p>
                  <button
                    type="button"
                    className="text-button"
                    aria-label={`Quitar «${question.prompt}»`}
                    onClick={() => void onRemove(question.id)}
                  >
                    Quitar
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </article>
    </main>
  )
}

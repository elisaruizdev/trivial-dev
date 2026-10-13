import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { backspacePair, insertPair } from '../../application/auto-close.ts'
import {
  practiceProgram,
  runPracticeProgram,
  type PracticeLine,
} from '../../application/practice-program.ts'
import type { CodingExercise } from '../../domain/coding-exercise.ts'
import { levelBrief, levels, type Level } from '../../domain/level.ts'
import { codingExercises, exercisesForLevel } from '../../infrastructure/coding/catalog.ts'
import { runJavaScript } from '../code/run-javascript.ts'
import { useNarrowViewport } from '../use-narrow-viewport.ts'

async function executePractice(program: string): Promise<PracticeLine[]> {
  if (typeof Worker === 'undefined') return runPracticeProgram(program)
  return runJavaScript(program, 1500)
}

export function CodePracticeScreen() {
  const narrow = useNarrowViewport()
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const caretRef = useRef<number | null>(null)
  const [level, setLevel] = useState<Level>('junior')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [lines, setLines] = useState<PracticeLine[]>([])
  const [running, setRunning] = useState(false)
  const [solved, setSolved] = useState(false)

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return exercisesForLevel(level).filter((exercise) => {
      if (!needle) return true
      const haystack = [exercise.title, exercise.prompt, ...exercise.names].join(' ').toLowerCase()
      return haystack.includes(needle)
    })
  }, [level, query])

  const exercise = codingExercises.find((item) => item.id === selectedId) ?? null
  const showList = !narrow || !exercise
  const showWork = !narrow || Boolean(exercise)

  useEffect(() => {
    const node = editorRef.current
    const caret = caretRef.current
    if (!node || caret === null) return
    node.selectionStart = caret
    node.selectionEnd = caret
    caretRef.current = null
  }, [code])

  function openExercise(next: CodingExercise) {
    setSelectedId(next.id)
    setCode(next.starter)
    setLines([])
    setSolved(false)
    caretRef.current = null
  }

  function chooseLevel(next: Level) {
    setLevel(next)
    setSelectedId(null)
    setCode('')
    setLines([])
    setSolved(false)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const node = event.currentTarget
    const start = node.selectionStart
    const end = node.selectionEnd
    if (event.key === 'Backspace' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const edit = backspacePair(code, start, end)
      if (!edit) return
      event.preventDefault()
      caretRef.current = edit.caret
      setCode(edit.text)
      return
    }
    if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) return
    const edit = insertPair(code, start, end, event.key)
    if (!edit) return
    event.preventDefault()
    caretRef.current = edit.caret
    setCode(edit.text)
  }

  async function onRun() {
    if (!exercise || running) return
    setRunning(true)
    setLines([])
    try {
      setLines(await executePractice(practiceProgram(exercise, code)))
    } finally {
      setRunning(false)
    }
  }

  return (
    <main className="desk">
      <article className="sheet practice">
        <Link className="text-button" to="/">
          Volver
        </Link>
        <h1>Escribir código</h1>
        <p className="hint">
          Elige nivel y enunciado. Escribe en la terminal y pulsa Ejecutar. Resuelve cuenta qué hay que hacer y qué se
          ha usado, en JavaScript y en TypeScript.
        </p>
        <div className="practice-tabs" role="tablist" aria-label="Nivel">
          {levels.map((item) => (
            <button
              key={item}
              className={item === level ? 'practice-tab is-on' : 'practice-tab'}
              type="button"
              role="tab"
              aria-selected={item === level}
              onClick={() => chooseLevel(item)}
            >
              {levelBrief[item].label}
            </button>
          ))}
        </div>
        <input
          className="practice-search"
          value={query}
          aria-label="Buscar enunciado"
          placeholder="Busca por título o nombre"
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className="hint">
          {list.length} {list.length === 1 ? 'enunciado' : 'enunciados'}
        </p>
        <div className={showList && showWork ? 'practice-layout' : 'practice-layout is-single'}>
          {showList ? (
            <ul className="practice-list">
              {list.map((item) => (
                <li key={item.id}>
                  <button
                    className={item.id === selectedId ? 'practice-item is-on' : 'practice-item'}
                    type="button"
                    onClick={() => openExercise(item)}
                  >
                    {item.title}
                    {item.names.length > 0 ? <small>{item.names.join(' · ')}</small> : <small>script</small>}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {showWork && exercise ? (
            <section className="practice-work" aria-label={exercise.title}>
              {narrow ? (
                <button className="text-button" type="button" onClick={() => setSelectedId(null)}>
                  Volver a la lista
                </button>
              ) : null}
              <h2>{exercise.title}</h2>
              <p className="practice-prompt">{exercise.prompt}</p>
              <div className="codepen">
                <p className="codepen-bar">Terminal</p>
                <textarea
                  ref={editorRef}
                  className="codepen-editor"
                  aria-label="Código"
                  spellCheck={false}
                  rows={14}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  onKeyDown={onKeyDown}
                />
                <div className="practice-actions">
                  <button className="primary" type="button" disabled={running} onClick={() => void onRun()}>
                    {running ? 'Ejecutando…' : 'Ejecutar'}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    aria-expanded={solved}
                    onClick={() => setSolved((open) => !open)}
                  >
                    Resuelve
                  </button>
                </div>
                <p className="codepen-console-title">Consola</p>
                <div className="codepen-console" role="log">
                  {lines.length === 0 ? <p className="codepen-line">Pulsa Ejecutar para comprobar el código.</p> : null}
                  {lines.map((line, index) => (
                    <p key={`${line.level}-${index}`} className={`codepen-line is-${line.level}`}>
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
              {solved ? <Solution exercise={exercise} /> : null}
            </section>
          ) : null}
          {showWork && !exercise ? <p className="hint">Elige un enunciado de la lista.</p> : null}
        </div>
        {list.length === 0 ? <p className="hint">Ningún enunciado coincide.</p> : null}
      </article>
    </main>
  )
}

function Solution({ exercise }: { exercise: CodingExercise }) {
  return (
    <div className="solution">
      <h2>Cómo se resuelve</h2>
      <p>{exercise.explanation}</p>
      <p>
        <strong>Qué se ha usado. </strong>
        {exercise.used}
      </p>
      <h3>JavaScript</h3>
      <pre>{exercise.javascript}</pre>
      <h3>TypeScript</h3>
      <pre>{exercise.typescript}</pre>
    </div>
  )
}

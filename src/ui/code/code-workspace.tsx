import { useEffect, useState } from 'react'
import type { CodeSnippet } from '../../domain/question.ts'
import { canRunInConsole } from '../../domain/snippet.ts'
import { previewDocument, runJavaScript, type ConsoleLine } from './run-javascript.ts'

interface CodeWorkspaceProps {
  snippet: CodeSnippet
  locked: boolean
}

export function CodeWorkspace({ snippet, locked }: CodeWorkspaceProps) {
  const snippetKey = `${snippet.language}\n${snippet.source}`
  const [seenSnippet, setSeenSnippet] = useState(snippetKey)
  const [source, setSource] = useState(snippet.source)
  const [ran, setRan] = useState<ConsoleLine[] | null>(null)
  if (seenSnippet !== snippetKey) {
    setSeenSnippet(snippetKey)
    setSource(snippet.source)
    setRan(null)
  }
  const runnable = canRunInConsole(snippet.language)
  const preview = locked ? previewDocument(snippet.language, source) : null
  const rows = Math.min(16, Math.max(6, source.split('\n').length + 1))
  const lines = !locked
    ? null
    : runnable
      ? ran
      : [{ level: 'info' as const, text: 'La consola ejecuta JavaScript. Este fragmento se queda para leerlo.' }]

  useEffect(() => {
    if (!locked || !runnable) return
    let cancelled = false
    void runJavaScript(source).then((next) => {
      if (!cancelled) setRan(next)
    })
    return () => {
      cancelled = true
    }
  }, [locked, runnable, source])

  return (
    <section className="codepen">
      <div className="codepen-bar">
        <span>Fragmento</span>
        <span>{snippet.language}</span>
      </div>
      <textarea
        className="codepen-editor"
        value={source}
        rows={rows}
        spellCheck={false}
        disabled={locked}
        aria-label="Fragmento de código"
        onChange={(event) => setSource(event.target.value)}
      />
      {locked ? (
        <div className="codepen-console" aria-live="polite">
          <p className="codepen-console-title">Consola</p>
          {lines === null ? <p className="codepen-line">Ejecutando…</p> : null}
          {lines?.map((line, index) => (
            <p key={`${line.level}-${index}`} className={`codepen-line is-${line.level}`}>
              {line.text}
            </p>
          ))}
          {preview ? (
            <iframe className="codepen-preview" sandbox="" srcDoc={preview} title="Vista del fragmento" />
          ) : null}
        </div>
      ) : (
        <p className="hint">Puedes leer el fragmento o cambiarlo. Al responder, se ejecuta y aparece la consola.</p>
      )}
    </section>
  )
}

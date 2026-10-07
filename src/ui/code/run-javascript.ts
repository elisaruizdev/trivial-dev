export interface ConsoleLine {
  level: 'log' | 'info' | 'warn' | 'error'
  text: string
}

const WORKER_SOURCE = `
self.onmessage = (event) => {
  const lines = []
  const push = (level, args) => {
    if (lines.length >= 40) return
    const text = args.map((value) => {
      if (typeof value === 'string') return value
      if (value instanceof Error) return value.message
      try { return JSON.stringify(value) } catch { return String(value) }
    }).join(' ')
    lines.push({ level, text })
  }
  console.log = (...args) => push('log', args)
  console.info = (...args) => push('info', args)
  console.warn = (...args) => push('warn', args)
  console.error = (...args) => push('error', args)
  try {
    const execute = new Function(String(event.data))
    execute()
  } catch (error) {
    const message = error && error.message ? error.message : String(error)
    push('error', [message])
  }
  setTimeout(() => self.postMessage(lines), 40)
}
`

export function previewDocument(language: string, source: string): string | null {
  if (language === 'html') return source
  if (language === 'css') {
    const safe = source.replace(/<\/style/gi, '<\\/style')
    return `<!doctype html><html><head><style>${safe}</style></head><body><p class="muestra">Muestra</p></body></html>`
  }
  return null
}

export function runJavaScript(source: string, timeoutMs = 800): Promise<ConsoleLine[]> {
  const trimmed = source.trim()
  if (!trimmed) {
    return Promise.resolve([{ level: 'info', text: 'El fragmento está vacío.' }])
  }
  if (typeof Worker === 'undefined') {
    return Promise.resolve([{ level: 'error', text: 'Este entorno no puede ejecutar el fragmento.' }])
  }

  return new Promise((resolve) => {
    const blob = new Blob([WORKER_SOURCE], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    let settled = false
    const finish = (lines: ConsoleLine[]) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      worker.terminate()
      URL.revokeObjectURL(url)
      resolve(lines)
    }
    const timer = setTimeout(() => {
      finish([{ level: 'error', text: 'La ejecución ha tardado demasiado y se ha cortado.' }])
    }, timeoutMs)
    worker.onmessage = (event: MessageEvent<ConsoleLine[]>) => {
      const lines = Array.isArray(event.data) ? event.data : []
      finish(lines.length > 0 ? lines : [{ level: 'info', text: 'El fragmento no ha escrito nada en la consola.' }])
    }
    worker.onerror = () => {
      finish([{ level: 'error', text: 'No se ha podido ejecutar el fragmento.' }])
    }
    worker.postMessage(trimmed)
  })
}

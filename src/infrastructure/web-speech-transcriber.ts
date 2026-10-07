import type { SpeechHandlers, SpeechTranscriber } from '../application/ports.ts'

interface SpeechAlternative {
  transcript: string
}

interface SpeechResult {
  isFinal: boolean
  0?: SpeechAlternative
}

interface SpeechResultEvent {
  resultIndex: number
  results: ArrayLike<SpeechResult>
}

interface BrowserRecognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

type RecognitionCtor = new () => BrowserRecognition

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const vendor = window as Window & {
    SpeechRecognition?: RecognitionCtor
    webkitSpeechRecognition?: RecognitionCtor
  }
  return vendor.SpeechRecognition ?? vendor.webkitSpeechRecognition ?? null
}

function speechError(code: string): string {
  if (code === 'not-allowed') return 'El navegador ha bloqueado el micrófono.'
  if (code === 'no-speech') return 'No se ha oído nada. Prueba otra vez o escribe la respuesta.'
  return 'No se ha podido transcribir. Puedes escribir la respuesta.'
}

export class WebSpeechTranscriber implements SpeechTranscriber {
  private recognition: BrowserRecognition | null = null

  isSupported(): boolean {
    return recognitionCtor() !== null
  }

  start(handlers: SpeechHandlers): void {
    const Ctor = recognitionCtor()
    if (!Ctor) {
      handlers.onError('Este navegador no transcribe voz. Escribe la respuesta.')
      return
    }

    this.stop()
    const recognition = new Ctor()
    recognition.lang = 'es-ES'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.onresult = (event) => {
      let transcript = ''
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index]
        if (!result) continue
        transcript += result[0]?.transcript ?? ''
      }
      handlers.onTranscript(transcript.trim(), true)
    }
    recognition.onerror = (event) => {
      handlers.onError(speechError(event.error))
    }
    recognition.onend = () => {
      this.recognition = null
      handlers.onEnd()
    }
    this.recognition = recognition
    recognition.start()
  }

  stop(): void {
    this.recognition?.stop()
    this.recognition = null
  }
}

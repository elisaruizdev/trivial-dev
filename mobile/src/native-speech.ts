import type { SpeechHandlers, SpeechTranscriber } from '../../src/application/ports.ts'
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition'

function speechError(code: string): string {
  if (code === 'not-allowed') return 'El teléfono ha bloqueado el micrófono.'
  if (code === 'no-speech' || code === 'speech-timeout') return 'No se ha oído nada. Prueba otra vez o escribe la respuesta.'
  return 'No se ha podido transcribir. Puedes escribir la respuesta.'
}

export class NativeSpeechTranscriber implements SpeechTranscriber {
  private subscriptions: { remove: () => void }[] = []

  isSupported(): boolean {
    try {
      return ExpoSpeechRecognitionModule.isRecognitionAvailable()
    } catch {
      return false
    }
  }

  start(handlers: SpeechHandlers): void {
    this.stop()
    this.subscriptions = [
      ExpoSpeechRecognitionModule.addListener('result', (event) => {
        handlers.onTranscript(event.results[0]?.transcript ?? '', event.isFinal)
      }),
      ExpoSpeechRecognitionModule.addListener('error', (event) => {
        handlers.onError(speechError(event.error))
      }),
      ExpoSpeechRecognitionModule.addListener('end', () => {
        handlers.onEnd()
      }),
    ]

    void ExpoSpeechRecognitionModule.requestPermissionsAsync()
      .then((permission) => {
        if (!permission.granted) {
          handlers.onError('El teléfono ha bloqueado el micrófono.')
          handlers.onEnd()
          return
        }
        ExpoSpeechRecognitionModule.start({ lang: 'es-ES', interimResults: true, continuous: false })
      })
      .catch(() => {
        handlers.onError('Este build no tiene el reconocimiento de voz.')
        handlers.onEnd()
      })
  }

  stop(): void {
    for (const subscription of this.subscriptions) subscription.remove()
    this.subscriptions = []
    try {
      ExpoSpeechRecognitionModule.abort()
    } catch {
      // No había una sesión abierta.
    }
  }
}

import { useEffect, useState } from 'react'
import { useServices } from '../use-services.ts'

interface SpeechFieldProps {
  name: string
  value: string
  disabled: boolean
  placeholder: string
  label: string
  onChange: (value: string) => void
}

export function SpeechField({ name, value, disabled, placeholder, label, onChange }: SpeechFieldProps) {
  const { speech } = useServices()
  const [listening, setListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supported = speech.isSupported()

  useEffect(() => {
    if (disabled) speech.stop()
    return () => {
      speech.stop()
    }
  }, [disabled, speech])

  function toggle() {
    if (listening) {
      speech.stop()
      setListening(false)
      return
    }
    const base = value.trim()
    setError(null)
    setListening(true)
    speech.start({
      onTranscript: (text) => {
        const spoken = text.trim()
        if (!spoken) return
        onChange(base ? `${base} ${spoken}` : spoken)
      },
      onEnd: () => setListening(false),
      onError: (message) => {
        setListening(false)
        setError(message)
      },
    })
  }

  return (
    <div className="voice">
      {supported ? (
        <button
          className={listening ? 'mic is-live' : 'mic'}
          type="button"
          onClick={toggle}
          disabled={disabled}
          aria-pressed={listening}
        >
          {listening ? 'Detener micrófono' : 'Hablar'}
        </button>
      ) : (
        <p className="hint">Este navegador no transcribe voz. Escribe la respuesta.</p>
      )}
      <label className="written">
        <span className="sr-only">{label}</span>
        <textarea
          name={name}
          rows={5}
          value={value}
          disabled={disabled}
          lang="es"
          spellCheck
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  )
}

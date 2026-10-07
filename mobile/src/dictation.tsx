import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useServices } from '../../src/ui/use-services.ts'
import { colors } from './theme.ts'

interface DictationProps {
  value: string
  disabled: boolean
  onChange: (value: string) => void
}

export function Dictation({ value, disabled, onChange }: DictationProps) {
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
    <View style={styles.wrap}>
      {supported ? (
        <Pressable
          style={[styles.mic, listening ? styles.micLive : null]}
          disabled={disabled}
          onPress={toggle}
          accessibilityRole="button"
          accessibilityState={{ selected: listening }}
        >
          <Text style={[styles.micText, listening ? styles.micTextLive : null]}>
            {listening ? 'Detener micrófono' : 'Hablar'}
          </Text>
        </Pressable>
      ) : (
        <Text style={styles.hint}>Este dispositivo no transcribe. Escribe la respuesta.</Text>
      )}
      <TextInput
        style={styles.input}
        value={value}
        editable={!disabled}
        multiline
        onChangeText={onChange}
        placeholder="Escríbela o díctala. El micrófono la pasa a texto."
        placeholderTextColor={colors.muted}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  mic: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.ink,
  },
  micLive: { backgroundColor: colors.pink, borderColor: colors.pink },
  micText: { color: colors.ink, fontWeight: '700' },
  micTextLive: { color: colors.navy },
  input: {
    minHeight: 120,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    backgroundColor: colors.card,
    color: colors.ink,
    textAlignVertical: 'top',
  },
  hint: { color: colors.muted },
  error: { color: colors.bad },
})

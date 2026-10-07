import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { WebView } from 'react-native-webview'
import type { CodeSnippet } from '../../src/domain/question.ts'
import { canRunInConsole } from '../../src/domain/snippet.ts'
import { colors } from './theme.ts'

interface ConsoleLine {
  level: string
  text: string
}

function consolePage(source: string): string {
  return `<!DOCTYPE html><html><body><script>
    const lines = []
    const push = (level, args) => {
      const text = args.map((value) => {
        if (typeof value === 'string') return value
        try { return JSON.stringify(value) } catch (error) { return String(value) }
      }).join(' ')
      lines.push({ level, text })
    }
    console.log = (...args) => push('log', args)
    console.info = (...args) => push('info', args)
    console.warn = (...args) => push('warn', args)
    console.error = (...args) => push('error', args)
    try { new Function(${JSON.stringify(source)})() }
    catch (error) { push('error', [error && error.message ? error.message : String(error)]) }
    setTimeout(() => { window.ReactNativeWebView.postMessage(JSON.stringify(lines)) }, 40)
  </script></body></html>`
}

export function CodeBox({ snippet, locked }: { snippet: CodeSnippet; locked: boolean }) {
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
  const lines = !locked
    ? null
    : runnable
      ? ran
      : [{ level: 'info', text: 'La consola ejecuta JavaScript. Este fragmento se queda para leerlo.' }]

  return (
    <View style={styles.wrap}>
      <Text style={styles.bar}>Fragmento · {snippet.language}</Text>
      <TextInput
        style={styles.editor}
        value={source}
        editable={!locked}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setSource}
      />
      {locked ? (
        <View style={styles.console}>
          <Text style={styles.bar}>Consola</Text>
          {lines === null ? <Text style={styles.line}>Ejecutando…</Text> : null}
          {lines?.map((line, index) => (
            <Text key={`${line.level}-${index}`} style={styles.line}>
              {line.text}
            </Text>
          ))}
          {runnable ? (
            <WebView
              style={styles.runner}
              originWhitelist={['*']}
              source={{ html: consolePage(source) }}
              onMessage={(event) => {
                try {
                  const parsed = JSON.parse(event.nativeEvent.data) as ConsoleLine[]
                  setRan(
                    parsed.length > 0
                      ? parsed
                      : [{ level: 'info', text: 'El fragmento no ha escrito nada en la consola.' }],
                  )
                } catch {
                  setRan([{ level: 'error', text: 'No se ha podido leer la consola.' }])
                }
              }}
            />
          ) : null}
        </View>
      ) : (
        <Text style={styles.hint}>Al responder, este fragmento se ejecuta y verás la consola.</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { gap: 8, marginBottom: 16 },
  bar: { color: colors.muted, fontSize: 12, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  editor: {
    minHeight: 140,
    padding: 14,
    borderRadius: 12,
    backgroundColor: colors.code,
    color: colors.codeText,
    fontFamily: 'monospace',
    textAlignVertical: 'top',
  },
  console: { gap: 4, padding: 12, borderRadius: 12, backgroundColor: colors.code },
  line: { color: colors.codeText, fontFamily: 'monospace' },
  hint: { color: colors.muted },
  runner: { position: 'absolute', width: 1, height: 1, opacity: 0 },
})

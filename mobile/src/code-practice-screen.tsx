import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { applyAutoClose } from '../../src/application/auto-close.ts'
import {
  practiceProgram,
  practiceRunnerHtml,
  type PracticeLine,
} from '../../src/application/practice-program.ts'
import type { CodingExercise } from '../../src/domain/coding-exercise.ts'
import { levelBrief, levels, type Level } from '../../src/domain/level.ts'
import { codingExercises, exercisesForLevel } from '../../src/infrastructure/coding/catalog.ts'
import { Credit } from './credit.tsx'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'

interface RunPayload {
  id: number
  lines: PracticeLine[]
}

export function CodePracticeScreen({ onClose }: { onClose: () => void }) {
  const space = useScreenSpace()
  const inputRef = useRef<TextInput>(null)
  const webRef = useRef<WebView>(null)
  const readyRef = useRef(false)
  const queuedRef = useRef<string | null>(null)
  const runIdRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectionRef = useRef({ start: 0, end: 0 })
  const [runnerKey, setRunnerKey] = useState(0)
  const [level, setLevel] = useState<Level>('junior')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [caret, setCaret] = useState<{ start: number; end: number } | undefined>(undefined)
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

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function openExercise(next: CodingExercise) {
    setSelectedId(next.id)
    setCode(next.starter)
    setLines([])
    setSolved(false)
    setRunning(false)
    const place = Math.max(0, next.starter.indexOf('\n') + 1)
    selectionRef.current = { start: place, end: place }
    setCaret({ start: place, end: place })
  }

  function onChangeText(next: string) {
    const edit = applyAutoClose(code, next, selectionRef.current)
    if (!edit) {
      setCode(next)
      return
    }
    selectionRef.current = { start: edit.caret, end: edit.caret }
    setCaret({ start: edit.caret, end: edit.caret })
    if (edit.text === code) {
      inputRef.current?.setNativeProps({ text: edit.text })
      return
    }
    setCode(edit.text)
  }

  function onRun() {
    if (!exercise || running) return
    const id = Date.now()
    runIdRef.current = id
    setRunning(true)
    setLines([])
    const script = `runPractice(${JSON.stringify(practiceProgram(exercise, code))}, ${id}); true;`
    if (readyRef.current) webRef.current?.injectJavaScript(script)
    else queuedRef.current = script
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (runIdRef.current !== id) return
      runIdRef.current = null
      queuedRef.current = null
      readyRef.current = false
      setRunning(false)
      setLines([{ level: 'error', text: 'La ejecución ha tardado demasiado y se ha cortado.' }])
      setRunnerKey((key) => key + 1)
    }, 1500)
  }

  function onMessage(raw: string) {
    let payload: RunPayload
    try {
      payload = JSON.parse(raw) as RunPayload
    } catch {
      return
    }
    if (!payload || payload.id !== runIdRef.current || !Array.isArray(payload.lines)) return
    if (timerRef.current) clearTimeout(timerRef.current)
    runIdRef.current = null
    setRunning(false)
    setLines(payload.lines)
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, space]} keyboardShouldPersistTaps="handled">
        <Pressable onPress={onClose} accessibilityRole="button">
          <Text style={styles.back}>Volver</Text>
        </Pressable>
        <Text style={styles.title} accessibilityRole="header">
          Escribir código
        </Text>
        <Text style={styles.lead}>
          Elige nivel y enunciado. Si escribes {'{ ( ['} o comillas, se cierra el par y el cursor se queda dentro.
          Resuelve explica el camino en JavaScript y en TypeScript.
        </Text>
        <View style={styles.tabs}>
          {levels.map((item) => {
            const on = item === level
            return (
              <Pressable
                key={item}
                style={[styles.tab, on ? styles.tabOn : null]}
                accessibilityRole="tab"
                accessibilityState={{ selected: on }}
                onPress={() => {
                  setLevel(item)
                  setSelectedId(null)
                  setCode('')
                  setLines([])
                  setSolved(false)
                }}
              >
                <Text style={[styles.tabText, on ? styles.tabTextOn : null]}>{levelBrief[item].label}</Text>
              </Pressable>
            )
          })}
        </View>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Busca por título o nombre"
          placeholderTextColor={colors.muted}
          style={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Buscar enunciado"
        />
        <Text style={styles.meta}>
          {list.length} {list.length === 1 ? 'enunciado' : 'enunciados'}
        </Text>
        {exercise ? (
          <View style={styles.work}>
            <Pressable onPress={() => setSelectedId(null)} accessibilityRole="button">
              <Text style={styles.back}>Volver a la lista</Text>
            </Pressable>
            <Text style={styles.exerciseTitle}>{exercise.title}</Text>
            <Text style={styles.prompt}>{exercise.prompt}</Text>
            <Text style={styles.meta}>Terminal</Text>
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={onChangeText}
              onSelectionChange={(event) => {
                selectionRef.current = event.nativeEvent.selection
                setCaret(undefined)
              }}
              selection={caret}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              style={styles.editor}
              accessibilityLabel="Código"
            />
            <View style={styles.actions}>
              <Pressable style={[styles.primary, running ? styles.off : null]} disabled={running} onPress={onRun}>
                <Text style={styles.primaryText}>{running ? 'Ejecutando…' : 'Ejecutar'}</Text>
              </Pressable>
              <Pressable style={styles.ghost} onPress={() => setSolved((open) => !open)} accessibilityRole="button">
                <Text style={styles.ghostText}>Resuelve</Text>
              </Pressable>
            </View>
            <Text style={styles.meta}>Consola</Text>
            <View style={styles.console}>
              {lines.length === 0 ? (
                <Text style={styles.consoleLine}>Pulsa Ejecutar para comprobar el código.</Text>
              ) : null}
              {lines.map((line, index) => (
                <Text
                  key={`${line.level}-${index}`}
                  style={[styles.consoleLine, line.level === 'error' ? styles.consoleError : null]}
                >
                  {line.text}
                </Text>
              ))}
            </View>
            {solved ? (
              <View style={styles.solution}>
                <Text style={styles.exerciseTitle}>Cómo se resuelve</Text>
                <Text style={styles.prompt}>{exercise.explanation}</Text>
                <Text style={styles.prompt}>
                  <Text style={styles.strong}>Qué se ha usado. </Text>
                  {exercise.used}
                </Text>
                <Text style={styles.lang}>JavaScript</Text>
                <Text style={styles.source}>{exercise.javascript}</Text>
                <Text style={styles.lang}>TypeScript</Text>
                <Text style={styles.source}>{exercise.typescript}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.list}>
            {list.map((item) => (
              <Pressable key={item.id} style={styles.item} onPress={() => openExercise(item)}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemName}>{item.names.length > 0 ? item.names.join(' · ') : 'script'}</Text>
              </Pressable>
            ))}
            {list.length === 0 ? <Text style={styles.lead}>Ningún enunciado coincide.</Text> : null}
          </View>
        )}
        <Credit tone="ink" />
      </ScrollView>
      <WebView
        key={runnerKey}
        ref={webRef}
        source={{ html: practiceRunnerHtml }}
        originWhitelist={['*']}
        onLoadEnd={() => {
          readyRef.current = true
          const queued = queuedRef.current
          queuedRef.current = null
          if (queued) webRef.current?.injectJavaScript(queued)
        }}
        onMessage={(event) => onMessage(event.nativeEvent.data)}
        style={styles.runner}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 20, gap: 10 },
  back: { color: colors.blue, fontWeight: '700' },
  title: { color: colors.ink, fontSize: 32, fontWeight: '700' },
  lead: { color: colors.muted, lineHeight: 22 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  tabOn: { backgroundColor: colors.navy, borderColor: colors.navy },
  tabText: { color: colors.ink, fontWeight: '700' },
  tabTextOn: { color: colors.paper },
  search: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.ink,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
  },
  meta: { color: colors.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  list: { gap: 8 },
  item: { padding: 10, borderRadius: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  itemTitle: { color: colors.ink, fontWeight: '700' },
  itemName: { color: colors.muted, marginTop: 2, fontSize: 12 },
  work: { gap: 10 },
  exerciseTitle: { color: colors.ink, fontSize: 22, fontWeight: '700' },
  prompt: { color: colors.ink, lineHeight: 22 },
  editor: {
    minHeight: 220,
    padding: 12,
    color: colors.codeText,
    backgroundColor: colors.code,
    borderRadius: 12,
    fontFamily: 'monospace',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  primary: { backgroundColor: colors.navy, borderRadius: 999, borderWidth: 2, borderColor: colors.navy, paddingVertical: 12, paddingHorizontal: 18 },
  primaryText: { color: colors.yellow, fontWeight: '700' },
  off: { opacity: 0.45 },
  ghost: { borderRadius: 999, borderWidth: 1, borderColor: colors.ink, paddingVertical: 12, paddingHorizontal: 18 },
  ghostText: { color: colors.ink, fontWeight: '700' },
  console: { gap: 4, padding: 12, backgroundColor: colors.navy, borderRadius: 12 },
  consoleLine: { color: colors.codeText, fontFamily: 'monospace', fontSize: 13 },
  consoleError: { color: colors.pinkOnBg },
  solution: { gap: 8, padding: 12, backgroundColor: colors.card, borderRadius: 14 },
  strong: { fontWeight: '700' },
  lang: { marginTop: 6, color: colors.ink, fontWeight: '700' },
  source: {
    color: colors.paper,
    backgroundColor: colors.navy,
    borderRadius: 12,
    padding: 12,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  runner: { width: 1, height: 1, opacity: 0 },
})

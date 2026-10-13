import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { levelBrief, levels, type Level } from '../../src/domain/level.ts'
import { topics } from '../../src/domain/topic.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { StatsPanel } from './stats-panel.tsx'
import { Credit } from './credit.tsx'
import { useColumnWidth } from './grid-columns.ts'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'

export function SetupScreen({
  onOpenLibrary,
  onOpenCode,
  onOpenAbout,
}: {
  onOpenLibrary: () => void
  onOpenCode: () => void
  onOpenAbout: () => void
}) {
  const { state, start } = useInterview()
  const [topicId, setTopicId] = useState<string | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const ready = topicId !== null && level !== null
  const loading = state.status === 'loading'
  const error = state.status === 'error' ? state.message : null
  const space = useScreenSpace()
  const topicWidth = useColumnWidth(2)
  const levelWidth = useColumnWidth(3)

  async function onStart() {
    const topic = topics.find((item) => item.id === topicId)
    if (!topic || !level) return
    await start(topic, level)
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, space]}>
      <View style={styles.top}>
        <Text style={styles.eyebrow}>Prepara tu entrevista técnica</Text>
        <Pressable
          style={styles.info}
          onPress={onOpenAbout}
          accessibilityRole="button"
          accessibilityLabel="Sobre esta app"
          hitSlop={10}
        >
          <Text style={styles.infoText}>i</Text>
        </Pressable>
      </View>
      <StatsPanel />
      <Text style={styles.legend}>Tema</Text>
      <View style={styles.grid}>
        {topics.map((topic) => {
          const selected = topicId === topic.id
          return (
            <Pressable
              key={topic.id}
              style={[styles.card, { width: topicWidth }, selected ? styles.cardOn : null]}
              onPress={() => setTopicId(topic.id)}
            >
              <Text style={styles.cardTitle}>{topic.label}</Text>
              <Text style={styles.cardBody} numberOfLines={3}>
                {topic.summary}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <Text style={styles.legend}>Nivel</Text>
      <View style={styles.grid}>
        {levels.map((item) => {
          const selected = level === item
          return (
            <Pressable
              key={item}
              style={[styles.card, { width: levelWidth }, selected ? styles.cardOn : null]}
              onPress={() => setLevel(item)}
            >
              <Text style={styles.cardTitle}>{levelBrief[item].label}</Text>
              <Text style={styles.cardBody} numberOfLines={3}>
                {levelBrief[item].summary}
              </Text>
            </Pressable>
          )
        })}
      </View>
      {loading ? <Text style={styles.note}>Son 30 preguntas. Puede tardar un momento.</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable onPress={onOpenLibrary} accessibilityRole="button">
        <Text style={styles.library}>Mis preguntas</Text>
      </Pressable>
      <Pressable onPress={onOpenCode} accessibilityRole="button">
        <Text style={styles.library}>Escribir código</Text>
      </Pressable>
      <Pressable style={[styles.primary, !ready || loading ? styles.primaryOff : null]} disabled={!ready || loading} onPress={() => void onStart()}>
        <Text style={styles.primaryText}>{loading ? 'Preparando preguntas…' : 'Empezar entrevista'}</Text>
      </Pressable>
      <Credit />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: 'transparent' },
  content: { flexGrow: 1, paddingHorizontal: 24, gap: 10 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  info: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: { color: colors.yellow, fontWeight: '700', fontSize: 17, fontStyle: 'italic' },
  eyebrow: { flexShrink: 1, color: colors.yellow, letterSpacing: 2, fontSize: 15, fontWeight: '700', textTransform: 'uppercase' },
  note: { color: colors.textSoft, fontSize: 15, lineHeight: 22 },
  legend: { marginTop: 12, color: colors.paper, letterSpacing: 2, fontSize: 16, fontWeight: '700', textTransform: 'uppercase' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: { padding: 10, borderRadius: 14, backgroundColor: colors.raise, borderWidth: 1, borderColor: 'transparent' },
  cardOn: { borderColor: colors.pink, backgroundColor: colors.selected },
  cardTitle: { color: colors.paper, fontWeight: '600', fontSize: 13 },
  cardBody: { color: colors.textSoft, marginTop: 4, fontSize: 11, lineHeight: 14 },
  error: { color: colors.bad },
  library: { color: colors.yellow, fontWeight: '700', marginTop: 8, fontSize: 16 },
  primary: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: colors.yellow,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  primaryOff: { opacity: 0.45 },
  primaryText: { color: colors.navy, fontWeight: '700' },
})

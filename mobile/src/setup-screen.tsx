import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { levelBrief, levels, type Level } from '../../src/domain/level.ts'
import { topics } from '../../src/domain/topic.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { apiOrigin } from './api-origin.ts'
import { colors } from './theme.ts'

export function SetupScreen() {
  const { state, start } = useInterview()
  const [topicId, setTopicId] = useState<string | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const ready = topicId !== null && level !== null
  const loading = state.status === 'loading'
  const error = state.status === 'error' ? state.message : null
  const origin = apiOrigin()

  async function onStart() {
    const topic = topics.find((item) => item.id === topicId)
    if (!topic || !level) return
    await start(topic, level)
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Prepara tu entrevista técnica</Text>
      <Text style={styles.title} accessibilityRole="header">
        <Text style={styles.wordPink}>Trivial </Text>
        <Text style={styles.wordYellow}>para{'\n'}</Text>
        <Text style={styles.wordMint}>desarrolladores{'\n'}</Text>
        <Text style={styles.wordBlue}>inquietos</Text>
      </Text>
      <Text style={styles.lead}>
        Elige tema y nivel. La ronda son 30 preguntas. Si el ordenador está en la misma Wi-Fi y corre el servidor, las
        genera la IA.
      </Text>
      <Text style={styles.note}>
        {origin
          ? `Servidor de preguntas: ${origin}`
          : 'Sin la IP del ordenador, esta ronda usa el banco de ejemplo.'}
      </Text>
      <Text style={styles.legend}>Tema</Text>
      <View style={styles.grid}>
        {topics.map((topic) => {
          const selected = topicId === topic.id
          return (
            <Pressable
              key={topic.id}
              style={[styles.card, selected ? styles.cardOn : null]}
              onPress={() => setTopicId(topic.id)}
            >
              <Text style={styles.cardTitle}>{topic.label}</Text>
              <Text style={styles.cardBody}>{topic.summary}</Text>
            </Pressable>
          )
        })}
      </View>
      <Text style={styles.legend}>Nivel</Text>
      {levels.map((item) => {
        const selected = level === item
        return (
          <Pressable
            key={item}
            style={[styles.card, selected ? styles.cardOn : null]}
            onPress={() => setLevel(item)}
          >
            <Text style={styles.cardTitle}>{levelBrief[item].label}</Text>
            <Text style={styles.cardBody}>{levelBrief[item].summary}</Text>
          </Pressable>
        )
      })}
      {loading ? <Text style={styles.note}>Son 30 preguntas. Puede tardar un momento.</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.primary, !ready || loading ? styles.primaryOff : null]} disabled={!ready || loading} onPress={() => void onStart()}>
        <Text style={styles.primaryText}>{loading ? 'Preparando preguntas…' : 'Empezar entrevista'}</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 48, gap: 10 },
  eyebrow: { color: colors.yellow, letterSpacing: 2, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', lineHeight: 44 },
  wordPink: { backgroundColor: colors.pink, color: '#fff' },
  wordYellow: { backgroundColor: colors.yellow, color: colors.navy },
  wordMint: { backgroundColor: colors.mint, color: colors.navy },
  wordBlue: { backgroundColor: colors.blue, color: '#fff' },
  lead: { color: colors.paper, fontSize: 16, lineHeight: 22 },
  note: { color: colors.textSoft },
  legend: { marginTop: 12, color: colors.paper, letterSpacing: 2, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  grid: { gap: 8 },
  card: { padding: 14, borderRadius: 14, backgroundColor: colors.raise, borderWidth: 1, borderColor: 'transparent' },
  cardOn: { borderColor: colors.pink, backgroundColor: colors.selected },
  cardTitle: { color: colors.paper, fontWeight: '600' },
  cardBody: { color: colors.textSoft, marginTop: 4 },
  error: { color: colors.pinkOnBg },
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

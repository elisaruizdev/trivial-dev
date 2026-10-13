import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { levelBrief, levels, type Level } from '../../src/domain/level.ts'
import { topics } from '../../src/domain/topic.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { apiOrigin } from './api-origin.ts'
import { Credit } from './credit.tsx'
import { useThreeColumnWidth } from './grid-columns.ts'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'

export function SetupScreen({ onOpenLibrary, onOpenCode }: { onOpenLibrary: () => void; onOpenCode: () => void }) {
  const { state, start } = useInterview()
  const [topicId, setTopicId] = useState<string | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const ready = topicId !== null && level !== null
  const loading = state.status === 'loading'
  const error = state.status === 'error' ? state.message : null
  const origin = apiOrigin()
  const space = useScreenSpace()
  const colWidth = useThreeColumnWidth()

  async function onStart() {
    const topic = topics.find((item) => item.id === topicId)
    if (!topic || !level) return
    await start(topic, level)
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, space]}>
      <Text style={styles.eyebrow}>Prepara tu entrevista técnica</Text>
      <Text style={styles.lead}>
        Elige tema y nivel. La ronda son 30 preguntas. Si el ordenador está en la misma Wi-Fi y corre el servidor, las
        genera la IA. Si guardas preguntas tuyas, entran cuando coinciden el tema y el nivel.
      </Text>
      {!ready ? <Text style={styles.hint}>Elige un tema y un nivel.</Text> : null}
      <Text style={styles.note}>
        {origin
          ? `Servidor de preguntas: ${origin}`
          : 'Sin la IP del ordenador, esta ronda usa el banco de ejemplo.'}
      </Text>
      <Text style={styles.note}>
        Si aceptas los avisos, te recuerdo practicar y las preguntas que falles, aunque cierres la app.
      </Text>
      <Text style={styles.legend}>Tema</Text>
      <View style={styles.grid}>
        {topics.map((topic) => {
          const selected = topicId === topic.id
          return (
            <Pressable
              key={topic.id}
              style={[styles.card, { width: colWidth }, selected ? styles.cardOn : null]}
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
              style={[styles.card, { width: colWidth }, selected ? styles.cardOn : null]}
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
  content: { paddingHorizontal: 24, gap: 10 },
  eyebrow: { color: colors.yellow, letterSpacing: 2, fontSize: 15, fontWeight: '700', textTransform: 'uppercase' },
  lead: { color: colors.paper, fontSize: 20, lineHeight: 29 },
  hint: { color: colors.paper, fontSize: 20, lineHeight: 29 },
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

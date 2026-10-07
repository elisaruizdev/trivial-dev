import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { summarize } from '../../src/application/summarize.ts'
import { levelBrief } from '../../src/domain/level.ts'
import { responseLabel } from '../../src/domain/question.ts'
import { verdictLabel } from '../../src/ui/labels.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { colors } from './theme.ts'

export function ResultScreen() {
  const { state, reset } = useInterview()
  if (state.status !== 'summary') return null
  const { interview } = state
  const summary = summarize(interview.records)

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>
        {interview.topic.label} · {levelBrief[interview.level].label}
      </Text>
      <Text style={styles.score}>
        {summary.correct}
        <Text style={styles.scoreTotal}> / {summary.total}</Text>
      </Text>
      <Text style={styles.detail}>
        {summary.correct} correctas · {summary.partial} parciales · {summary.incorrect} incorrectas
      </Text>
      {interview.records.map((record, index) => (
        <View key={record.question.id} style={styles.item}>
          <Text style={styles.eyebrow}>
            {index + 1}. {verdictLabel[record.grade.verdict]}
          </Text>
          <Text style={styles.prompt}>{record.question.prompt}</Text>
          <Text style={styles.body}>Tu respuesta. {responseLabel(record.question, record.response)}</Text>
          <Text style={styles.body}>{record.grade.comment}</Text>
          <Text style={styles.body}>{record.question.explanation}</Text>
        </View>
      ))}
      <Pressable style={styles.primary} onPress={reset}>
        <Text style={styles.primaryText}>Otra entrevista</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { padding: 20, paddingBottom: 48, gap: 12 },
  eyebrow: { color: colors.navy, letterSpacing: 1, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  score: { color: colors.ink, fontSize: 64, fontWeight: '600' },
  scoreTotal: { color: colors.muted, fontSize: 28 },
  detail: { color: colors.muted },
  item: { gap: 6, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.line },
  prompt: { color: colors.ink, fontSize: 20, fontWeight: '600' },
  body: { color: colors.ink, lineHeight: 22 },
  primary: {
    alignSelf: 'flex-start',
    backgroundColor: colors.yellow,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  primaryText: { color: colors.navy, fontWeight: '700' },
})

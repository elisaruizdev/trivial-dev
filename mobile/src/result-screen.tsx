import { useEffect, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  addInterviewResult,
  compareInterview,
  type InterviewComparison,
  type InterviewResult,
} from '../../src/application/interview-history.ts'
import type { RunningInterview } from '../../src/application/interview-state.ts'
import { summarize } from '../../src/application/summarize.ts'
import { levelBrief } from '../../src/domain/level.ts'
import { responseLabel } from '../../src/domain/question.ts'
import { verdictLabel } from '../../src/ui/labels.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { Credit } from './credit.tsx'
import { historyFile } from './history-file.ts'
import { useScreenSpace } from './screen-space.ts'
import { SourceLink } from './source-link.tsx'
import { colors } from './theme.ts'


const trendCopy = {
  first: 'Primera entrevista de este tema y nivel. La próxima se comparará con esta.',
  better: 'Has mejorado respecto a la anterior.',
  worse: 'Has bajado respecto a la anterior. Repasa las que has fallado.',
  same: 'Igual que la anterior.',
} as const

/** Guarda la entrevista en el historial una sola vez y la compara con las anteriores. */
function useComparison(interview: RunningInterview): InterviewComparison | null {
  const [comparison, setComparison] = useState<InterviewComparison | null>(null)
  const saved = useRef<RunningInterview | null>(null)
  useEffect(() => {
    if (saved.current === interview) return
    saved.current = interview
    const current: InterviewResult = {
      ...summarize(interview.records),
      topicId: interview.topic.id,
      topicLabel: interview.topic.label,
      level: interview.level,
      at: Date.now(),
    }
    void (async () => {
      const history = await historyFile.load()
      setComparison(compareInterview(history, current))
      if (current.total > 0) await historyFile.save(addInterviewResult(history, current))
    })()
  }, [interview])
  return comparison
}

const badgeColor = {
  correct: { backgroundColor: colors.right },
  partial: { backgroundColor: colors.mint },
  incorrect: { backgroundColor: colors.bad },
} as const

function dateLabel(at: number): string {
  return new Date(at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export function ResultScreen() {
  const { state, reset } = useInterview()
  if (state.status !== 'summary') return null
  return <Result interview={state.interview} reset={reset} />
}

function Result({ interview, reset }: { interview: RunningInterview; reset: () => void }) {
  const space = useScreenSpace()
  const summary = summarize(interview.records)
  const comparison = useComparison(interview)

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, space]}>
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
      {comparison ? (
        <View style={[styles.trend, styles[comparison.trend]]}>
          <Text style={styles.trendText}>{trendCopy[comparison.trend]}</Text>
          {comparison.recent.length > 0 ? (
            <View style={styles.history}>
              <Text style={styles.eyebrow}>Anteriores</Text>
              {comparison.recent.map((item) => (
                <Text key={item.at} style={styles.body}>
                  {dateLabel(item.at)}: {item.correct} bien · {item.partial} parciales · {item.incorrect} mal, de{' '}
                  {item.total}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
      {interview.records.map((record, index) => (
        <View key={record.question.id} style={styles.item}>
          <View style={styles.verdictRow}>
            <Text style={styles.eyebrow}>{index + 1}.</Text>
            <View style={[styles.badge, badgeColor[record.grade.verdict]]}>
              <Text style={styles.badgeText}>{verdictLabel[record.grade.verdict]}</Text>
            </View>
          </View>
          <Text style={styles.prompt}>{record.question.prompt}</Text>
          <Text style={styles.body}>Tu respuesta. {responseLabel(record.question, record.response)}</Text>
          <Text style={styles.body}>{record.grade.comment}</Text>
          <Text style={styles.body}>{record.question.explanation}</Text>
          <SourceLink url={record.question.sourceUrl} />
        </View>
      ))}
      <Pressable style={styles.primary} onPress={reset}>
        <Text style={styles.primaryText}>Otra entrevista</Text>
      </Pressable>
      <Credit tone="ink" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { flexGrow: 1, paddingHorizontal: 20, gap: 12 },
  eyebrow: { color: colors.navy, letterSpacing: 1, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  score: { color: colors.ink, fontSize: 64, fontWeight: '600' },
  scoreTotal: { color: colors.muted, fontSize: 28 },
  detail: { color: colors.muted },
  trend: { gap: 8, padding: 12, borderRadius: 14, borderLeftWidth: 4 },
  first: { backgroundColor: colors.partialBg, borderLeftColor: colors.line },
  better: { backgroundColor: colors.goodBg, borderLeftColor: colors.good },
  worse: { backgroundColor: colors.badBg, borderLeftColor: colors.bad },
  same: { backgroundColor: colors.partialBg, borderLeftColor: colors.navy },
  trendText: { color: colors.ink, fontWeight: '700', lineHeight: 22 },
  history: { gap: 2 },
  verdictRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { borderRadius: 6, paddingVertical: 2, paddingHorizontal: 10 },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  item: { gap: 6, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.line },
  prompt: { color: colors.ink, fontSize: 20, fontWeight: '600' },
  body: { color: colors.ink, lineHeight: 22 },
  primary: {
    alignSelf: 'flex-start',
    backgroundColor: colors.navy,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  primaryText: { color: colors.yellow, fontWeight: '700' },
})

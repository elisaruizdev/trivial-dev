import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { levelBrief } from '../../src/domain/level.ts'
import type { Question } from '../../src/domain/question.ts'
import { verdictLabel } from '../../src/ui/labels.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { CodeBox } from './code-box.tsx'
import { Credit } from './credit.tsx'
import { Dictation } from './dictation.tsx'
import { useScreenSpace } from './screen-space.ts'
import { SourceLink } from './source-link.tsx'
import { colors } from './theme.ts'

export function InterviewScreen() {
  const { state, submit, next, reset } = useInterview()
  const space = useScreenSpace()
  if (state.status !== 'question' && state.status !== 'feedback') return null

  const { interview } = state
  const question = interview.questions[interview.index]
  if (!question) return null
  const feedback = state.status === 'feedback' ? state : null
  const total = interview.questions.length
  const position = interview.index + 1

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, space]}>
      <View style={styles.bar}>
        <View>
          <Text style={styles.eyebrow}>
            {interview.topic.label} · {levelBrief[interview.level].label}
          </Text>
          <Text style={styles.progress}>
            Pregunta {position} de {total}
          </Text>
        </View>
        <Pressable onPress={reset}>
          <Text style={styles.link}>Abandonar</Text>
        </Pressable>
      </View>
      {interview.notice ? <Text style={styles.notice}>{interview.notice}</Text> : null}
      <Text style={styles.prompt}>{question.prompt}</Text>
      <QuestionBody
        key={interview.index}
        question={question}
        locked={feedback !== null}
        onSubmit={submit}
      />
      {feedback ? (
        <View style={styles.feedback}>
          <Text style={styles.eyebrow}>{verdictLabel[feedback.grade.verdict]}</Text>
          <Text style={styles.body}>{feedback.grade.comment}</Text>
          <Text style={styles.body}>{question.explanation}</Text>
          <SourceLink url={question.sourceUrl} />
          <Pressable style={styles.primary} onPress={next}>
            <Text style={styles.primaryText}>{position === total ? 'Ver resultado' : 'Siguiente pregunta'}</Text>
          </Pressable>
        </View>
      ) : null}
      <Credit tone="ink" />
    </ScrollView>
  )
}

function QuestionBody({
  question,
  locked,
  onSubmit,
}: {
  question: Question
  locked: boolean
  onSubmit: (response: string) => Promise<void>
}) {
  const [draft, setDraft] = useState('')
  const [pending, setPending] = useState(false)

  async function send() {
    const response = draft.trim()
    if (locked || pending || !response) return
    setPending(true)
    try {
      await onSubmit(response)
    } finally {
      setPending(false)
    }
  }

  return (
    <View style={styles.block}>
      {question.snippet ? <CodeBox snippet={question.snippet} locked={locked} /> : null}
      {question.kind === 'choice' ? (
        <View style={styles.options}>
          {question.options.map((option) => {
            const selected = draft === option.id
            const correct = locked && option.id === question.answerId
            const wrong = locked && selected && option.id !== question.answerId
            return (
              <Pressable
                key={option.id}
                disabled={locked || pending}
                style={[styles.option, selected ? styles.optionOn : null, correct ? styles.optionGood : null, wrong ? styles.optionBad : null]}
                onPress={() => setDraft(option.id)}
              >
                <Text style={styles.body}>{option.text}</Text>
              </Pressable>
            )
          })}
        </View>
      ) : (
        <Dictation value={draft} disabled={locked || pending} onChange={setDraft} />
      )}
      {locked ? null : (
        <Pressable style={[styles.primary, !draft.trim() || pending ? styles.primaryOff : null]} disabled={!draft.trim() || pending} onPress={() => void send()}>
          <Text style={styles.primaryText}>{pending ? 'Valorando…' : 'Responder'}</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: 20, gap: 12 },
  bar: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  eyebrow: { color: colors.navy, letterSpacing: 1, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  progress: { color: colors.muted, marginTop: 4 },
  link: { color: colors.muted, textDecorationLine: 'underline' },
  notice: { backgroundColor: colors.partialBg, padding: 10, borderRadius: 10, color: colors.ink },
  prompt: { color: colors.ink, fontSize: 26, fontWeight: '600', lineHeight: 32 },
  block: { gap: 12 },
  options: { gap: 8 },
  option: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  optionOn: { borderColor: colors.ink },
  optionGood: { backgroundColor: colors.goodBg, borderColor: colors.good },
  optionBad: { backgroundColor: colors.badBg, borderColor: colors.bad },
  body: { color: colors.ink, lineHeight: 22 },
  feedback: { gap: 8, padding: 16, borderRadius: 14, backgroundColor: colors.card },
  primary: {
    alignSelf: 'flex-start',
    backgroundColor: colors.navy,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  primaryOff: { opacity: 0.45 },
  primaryText: { color: colors.yellow, fontWeight: '700' },
})

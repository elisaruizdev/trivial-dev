import { useEffect, useState } from 'react'
import { File } from 'expo-file-system'
import { Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native'
import { InterviewError } from '../../src/domain/errors.ts'
import { levelBrief, levels } from '../../src/domain/level.ts'
import { questionKinds, type Question } from '../../src/domain/question.ts'
import { findTopic, topics } from '../../src/domain/topic.ts'
import {
  addOwnQuestion,
  describeOwnImport,
  exportOwnQuestions,
  importOwnQuestions,
  ownQuestionExample,
  removeOwnQuestion,
} from '../../src/application/own-questions.ts'
import { kindLabel } from '../../src/ui/labels.ts'
import { ownOptionSlots, useOwnQuestionDraft } from '../../src/ui/use-own-question-draft.ts'
import { useServices } from '../../src/ui/use-services.ts'
import { Credit } from './credit.tsx'
import { useScreenSpace } from './screen-space.ts'
import { colors } from './theme.ts'

function failure(error: unknown, fallback: string): string {
  if (error instanceof InterviewError) return error.message
  return fallback
}

function cancelled(error: unknown): boolean {
  return error instanceof Error && /cancel/i.test(error.message)
}

export function OwnQuestionsScreen({ onClose }: { onClose: () => void }) {
  const services = useServices()
  const draft = useOwnQuestionDraft()
  const space = useScreenSpace()
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [topicsOpen, setTopicsOpen] = useState(false)
  const [formatOpen, setFormatOpen] = useState(false)
  const topic = findTopic(draft.topicId)

  useEffect(() => {
    let alive = true
    void services.ownQuestions.load().then((loaded) => {
      if (alive) setQuestions(loaded)
    })
    return () => {
      alive = false
    }
  }, [services.ownQuestions])

  async function onSave() {
    setError(null)
    setNotice(null)
    setSaving(true)
    try {
      const next = await addOwnQuestion(services.ownQuestions, draft.toDraft())
      setQuestions(next)
      draft.clearText()
      setNotice('Guardada. Entrará en las rondas de ese tema y nivel.')
    } catch (caught) {
      setError(failure(caught, 'No se ha podido guardar.'))
    } finally {
      setSaving(false)
    }
  }

  async function onUpload() {
    setError(null)
    setNotice(null)
    try {
      const picked = await File.pickFileAsync({ mimeTypes: ['application/json', 'text/plain'] })
      if (picked.canceled || !picked.result) return
      const text = await picked.result.text()
      if (text.length > 500_000) {
        setError('El archivo es demasiado grande.')
        return
      }
      let payload: unknown
      try {
        payload = JSON.parse(text) as unknown
      } catch {
        setError('Ese archivo no es JSON válido.')
        return
      }
      const report = await importOwnQuestions(services.ownQuestions, payload)
      setQuestions(report.questions)
      setNotice(describeOwnImport(report))
    } catch (caught) {
      if (cancelled(caught)) return
      setError(failure(caught, 'No se ha podido leer el archivo.'))
    }
  }

  async function onExport() {
    try {
      await Share.share({ message: exportOwnQuestions(questions) })
    } catch (caught) {
      if (cancelled(caught)) return
      setError('No se ha podido compartir el archivo.')
    }
  }

  async function onRemove(id: string) {
    setError(null)
    setQuestions(await removeOwnQuestion(services.ownQuestions, id))
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, space]} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onClose} accessibilityRole="button">
        <Text style={styles.link}>Volver</Text>
      </Pressable>
      <Text style={styles.title} accessibilityRole="header">
        Mis preguntas
      </Text>
      <Text style={styles.lead}>
        Escribe una o sube un JSON. Se quedan en este teléfono. Si el tema y el nivel coinciden, entra en la ronda
        mezclada con las demás. La respuesta que marques es la que puntúa. La fuente, si la escribes, se consulta al
        responder.
      </Text>
      <View style={styles.actions}>
        <Pressable style={styles.ghost} onPress={() => void onUpload()} accessibilityRole="button">
          <Text style={styles.ghostText}>Subir un archivo JSON</Text>
        </Pressable>
        <Pressable
          style={[styles.ghost, questions.length === 0 ? styles.off : null]}
          disabled={questions.length === 0}
          onPress={() => void onExport()}
          accessibilityRole="button"
        >
          <Text style={styles.ghostText}>Compartir las mías</Text>
        </Pressable>
      </View>
      <Pressable onPress={() => setFormatOpen((open) => !open)} accessibilityRole="button">
        <Text style={styles.link}>{formatOpen ? 'Ocultar formato' : 'Ver formato del archivo'}</Text>
      </Pressable>
      {formatOpen ? <Text style={styles.example}>{ownQuestionExample}</Text> : null}
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.heading}>Añadir una</Text>
      <Text style={styles.label}>Tema</Text>
      <Pressable style={styles.card} onPress={() => setTopicsOpen((open) => !open)} accessibilityRole="button">
        <Text style={styles.cardTitle}>{topic?.label ?? 'Elige un tema'}</Text>
      </Pressable>
      {topicsOpen
        ? topics.map((item) => (
            <Pressable
              key={item.id}
              style={[styles.card, draft.topicId === item.id ? styles.cardOn : null]}
              onPress={() => {
                draft.setTopicId(item.id)
                setTopicsOpen(false)
              }}
              accessibilityRole="button"
            >
              <Text style={styles.cardTitle}>{item.label}</Text>
            </Pressable>
          ))
        : null}

      <Text style={styles.label}>Nivel</Text>
      <View style={styles.row}>
        {levels.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, draft.level === item ? styles.cardOn : null]}
            onPress={() => draft.setLevel(item)}
            accessibilityRole="button"
          >
            <Text style={styles.cardTitle}>{levelBrief[item].label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.row}>
        {questionKinds.map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, draft.kind === item ? styles.cardOn : null]}
            onPress={() => draft.setKind(item)}
            accessibilityRole="button"
          >
            <Text style={styles.cardTitle}>{kindLabel[item]}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Enunciado</Text>
      <TextInput
        style={styles.input}
        value={draft.prompt}
        multiline
        onChangeText={draft.setPrompt}
        placeholder="La pregunta"
        placeholderTextColor={colors.muted}
      />

      {draft.kind === 'choice' ? (
        <View style={styles.block}>
          <Text style={styles.label}>Respuestas</Text>
          <Text style={styles.note}>Deja vacías las que no uses. Marca la correcta.</Text>
          {ownOptionSlots.map((id, index) => (
            <View key={id} style={styles.optionRow}>
              <Pressable
                style={[styles.mark, draft.answerId === id ? styles.markOn : null]}
                onPress={() => draft.setAnswerId(id)}
                accessibilityRole="radio"
                accessibilityState={{ selected: draft.answerId === id }}
                accessibilityLabel={`La respuesta ${id} es la correcta`}
              >
                <Text style={[styles.markText, draft.answerId === id ? styles.markTextOn : null]}>{id}</Text>
              </Pressable>
              <TextInput
                style={[styles.input, styles.optionInput]}
                value={draft.options[index] ?? ''}
                onChangeText={(text) => draft.setOption(index, text)}
                placeholder={`Respuesta ${id}`}
                placeholderTextColor={colors.muted}
              />
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.block}>
          <Text style={styles.label}>Respuesta que das por buena</Text>
          <TextInput
            style={styles.input}
            value={draft.modelAnswer}
            multiline
            onChangeText={draft.setModelAnswer}
            placeholder="Lo que debería responder"
            placeholderTextColor={colors.muted}
          />
        </View>
      )}

      <Text style={styles.label}>Fuente</Text>
      <TextInput
        style={styles.input}
        value={draft.sourceUrl}
        onChangeText={draft.setSourceUrl}
        placeholder="https://… (opcional)"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />
      <Text style={styles.label}>Por qué es esa la respuesta</Text>
      <TextInput
        style={styles.input}
        value={draft.explanation}
        multiline
        onChangeText={draft.setExplanation}
        placeholder="La explicación que se enseña después"
        placeholderTextColor={colors.muted}
      />
      <Text style={styles.label}>Lenguaje del fragmento, si hace falta</Text>
      <TextInput
        style={styles.input}
        value={draft.language}
        onChangeText={draft.setLanguage}
        placeholder="javascript"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Código</Text>
      <TextInput
        style={styles.input}
        value={draft.source}
        multiline
        onChangeText={draft.setSource}
        placeholder="Opcional"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
      />

      <Pressable
        style={[styles.primary, saving ? styles.off : null]}
        disabled={saving}
        onPress={() => void onSave()}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>{saving ? 'Guardando…' : 'Guardar pregunta'}</Text>
      </Pressable>

      <Text style={styles.heading}>Guardadas ({questions.length})</Text>
      {questions.length === 0 ? (
        <Text style={styles.note}>Todavía no hay ninguna. Cuando elijas su tema y su nivel, entrarán en la ronda.</Text>
      ) : (
        questions.map((question) => {
          const savedTopic = findTopic(question.topicId)
          return (
            <View key={question.id} style={styles.saved}>
              <Text style={styles.note}>
                {savedTopic?.label ?? question.topicId} · {levelBrief[question.level].label} · {kindLabel[question.kind]}
              </Text>
              <Text style={styles.cardTitle}>{question.prompt}</Text>
              <Text style={styles.note}>
                {question.kind === 'choice'
                  ? question.options.find((option) => option.id === question.answerId)?.text
                  : question.modelAnswer}
              </Text>
              {question.sourceUrl ? <Text style={styles.note}>{question.sourceUrl}</Text> : null}
              <Pressable onPress={() => void onRemove(question.id)} accessibilityRole="button">
                <Text style={styles.link}>Quitar</Text>
              </Pressable>
            </View>
          )
        })
      )}
      <Credit />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 24, gap: 10 },
  title: { color: '#fff', fontSize: 32, fontWeight: '800' },
  lead: { color: colors.paper, fontSize: 16, lineHeight: 22 },
  link: { color: colors.yellow, fontWeight: '700' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ghost: { borderWidth: 1, borderColor: colors.paper, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 },
  ghostText: { color: colors.paper, fontWeight: '700' },
  off: { opacity: 0.45 },
  example: { color: colors.paper, backgroundColor: colors.raise, padding: 12, borderRadius: 12, fontSize: 12 },
  notice: { backgroundColor: colors.partialBg, color: colors.ink, padding: 10, borderRadius: 10 },
  error: { color: colors.pinkOnBg },
  heading: { marginTop: 12, color: colors.paper, fontSize: 20, fontWeight: '800' },
  label: { marginTop: 8, color: colors.paper, fontWeight: '700' },
  note: { color: colors.textSoft },
  card: { padding: 14, borderRadius: 14, backgroundColor: colors.raise, borderWidth: 1, borderColor: 'transparent' },
  cardOn: { borderColor: colors.pink, backgroundColor: colors.selected },
  cardTitle: { color: colors.paper, fontWeight: '600' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, backgroundColor: colors.raise, borderWidth: 1, borderColor: 'transparent' },
  block: { gap: 8 },
  input: {
    minHeight: 48,
    padding: 12,
    color: colors.ink,
    backgroundColor: colors.paper,
    borderRadius: 12,
    textAlignVertical: 'top',
  },
  optionRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  optionInput: { flex: 1 },
  mark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.raise,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  markOn: { backgroundColor: colors.yellow, borderColor: colors.yellow },
  markText: { color: colors.paper, fontWeight: '800' },
  markTextOn: { color: colors.navy },
  primary: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.yellow,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.navy,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  primaryText: { color: colors.navy, fontWeight: '700' },
  saved: { gap: 6, padding: 14, borderRadius: 14, backgroundColor: colors.raise },
})

import { useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import type { AnswerRecord, InterviewState } from '../../src/application/interview-state.ts'
import { noteAnswer, planReminders, type QuestionCount } from '../../src/application/question-counts.ts'
import { useInterview } from '../../src/ui/use-interview.ts'
import { FileQuestionCountStore } from './file-question-counts.ts'

const CHANNEL = 'practice'
const store = new FileQuestionCountStore()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

let queue: Promise<void> = Promise.resolve()
let askedThisSession = false

function enqueue(task: () => Promise<void>): Promise<void> {
  queue = queue.then(task, task)
  return queue
}

async function ensurePermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: 'Práctica',
      importance: Notifications.AndroidImportance.HIGH,
      description: 'Recordatorios para hacer unos tests y repasar preguntas falladas.',
    })
  }
  const current = await Notifications.getPermissionsAsync()
  if (current.status === 'granted') return true
  if (!current.canAskAgain || askedThisSession) return false
  askedThisSession = true
  const next = await Notifications.requestPermissionsAsync()
  return next.status === 'granted'
}

async function schedule(counts: QuestionCount[]): Promise<void> {
  const allowed = await ensurePermission()
  if (!allowed) return
  await Notifications.cancelAllScheduledNotificationsAsync()
  const plan = planReminders(counts, new Date())
  await Promise.all(
    plan.map((item) =>
      Notifications.scheduleNotificationAsync({
        content: {
          title: item.title,
          body: item.body,
          sound: true,
          data: { kind: item.kind },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: item.at,
          channelId: CHANNEL,
        },
      }),
    ),
  )
}

export function refreshPracticeReminders(): Promise<void> {
  return enqueue(async () => {
    const counts = await store.load()
    await schedule(counts)
  })
}

export function rememberAnswers(records: readonly AnswerRecord[], topicLabel: string): Promise<void> {
  return enqueue(async () => {
    let counts = await store.load()
    const now = Date.now()
    records.forEach((record, index) => {
      counts = noteAnswer(
        counts,
        {
          id: record.question.id,
          prompt: record.question.prompt,
          topicLabel,
          level: record.question.level,
          verdict: record.grade.verdict,
        },
        now + index,
      )
    })
    await store.save(counts)
    await schedule(counts)
  })
}

function interviewOf(state: InterviewState) {
  if (state.status === 'question' || state.status === 'feedback' || state.status === 'summary') {
    return state.interview
  }
  return null
}

export function PracticeReminders() {
  const { state } = useInterview()
  const seen = useRef(0)
  const primed = useRef(false)

  useEffect(() => {
    void refreshPracticeReminders()
  }, [])

  useEffect(() => {
    const interview = interviewOf(state)
    const length = interview?.records.length ?? 0
    if (!primed.current) {
      primed.current = true
      seen.current = length
      return
    }
    if (length < seen.current) seen.current = 0
    if (!interview || length <= seen.current) return
    const fresh = interview.records.slice(seen.current)
    seen.current = length
    void rememberAnswers(fresh, interview.topic.label)
  }, [state])

  return null
}

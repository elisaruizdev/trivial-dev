import { useState } from 'react'
import type { OwnQuestionDraft } from '../application/own-questions.ts'
import type { Level } from '../domain/level.ts'
import type { QuestionKind } from '../domain/question.ts'
import { topics } from '../domain/topic.ts'

export const ownOptionSlots = ['a', 'b', 'c', 'd'] as const

export function useOwnQuestionDraft() {
  const first = topics[0]
  const [topicId, setTopicId] = useState(first?.id ?? 'html')
  const [level, setLevel] = useState<Level>('junior')
  const [kind, setKind] = useState<QuestionKind>('choice')
  const [prompt, setPrompt] = useState('')
  const [options, setOptions] = useState<string[]>(['', '', '', ''])
  const [answerId, setAnswerId] = useState('a')
  const [modelAnswer, setModelAnswer] = useState('')
  const [explanation, setExplanation] = useState('')
  const [language, setLanguage] = useState('')
  const [source, setSource] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')

  function setOption(index: number, text: string) {
    setOptions((current) => current.map((item, itemIndex) => (itemIndex === index ? text : item)))
  }

  function toDraft(): OwnQuestionDraft {
    return {
      topicId,
      level,
      kind,
      prompt,
      options: ownOptionSlots.map((id, index) => ({ id, text: options[index] ?? '' })),
      answerId,
      modelAnswer,
      explanation,
      snippet: language.trim() || source.trim() ? { language, source } : null,
      sourceUrl,
    }
  }

  function clearText() {
    setPrompt('')
    setOptions(['', '', '', ''])
    setAnswerId('a')
    setModelAnswer('')
    setExplanation('')
    setLanguage('')
    setSource('')
    setSourceUrl('')
  }

  return {
    topicId,
    setTopicId,
    level,
    setLevel,
    kind,
    setKind,
    prompt,
    setPrompt,
    options,
    setOption,
    answerId,
    setAnswerId,
    modelAnswer,
    setModelAnswer,
    explanation,
    setExplanation,
    language,
    setLanguage,
    source,
    setSource,
    sourceUrl,
    setSourceUrl,
    toDraft,
    clearText,
  }
}

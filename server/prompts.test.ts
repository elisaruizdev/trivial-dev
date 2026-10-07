import { describe, expect, it } from 'vitest'
import { buildQuestionMessages } from './prompts.ts'

describe('buildQuestionMessages', () => {
  it('lleva el tema, la guía y el nivel hasta el modelo', () => {
    const messages = buildQuestionMessages({
      topicLabel: 'Bootstrap',
      guidance: 'Rejilla de doce columnas y utilidades.',
      level: 'mid',
      calibration: 'Pregunta decisiones de implementación.',
      count: 6,
    })
    const user = messages.find((message) => message.role === 'user')?.content ?? ''
    expect(user).toContain('Bootstrap')
    expect(user).toContain('Rejilla de doce columnas')
    expect(user).toContain('mid')
    expect(user).toContain('6')
  })
})

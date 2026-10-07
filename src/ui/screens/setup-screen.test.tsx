import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { QuestionBatch, QuestionSource, Services } from '../../application/ports.ts'
import { topics } from '../../domain/topic.ts'
import { InterviewProvider } from '../interview-context.tsx'
import { ServicesProvider } from '../services-context.tsx'
import { InterviewScreen } from './interview-screen.tsx'
import { ResultScreen } from './result-screen.tsx'
import { SetupScreen } from './setup-screen.tsx'

const question = {
  id: 'html-test',
  topicId: 'html',
  level: 'junior' as const,
  kind: 'choice' as const,
  prompt: '¿Qué elemento marca el contenido principal?',
  options: [
    { id: 'a', text: 'main' },
    { id: 'b', text: 'div' },
  ],
  answerId: 'a',
  modelAnswer: 'main',
  explanation: 'main es el contenido principal.',
  snippet: null,
  sourceUrl: 'https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/main',
}

function renderApp(source: QuestionSource) {
  const services: Services = {
    questions: source,
    evaluator: {
      async evaluate() {
        return { verdict: 'correct', comment: 'Has elegido «main».', source: 'exact' }
      },
    },
    speech: {
      isSupported: () => false,
      start: () => undefined,
      stop: () => undefined,
    },
  }

  return render(
    <ServicesProvider services={services}>
      <InterviewProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<SetupScreen />} />
            <Route path="/entrevista" element={<InterviewScreen />} />
            <Route path="/resultado" element={<ResultScreen />} />
          </Routes>
        </MemoryRouter>
      </InterviewProvider>
    </ServicesProvider>,
  )
}

describe('SetupScreen', () => {
  it('pinta un tema por cada entrada del registro', () => {
    renderApp({
      async load(): Promise<QuestionBatch> {
        return { origin: 'bank', questions: [question] }
      },
    })
    const names = screen.getAllByRole('button').map((button) => button.getAttribute('aria-label') ?? '')
    for (const topic of topics) {
      expect(names.some((name) => name.startsWith(`${topic.label}.`))).toBe(true)
    }
  })

  it('arranca la entrevista del tema y el nivel elegidos', async () => {
    const user = userEvent.setup()
    let seen = ''
    renderApp({
      async load(request): Promise<QuestionBatch> {
        seen = `${request.topic.id}:${request.level}`
        return { origin: 'ai', questions: [question] }
      },
    })

    expect(screen.getByRole('button', { name: 'Empezar entrevista' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: /^HTML\b/ }))
    await user.click(screen.getByRole('radio', { name: /Junior/ }))
    await user.click(screen.getByRole('button', { name: 'Empezar entrevista' }))

    expect(seen).toBe('html:junior')
    expect(await screen.findByRole('heading', { name: question.prompt })).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'main' }))
    await user.click(screen.getByRole('button', { name: 'Responder' }))
    expect(await screen.findByText(question.explanation)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Consultar en developer.mozilla.org' })).toHaveAttribute(
      'href',
      question.sourceUrl,
    )
    await user.click(screen.getByRole('button', { name: 'Ver resultado' }))
    expect(await screen.findByRole('button', { name: 'Otra entrevista' })).toBeInTheDocument()
  })
})

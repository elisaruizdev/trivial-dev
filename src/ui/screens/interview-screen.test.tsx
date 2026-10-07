import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { QuestionBatch, QuestionSource, Services } from '../../application/ports.ts'
import type { Question } from '../../domain/question.ts'
import { InterviewProvider } from '../interview-context.tsx'
import { ServicesProvider } from '../services-context.tsx'
import { InterviewScreen } from './interview-screen.tsx'
import { SetupScreen } from './setup-screen.tsx'

const first: Question = {
  id: 'js-1',
  topicId: 'javascript',
  level: 'junior',
  kind: 'choice',
  prompt: '¿Qué comparación evita convertir los tipos?',
  options: [
    { id: 'a', text: '===' },
    { id: 'b', text: '==' },
  ],
  answerId: 'a',
  modelAnswer: '===',
  explanation: '=== no convierte los tipos.',
  sourceUrl: null,
  snippet: {
    language: 'javascript',
    source: "console.log('primera')",
  },
}

function followup(snippet: Question['snippet'], id = 'js-2'): Question {
  return {
    id,
    topicId: 'javascript',
    level: 'junior',
    kind: 'choice',
    prompt: '¿Qué fija const?',
    options: [
      { id: 'a', text: 'el binding' },
      { id: 'b', text: 'el objeto' },
    ],
    answerId: 'a',
    modelAnswer: 'el binding',
    explanation: 'const fija el binding.',
    sourceUrl: null,
    snippet,
  }
}

function renderInterview(questions: Question[]) {
  const source: QuestionSource = {
    async load(): Promise<QuestionBatch> {
      return { origin: 'bank', questions }
    },
  }
  const services: Services = {
    questions: source,
    evaluator: {
      async evaluate() {
        return { verdict: 'correct', comment: 'Correcto.', source: 'exact' }
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
          </Routes>
        </MemoryRouter>
      </InterviewProvider>
    </ServicesProvider>,
  )
}

async function answerFirst(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /^JavaScript\b/ }))
  await user.click(screen.getByRole('radio', { name: /Junior/ }))
  await user.click(screen.getByRole('button', { name: 'Empezar entrevista' }))
  expect(await screen.findByRole('heading', { name: first.prompt })).toBeInTheDocument()
  await user.click(screen.getByRole('radio', { name: '===' }))
  await user.click(screen.getByRole('button', { name: 'Responder' }))
  expect(await screen.findByText(first.explanation)).toBeInTheDocument()
}

describe('consola entre preguntas', () => {
  it('oculta la consola si la siguiente pregunta no tiene fragmento', async () => {
    const user = userEvent.setup()
    renderInterview([first, followup(null)])
    await answerFirst(user)
    expect(screen.getByText('Consola')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Siguiente pregunta' }))

    expect(await screen.findByRole('heading', { name: '¿Qué fija const?' })).toBeInTheDocument()
    expect(screen.queryByText('Consola')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Fragmento de código')).not.toBeInTheDocument()
  })

  it('cambia el fragmento y no conserva la consola anterior', async () => {
    const user = userEvent.setup()
    renderInterview([first, followup({ language: 'javascript', source: "console.log('segunda')" }, first.id)])
    await answerFirst(user)
    expect(screen.getByText('Consola')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Siguiente pregunta' }))

    expect(await screen.findByRole('heading', { name: '¿Qué fija const?' })).toBeInTheDocument()
    expect(screen.getAllByLabelText('Fragmento de código')).toHaveLength(1)
    expect(screen.getByLabelText('Fragmento de código')).toHaveValue("console.log('segunda')")
    expect(screen.queryByText('Consola')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'el binding' }))
    await user.click(screen.getByRole('button', { name: 'Responder' }))
    expect(await screen.findByText('const fija el binding.')).toBeInTheDocument()
    expect(screen.getAllByText('Consola')).toHaveLength(1)
    expect(screen.getByLabelText('Fragmento de código')).toHaveValue("console.log('segunda')")
  })
})

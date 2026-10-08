import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import type { OwnQuestionStore, Services } from '../../application/ports.ts'
import type { Question } from '../../domain/question.ts'
import { ServicesProvider } from '../services-context.tsx'
import { OwnQuestionsScreen } from './own-questions-screen.tsx'

class MemoryStore implements OwnQuestionStore {
  questions: Question[] = []

  async load(): Promise<Question[]> {
    return this.questions
  }

  async save(questions: Question[]): Promise<void> {
    this.questions = questions
  }
}

function renderLibrary(store: OwnQuestionStore) {
  const services: Services = {
    questions: {
      async load() {
        return { origin: 'bank', questions: [] }
      },
    },
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
    ownQuestions: store,
  }
  return render(
    <ServicesProvider services={services}>
      <MemoryRouter>
        <OwnQuestionsScreen />
      </MemoryRouter>
    </ServicesProvider>,
  )
}

describe('OwnQuestionsScreen', () => {
  it('guarda una pregunta y permite quitarla', async () => {
    const user = userEvent.setup()
    const store = new MemoryStore()
    renderLibrary(store)

    await user.click(screen.getByLabelText('Enunciado'))
    await user.paste('¿Qué elemento marca el contenido principal?')
    await user.click(screen.getByLabelText('Respuesta a'))
    await user.paste('main')
    await user.click(screen.getByLabelText('Respuesta b'))
    await user.paste('div')
    await user.click(screen.getByLabelText('Por qué es esa la respuesta'))
    await user.paste('main es el contenido principal.')
    await user.click(screen.getByRole('button', { name: 'Guardar pregunta' }))

    expect(await screen.findByText('Guardada. Entrará en las rondas de ese tema y nivel.')).toBeInTheDocument()
    expect(screen.getByText('¿Qué elemento marca el contenido principal?')).toBeInTheDocument()
    expect(store.questions).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Quitar «¿Qué elemento marca el contenido principal?»' }))
    expect(screen.getByText('Todavía no hay ninguna. Cuando elijas su tema y su nivel, entrarán en la ronda.')).toBeInTheDocument()
    expect(store.questions).toHaveLength(0)
  })

  it('sube un JSON y lo deja en la lista', async () => {
    const user = userEvent.setup()
    renderLibrary(new MemoryStore())
    const file = new File(
      [
        JSON.stringify({
          questions: [
            {
              topicId: 'javascript',
              level: 'mid',
              kind: 'written',
              prompt: '¿Qué fija const?',
              modelAnswer: 'el binding',
              explanation: 'const fija el binding.',
            },
          ],
        }),
      ],
      'mias.json',
      { type: 'application/json' },
    )

    await user.upload(screen.getByLabelText('Subir un archivo JSON'), file)

    expect(await screen.findByText('Se ha añadido 1 pregunta.')).toBeInTheDocument()
    expect(screen.getByText('¿Qué fija const?')).toBeInTheDocument()
  })
})

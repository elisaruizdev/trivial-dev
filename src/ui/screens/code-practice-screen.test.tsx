import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Services } from '../../application/ports.ts'
import { codingExercises } from '../../infrastructure/coding/catalog.ts'
import { InterviewProvider } from '../interview-context.tsx'
import { ServicesProvider } from '../services-context.tsx'
import { App } from '../app.tsx'

const services: Services = {
  questions: {
    async load() {
      return { origin: 'bank', questions: [] }
    },
  },
  evaluator: {
    async evaluate() {
      return { verdict: 'correct', comment: 'ok', source: 'exact' }
    },
  },
  speech: {
    isSupported: () => false,
    start: () => undefined,
    stop: () => undefined,
  },
  ownQuestions: {
    async load() {
      return []
    },
    async save() {
      return undefined
    },
  },
}

function renderApp() {
  return render(
    <ServicesProvider services={services}>
      <InterviewProvider>
        <App />
      </InterviewProvider>
    </ServicesProvider>,
  )
}

describe('Escribir código', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('abre un enunciado, cierra las llaves y muestra la solución', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('link', { name: 'Escribir código' }))

    expect(screen.getByRole('heading', { name: 'Escribir código' })).toBeInTheDocument()
    expect(screen.getByText('100 enunciados')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Producto 30/ }))
    const editor = screen.getByRole('textbox', { name: 'Código' })
    await user.clear(editor)
    await user.type(editor, '{{')
    expect(editor).toHaveValue('{}')

    await user.click(screen.getByRole('button', { name: 'Resuelve' }))
    expect(screen.getByRole('heading', { name: 'JavaScript' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()
    expect(screen.getByText(/tres bucles anidados/)).toBeInTheDocument()
    expect(screen.getAllByText(/function hasProduct30/).length).toBeGreaterThan(0)
    expect(screen.getByText(/t: number\[\]/)).toBeInTheDocument()

    const product = codingExercises.find((exercise) => exercise.names.includes('hasProduct30'))
    expect(product).toBeDefined()
    if (!product) return
    await user.clear(editor)
    await user.click(editor)
    await user.paste(product.javascript)
    await user.click(screen.getByRole('button', { name: 'Ejecutar' }))
    expect(await screen.findByText(/Correcto/, {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('cambia de nivel y encuentra las palabras concatenadas', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('link', { name: 'Escribir código' }))
    await user.click(screen.getByRole('tab', { name: 'Mid' }))
    await user.type(screen.getByRole('textbox', { name: 'Buscar enunciado' }), 'concatenated')
    expect(screen.getByRole('button', { name: /Palabras concatenadas/ })).toBeInTheDocument()
    expect(screen.getByText('1 enunciado')).toBeInTheDocument()
  })
})

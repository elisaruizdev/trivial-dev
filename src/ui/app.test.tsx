import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Services } from '../application/ports.ts'
import { InterviewProvider } from './interview-context.tsx'
import { ServicesProvider } from './services-context.tsx'
import { App } from './app.tsx'

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

describe('App', () => {
  it('muestra el crédito de Elisa Ruiz en el pie', () => {
    render(
      <ServicesProvider services={services}>
        <InterviewProvider>
          <App />
        </InterviewProvider>
      </ServicesProvider>,
    )

    const link = screen.getByRole('link', { name: 'Elisa Ruiz' })
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/elisaruizortega/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Creado por Elisa Ruiz ❤️ 2026')
  })
})
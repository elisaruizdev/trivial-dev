export const levels = ['junior', 'mid', 'senior'] as const

export type Level = (typeof levels)[number]

export function isLevel(value: string): value is Level {
  return (levels as readonly string[]).includes(value)
}

export interface LevelBrief {
  label: string
  summary: string
  calibration: string
}

export const levelBrief: Record<Level, LevelBrief> = {
  junior: {
    label: 'Junior',
    summary: 'Sintaxis y conceptos de cada día.',
    calibration:
      'Pregunta conceptos y sintaxis que se usan a diario. Sin arquitectura, sin trampas y sin APIs oscuras. Las preguntas son de opción múltiple. Unas pocas incluyen un fragmento corto.',
  },
  mid: {
    label: 'Mid',
    summary: 'Cómo se comporta el código.',
    calibration:
      'Pregunta cómo se comporta el código, errores frecuentes y decisiones de implementación. La mayoría son de opción múltiple e incluye alguna para responder por escrito. Ninguna de voz. Unas pocas incluyen un fragmento corto.',
  },
  senior: {
    label: 'Senior',
    summary: 'Trade-offs y criterio.',
    calibration:
      'Pregunta trade-offs, diseño y qué mirarías tú en una entrevista. Mezcla opción múltiple y respuesta escrita, con como máximo una pregunta para contestar en voz alta, breve y sin dictar código. Unas pocas incluyen un fragmento corto.',
  },
}

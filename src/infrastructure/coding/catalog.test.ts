import { describe, expect, it } from 'vitest'
import { practicePassed, practiceProgram, runPracticeProgram } from '../../application/practice-program.ts'
import { codingExercises, exercisesForLevel } from './catalog.ts'

describe('catálogo de código', () => {
  it('tiene 100 ejercicios por nivel', () => {
    expect(exercisesForLevel('junior')).toHaveLength(100)
    expect(exercisesForLevel('mid')).toHaveLength(100)
    expect(exercisesForLevel('senior')).toHaveLength(100)
  })

  it('incluye los enunciados pedidos', () => {
    const byName = new Map(codingExercises.flatMap((exercise) => exercise.names.map((name) => [name, exercise])))
    expect(byName.get('findMax')?.level).toBe('junior')
    expect(byName.get('hasProduct30')?.names).toContain('isThirtiable')
    expect(byName.get('findAllConcatenatedWordsInADict')?.level).toBe('mid')
    const loop = codingExercises.find((exercise) => exercise.title === 'Del 1 al 100')
    expect(loop?.names).toEqual([])
    expect(loop?.captureLogs).toBe(true)
  })

  it('las soluciones de referencia pasan sus casos', () => {
    const failures: string[] = []
    for (const exercise of codingExercises) {
      const lines = runPracticeProgram(practiceProgram(exercise, exercise.javascript))
      if (!practicePassed(lines)) {
        failures.push(`${exercise.id} ${exercise.title}: ${lines.map((line) => line.text).join(' | ')}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('acepta solo isThirtiable en Producto 30', () => {
    const exercise = codingExercises.find((item) => item.names.includes('hasProduct30'))
    expect(exercise).toBeDefined()
    if (!exercise) return
    const source = exercise.javascript
      .split('function isThirtiable')[0]
      .replace('function hasProduct30', 'function isThirtiable')
    const lines = runPracticeProgram(practiceProgram(exercise, source))
    expect(practicePassed(lines)).toBe(true)
  })

  it('rechaza Math.max en findMax', () => {
    const exercise = codingExercises.find((item) => item.names.includes('findMax'))
    expect(exercise).toBeDefined()
    if (!exercise) return
    const lines = runPracticeProgram(
      practiceProgram(exercise, 'function findMax(t) {\n  return Math.max(...t)\n}\n'),
    )
    expect(practicePassed(lines)).toBe(false)
    expect(lines.some((line) => line.level === 'error')).toBe(true)
  })
})

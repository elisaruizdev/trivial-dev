import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { specs as junior } from './junior.mjs'
import { specs as mid } from './mid.mjs'
import { specs as senior } from './senior.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const target = join(here, '../../src/infrastructure/coding/catalog.ts')

const TS_NOTE =
  'En JavaScript la firma no lleva tipos. En TypeScript se anotan los argumentos y el valor de vuelta; el algoritmo es el mismo.'

function materialize(level, spec, index) {
  const names = spec.names ?? (spec.name ? [spec.name] : [])
  let javascript = spec.javascript
  let typescript = spec.typescript
  if (!javascript) {
    javascript = `function ${spec.name}(${spec.params}) {\n${spec.body}\n}\n`
    typescript = `function ${spec.name}(${spec.ts}) {\n${spec.tsBody ?? spec.body}\n}\n`
  }
  if (spec.extraJs) javascript += spec.extraJs
  if (spec.extraTs) typescript += spec.extraTs
  const starter =
    spec.starter ?? (spec.name ? `function ${spec.name}(${spec.params}) {\n  \n}\n` : '')
  const exercise = {
    id: `${level}-${String(index + 1).padStart(3, '0')}`,
    level,
    title: spec.title,
    prompt: spec.prompt,
    names,
    starter,
    explanation: `${spec.explanation} ${TS_NOTE}`,
    used: spec.used,
    javascript,
    typescript,
  }
  if (spec.cases) {
    exercise.cases = spec.cases.map(([args, expected]) => ({ args, expected }))
  }
  if (spec.probe) exercise.probe = spec.probe
  if (spec.captureLogs) exercise.captureLogs = true
  if (spec.forbid) exercise.forbid = spec.forbid
  return exercise
}

const groups = [
  ['junior', junior],
  ['mid', mid],
  ['senior', senior],
]

const exercises = []
for (const [level, specs] of groups) {
  if (specs.length !== 100) {
    throw new Error(`${level} tiene ${specs.length} ejercicios, se esperaban 100`)
  }
  specs.forEach((spec, index) => exercises.push(materialize(level, spec, index)))
}

const titles = new Set()
for (const exercise of exercises) {
  const key = `${exercise.level}:${exercise.title}`
  if (titles.has(key)) throw new Error(`Título repetido: ${key}`)
  titles.add(key)
  if (!exercise.explanation || !exercise.used || !exercise.javascript || !exercise.typescript) {
    throw new Error(`Faltan textos en ${exercise.id}`)
  }
}

mkdirSync(dirname(target), { recursive: true })
const source = `import type { CodingExercise } from '../../domain/coding-exercise.ts'
import type { Level } from '../../domain/level.ts'

/** Catálogo de práctica. Se regenera con node scripts/coding/build.mjs */
export const codingExercises: readonly CodingExercise[] = ${JSON.stringify(exercises, null, 2)}

export function exercisesForLevel(level: Level): CodingExercise[] {
  return codingExercises.filter((exercise) => exercise.level === level)
}
`
writeFileSync(target, source)
console.log(`Escritos ${exercises.length} ejercicios en ${target}`)

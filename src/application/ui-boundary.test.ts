import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    if (!path.endsWith('.ts') && !path.endsWith('.tsx')) return []
    if (path.endsWith('.test.ts') || path.endsWith('.test.tsx')) return []
    return [path]
  })
}

describe('frontera de la interfaz', () => {
  it('las pantallas no importan la infraestructura', () => {
    const offenders = sourceFiles(join('src', 'ui')).filter((file) =>
      readFileSync(file, 'utf8').includes('infrastructure/'),
    )
    expect(offenders).toEqual([])
  })

  it('el cliente no lee la clave ni llama al proveedor', () => {
    const offenders = sourceFiles('src').filter((file) => {
      const text = readFileSync(file, 'utf8')
      return text.includes('import.meta.env.OPENAI') || text.includes('api.openai.com')
    })
    expect(offenders).toEqual([])
  })
})

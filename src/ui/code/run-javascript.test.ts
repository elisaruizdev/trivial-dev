import { describe, expect, it } from 'vitest'
import { canRunInConsole } from '../../domain/snippet.ts'
import { previewDocument } from './run-javascript.ts'

describe('fragmento de código', () => {
  it('ejecuta en consola solo javascript', () => {
    expect(canRunInConsole('javascript')).toBe(true)
    expect(canRunInConsole('js')).toBe(true)
    expect(canRunInConsole('html')).toBe(false)
  })

  it('prepara una vista para html y css, y ninguna para javascript', () => {
    expect(previewDocument('html', '<p>Hola</p>')).toBe('<p>Hola</p>')
    expect(previewDocument('css', 'p { color: red }')).toContain('p { color: red }')
    expect(previewDocument('javascript', 'console.log(1)')).toBeNull()
  })
})

import { describe, expect, it } from 'vitest'
import { applyAutoClose, backspacePair, insertPair } from './auto-close.ts'

describe('auto-close', () => {
  it('cierra la llave y deja el cursor dentro', () => {
    expect(insertPair('', 0, 0, '{')).toEqual({ text: '{}', caret: 1 })
  })

  it('inserta el par en medio', () => {
    expect(insertPair('ab', 1, 1, '(')).toEqual({ text: 'a()b', caret: 2 })
  })

  it('salta un cierre que ya está escrito', () => {
    expect(insertPair('()', 1, 1, ')')).toEqual({ text: '()', caret: 2 })
  })

  it('borra el par vacío con retroceso', () => {
    expect(backspacePair('()', 1, 1)).toEqual({ text: '', caret: 0 })
  })

  it('envuelve la selección', () => {
    expect(insertPair('hola', 0, 4, '"')).toEqual({ text: '"hola"', caret: 5 })
  })

  it('usa la selección de después del cambio', () => {
    expect(applyAutoClose('ab', 'a{b', { start: 2, end: 2 })).toEqual({ text: 'a{}b', caret: 2 })
  })

  it('cierra comillas', () => {
    expect(applyAutoClose('', "'", { start: 0, end: 0 })).toEqual({ text: "''", caret: 1 })
  })

  it('deja pasar una letra', () => {
    expect(applyAutoClose('', 'a', { start: 0, end: 0 })).toBeNull()
  })

  it('deja pasar un pegado de dos caracteres', () => {
    expect(applyAutoClose('', 'ab', { start: 0, end: 0 })).toBeNull()
  })
})

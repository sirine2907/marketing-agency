import { describe, expect, it } from 'vitest'
import { MAX_EMAIL_LENGTH, validateEmail } from './validation'

describe('validateEmail', () => {
  it('accepts a normal address', () => {
    expect(validateEmail('sirine@example.com')).toEqual({
      ok: true,
      email: 'sirine@example.com',
    })
  })

  it('trims surrounding whitespace', () => {
    const result = validateEmail('  sirine@example.com  ')
    expect(result).toEqual({ ok: true, email: 'sirine@example.com' })
  })

  it.each([
    ['empty string', ''],
    ['whitespace only', '   '],
    ['no @', 'sirine.example.com'],
    ['no domain', 'sirine@'],
    ['no tld', 'sirine@example'],
    ['single-char tld', 'sirine@example.c'],
    ['spaces inside', 'sir ine@example.com'],
  ])('rejects %s', (_label, input) => {
    expect(validateEmail(input).ok).toBe(false)
  })

  it.each([
    ['a number', 42],
    ['null', null],
    ['undefined', undefined],
    ['an object', { email: 'sirine@example.com' }],
  ])('rejects %s without throwing', (_label, input) => {
    expect(validateEmail(input).ok).toBe(false)
  })

  it('rejects an address longer than the RFC limit', () => {
    const tooLong = `${'a'.repeat(MAX_EMAIL_LENGTH)}@example.com`
    const result = validateEmail(tooLong)
    expect(result.ok).toBe(false)
    expect(result.ok === false && result.error).toMatch(/too long/i)
  })
})

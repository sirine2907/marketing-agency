import { beforeEach, describe, expect, it } from 'vitest'
import { MAX_REQUESTS, WINDOW_MS, rateLimit, resetRateLimits } from './rateLimit'

describe('rateLimit', () => {
  beforeEach(() => {
    resetRateLimits()
  })

  it('allows requests up to the limit', () => {
    for (let i = 0; i < MAX_REQUESTS; i += 1) {
      expect(rateLimit('1.1.1.1').allowed).toBe(true)
    }
  })

  it('blocks the request after the limit', () => {
    for (let i = 0; i < MAX_REQUESTS; i += 1) rateLimit('1.1.1.1')
    expect(rateLimit('1.1.1.1').allowed).toBe(false)
  })

  it('counts each key separately', () => {
    for (let i = 0; i < MAX_REQUESTS; i += 1) rateLimit('1.1.1.1')
    expect(rateLimit('2.2.2.2').allowed).toBe(true)
  })

  it('reports remaining requests', () => {
    expect(rateLimit('1.1.1.1').remaining).toBe(MAX_REQUESTS - 1)
    expect(rateLimit('1.1.1.1').remaining).toBe(MAX_REQUESTS - 2)
  })

  it('opens a fresh window once the old one expires', () => {
    const start = 1_000_000
    for (let i = 0; i < MAX_REQUESTS; i += 1) rateLimit('1.1.1.1', start)
    expect(rateLimit('1.1.1.1', start).allowed).toBe(false)
    expect(rateLimit('1.1.1.1', start + WINDOW_MS).allowed).toBe(true)
  })

  it('reports how long to wait when blocked', () => {
    const start = 1_000_000
    for (let i = 0; i < MAX_REQUESTS; i += 1) rateLimit('1.1.1.1', start)
    const blocked = rateLimit('1.1.1.1', start + 10_000)
    expect(blocked.retryAfterSeconds).toBe(50)
  })
})

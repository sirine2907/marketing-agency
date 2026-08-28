import { describe, expect, it } from 'vitest'
import { addSubscriber, hasSubscriber } from './subscribers'

describe('subscribers', () => {
  it('stores and finds an address', async () => {
    await addSubscriber('one@example.com')
    expect(await hasSubscriber('one@example.com')).toBe(true)
  })

  it('is case-insensitive', async () => {
    await addSubscriber('Two@Example.com')
    expect(await hasSubscriber('two@example.com')).toBe(true)
    expect(await hasSubscriber('TWO@EXAMPLE.COM')).toBe(true)
  })

  it('does not report unknown addresses', async () => {
    expect(await hasSubscriber('nobody@example.com')).toBe(false)
  })
})

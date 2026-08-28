import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from './Footer'

function mockFetch(status: number, body: Record<string, string>) {
  const spy = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  })
  vi.stubGlobal('fetch', spy)
  return spy
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('Footer newsletter form', () => {
  it('posts the address to the subscribe endpoint', async () => {
    const fetchSpy = mockFetch(201, { message: 'Noted — talk soon.' })
    const user = userEvent.setup()

    render(<Footer />)
    await user.type(screen.getByLabelText(/monthly dispatch/i), 'sirine@example.com')
    await user.click(screen.getByRole('button', { name: /join/i }))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe('/api/subscribe')
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual({ email: 'sirine@example.com' })
  })

  it('shows the server message and clears the field on success', async () => {
    mockFetch(201, { message: 'Noted — talk soon.' })
    const user = userEvent.setup()

    render(<Footer />)
    const input = screen.getByLabelText(/monthly dispatch/i)
    await user.type(input, 'sirine@example.com')
    await user.click(screen.getByRole('button', { name: /join/i }))

    expect(await screen.findByText(/noted — talk soon/i)).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('surfaces the server error and flags the field as invalid', async () => {
    mockFetch(400, { error: 'That does not look like a valid email address.' })
    const user = userEvent.setup()

    render(<Footer />)
    const input = screen.getByLabelText(/monthly dispatch/i)
    await user.type(input, 'nope')
    await user.click(screen.getByRole('button', { name: /join/i }))

    expect(await screen.findByText(/does not look like a valid email/i)).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('reports a network failure instead of hanging', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    const user = userEvent.setup()

    render(<Footer />)
    await user.type(screen.getByLabelText(/monthly dispatch/i), 'sirine@example.com')
    await user.click(screen.getByRole('button', { name: /join/i }))

    expect(await screen.findByText(/could not reach the server/i)).toBeInTheDocument()
  })

  it('clears the error state once the user edits the field again', async () => {
    mockFetch(400, { error: 'That does not look like a valid email address.' })
    const user = userEvent.setup()

    render(<Footer />)
    const input = screen.getByLabelText(/monthly dispatch/i)
    await user.type(input, 'nope')
    await user.click(screen.getByRole('button', { name: /join/i }))
    await screen.findByText(/does not look like a valid email/i)

    await user.type(input, 'x')
    expect(input).toHaveAttribute('aria-invalid', 'false')
  })
})

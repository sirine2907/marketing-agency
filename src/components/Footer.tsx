'use client'

import React, { useState } from 'react'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'

const STUDIOS = [
  { city: 'London', line: '14 Bevis Marks, EC3A 7BA' },
  { city: 'Lisbon', line: 'Rua da Prata 80, 1100-420' },
  { city: 'Toronto', line: '99 Spadina Ave, M5V 3P8' },
]

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'Clients', href: '#clients' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Dribbble', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = (await response.json()) as { message?: string; error?: string }

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Try again.')
        return
      }

      setStatus('success')
      setMessage(data.message ?? 'Noted — talk soon.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Check your connection.')
    }
  }

  return (
    <>
      <section id="contact" className="section border-b border-line">
        <div className="wrap">
          <span className="eyebrow">[ 05 ] — Contact</span>

          <h2 className="display-1 mt-8 text-paper">
            Let&apos;s make
            <br />
            <span className="text-acid">some noise</span>
          </h2>

          <div className="mt-16 grid gap-14 border-t border-line pt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <div>
              <p className="lede max-w-lg">
                Tell us what is not working. If we are the wrong people for it, we will say
                so and point you at someone better.
              </p>

              <a
                href="mailto:hello@signal.studio"
                className="mt-10 inline-flex items-center gap-3 font-display text-2xl uppercase tracking-crush text-paper transition-colors hover:text-acid lg:text-4xl"
              >
                hello@signal.studio
                <ArrowUpRight size={28} strokeWidth={1.5} />
              </a>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                +44 20 7946 0812
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-14 max-w-md">
                <label
                  htmlFor="newsletter-email"
                  className="eyebrow block"
                >
                  Monthly dispatch — no fluff, unsubscribe anytime
                </label>

                <div
                  className={`mt-4 flex border transition-colors ${
                    status === 'error' ? 'border-paper' : 'border-line focus-within:border-acid'
                  }`}
                >
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status !== 'idle') setStatus('idle')
                    }}
                    aria-invalid={status === 'error'}
                    aria-describedby="newsletter-status"
                    placeholder="you@company.com"
                    className="min-w-0 flex-1 bg-transparent px-4 py-4 font-mono text-xs text-paper placeholder:text-muted focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex shrink-0 items-center justify-center border-l border-line bg-acid px-6 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-80 disabled:opacity-50"
                  >
                    {status === 'loading' && <Loader2 size={14} className="animate-spin" />}
                    {status === 'success' && <Check size={14} strokeWidth={3} />}
                    {(status === 'idle' || status === 'error') && 'Join'}
                  </button>
                </div>

                <p
                  id="newsletter-status"
                  aria-live="polite"
                  className={`mt-3 min-h-[1rem] font-mono text-[10px] uppercase tracking-[0.16em] ${
                    status === 'error' ? 'text-paper' : 'text-muted'
                  }`}
                >
                  {message}
                </p>
              </form>
            </div>

            <ul className="grid gap-px self-start border border-line bg-line">
              {STUDIOS.map((studio) => (
                <li key={studio.city} className="bg-ink p-7">
                  <p className="font-display text-xl uppercase tracking-crush text-paper">
                    {studio.city}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {studio.line}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-ink">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-[2fr_1fr_1fr] lg:gap-20">
          <div>
            <a
              href="#top"
              className="font-display text-3xl uppercase tracking-crush text-paper transition-colors hover:text-acid"
            >
              Signal<span className="text-acid">®</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A creative and performance marketing studio. We build brands that are
              impossible to scroll past.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-acid"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="wrap flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            © {new Date().getFullYear()} Signal Studio Ltd.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Registered in England · 11284420
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer

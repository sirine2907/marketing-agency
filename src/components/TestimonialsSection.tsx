'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'They killed three of our campaigns in the first month and were right about all of them. Painful, then extremely profitable.',
    name: 'Marta Vieira',
    role: 'VP Growth, Northwind Supply',
    initials: 'MV',
  },
  {
    quote:
      'We had been told our problem was creative. Signal worked out it was our checkout. That single call paid for the retainer twice over.',
    name: 'Daniel Okafor',
    role: 'Founder, Halva',
    initials: 'DO',
  },
  {
    quote:
      'The only agency we have worked with that sends a readout our finance team does not immediately argue with.',
    name: 'Priya Raman',
    role: 'CMO, Meridian Health',
    initials: 'PR',
  },
  {
    quote:
      'Fast, blunt and genuinely good at the craft. They shipped more in six weeks than our last partner did in a year.',
    name: 'Tom Aldridge',
    role: 'CEO, Foundry Labs',
    initials: 'TA',
  },
]

const CLIENTS = [
  'Northwind',
  'Halva',
  'Meridian',
  'Foundry',
  'Kestrel',
  'Atlas Row',
  'Verity',
  'Ohm',
]

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const move = (step: number) => {
    setDirection(step)
    setIndex((prev) => (prev + step + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const active = TESTIMONIALS[index]

  return (
    <section id="clients" className="section border-b border-line bg-surface">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-line pb-12">
          <div>
            <span className="eyebrow">[ 04 ] — Clients</span>
            <h2 className="display-2 mt-6 text-paper">
              In their
              <br />
              own words
            </h2>
          </div>

          <div className="flex items-center gap-3 pb-3">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center border border-line text-paper transition-colors hover:border-acid hover:text-acid"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center border border-line text-paper transition-colors hover:border-acid hover:text-acid"
            >
              <ArrowRight size={16} />
            </button>
            <span className="ml-3 font-mono text-xs text-muted">
              <span className="text-paper">{String(index + 1).padStart(2, '0')}</span>
              {' / '}
              {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden border-b border-line py-14 lg:min-h-[20rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="display-3 max-w-4xl leading-tight text-paper">
                <span className="text-acid">&ldquo;</span>
                {active.quote}
                <span className="text-acid">&rdquo;</span>
              </blockquote>

              <figcaption className="mt-10 flex items-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center border border-acid font-mono text-sm text-acid">
                  {active.initials}
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-[0.18em] text-paper">
                    {active.name}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {active.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="overflow-hidden pt-12 pause-on-hover">
          <p className="eyebrow mb-8">Trusted by</p>
          <div className="flex w-max animate-marquee-slow items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                {CLIENTS.map((client) => (
                  <span
                    key={client}
                    className="px-10 font-display text-2xl uppercase tracking-crush text-line transition-colors hover:text-acid lg:text-4xl"
                  >
                    {client}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

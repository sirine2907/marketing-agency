'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

const HEADLINE = ['Cut', 'Through', 'The Noise']

const STATS = [
  { value: '+312%', label: 'Avg. return on ad spend' },
  { value: '48', label: 'Brands scaled since 2019' },
  { value: '$24M', label: 'Media budget managed' },
  { value: '11', label: 'Industry awards' },
]

const TICKER = [
  'Brand Strategy',
  'Performance Media',
  'Content Systems',
  'Creative Direction',
  'Lifecycle & CRM',
  'Analytics',
]

// Snappy, mechanical easing — deliberately not the floaty spring feel.
const EASE = [0.22, 1, 0.36, 1] as const

const HeroSection = () => {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden border-b border-line pt-20">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink"
        aria-hidden="true"
      />

      <div className="wrap relative flex min-h-[calc(100vh-5rem)] flex-col justify-between py-14">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'linear' }}
            className="flex items-center gap-3"
          >
            <span className="h-2 w-2 animate-blink bg-acid" aria-hidden="true" />
            <span className="eyebrow">Creative &amp; performance studio — est. 2019</span>
          </motion.div>

          <h1 className="mt-10">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease: EASE }}
                  className={`display-1 block ${i === 2 ? 'text-acid' : 'text-paper'}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
            className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1.1fr_1fr]"
          >
            <p className="lede max-w-2xl">
              We build brands that are impossible to scroll past — then run the media that
              proves it worked. No vanity metrics, no 40-slide decks. Just work that moves
              the number you actually care about.
            </p>

            <div className="flex flex-wrap items-start gap-3 lg:justify-end">
              <a href="#contact" className="btn-acid">
                Start a project
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
              <a href="#work" className="btn-outline">
                See the work
              </a>
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'linear' }}
          className="mt-16 grid grid-cols-2 border-l border-t border-line lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="border-b border-r border-line p-6">
              <dt className="font-display text-3xl tracking-crush text-paper lg:text-5xl">
                {stat.value}
              </dt>
              <dd className="eyebrow mt-3 leading-relaxed">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>

        <div className="mt-12 flex items-center gap-3 text-muted">
          <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
          <span className="eyebrow">Scroll</span>
        </div>
      </div>

      {/* Edge-to-edge ticker */}
      <div className="relative overflow-hidden border-t border-line bg-surface py-4 pause-on-hover">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {TICKER.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-6 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                    {item}
                  </span>
                  <span className="h-1 w-1 bg-acid" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

'use client'

import React from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    title: 'Diagnose',
    copy: 'Two weeks inside your analytics, your CRM and your customer calls. We come back with what is actually broken, which is rarely what the brief said.',
    output: 'Findings doc + priority list',
  },
  {
    title: 'Position',
    copy: 'We settle the story before spending a cent on media. Positioning, message hierarchy and the proof points that carry them.',
    output: 'Strategy + messaging system',
  },
  {
    title: 'Build',
    copy: 'Creative, site and campaign infrastructure shipped in four-week cycles. You see work every fortnight, not at the end of a quarter.',
    output: 'Assets, pages, campaigns live',
  },
  {
    title: 'Compound',
    copy: 'Test, cut what loses, double what wins. Monthly readouts against contribution margin — the metric your CFO already tracks.',
    output: 'Monthly readout + roadmap',
  },
]

const FACTS = [
  { value: '2019', label: 'Founded' },
  { value: '24', label: 'People' },
  { value: '3', label: 'Studios' },
  { value: '92%', label: 'Client retention' },
]

const ProcessSection = () => {
  return (
    <section id="process" className="section border-b border-line">
      <div className="wrap">
        <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div>
            <span className="eyebrow">[ 03 ] — Process</span>
            <h2 className="display-2 mt-6 text-paper">
              How the work
              <br />
              gets made
            </h2>
          </div>
          <p className="lede max-w-xl lg:pb-3">
            No discovery phase that lasts a quarter. Four stages, fixed outputs, and a
            standing invitation to fire us at the end of any of them.
          </p>
        </div>

        <ol className="grid border-l border-line md:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-r border-line p-8 lg:p-12"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-display text-5xl tracking-crush text-acid lg:text-6xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display-3 text-paper">{step.title}</h3>
              </div>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{step.copy}</p>

              <p className="mt-8 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                Output — <span className="text-paper">{step.output}</span>
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
          <div>
            <span className="eyebrow">The studio</span>
            <p className="display-3 mt-6 max-w-3xl leading-tight text-paper">
              Twenty-four strategists, media buyers and makers in one room. No account
              layer between you and the people doing the work.
            </p>
          </div>

          <dl className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.label} className="border-b border-r border-line px-7 py-6">
                <dt className="font-display text-3xl tracking-crush text-paper">{fact.value}</dt>
                <dd className="eyebrow mt-2">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection

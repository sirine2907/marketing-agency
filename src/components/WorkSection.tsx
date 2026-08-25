'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const CASES = [
  {
    client: 'Northwind Supply',
    sector: 'B2B / Industrial',
    summary: 'Repositioned a 40-year-old parts distributor and rebuilt the quote funnel.',
    metrics: [
      { value: '+312%', label: 'Qualified leads' },
      { value: '-41%', label: 'Cost per lead' },
    ],
    year: '2024',
  },
  {
    client: 'Halva',
    sector: 'DTC / Food',
    summary: 'Launch campaign and retention programme for a challenger snack brand.',
    metrics: [
      { value: '4.8x', label: 'Blended ROAS' },
      { value: '+66%', label: 'Repeat rate' },
    ],
    year: '2024',
  },
  {
    client: 'Meridian Health',
    sector: 'Healthcare',
    summary: 'Brand system and patient acquisition across twelve regional clinics.',
    metrics: [
      { value: '2.1M', label: 'Reach' },
      { value: '+89%', label: 'Bookings' },
    ],
    year: '2023',
  },
  {
    client: 'Foundry Labs',
    sector: 'SaaS',
    summary: 'Category narrative, site rebuild and demand generation through Series B.',
    metrics: [
      { value: '-28%', label: 'CAC' },
      { value: '+143%', label: 'Pipeline' },
    ],
    year: '2023',
  },
]

const WorkSection = () => {
  return (
    <section id="work" className="section border-b border-line bg-surface">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-line pb-12">
          <div>
            <span className="eyebrow">[ 02 ] — Selected work</span>
            <h2 className="display-2 mt-6 text-paper">
              Receipts,
              <br />
              not promises
            </h2>
          </div>
          <p className="lede max-w-md pb-3 text-base">
            Four engagements, four sectors. Numbers verified against the client&apos;s own
            reporting, not ours.
          </p>
        </div>

        <ul className="border-t border-line">
          {CASES.map((item, i) => (
            <motion.li
              key={item.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-line"
            >
              <a
                href="#contact"
                className="group grid gap-6 py-9 transition-colors duration-150 hover:bg-acid lg:grid-cols-[3rem_1.4fr_1fr_auto] lg:items-center lg:gap-10 lg:px-6"
              >
                <span className="font-mono text-xs text-line transition-colors group-hover:text-ink/50">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="display-3 text-paper transition-colors group-hover:text-ink">
                    {item.client}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink/70">
                    {item.sector} — {item.year}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/80 lg:hidden">
                    {item.summary}
                  </p>
                </div>

                <div className="flex gap-10">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-display text-2xl tracking-crush text-acid transition-colors group-hover:text-ink lg:text-3xl">
                        {metric.value}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-ink/70">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <ArrowUpRight
                  size={28}
                  strokeWidth={1.5}
                  className="hidden text-line transition-all duration-150 group-hover:text-ink lg:block"
                  aria-hidden="true"
                />
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex items-center gap-4">
          <span className="eyebrow">Full case studies available under NDA</span>
          <span className="h-px flex-1 bg-line" />
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.18em] text-acid transition-opacity hover:opacity-70"
          >
            Request access
          </a>
        </div>
      </div>
    </section>
  )
}

export default WorkSection

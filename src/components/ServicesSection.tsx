'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Compass,
  Layers,
  MonitorSmartphone,
  Repeat,
  Target,
  ArrowUpRight,
} from 'lucide-react'

const SERVICES = [
  {
    icon: Compass,
    title: 'Brand Strategy',
    copy: 'Positioning, narrative and identity systems that give the rest of the work something solid to stand on.',
    items: ['Positioning', 'Naming', 'Identity systems', 'Messaging'],
  },
  {
    icon: Target,
    title: 'Performance Media',
    copy: 'Paid acquisition across search, social and programmatic — managed to contribution margin, not impressions.',
    items: ['Paid search', 'Paid social', 'Programmatic', 'Creative testing'],
  },
  {
    icon: Layers,
    title: 'Creative & Content',
    copy: 'Production systems that turn one shoot into ninety assets, built for the platforms you actually sell on.',
    items: ['Art direction', 'Video', 'Photography', 'Copy'],
  },
  {
    icon: MonitorSmartphone,
    title: 'Web & Product',
    copy: 'Sites and storefronts engineered for conversion, speed and the kind of accessibility audits nobody enjoys.',
    items: ['Design systems', 'Landing pages', 'E-commerce', 'CRO'],
  },
  {
    icon: Repeat,
    title: 'Lifecycle & CRM',
    copy: 'Email, SMS and retention flows that keep customers past the first purchase and out of the churn column.',
    items: ['Email & SMS', 'Automation', 'Segmentation', 'Loyalty'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Measurement',
    copy: 'Clean tracking, honest attribution and dashboards that survive contact with a finance team.',
    items: ['Tracking setup', 'Attribution', 'Dashboards', 'Incrementality'],
  },
]

const ServicesSection = () => {
  return (
    <section id="services" className="section border-b border-line">
      <div className="wrap">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20">
          <div>
            <span className="eyebrow">[ 01 ] — Services</span>
            <h2 className="display-2 mt-6 text-paper">
              What we
              <br />
              actually do
            </h2>
          </div>
          <p className="lede max-w-xl lg:pb-3">
            Six disciplines, one team, one invoice. Most clients start with a single
            engagement and end up handing us the whole funnel.
          </p>
        </div>

        <div className="grid border-l border-line md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group border-b border-r border-line bg-surface p-8 transition-colors duration-150 hover:bg-acid lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    className="text-acid transition-colors group-hover:text-ink"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-line transition-colors group-hover:text-ink/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="display-3 mt-10 text-paper transition-colors group-hover:text-ink">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/80">
                  {service.copy}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors group-hover:border-ink/30 group-hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-8 border border-line bg-surface p-10 md:flex-row md:items-center lg:p-14">
          <div>
            <h3 className="display-3 text-paper">Not sure which one you need?</h3>
            <p className="lede mt-3 max-w-lg text-base">
              Send us the problem, not the brief. We will tell you what it actually takes —
              even when that is less than you expected.
            </p>
          </div>
          <a href="#contact" className="btn-acid shrink-0">
            Book an intro call
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

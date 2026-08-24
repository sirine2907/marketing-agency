'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Clients', href: '#clients' },
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Real scroll progress: useScroll drives a motion value, so the bar actually
  // repaints as you scroll (a plain ref would never re-render).
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-acid"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
          isScrolled ? 'border-line bg-ink/95 backdrop-saturate-150' : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="wrap flex h-20 items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-xl uppercase tracking-crush text-paper transition-colors hover:text-acid"
          >
            Signal<span className="text-acid">®</span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-paper"
                >
                  <span className="text-[10px] text-line transition-colors group-hover:text-acid">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-acid hidden sm:inline-flex">
              Start a project
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:border-acid hover:text-acid lg:hidden"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            className="fixed inset-0 z-40 bg-ink pt-20 lg:hidden"
          >
            <div className="rule" />
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="wrap flex items-center justify-between py-7 text-paper transition-colors hover:bg-acid hover:text-ink"
                  >
                    <span className="display-3">{item.label}</span>
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="wrap pt-10">
              <a href="#contact" onClick={() => setIsOpen(false)} className="btn-acid w-full">
                Start a project
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation

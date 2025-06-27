'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface ScrollAnimationOptions {
  trigger?: string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  onUpdate?: (progress: number) => void
  animation?: gsap.core.Tween
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadGSAP = async () => {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (!elementRef.current) return

        const {
          trigger = elementRef.current,
          start = 'top 80%',
          end = 'bottom 20%',
          scrub = false,
          pin = false,
          markers = false,
          onUpdate,
          animation,
        } = options

        // Create timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub,
            pin,
            markers,
            onUpdate: (self) => {
              if (onUpdate) {
                onUpdate(self.progress)
              }
            },
          },
        })

        // Add animation if provided
        if (animation) {
          tl.add(animation)
        }

        timelineRef.current = tl

        return () => {
          if (timelineRef.current) {
            timelineRef.current.kill()
          }
        }
      } catch (error) {
        console.warn('GSAP ScrollTrigger not available:', error)
      }
    }

    loadGSAP()
  }, [options])

  return {
    ref: elementRef,
    timeline: timelineRef.current,
  }
}

// Hook for simple fade-in animations
export const useFadeInAnimation = (delay: number = 0) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    const element = ref.current
    element.classList.add('animate-on-scroll')
    element.style.transitionDelay = `${delay}ms`
    
    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [delay])

  return ref
}

// Hook for monitoring scroll progress
export const useScrollProgress = () => {
  const progressRef = useRef<number>(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      progressRef.current = progress
      
      // Update CSS custom property for other components to use
      document.documentElement.style.setProperty('--scroll-progress', progress.toString())
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress() // Initial call

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return progressRef
} 
'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Zap, TrendingUp } from 'lucide-react'
import { useFadeInAnimation } from '../hooks/useScrollAnimation'

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useFadeInAnimation(0)

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(103, 126, 234, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={textAnimation} className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                #1 Digital Marketing Agency 2025
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={textAnimation}
            className="heading-xl text-gray-900 mb-6"
          >
            Transform Your Brand with{' '}
            <span className="text-gradient">
              Next-Gen Marketing
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={textAnimation}
            className="text-body max-w-3xl mx-auto mb-12"
          >
            We create immersive digital experiences that captivate audiences, 
            drive conversions, and accelerate business growth. From brand strategy 
            to cutting-edge campaigns, we&apos;re your partners in digital excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={textAnimation}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="btn-secondary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={textAnimation}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { icon: TrendingUp, value: '300%', label: 'Average ROI Increase' },
              { icon: Zap, value: '2.5M+', label: 'Campaigns Launched' },
              { icon: Star, value: '500+', label: 'Happy Clients' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-6 border border-white/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            const servicesSection = document.querySelector('#services')
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <span className="text-sm text-gray-500 mb-2 group-hover:text-blue-600 transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center group-hover:border-blue-600 transition-colors">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2 group-hover:bg-blue-600"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-16 hidden lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-80" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/3 right-16 hidden lg:block"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/3 left-1/4 hidden lg:block"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg opacity-70" />
      </motion.div>
    </section>
  )
}

export default HeroSection 
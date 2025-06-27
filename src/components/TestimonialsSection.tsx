'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useFadeInAnimation } from '../hooks/useScrollAnimation'

const TestimonialsSection = () => {
  const sectionRef = useFadeInAnimation(400)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      position: 'CEO, TechStart',
      company: 'TechStart',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      content: 'AgencyPro completely transformed our digital presence. Their strategic approach resulted in a 300% increase in qualified leads within just 6 months.',
      rating: 5,
      results: '300% increase in leads',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      position: 'Marketing Director, GrowthCo',
      company: 'GrowthCo',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      content: 'Working with AgencyPro was a game-changer. Their team delivered exceptional results that exceeded our expectations.',
      rating: 5,
      results: '450% ROI on campaigns',
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-purple-50 to-blue-50" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg text-gray-900 mb-6">
            What Our Clients Say About{' '}
            <span className="text-gradient">Our Work</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative glass rounded-3xl p-8 lg:p-12 border border-white/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl lg:text-2xl text-gray-700 text-center mb-8">
                  &quot;{testimonials[currentIndex].content}&quot;
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-center">
                    <div className="font-bold text-gray-900">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentIndex].position}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center space-x-4 mt-8">
              <button onClick={prevTestimonial} className="p-3 glass rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextTestimonial} className="p-3 glass rounded-full">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection 
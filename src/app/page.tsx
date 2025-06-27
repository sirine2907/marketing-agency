'use client'

import React from 'react'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}

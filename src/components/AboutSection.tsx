'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Coffee, 
  Heart, 
  Target, 
  Zap, 
  Globe,
  ArrowRight
} from 'lucide-react'
import { useFadeInAnimation } from '../hooks/useScrollAnimation'

const AboutSection = () => {
  const sectionRef = useFadeInAnimation(300)

  const stats = [
    { icon: Users, number: '150+', label: 'Team Members' },
    { icon: Award, number: '500+', label: 'Projects Delivered' },
    { icon: Coffee, number: '10K+', label: 'Coffee Cups' },
    { icon: Globe, number: '45+', label: 'Countries Served' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every strategy we implement is designed to deliver measurable results and exceed expectations.',
    },
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'Your success is our success. We build long-term partnerships based on trust and transparency.',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We stay ahead of digital trends, leveraging cutting-edge technology to give you a competitive edge.',
    },
  ]

  const timeline = [
    {
      year: '2019',
      title: 'Founded',
      description: 'Started as a small team with big dreams to transform digital marketing.',
    },
    {
      year: '2021',
      title: 'Expansion',
      description: 'Grew to 50+ team members and expanded services globally.',
    },
    {
      year: '2023',
      title: 'Innovation',
      description: 'Launched AI-powered marketing solutions and 3D experiences.',
    },
    {
      year: '2025',
      title: 'Leadership',
      description: 'Recognized as the #1 digital marketing agency with 500+ successful projects.',
    },
  ]

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50" ref={sectionRef}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full mb-6">
            <Heart className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">
              About Us
            </span>
          </div>
          
          <h2 className="heading-lg text-gray-900 mb-6">
            Crafting Digital Experiences That{' '}
            <span className="text-gradient">Drive Success</span>
          </h2>
          
          <p className="text-body max-w-3xl mx-auto">
            We&apos;re more than just a marketing agency. We&apos;re your digital growth partners, 
            committed to transforming your brand&apos;s online presence and driving measurable results 
            that matter to your business.
          </p>
        </motion.div>

        {/* Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2019 by a team of passionate digital innovators, AgencyPro emerged 
                from a simple belief: that every business deserves access to world-class 
                digital marketing that drives real growth.
              </p>
              <p>
                What started as a small team of 5 has grown into a global powerhouse of 150+ 
                creative minds, strategists, and technical experts. We&apos;ve helped over 500 
                businesses transform their digital presence and achieve remarkable success.
              </p>
              <p>
                Today, we&apos;re proud to be recognized as industry leaders, constantly pushing 
                the boundaries of what&apos;s possible in digital marketing and development.
              </p>
            </div>

            <motion.div
              className="mt-8 flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn Our Process
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Our Values
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-6 glass rounded-2xl border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 30 }
                  }}
                >
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass rounded-2xl p-6 border border-white/20"
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 30 }
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4"
                whileHover={{ rotate: 10 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30,
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Journey
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <motion.div
                      className="glass rounded-2xl p-6 border border-white/20"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 30 }
                      }}
                    >
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <motion.div
                    className="relative z-10 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/20 bg-gradient-to-br from-purple-50 to-pink-50">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Write Your <span className="text-gradient">Success Story</span>?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that trust us to transform their digital presence 
              and drive meaningful growth. Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet Our Team
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection 
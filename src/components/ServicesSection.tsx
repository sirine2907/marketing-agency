'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  TrendingUp, 
  Search, 
  Smartphone, 
  Video, 
  BarChart,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useFadeInAnimation } from '../hooks/useScrollAnimation'

const ServicesSection = () => {
  const sectionRef = useFadeInAnimation(200)

  const services = [
    {
      icon: Palette,
      title: 'Brand Strategy & Design',
      description: 'Create compelling brand identities that resonate with your target audience and stand out in competitive markets.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Positioning'],
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Data-driven marketing campaigns that maximize ROI and accelerate growth across all digital channels.',
      features: ['Social Media Marketing', 'Email Campaigns', 'Content Strategy', 'PPC Advertising'],
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Search,
      title: 'SEO & Content',
      description: 'Boost your online visibility with strategic SEO optimization and engaging content that converts.',
      features: ['Technical SEO', 'Content Creation', 'Keyword Research', 'Link Building'],
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Smartphone,
      title: 'Web & App Development',
      description: 'Custom websites and mobile apps that deliver exceptional user experiences and drive business results.',
      features: ['Responsive Design', 'Mobile Apps', 'E-commerce', 'CMS Integration'],
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Video,
      title: 'Video Production',
      description: 'Captivating video content that tells your story and engages audiences across all platforms.',
      features: ['Corporate Videos', 'Social Media Content', '3D Animation', 'Live Streaming'],
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: BarChart,
      title: 'Analytics & Insights',
      description: 'Transform data into actionable insights with comprehensive analytics and performance tracking.',
      features: ['Performance Tracking', 'User Behavior', 'ROI Analysis', 'Custom Reports'],
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  return (
    <section id="services" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">
              Our Services
            </span>
          </div>
          
          <h2 className="heading-lg text-gray-900 mb-6">
            Comprehensive Digital Solutions for{' '}
            <span className="text-gradient">Modern Businesses</span>
          </h2>
          
          <p className="text-body max-w-3xl mx-auto">
            We offer a full spectrum of digital marketing and development services, 
            each designed to drive growth, enhance user experience, and deliver 
            measurable results for your business.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
            >
              <motion.div
                className={`relative p-8 rounded-3xl ${service.bgColor} border border-gray-100 h-full transition-all duration-300 hover:shadow-2xl hover:border-transparent overflow-hidden`}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 30 }
                }}
              >
                {/* Background Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${service.color} transition-opacity duration-300`}
                  initial={false}
                />

                {/* Floating Icon Background */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 opacity-5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <service.icon className="w-full h-full" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-3xl p-8 lg:p-12 border border-white/20 bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to <span className="text-gradient">Transform</span> Your Business?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our comprehensive digital solutions can accelerate 
              your growth and help you achieve your business objectives.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection 
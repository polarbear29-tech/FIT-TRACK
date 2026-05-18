import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Create Your Profile',
    description: 'Tell us about your goals, current fitness level, and available equipment.'
  },
  {
    num: '02',
    title: 'Get Your Plan',
    description: 'Our algorithm designs a personalized routine optimized for your body.'
  },
  {
    num: '03',
    title: 'Track & Evolve',
    description: 'Log your workouts and watch the plan adapt as you grow stronger.'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-neutral-500 max-w-xl mx-auto">Three simple steps to transform your approach to fitness.</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-2 z-0">
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <motion.line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="text-neutral-300 dark:text-neutral-700"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className="flex flex-col items-center text-center relative bg-background"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="w-24 h-24 rounded-full bg-white dark:bg-neutral-900 border-8 border-background shadow-xl flex items-center justify-center mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-display font-black text-3xl text-neutral-300 dark:text-neutral-700 group-hover:text-white transition-colors duration-300 relative z-10">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

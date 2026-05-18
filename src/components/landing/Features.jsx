import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Target, Zap, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: <Activity className="w-6 h-6 text-brand-600" />,
    title: 'Advanced Tracking',
    description: 'Monitor your vitals, reps, and performance metrics in real-time with precision.',
  },
  {
    icon: <Target className="w-6 h-6 text-brand-600" />,
    title: 'Personalized Goals',
    description: 'Dynamic routines that adapt weekly based on your recovery and progress data.',
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-600" />,
    title: 'Quick Workouts',
    description: 'Short on time? Access high-intensity micro-workouts that fit any schedule.',
  },
  {
    icon: <Shield className="w-6 h-6 text-brand-600" />,
    title: 'Form Correction',
    description: 'AI-assisted insights ensure you maintain perfect form and prevent injuries.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            We've combined cutting-edge technology with sports science to deliver a platform that practically guarantees results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full border-transparent hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10 group cursor-default">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

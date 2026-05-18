import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient & grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-900" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      {/* Diagonal Clip shape for visual interest */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-white"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to crush your goals?</h2>
          <p className="text-lg text-brand-100 mb-10">
            Join thousands of athletes who have already transformed their training with FitTrack. Start your free trial today.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white flex-1 h-12"
            />
            <Button size="lg" className="h-12 bg-white text-brand-900 hover:bg-neutral-100 shadow-xl" asChild>
              <Link to="/auth">Start Free Trial</Link>
            </Button>
          </form>
          <p className="text-xs text-brand-200">No credit card required · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}

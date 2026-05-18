import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  { name: 'Sarah Jenkins', role: 'Marathon Runner', initial: 'SJ', quote: 'FitTrack completely changed how I prep for races. The adaptive scheduling is mind-blowing.' },
  { name: 'Marcus Chen', role: 'Powerlifter', initial: 'MC', quote: 'Clean UI, zero fluff. It just gets out of your way and lets you lift, while tracking all the complex math.' },
  { name: 'Elena Rodriguez', role: 'Yoga Instructor', initial: 'ER', quote: 'I recommend this to all my clients. The visual progress tracking keeps them motivated longer than anything else.' },
  { name: 'David Kim', role: 'Busy Executive', initial: 'DK', quote: 'The 15-minute high-intensity options saved my fitness. I can actually fit workouts into my crazy schedule now.' },
  { name: 'Alex Thompson', role: 'Crossfit Athlete', initial: 'AT', quote: 'Best tracking app on the market. Period. The data visualizations are exactly what I needed to break my plateau.' },
  { name: 'Jessica Walsh', role: 'Beginner', initial: 'JW', quote: 'I used to be so intimidated by the gym. FitTrack told me exactly what to do and how to do it safely.' },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Loved by athletes worldwide</h2>
        <p className="text-neutral-400 max-w-xl mx-auto">Don't just take our word for it. Here's what our community has to say.</p>
      </div>

      {/* Auto-scrolling Carousel using Framer Motion drag */}
      <div className="relative w-full max-w-[100vw] overflow-x-hidden pb-12 cursor-grab active:cursor-grabbing">
        <motion.div 
          className="flex gap-6 px-4 md:px-12 w-max"
          drag="x"
          dragConstraints={{ right: 0, left: -2000 }} // Rough estimate, can be calculated dynamically
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {/* Double array for infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <Card key={idx} className="w-[300px] md:w-[400px] shrink-0 bg-neutral-900 border-neutral-800 text-white">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-brand-500 text-brand-500" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-medium">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm">
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{testimonial.name}</h4>
                    <p className="text-xs text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

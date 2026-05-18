import React from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function Schedule() {
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-100 dark:bg-brand-900/50 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Schedule</h1>
          <p className="text-neutral-500">Plan your upcoming workouts.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-12 text-center text-neutral-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <h3 className="text-lg font-semibold mb-2">Calendar Integration</h3>
          <p>Sync with Google Calendar coming in the next update.</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

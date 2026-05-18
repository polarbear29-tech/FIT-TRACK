import React from 'react'
import { motion } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Workouts() {
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-100 dark:bg-brand-900/50 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Workout History</h1>
          <p className="text-neutral-500">Your recent sessions and achievements.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">HIIT Session</h3>
                <p className="text-sm text-neutral-500">45 minutes • High Intensity</p>
              </div>
              <div className="text-right">
                <span className="block font-bold text-xl text-brand-500">320</span>
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">kcal burned</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

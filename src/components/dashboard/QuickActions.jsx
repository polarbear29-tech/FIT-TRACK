import React from 'react'
import { Play, Utensils, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboardStore } from '@/store/useDashboardStore'
import { useAuthStore } from '@/store/useAuthStore'

export function QuickActions() {
  const { logWorkout, logMeal } = useDashboardStore()
  const { token } = useAuthStore()

  const handleStartWorkout = async () => {
    // Simulate logging a 30m HIIT workout
    await logWorkout({
      name: 'HIIT Session',
      duration: 30,
      calories: 320
    }, token)
  }

  const handleLogMeal = async () => {
    // Simulate logging a meal
    await logMeal({
      name: 'Protein Shake',
      calories: 250,
      protein: 30,
      carbs: 10,
      fat: 5
    }, token)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <motion.button
        onClick={handleStartWorkout}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold shadow-md transition-colors bg-brand-500 text-white hover:bg-brand-600`}
      >
        <Play className="w-4 h-4" />
        Start Workout
      </motion.button>
      
      <motion.button
        onClick={handleLogMeal}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold shadow-md transition-colors bg-orange-500 text-white hover:bg-orange-600`}
      >
        <Utensils className="w-4 h-4" />
        Log Meal
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold shadow-md transition-colors bg-blue-500 text-white hover:bg-blue-600`}
      >
        <TrendingUp className="w-4 h-4" />
        View Progress
      </motion.button>
    </div>
  )
}

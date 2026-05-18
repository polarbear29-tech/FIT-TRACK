import React from 'react'
import { Play, Utensils, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const actions = [
  { label: 'Start Workout', icon: Play, color: 'bg-brand-500 text-white', hover: 'hover:bg-brand-600' },
  { label: 'Log Meal', icon: Utensils, color: 'bg-orange-500 text-white', hover: 'hover:bg-orange-600' },
  { label: 'View Progress', icon: TrendingUp, color: 'bg-blue-500 text-white', hover: 'hover:bg-blue-600' },
]

export function QuickActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {actions.map((action, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold shadow-md transition-colors ${action.color} ${action.hover}`}
          aria-label={action.label}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </motion.button>
      ))}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Dumbbell, CalendarDays, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const statsData = [
  { title: 'Calories Burned', value: '1,240', unit: 'kcal', icon: Flame, trend: '+12%', isPositive: true },
  { title: 'Workouts This Week', value: '4', unit: '/ 7', icon: Dumbbell, trend: '+1', isPositive: true },
  { title: 'Streak Days', value: '12', unit: 'days', icon: CalendarDays, trend: 'Personal best!', isPositive: true, special: '🔥' },
  { title: 'Goal Progress', value: '68', unit: '%', icon: Target, trend: '+5%', isPositive: true },
]

export function StatsCards() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, idx) => (
        <Card key={idx} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/50 dark:to-brand-800/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-neutral-500">{stat.title}</p>
            </div>
            
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded w-1/3" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  {stat.special && <span className="text-2xl">{stat.special}</span>}
                  <h3 className="text-3xl font-mono font-bold">{stat.value}</h3>
                  <span className="text-neutral-500 text-sm font-medium">{stat.unit}</span>
                </div>
                <p className={`text-sm font-medium ${stat.isPositive ? 'text-success' : 'text-error'}`}>
                  {stat.trend} <span className="text-neutral-400 font-normal">vs last week</span>
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

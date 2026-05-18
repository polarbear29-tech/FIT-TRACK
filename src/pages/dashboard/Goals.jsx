import React from 'react'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/store/useAuthStore'

export default function Goals() {
  const { user } = useAuthStore()

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-100 dark:bg-brand-900/50 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Your Goals</h1>
          <p className="text-neutral-500">Track your progress and stay focused.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {user?.goals?.length > 0 ? (
          user.goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle>{goal.type} Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{goal.targetValue}</p>
                <p className="text-sm text-neutral-500 mt-1">Target to achieve</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center text-neutral-500">
              <p>No goals set yet. Start by defining your fitness journey!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  )
}

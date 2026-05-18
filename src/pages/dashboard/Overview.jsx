import React from 'react'
import { motion } from 'framer-motion'
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { WorkoutCard } from '@/components/dashboard/WorkoutCard'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { QuickActions } from '@/components/dashboard/QuickActions'

export default function Overview() {
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <WelcomeHeader />
      <QuickActions />
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <WorkoutCard />
        <ActivityChart />
      </div>
    </motion.div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { MobileNav } from '@/components/dashboard/MobileNav'
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { WorkoutCard } from '@/components/dashboard/WorkoutCard'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import { QuickActions } from '@/components/dashboard/QuickActions'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900/50 flex transition-colors">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 relative pb-20 md:pb-0">
        <motion.div 
          className="p-4 md:p-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <WelcomeHeader />
          <QuickActions />
          <StatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkoutCard />
            <ActivityChart />
          </div>
        </motion.div>
      </main>

      <MobileNav />
    </div>
  )
}

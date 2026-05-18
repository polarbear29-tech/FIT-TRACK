import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex items-center w-full justify-between relative mb-8">
      {/* Background track line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0 rounded-full" />
      
      {/* Active track line */}
      <motion.div 
        className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 z-0 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1
        const isActive = step === currentStep
        const isCompleted = step < currentStep

        return (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-2",
                isCompleted ? "bg-brand-500 border-brand-500 text-white" :
                isActive ? "bg-background border-brand-500 text-brand-500" :
                "bg-background border-neutral-300 dark:border-neutral-700 text-neutral-400"
              )}
              initial={false}
              animate={{
                scale: isActive ? 1.1 : 1,
                boxShadow: isActive ? "0 0 0 4px rgba(20, 184, 166, 0.2)" : "none"
              }}
              transition={{ duration: 0.2 }}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : step}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

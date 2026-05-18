import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step4Schema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { motion, LayoutGroup } from 'framer-motion'
import { Circle, Dot, Zap } from 'lucide-react'

const activityLevels = [
  { id: 'sedentary', name: 'Sedentary', desc: 'Little or no exercise (Desk job)' },
  { id: 'light', name: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { id: 'moderate', name: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { id: 'very', name: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
  { id: 'extra', name: 'Extra Active', desc: 'Very hard exercise & physical job' }
]

export function Step4({ defaultValues, onNext, onBack }) {
  const { handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: defaultValues || { activityLevel: '' }
  })

  const selected = watch('activityLevel')

  const onSubmit = (data) => {
    onNext(data)
  }

  const handleSkip = () => {
    onNext({ activityLevel: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col min-h-full">
      <div className="text-center mb-6 shrink-0">
        <h2 className="text-2xl font-bold mb-2">Activity Level</h2>
        <p className="text-neutral-500 text-sm">How active are you right now?</p>
      </div>

      <LayoutGroup>
        <div className="space-y-3 flex-1 overflow-y-auto pr-2 pb-2">
          {activityLevels.map((level) => {
            const isSelected = selected === level.id
            return (
              <motion.div
                layout
                key={level.id}
                onClick={() => setValue('activityLevel', level.id)}
                className={`relative cursor-pointer flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isSelected 
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/20' 
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300'
                }`}
              >
                {isSelected && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-500 rounded-l-xl"
                  />
                )}
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                   <Zap className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-bold ${isSelected ? 'text-brand-700 dark:text-brand-300' : ''}`}>{level.name}</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{level.desc}</p>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full border-2 border-brand-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-brand-500 rounded-full" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-neutral-300 dark:border-neutral-700" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>

      <div className="pt-4 shrink-0 space-y-4">
        <div className="flex justify-between gap-4">
          <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
          <Button type="submit" disabled={!selected} className="flex-1">Continue</Button>
        </div>
        <div className="text-center">
          <button type="button" onClick={handleSkip} className="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 underline underline-offset-4">
            Skip for now
          </button>
        </div>
      </div>
    </form>
  )
}

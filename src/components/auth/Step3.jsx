import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step3Schema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const allGoals = [
  { id: 'lose_weight', name: 'Lose Weight', icon: '🔥', desc: 'Burn fat and get leaner' },
  { id: 'build_muscle', name: 'Build Muscle', icon: '💪', desc: 'Increase mass and strength' },
  { id: 'get_fitter', name: 'Get Fitter', icon: '🏃', desc: 'Improve cardiovascular health' },
  { id: 'flexibility', name: 'Flexibility', icon: '🧘', desc: 'Increase mobility and stretch' },
  { id: 'endurance', name: 'Endurance', icon: '🔋', desc: 'Train for long-lasting energy' },
  { id: 'reduce_stress', name: 'Reduce Stress', icon: '🍃', desc: 'Mindful movement for peace' }
]

export function Step3({ defaultValues, onNext, onBack }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: { goals: defaultValues?.goals || [] }
  })

  const goals = watch('goals') || []
  const isValid = goals.length > 0 && goals.length <= 3

  const toggleGoal = (id) => {
    if (goals.includes(id)) {
      setValue('goals', goals.filter(g => g !== id), { shouldValidate: true })
    } else if (goals.length < 3) {
      setValue('goals', [...goals, id], { shouldValidate: true })
    }
  }

  const onSubmit = (data) => {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => alert("Validation Failed: " + JSON.stringify(errors)))} className="space-y-6">
      <input type="hidden" {...register('goals')} value={goals || []} />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Fitness Goals</h2>
        <p className="text-neutral-500 text-sm">Select up to 3 goals you want to achieve.</p>
        <div className="mt-2 inline-block bg-neutral-100 dark:bg-neutral-800 rounded-full px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          {goals.length}/3 selected
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {allGoals.map((goal) => {
          const isSelected = goals.includes(goal.id)
          const isDisabled = !isSelected && goals.length >= 3

          return (
            <motion.div
              key={goal.id}
              whileHover={isDisabled ? {} : { scale: 1.02 }}
              whileTap={isDisabled ? {} : { scale: 0.98 }}
              onClick={() => !isDisabled && toggleGoal(goal.id)}
              className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                isSelected 
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30' 
                  : isDisabled 
                    ? 'border-transparent bg-neutral-100/50 dark:bg-neutral-900/50 opacity-50 cursor-not-allowed'
                    : 'border-transparent bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-200 dark:hover:border-neutral-700'
              }`}
            >
              <div className="text-3xl mb-2">{goal.icon}</div>
              <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-brand-700 dark:text-brand-300' : ''}`}>
                {goal.name}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2">{goal.desc}</p>
              
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white dark:border-neutral-950"
                  >
                    <Check className="w-3 h-3" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {errors.goals && <p className="text-error text-sm text-center">{errors.goals.message}</p>}

      <div className="pt-4 flex justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
        <Button type="submit" className="flex-1">Continue</Button>
      </div>
    </form>
  )
}

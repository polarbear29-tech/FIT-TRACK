import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step5Schema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Upload, User, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export function Step5({ defaultValues, onNext, onBack }) {
  const [avatar, setAvatar] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const { register, handleSubmit, watch, setValue, formState: { isValid } } = useForm({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      username: defaultValues?.username || '',
      bio: defaultValues?.bio || '',
      notifications: defaultValues?.notifications || { workoutReminders: true, weeklyReports: true, tips: false }
    }
  })

  const notifs = watch('notifications') || { workoutReminders: true, weeklyReports: true, tips: false }
  const bio = watch('bio') || ''

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatar(url)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatar(url)
    }
  }

  const onSubmit = (data) => {
    // Fire confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#FF5C38', '#22C55E']
    })
    
    setIsSuccess(true)
    setTimeout(() => {
      onNext({ ...data, avatar })
    }, 2500)
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="mb-6 relative w-24 h-24 mx-auto">
          <svg className="w-full h-full text-success" viewBox="0 0 50 50">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M15 25 L22 32 L35 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold mb-2">Welcome to FitTrack!</h2>
        <p className="text-neutral-500">Your personalized plan is ready.</p>
        <div className="mt-8">
           <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
           <p className="text-sm mt-4 text-neutral-400">Redirecting to dashboard...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errors) => alert("Validation Failed: " + JSON.stringify(errors)))} className="space-y-6">
      <input type="hidden" {...register('notifications.workoutReminders')} value={notifs?.workoutReminders || false} />
      <input type="hidden" {...register('notifications.weeklyReports')} value={notifs?.weeklyReports || false} />
      <input type="hidden" {...register('notifications.tips')} value={notifs?.tips || false} />
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Profile Setup</h2>
        <p className="text-neutral-500 text-sm">Last step! Personalize your public profile.</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div 
          className="relative w-24 h-24 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden mb-4 group cursor-pointer hover:border-brand-500 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-neutral-400 group-hover:text-brand-500 transition-colors" />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Upload className="w-5 h-5 text-white" />
          </div>
        </div>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        <button type="button" className="text-sm text-brand-500 font-medium hover:underline" onClick={() => fileInputRef.current?.click()}>
          Upload Photo
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">@</span>
            <Input id="username" {...register('username')} className="pl-8" placeholder="athlete" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="bio">Bio</Label>
            <span className="text-xs text-neutral-400">{bio?.length || 0}/160</span>
          </div>
          <textarea 
            id="bio" 
            {...register('bio')} 
            maxLength={160}
            rows={3}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none"
            placeholder="Tell us a bit about yourself..."
          />
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-4 space-y-4 border border-neutral-100 dark:border-neutral-800">
          <Label className="text-base">Notifications</Label>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notif-workout" className="text-sm">Workout Reminders</Label>
              <p className="text-xs text-neutral-500">Push notifications for scheduled workouts</p>
            </div>
            <Switch 
              id="notif-workout" 
              checked={notifs?.workoutReminders} 
              onCheckedChange={(c) => setValue('notifications.workoutReminders', c)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notif-weekly" className="text-sm">Weekly Reports</Label>
              <p className="text-xs text-neutral-500">Email summary of your weekly progress</p>
            </div>
            <Switch 
              id="notif-weekly" 
              checked={notifs?.weeklyReports} 
              onCheckedChange={(c) => setValue('notifications.weeklyReports', c)} 
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notif-tips" className="text-sm">Pro Tips</Label>
              <p className="text-xs text-neutral-500">Occasional advice from our coaches</p>
            </div>
            <Switch 
              id="notif-tips" 
              checked={notifs?.tips} 
              onCheckedChange={(c) => setValue('notifications.tips', c)} 
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-between gap-4">
        <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
        <Button type="submit" className="flex-1">Complete Setup</Button>
      </div>
      <div className="text-center">
         <button type="button" onClick={() => onSubmit({ username: '', bio: '' })} className="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 underline underline-offset-4">
           Skip for now
         </button>
      </div>
    </form>
  )
}

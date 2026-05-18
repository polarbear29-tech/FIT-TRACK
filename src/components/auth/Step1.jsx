import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema } from '@/lib/validations'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useGoogleLogin } from '@react-oauth/google'

export function Step1({ defaultValues, onNext }) {
  const navigate = useNavigate()
  const { googleLogin } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(step1Schema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const password = watch('password', '')

  // Password strength calculation
  const getStrength = (pw) => {
    let score = 0
    if (pw.length > 7) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
  }

  const strength = getStrength(password)
  const strengthColors = ['bg-neutral-200', 'bg-error', 'bg-warning', 'bg-brand-400', 'bg-success']

  const onSubmit = (data) => {
    onNext(data)
  }

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const success = await googleLogin(tokenResponse.access_token)
      if (success) {
        navigate('/dashboard')
      } else {
        alert("Google login verification failed on server.")
      }
    },
    onError: () => {
      alert("Google login popup failed.")
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
        <p className="text-neutral-500 text-sm">Let's get started with your basic details.</p>
      </div>

      <Button type="button" variant="outline" className="w-full relative overflow-hidden group" onClick={handleGoogleAuth}>
        <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <svg className="w-5 h-5 mr-2 relative z-10" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="relative z-10">Continue with Google</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200 dark:border-neutral-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-neutral-500">Or continue with</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="John Doe" {...register('fullName')} className={errors.fullName ? 'border-error focus-visible:ring-error' : ''} />
          {errors.fullName && <p className="text-error text-sm mt-1 animate-in fade-in">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register('email')} className={errors.email ? 'border-error focus-visible:ring-error' : ''} />
          {errors.email && <p className="text-error text-sm mt-1 animate-in fade-in">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? 'text' : 'password'} 
              {...register('password')} 
              className={errors.password ? 'border-error focus-visible:ring-error pr-10' : 'pr-10'} 
            />
            <button 
              type="button" 
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2 flex gap-1 h-1">
              {[1, 2, 3, 4].map((level) => (
                <div 
                  key={level} 
                  className={`flex-1 rounded-full transition-colors duration-300 ${level <= strength ? strengthColors[strength] : 'bg-neutral-200 dark:bg-neutral-800'}`}
                />
              ))}
            </div>
          )}
          {errors.password && <p className="text-error text-sm mt-1 animate-in fade-in">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirm ? 'text' : 'password'} 
              {...register('confirmPassword')} 
              className={errors.confirmPassword ? 'border-error focus-visible:ring-error pr-10' : 'pr-10'} 
            />
            <button 
              type="button" 
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-error text-sm mt-1 animate-in fade-in">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={!isValid} className="w-full sm:w-auto">
          Continue
        </Button>
      </div>
    </form>
  )
}

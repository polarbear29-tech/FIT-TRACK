import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useThemeStore } from '@/store/useThemeStore'
import { Moon, Sun, User } from 'lucide-react'

export function WelcomeHeader() {
  const { user, onboardingData } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  // Ensure there's a fallback name
  const name = user?.name || onboardingData?.username || 'Athlete'
  const avatarUrl = user?.avatar || onboardingData?.avatar
  const initial = name.charAt(0).toUpperCase()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-1">Good morning, {name} 👋</h1>
        <p className="text-neutral-500 font-medium">{today}</p>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-neutral-800 shadow-sm bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 flex items-center justify-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-lg">{initial}</span>
          )}
        </div>
      </div>
    </div>
  )
}

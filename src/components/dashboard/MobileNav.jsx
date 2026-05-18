import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Dumbbell, Calendar, Target, Settings } from 'lucide-react'

const navItems = [
  { name: 'Home', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Workouts', icon: Dumbbell, path: '/workouts' },
  { name: 'Schedule', icon: Calendar, path: '/schedule' },
  { name: 'Goals', icon: Target, path: '/goals' },
  { name: 'Settings', icon: Settings, path: '/settings' },
]

export function MobileNav() {
  const location = useLocation()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 z-50 pb-safe">
      <nav className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? 'text-brand-500' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'fill-brand-500/20' : ''}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

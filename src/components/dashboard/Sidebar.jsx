import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Activity, LayoutDashboard, Dumbbell, Calendar, Target, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Workouts', icon: Dumbbell, path: '/dashboard/workouts' },
  { name: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
  { name: 'Goals', icon: Target, path: '/dashboard/goals' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 shrink-0 z-40 transition-colors">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-brand-500 text-white p-1.5 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">FitTrack</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname === '/dashboard' && item.path === '/dashboard/overview')
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-400' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-error hover:bg-error/10 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </aside>
  )
}

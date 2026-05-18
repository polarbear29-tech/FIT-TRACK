import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { MobileNav } from '@/components/dashboard/MobileNav'
import { useAuthStore } from '@/store/useAuthStore'

export default function DashboardLayout() {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Re-check auth on mount
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) return null // Prevent flicker before redirect

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <Sidebar />
      <main className="flex-1 md:ml-64 w-full pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  )
}

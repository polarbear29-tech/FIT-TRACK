import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useThemeStore } from './store/useThemeStore'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import DashboardLayout from './layouts/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import Workouts from './pages/dashboard/Workouts'
import Schedule from './pages/dashboard/Schedule'
import Goals from './pages/dashboard/Goals'
import Settings from './pages/dashboard/Settings'
import { Toaster } from 'sonner'

function App() {
  const location = useLocation()
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Toaster position="top-center" richColors />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="goals" element={<Goals />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App

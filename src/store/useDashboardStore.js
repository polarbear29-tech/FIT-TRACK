import { create } from 'zustand'

const API_URL = import.meta.env.PROD 
  ? 'https://fit-track-76cb.onrender.com/api' 
  : '/api'

export const useDashboardStore = create((set) => ({
  stats: null,
  isLoading: false,

  fetchStats: async (token) => {
    if (!token) return
    set({ isLoading: true })
    try {
      const res = await fetch(`${API_URL}/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        set({ stats: data })
      }
    } catch (error) {
      console.error('Failed to fetch stats', error)
    } finally {
      set({ isLoading: false })
    }
  },

  logWorkout: async (workoutData, token) => {
    try {
      const res = await fetch(`${API_URL}/dashboard/workout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(workoutData)
      })
      if (res.ok) {
        // optimistic refresh
        useDashboardStore.getState().fetchStats(token)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  },

  logMeal: async (mealData, token) => {
    try {
      const res = await fetch(`${API_URL}/dashboard/meal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mealData)
      })
      if (res.ok) {
        // optimistic refresh
        useDashboardStore.getState().fetchStats(token)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
}))

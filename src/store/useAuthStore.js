import { create } from 'zustand'

const API_URL = import.meta.env.PROD 
  ? 'https://fit-track-76cb.onrender.com/api' 
  : '/api'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('fittrack_token') || null,
  isLoading: false,
  onboardingData: {},
  
  updateOnboardingData: (data) => set((state) => ({
    onboardingData: { ...state.onboardingData, ...data }
  })),

  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      if (!res.ok) throw new Error('Login failed')
      
      const data = await res.json()
      localStorage.setItem('fittrack_token', data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false })
      return true
    } catch (err) {
      console.error(err)
      set({ isLoading: false })
      return false
    }
  },

  register: async (onboardingData) => {
    set({ isLoading: true })
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardingData)
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Registration failed')
      }
      
      const data = await res.json()
      localStorage.setItem('fittrack_token', data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false })
      return { success: true }
    } catch (err) {
      console.error(err)
      set({ isLoading: false })
      return { success: false, message: err.message }
    }
  },

  googleLogin: async (access_token) => {
    set({ isLoading: true })
    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token })
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Google Login failed')
      }
      
      const data = await res.json()
      localStorage.setItem('fittrack_token', data.token)
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false })
      return { success: true }
    } catch (err) {
      console.error(err)
      set({ isLoading: false })
      return { success: false, message: err.message }
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('fittrack_token')
    if (!token) return set({ isAuthenticated: false, user: null })
    
    try {
      const res = await fetch(`${API_URL}/user/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Token invalid')
      const user = await res.json()
      set({ user, isAuthenticated: true })
    } catch (err) {
      localStorage.removeItem('fittrack_token')
      set({ user: null, token: null, isAuthenticated: false })
    }
  },

  logout: () => {
    localStorage.removeItem('fittrack_token')
    set({ user: null, token: null, isAuthenticated: false, onboardingData: {} })
  }
}))

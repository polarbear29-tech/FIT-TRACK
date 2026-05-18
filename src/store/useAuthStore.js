import { create } from 'zustand'

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
      const res = await fetch('/api/auth/login', {
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardingData)
      })
      if (!res.ok) throw new Error('Registration failed')
      
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

  googleLogin: async (access_token) => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ access_token })
      })
      if (!res.ok) throw new Error('Google Login failed')
      
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

  checkAuth: async () => {
    const token = localStorage.getItem('fittrack_token')
    if (!token) return set({ isAuthenticated: false, user: null })
    
    try {
      const res = await fetch('/api/user/me', {
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

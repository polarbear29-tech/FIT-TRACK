import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  onboardingData: {},
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, onboardingData: {} }),
  updateOnboardingData: (data) => set((state) => ({ 
    onboardingData: { ...state.onboardingData, ...data } 
  }))
}))

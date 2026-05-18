import React from 'react'
import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col md:flex-row">
      {/* Left sidebar / header */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-brand-950 text-white p-8 flex flex-col justify-between shrink-0">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="bg-brand-500 text-white p-1.5 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">FitTrack</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">Start your journey today.</h1>
          <p className="text-brand-200 text-sm leading-relaxed">
            Join the community of athletes taking their performance to the next level.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="hidden md:block relative h-48 w-full mt-12 rounded-2xl overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/30 to-brand-400/30 backdrop-blur-3xl" />
           <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-500 rounded-full blur-2xl opacity-50" />
           <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/10 rounded-xl flex items-center justify-center text-white/50 italic text-sm">
             "The best decision I made for my health."
           </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

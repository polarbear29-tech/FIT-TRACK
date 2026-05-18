import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Activity } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const scrollPosition = useScrollPosition()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isScrolled = scrollPosition > 20

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <div className="bg-brand-500 text-white p-1.5 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">FitTrack</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-brand-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/auth">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-neutral-600 dark:text-neutral-300"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-neutral-950 shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display font-bold text-xl">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-neutral-700 dark:text-neutral-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

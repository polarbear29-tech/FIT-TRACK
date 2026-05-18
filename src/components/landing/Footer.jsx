import React from 'react'
import { Activity, Twitter, Instagram, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-brand-500 text-white p-1 rounded-lg">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">FitTrack</span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-xs">
              Empowering athletes to unlock their peak potential through data-driven insights and adaptive programming.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#features" className="hover:text-brand-500 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-500 transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="hover:text-brand-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-brand-500 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-brand-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-brand-500 transition-colors" aria-label="Github">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p>Built with ❤️ for athletes everywhere</p>
        </div>
      </div>
    </footer>
  )
}

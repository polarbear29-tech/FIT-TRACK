import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { ArrowRight, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t, i18n } = useTranslation()
  const mouseX = useMotionValue(0)

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-mesh">
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Language Toggle */}
            <div className="flex gap-2 justify-center lg:justify-start mb-6">
              <button onClick={() => i18n.changeLanguage('en')} className={`text-xs px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-brand-500 text-white' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'}`}>EN</button>
              <button onClick={() => i18n.changeLanguage('es')} className={`text-xs px-2 py-1 rounded ${i18n.language === 'es' ? 'bg-brand-500 text-white' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'}`}>ES</button>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight mb-6 text-neutral-900 dark:text-white">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto lg:mx-0 mb-8">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button size="lg" className="w-full sm:w-auto group" asChild>
                <Link to="/auth">
                  {t('getStarted')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <p className="text-sm font-medium text-neutral-500">Trusted by 50,000+ athletes</p>
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-950 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-300 to-brand-500 opacity-20" />
                    <span className="text-xs font-medium text-neutral-500 blur-[2px]">U{i}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square"
          >
            {/* Abstract 3D/Gradient representation of fitness/activity */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-coreAccent/20 rounded-[3rem] rotate-6 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-white/40 dark:bg-neutral-900/40 rounded-[3rem] -rotate-3 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
               <motion.div
                 animate={{ 
                   y: [0, -20, 0],
                   rotate: [0, 5, 0]
                 }}
                 transition={{
                   duration: 6,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 blur-2xl opacity-60 absolute top-1/4 left-1/4"
               />
               <motion.div
                 animate={{ 
                   y: [0, 20, 0],
                   x: [0, -20, 0]
                 }}
                 transition={{
                   duration: 8,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 className="w-64 h-64 rounded-full bg-gradient-to-tl from-coreAccent to-orange-400 blur-3xl opacity-40 absolute bottom-0 right-0"
               />
               {/* Central element */}
               <div className="relative z-10 w-32 h-32 bg-white/80 dark:bg-neutral-800/80 rounded-2xl shadow-xl border border-white/50 backdrop-blur-md flex flex-col items-center justify-center gap-2">
                 <Activity className="w-10 h-10 text-brand-500" />
                 <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-brand-500" 
                     initial={{ width: "20%" }}
                     animate={{ width: "80%" }}
                     transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                   />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { StepIndicator } from '@/components/ui/StepIndicator'
import { Step1 } from '@/components/auth/Step1'
import { Step2 } from '@/components/auth/Step2'
import { Step3 } from '@/components/auth/Step3'
import { Step4 } from '@/components/auth/Step4'
import { Step5 } from '@/components/auth/Step5'
import { useAuthStore } from '@/store/useAuthStore'

export default function Auth() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()
  const { updateOnboardingData, onboardingData, login } = useAuthStore()

  const handleNext = async (data) => {
    updateOnboardingData(data)
    if (step < 5) {
      setDirection(1)
      setStep(s => s + 1)
    } else {
      // Final step complete
      const finalData = { ...onboardingData, ...data }
      
      // We check if it's 'login' action or 'register'
      // Since it's a 5-step flow, it's register
      const { register } = useAuthStore.getState()
      const success = await register(finalData)
      
      if (success) {
        navigate('/dashboard')
      } else {
        alert('Registration failed. Please try again.')
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1)
      setStep(s => s - 1)
    }
  }

  const variants = {
    initial: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0
    })
  }

  return (
    <AuthLayout>
      <div className="w-full">
        {step < 6 && <StepIndicator currentStep={step} totalSteps={5} />}
        
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {step === 1 && <Step1 defaultValues={onboardingData} onNext={handleNext} />}
              {step === 2 && <Step2 defaultValues={onboardingData} onNext={handleNext} onBack={handleBack} />}
              {step === 3 && <Step3 defaultValues={onboardingData} onNext={handleNext} onBack={handleBack} />}
              {step === 4 && <Step4 defaultValues={onboardingData} onNext={handleNext} onBack={handleBack} />}
              {step === 5 && <Step5 defaultValues={onboardingData} onNext={handleNext} onBack={handleBack} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AuthLayout>
  )
}

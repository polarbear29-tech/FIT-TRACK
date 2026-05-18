import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      heroTitle: "Your Fitness Journey, Reimagined.",
      heroSubtitle: "Track workouts, monitor nutrition, and achieve your goals with a platform designed for results.",
      getStarted: "Get Started Free"
    }
  },
  es: {
    translation: {
      heroTitle: "Tu Viaje de Fitness, Reimaginado.",
      heroSubtitle: "Rastrea entrenamientos, controla la nutrición y alcanza tus objetivos con una plataforma diseñada para dar resultados.",
      getStarted: "Empieza Gratis"
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n

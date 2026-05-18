import React from 'react'
import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started.',
    features: ['Basic workout logging', '3 custom routines', 'Community access', '-', '-'],
    buttonVariant: 'outline'
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    description: 'For serious athletes.',
    features: ['Advanced analytics', 'Unlimited routines', 'AI form correction', 'Priority support', '-'],
    buttonVariant: 'default',
    isPopular: true
  },
  {
    name: 'Elite',
    price: '$29',
    period: '/mo',
    description: 'The ultimate fitness package.',
    features: ['Everything in Pro', '1-on-1 coaching', 'Custom meal plans', 'Live sessions', 'API access'],
    buttonVariant: 'secondary'
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-neutral-500">Choose the plan that fits your goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              <Card className={`h-full flex flex-col ${tier.isPopular ? 'scale-105 ring-2 ring-brand-500 shadow-2xl relative z-10' : 'border-neutral-200 dark:border-neutral-800'}`}>
                {tier.isPopular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-brand-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-display font-bold">{tier.price}</span>
                    {tier.period && <span className="text-neutral-500 text-sm font-medium">{tier.period}</span>}
                  </div>
                  <p className="text-sm text-neutral-500">{tier.description}</p>
                </CardHeader>
                <CardContent className="flex-1 mt-6">
                  <ul className="space-y-4">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-sm">
                        {feature !== '-' ? (
                          <Check className="w-5 h-5 text-success shrink-0" />
                        ) : (
                          <Minus className="w-5 h-5 text-neutral-300 dark:text-neutral-700 shrink-0" />
                        )}
                        <span className={feature === '-' ? 'text-neutral-400 dark:text-neutral-600' : 'text-neutral-700 dark:text-neutral-300'}>
                          {feature !== '-' ? feature : 'Not included'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button className="w-full" variant={tier.buttonVariant} size="lg">
                    {tier.name === 'Free' ? 'Get Started' : 'Start 14-Day Trial'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

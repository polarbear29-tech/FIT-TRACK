import React from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/store/useAuthStore'

export default function Settings() {
  const { user } = useAuthStore()

  return (
    <motion.div 
      className="w-full max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-brand-100 dark:bg-brand-900/50 p-3 rounded-xl text-brand-600 dark:text-brand-400">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Settings</h1>
          <p className="text-neutral-500">Manage your account and preferences.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-brand-500" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user?.name || 'User'}</h3>
              <p className="text-neutral-500">{user?.email}</p>
            </div>
          </div>
          
          <div className="pt-6 border-t dark:border-neutral-800">
            <h4 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Account Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-neutral-500 block mb-1">Username</span>
                <span className="font-medium">{user?.username}</span>
              </div>
              <div>
                <span className="text-sm text-neutral-500 block mb-1">Member Since</span>
                <span className="font-medium">{new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

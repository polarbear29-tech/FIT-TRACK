import { z } from 'zod'

export const step1Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least 1 special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export const step2Schema = z.object({
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Non-binary', 'Prefer not to say'], {
    required_error: "Please select a gender"
  }),
  height: z.number().min(50).max(300),
  heightUnit: z.enum(['cm', 'ft']),
  weight: z.number().min(20).max(500),
  weightUnit: z.enum(['kg', 'lbs']),
})

export const step3Schema = z.object({
  goals: z.array(z.string()).min(1, 'Select at least 1 goal').max(3, 'Select up to 3 goals')
})

export const step4Schema = z.object({
  activityLevel: z.string().optional()
})

export const step5Schema = z.object({
  username: z.string().min(3).optional().or(z.literal('')),
  bio: z.string().max(160).optional(),
  notifications: z.object({
    workoutReminders: z.boolean(),
    weeklyReports: z.boolean(),
    tips: z.boolean()
  }).optional()
})

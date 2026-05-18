import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

// Attach prisma to request
app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FitTrack API is running!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

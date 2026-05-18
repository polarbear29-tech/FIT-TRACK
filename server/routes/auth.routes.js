import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'fittrack-super-secret-key-2026'

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { 
      email, password, name, 
      dateOfBirth, gender, height, heightUnit, weight, weightUnit,
      goals, activity, username, bio, avatar,
      workoutReminders, weeklyReports, tipsAndTricks
    } = req.body

    const existingUser = await req.prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const goalConnect = goals ? goals.map(g => ({
      where: { name: g },
      create: { name: g }
    })) : []

    const user = await req.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        height: height ? parseFloat(height) : null,
        heightUnit,
        weight: weight ? parseFloat(weight) : null,
        weightUnit,
        activity,
        username,
        bio,
        avatar,
        workoutReminders: workoutReminders ?? true,
        weeklyReports: weeklyReports ?? true,
        tipsAndTricks: tipsAndTricks ?? false,
        goals: {
          connectOrCreate: goalConnect
        }
      },
      include: { goals: true }
    })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json({ token, user: userWithoutPassword })
  } catch (error) {
    console.error('Registration Error:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await req.prisma.user.findUnique({ 
      where: { email },
      include: { goals: true }
    })
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
    
    const { password: _, ...userWithoutPassword } = user
    res.json({ token, user: userWithoutPassword })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
})

export default router

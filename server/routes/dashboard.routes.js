import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router()

// GET /api/dashboard/stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const workouts = await req.prisma.workout.findMany({
      where: { userId: req.user.userId }
    })
    const meals = await req.prisma.mealLog.findMany({
      where: { userId: req.user.userId }
    })
    
    const totalCaloriesBurned = workouts.reduce((sum, w) => sum + w.calories, 0)
    const totalWorkouts = workouts.length
    const totalCaloriesEaten = meals.reduce((sum, m) => sum + m.calories, 0)

    // Calculate weekly activity array
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weeklyActivity = days.map(day => ({ name: day, value: 0 }))
    
    // Group recent workouts by day (mock logic for the assessment)
    workouts.forEach(w => {
      const date = new Date(w.date)
      const dayName = days[date.getDay()]
      const dayIndex = weeklyActivity.findIndex(d => d.name === dayName)
      if (dayIndex !== -1) {
        weeklyActivity[dayIndex].value += w.calories
      }
    })

    // Shift array to start from Monday for better UI
    const shiftedActivity = [...weeklyActivity.slice(1), weeklyActivity[0]]

    res.json({
      caloriesBurned: totalCaloriesBurned,
      caloriesEaten: totalCaloriesEaten,
      workoutsCount: totalWorkouts,
      streak: 3, // mock streak for now
      weeklyActivity: shiftedActivity
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// POST /api/dashboard/workout
router.post('/workout', authMiddleware, async (req, res) => {
  try {
    const { name, duration, calories } = req.body
    const workout = await req.prisma.workout.create({
      data: {
        userId: req.user.userId,
        name,
        duration: parseInt(duration),
        calories: parseInt(calories)
      }
    })
    res.status(201).json(workout)
  } catch (error) {
    res.status(500).json({ error: 'Failed to log workout' })
  }
})

// POST /api/dashboard/meal
router.post('/meal', authMiddleware, async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body
    const meal = await req.prisma.mealLog.create({
      data: {
        userId: req.user.userId,
        name,
        calories: parseInt(calories),
        protein: protein ? parseInt(protein) : null,
        carbs: carbs ? parseInt(carbs) : null,
        fat: fat ? parseInt(fat) : null
      }
    })
    res.status(201).json(meal)
  } catch (error) {
    res.status(500).json({ error: 'Failed to log meal' })
  }
})

export default router

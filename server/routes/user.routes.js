import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import authMiddleware from '../middleware/auth.middleware.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

const uploadDir = path.join(__dirname, '../../public/uploads')
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// GET /api/user/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await req.prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { goals: true }
    })
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { password: _, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// POST /api/user/avatar (Upload)
router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const avatarUrl = `/uploads/${req.file.filename}`
    
    const user = await req.prisma.user.update({
      where: { id: req.user.userId },
      data: { avatar: avatarUrl }
    })

    res.json({ avatarUrl })
  } catch (error) {
    console.error('Avatar Upload Error:', error)
    res.status(500).json({ error: 'Failed to upload avatar' })
  }
})

export default router

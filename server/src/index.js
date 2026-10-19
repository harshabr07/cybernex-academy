import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { courses } from './courses.js'
import { readDb, writeDb } from './store.js'
import { login, me, register, requireAuth } from './auth.js'

const app = express()
const port = Number(process.env.PORT || 5000)
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: allowedOrigin }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => res.json({ status:'ok', app:'CYBERNEX ACADEMY API' }))
app.get('/api/courses', (_req, res) => res.json(courses))
app.post('/api/auth/register', register)
app.post('/api/auth/login', login)
app.get('/api/auth/me', requireAuth, me)

app.get('/api/progress', requireAuth, async (req, res) => {
  const db = await readDb()
  res.json(db.progress[req.auth.sub] || {})
})

app.post('/api/progress/:lessonId', requireAuth, async (req, res) => {
  const lessonId = String(req.params.lessonId)
  const courseId = String(req.body.courseId || '')
  const course = courses.find(c => c.id === courseId)
  const lesson = course?.lessons.find(l => l.id === lessonId)
  if (!lesson) return res.status(404).json({ error:'Lesson was not found in that course.' })

  const db = await readDb()
  if (!db.progress[req.auth.sub]) db.progress[req.auth.sub] = {}
  db.progress[req.auth.sub][lessonId] = true
  await writeDb(db)
  res.json({ progress: db.progress[req.auth.sub] })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error:'Unexpected server error. Check the backend terminal.' })
})

app.listen(port, () => {
  console.log(`CYBERNEX API running at http://localhost:${port}`)
})

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { readDb, writeDb } from './store.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-before-public-launch'

export function createToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ error: 'Please log in first.' })
  try {
    req.auth = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Session expired. Please log in again.' })
  }
}

export async function register(req, res) {
  const name = String(req.body.name || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')
  if (name.length < 2) return res.status(400).json({ error: 'Please enter your name (at least 2 characters).' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must contain at least 8 characters.' })

  const db = await readDb()
  if (db.users.some(u => u.email === email)) return res.status(409).json({ error: 'An account with this email already exists.' })
  const user = { id: crypto.randomUUID(), name, email, passwordHash: await bcrypt.hash(password, 12), createdAt: new Date().toISOString() }
  db.users.push(user)
  db.progress[user.id] = {}
  await writeDb(db)
  res.status(201).json({ token: createToken(user), user: { id:user.id, name:user.name, email:user.email } })
}

export async function login(req, res) {
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')
  const db = await readDb()
  const user = db.users.find(u => u.email === email)
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' })
  }
  res.json({ token: createToken(user), user: { id:user.id, name:user.name, email:user.email } })
}

export async function me(req, res) {
  const db = await readDb()
  const user = db.users.find(u => u.id === req.auth.sub)
  if (!user) return res.status(404).json({ error: 'User account not found.' })
  res.json({ id:user.id, name:user.name, email:user.email })
}

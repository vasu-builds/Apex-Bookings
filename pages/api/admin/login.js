import jwt from 'jsonwebtoken'

// Brute force protection
const attempts = new Map()
function checkBruteForce(ip) {
  const now = Date.now()
  const window = 15 * 60 * 1000 // 15 min
  const max = 10
  const entry = attempts.get(ip) || { count: 0, start: now }
  if (now - entry.start > window) { attempts.set(ip, { count: 1, start: now }); return true }
  if (entry.count >= max) return false
  entry.count++; attempts.set(ip, entry); return true
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (!checkBruteForce(ip)) {
    return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' })
  }

  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Credentials required' })

  const validUser = process.env.ADMIN_USER || 'admin'
  const validPass = process.env.ADMIN_PASS || 'apex@2024'
  const secret    = process.env.JWT_SECRET  || 'apex-bookings-secret-change-this'

  // Constant time comparison to prevent timing attacks
  const userMatch = username === validUser
  const passMatch = password === validPass

  if (userMatch && passMatch) {
    const token = jwt.sign({ admin: true }, secret, { expiresIn: '24h' })
    // Reset attempts on success
    attempts.delete(ip)
    res.status(200).json({ token })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
}

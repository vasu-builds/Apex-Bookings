import jwt from 'jsonwebtoken'
import { getSupabaseServer } from '../../../lib/supabase'

function verify(req) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    return jwt.verify(token, process.env.JWT_SECRET || 'apex-bookings-secret')
  } catch { return null }
}

// Fallback to JSON file if Supabase not configured
import fs from 'fs'
import path from 'path'
const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json')

function readLocalConfig() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) } catch { return {} }
}

export default async function handler(req, res) {
  if (!verify(req)) return res.status(401).json({ error: 'Unauthorized' })
  
  const sb = getSupabaseServer()

  if (req.method === 'GET') {
    if (sb) {
      try {
        const { data, error } = await sb.from('site_config').select('key, value')
        if (!error && data) {
          const config = {}
          data.forEach(row => { config[row.key] = row.value })
          return res.status(200).json(config)
        }
      } catch(e) { /* fall through to local */ }
    }
    return res.status(200).json(readLocalConfig())
  }

  if (req.method === 'POST') {
    const config = req.body
    if (sb) {
      try {
        const upserts = Object.entries(config).map(([key, value]) => ({ key, value, updated_at: new Date().toISOString() }))
        const { error } = await sb.from('site_config').upsert(upserts, { onConflict: 'key' })
        if (!error) {
          const hook = process.env.DEPLOY_HOOK_URL
          if (hook) { try { await fetch(hook, { method: 'POST' }) } catch {} }
          return res.status(200).json({ success: true })
        }
      } catch(e) { /* fall through to local */ }
    }
    // Fallback: write to local JSON
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(config, null, 2))
      return res.status(200).json({ success: true })
    } catch (e) {
      return res.status(500).json({ error: 'Cannot write file. Configure Supabase for persistent storage.' })
    }
  }
  res.status(405).end()
}

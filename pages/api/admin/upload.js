import jwt from 'jsonwebtoken'
import { getSupabaseServer } from '../../../lib/supabase'
import fs from 'fs'
import path from 'path'

export const config = { api: { bodyParser: { sizeLimit: '5mb' } } }

function verify(req) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    return jwt.verify(token, process.env.JWT_SECRET || 'apex-bookings-secret')
  } catch { return null }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!verify(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { filename, data } = req.body
  if (!filename || !data) return res.status(400).json({ error: 'filename and data required' })

  const safe = filename.split(/[\\/]/).pop().replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
  const ext = safe.split('.').pop()
  if (!['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
    return res.status(400).json({ error: 'Only image files allowed (jpg, png, webp, gif, svg)' })
  }

  const base64 = data.replace(/^data:[^;]+;base64,/, '')
  const buffer = Buffer.from(base64, 'base64')

  if (buffer.length > 4 * 1024 * 1024) return res.status(400).json({ error: 'Max 4MB' })

  const sb = getSupabaseServer()
  
  if (sb) {
    try {
      const ts = Date.now()
      const storagePath = `uploads/${ts}-${safe}`
      const { data: uploadData, error } = await sb.storage
        .from('apex-images')
        .upload(storagePath, buffer, { contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`, upsert: true })
      if (!error) {
        const { data: urlData } = sb.storage.from('apex-images').getPublicUrl(storagePath)
        await sb.from('uploaded_images').insert({ filename: safe, url: urlData.publicUrl, size: buffer.length }).catch(() => {})
        return res.status(200).json({ url: urlData.publicUrl, filename: safe })
      }
    } catch(e) { /* fall through to local */ }
  }

  // Fallback: save to public/images/ (works locally, not on Vercel)
  try {
    const imgDir = path.join(process.cwd(), 'public', 'images')
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true })
    fs.writeFileSync(path.join(imgDir, safe), buffer)
    return res.status(200).json({ url: `/images/${safe}`, filename: safe })
  } catch {
    return res.status(500).json({ error: 'Upload failed. Configure Supabase Storage bucket named "apex-images".' })
  }
}

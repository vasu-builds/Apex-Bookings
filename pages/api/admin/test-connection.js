import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

function verify(req) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    return jwt.verify(token, process.env.JWT_SECRET || 'apex-bookings-secret')
  } catch { return null }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  if (!verify(req)) return res.status(401).json({ error: 'Unauthorized' })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const result = {
    env: {
      supabase_url: url && !url.includes('your-project') ? '✓ Set' : '✗ Missing',
      service_key: serviceKey && !serviceKey.includes('your-service') ? '✓ Set' : '✗ Missing',
      anon_key: anonKey && !anonKey.includes('your-anon') ? '✓ Set' : '✗ Missing',
      jwt_secret: process.env.JWT_SECRET && process.env.JWT_SECRET !== 'apex-bookings-secret-change-this' ? '✓ Set' : '⚠ Using default',
      resend_key: process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('your_key') ? '✓ Set' : '✗ Missing',
    },
    supabase: { connected: false, tables: {}, storage: 'unknown', error: null }
  }

  if (!url || url.includes('your-project') || !serviceKey || serviceKey.includes('your-service')) {
    result.supabase.error = 'Credentials not configured'
    return res.json(result)
  }

  try {
    const sb = createClient(url, serviceKey)

    // Test site_config table
    const { data: cfg, error: cfgErr } = await sb.from('site_config').select('key').limit(1)
    result.supabase.tables.site_config = cfgErr ? `✗ ${cfgErr.message}` : `✓ OK (${cfg?.length ?? 0} rows)`

    // Test blog_posts table
    const { data: blog, error: blogErr } = await sb.from('blog_posts').select('id').limit(1)
    result.supabase.tables.blog_posts = blogErr ? `✗ ${blogErr.message}` : `✓ OK`

    // Test storage bucket
    const { data: buckets, error: buckErr } = await sb.storage.listBuckets()
    if (buckErr) {
      result.supabase.storage = `✗ ${buckErr.message}`
    } else {
      const apex = buckets?.find(b => b.name === 'apex-images')
      result.supabase.storage = apex ? '✓ apex-images bucket exists' : '✗ apex-images bucket missing — create it in Supabase Storage'
    }

    result.supabase.connected = !cfgErr && !blogErr
  } catch (e) {
    result.supabase.error = e.message
  }

  return res.json(result)
}

import { getSupabaseServer } from '../../lib/supabase'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json')

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  
  const sb = getSupabaseServer()
  if (sb) {
    try {
      const { data, error } = await sb.from('site_config').select('key, value')
      if (!error && data) {
        const config = {}
        data.forEach(row => { config[row.key] = row.value })
        return res.status(200).json(config)
      }
    } catch(e) { /* fall through to local JSON */ }
  }
  
  // Fallback to local JSON
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    return res.status(200).json(data)
  } catch {
    return res.status(200).json({})
  }
}

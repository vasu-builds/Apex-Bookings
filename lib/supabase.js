import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function isRealCred(val) {
  if (!val) return false
  if (val.includes('your-project') || val.includes('your-')) return false
  if (val === 'your-anon-key-here' || val === 'your-service-role-key-here') return false
  return true
}

// Server-side client (for API routes) - uses service key
export function getSupabaseServer() {
  if (!isRealCred(url) || !isRealCred(serviceKey)) return null
  return createClient(url, serviceKey)
}

// Client-side client
export function getSupabaseClient() {
  if (!isRealCred(url) || !isRealCred(anonKey)) return null
  return createClient(url, anonKey)
}

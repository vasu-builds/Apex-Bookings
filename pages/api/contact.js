import { getSupabaseServer } from '../../lib/supabase'

function sanitize(str, maxLen = 500) {
  if (!str) return ''
  return String(str).replace(/<[^>]*>/g, '').replace(/[<>'"]/g, '').trim().slice(0, maxLen)
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) }
function isValidPhone(p) { return /^[\d\s\+\-\(\)]{7,20}$/.test(p) }

const ALLOWED_SERVICES = [
  'Channel Manager','Booking Engine','Cloud PMS','Cloud POS',
  'Google Hotel Ads','Revenue Management','OTA Listing',
  'Digital Marketing','Website Development','Payment Gateway',''
]

// Simple in-memory rate limiting
const rateLimit = new Map()
function checkRateLimit(ip) {
  const now = Date.now()
  const window = 60 * 1000
  const max = 5
  const entry = rateLimit.get(ip) || { count: 0, start: now }
  if (now - entry.start > window) { rateLimit.set(ip, { count: 1, start: now }); return true }
  if (entry.count >= max) return false
  entry.count++; rateLimit.set(ip, entry); return true
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many requests. Please try again later.' })

  const name    = sanitize(req.body?.name, 100)
  const email   = sanitize(req.body?.email, 200)
  const phone   = sanitize(req.body?.phone, 20)
  const hotel   = sanitize(req.body?.hotel, 150)
  const service = sanitize(req.body?.service, 100)
  const subject = sanitize(req.body?.subject, 200)
  const message = sanitize(req.body?.message, 2000)
  const source  = sanitize(req.body?.source, 50)

  if (!name || name.length < 2) return res.status(400).json({ error: 'Please enter your name.' })
  if (!phone || !isValidPhone(phone)) return res.status(400).json({ error: 'Please enter a valid phone number.' })
  if (email && !isValidEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (service && !ALLOWED_SERVICES.includes(service)) return res.status(400).json({ error: 'Invalid service selected.' })

  // ── Save to Supabase ──────────────────────────────────
  try {
    const sb = getSupabaseServer()
    if (sb) {
      await sb.from('enquiries').insert({
        name, email: email || null, phone,
        hotel: hotel || null,
        service: service || subject || null,
        message: message || null,
        source: source || 'website',
        ip,
        created_at: new Date().toISOString(),
      })
    }
  } catch (dbErr) {
    console.error('Supabase insert error:', dbErr)
    // Don't block — still send email even if DB fails
  }

  // ── Send via Resend ───────────────────────────────────
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && apiKey !== 're_your_api_key_here') {
      const { Resend } = require('resend')
      const resend = new Resend(apiKey)
      const adminEmail = process.env.ADMIN_EMAIL || 'info@apexbookings.in'

      const rows = [
        ['Name',    name],
        ['Phone',   phone],
        ['Email',   email  || '—'],
        ['Hotel',   hotel  || '—'],
        ['Service', service || subject || '—'],
        ['Message', message || '—'],
        ['Source',  source || 'website'],
      ]

      await resend.emails.send({
        from: 'Apex Bookings <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Enquiry: ${name}${hotel ? ` — ${hotel}` : ''}${service ? ` (${service})` : ''}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f8f9fc;border-radius:12px">
            <h2 style="color:#0f1623;font-size:22px;margin-bottom:20px">New Enquiry from Website</h2>
            <table style="width:100%;border-collapse:collapse">
              ${rows.map(([k,v]) => `<tr><td style="padding:9px 0;font-weight:600;color:#6b7280;font-size:13px;width:80px;vertical-align:top">${k}</td><td style="padding:9px 0;font-size:14px;color:#0f1623;word-break:break-word">${v}</td></tr>`).join('')}
            </table>
          </div>`,
      })

      if (email) {
        await resend.emails.send({
          from: 'Apex Bookings <onboarding@resend.dev>',
          to: email,
          subject: 'We received your enquiry — Apex Bookings',
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px">
              <h2 style="color:#1a4fc4;font-size:22px">Thank you, ${name}!</h2>
              <p style="color:#374151;line-height:1.7">We've received your enquiry and our team will get back to you within 24 hours.</p>
              <p style="color:#374151;line-height:1.7">For a faster response, call us at <a href="tel:+918171871902" style="color:#1a4fc4">+91 81718 71902</a>.</p>
              <p style="color:#6b7280;font-size:13px;margin-top:24px">— Apex Bookings Team</p>
            </div>`,
        })
      }
    }
  } catch (emailErr) {
    console.error('Resend error:', emailErr)
  }

  res.status(200).json({ success: true })
}

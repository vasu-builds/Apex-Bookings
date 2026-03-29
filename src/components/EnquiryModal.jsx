import { useState, useEffect } from 'react'

const SERVICES = [
  'Channel Manager', 'Booking Engine', 'Cloud PMS', 'Cloud POS',
  'Google Hotel Ads', 'Revenue Management', 'OTA Listing',
  'Digital Marketing', 'Website Development', 'Payment Gateway',
]

function validate(form) {
  const errors = {}
  if (!form.name.trim())
    errors.name = 'Please enter your name'
  else if (form.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'

  if (!form.phone.trim())
    errors.phone = 'Phone number is required'
  else if (!/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(form.phone.trim().replace(/\s/g, '')))
    errors.phone = 'Enter a valid 10-digit phone number'

  if (form.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email))
    errors.email = 'Enter a valid email address'

  if (form.message && form.message.length > 2000)
    errors.message = 'Message too long (max 2000 characters)'
  else if (form.message && form.message.trim().length > 0 && form.message.trim().length < 10)
    errors.message = 'Message is too short'
    
  return errors
}

export default function EnquiryModal({ open, onClose, defaultService = '' }) {
  const [form, setForm] = useState({ name: '', hotel: '', phone: '', email: '', service: defaultService, message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (open) {
      setForm(f => ({ ...f, service: defaultService || '' }))
      setStatus('idle')
      setErrors({})
      setErrorMsg('')
    }
  }, [open, defaultService])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'enquiry' }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('idle')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('idle')
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,14,24,0.72)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--card, #fff)', borderRadius: 20,
        width: '100%', maxWidth: 480, padding: '36px 32px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
        position: 'relative', maxHeight: '92vh', overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, width: 32, height: 32,
          border: 'none', background: 'var(--surface, #f4f6fa)', borderRadius: '50%',
          cursor: 'pointer', fontSize: 18, color: 'var(--muted, #6b7280)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
        }}>×</button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(22,163,74,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
              We'll be in touch!
            </h3>
            <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>
              Thanks {form.name}. Our team will reach out to you shortly.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ display: 'inline-block' }}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 22 }}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--ink)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                Get in Touch
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                Tell us about your hotel and we'll call you back within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="Your Name" required error={errors.name}>
                <input type="text" placeholder="Rahul Sharma" value={form.name}
                  onChange={e => set('name', e.target.value)} style={inputStyle(!!errors.name)} />
              </Field>

              <Field label="Hotel Name" error={errors.hotel}>
                <input type="text" placeholder="Grand Palace Hotel" value={form.hotel}
                  onChange={e => set('hotel', e.target.value)} style={inputStyle(false)} />
              </Field>

              <Field label="Phone Number" required error={errors.phone}>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                  onChange={e => set('phone', e.target.value)} style={inputStyle(!!errors.phone)} />
              </Field>

              <Field label="Email (optional)" error={errors.email}>
                <input type="email" placeholder="you@hotel.com" value={form.email}
                  onChange={e => set('email', e.target.value)} style={inputStyle(!!errors.email)} />
              </Field>

              <Field label="Service Interested In" error={errors.service}>
                <select value={form.service} onChange={e => set('service', e.target.value)}
                  style={{ ...inputStyle(false), backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236b7280' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', appearance: 'none' }}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea placeholder="Tell us about your requirements…" value={form.message}
                  onChange={e => set('message', e.target.value)} rows={3}
                  style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: 80 }} />
                {form.message.length > 1800 && (
                  <span style={{ fontSize: 11, color: form.message.length > 2000 ? '#ef4444' : 'var(--muted)', marginTop: 3, display: 'block' }}>
                    {form.message.length}/2000
                  </span>
                )}
              </Field>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#dc2626' }}>
                  {errorMsg}
                </div>
              )}

              <button type="submit" className="btn-primary"
                disabled={status === 'loading'}
                style={{ marginTop: 4, opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
                {status === 'loading' ? 'Sending…' : 'Send Enquiry →'}
              </button>

              <p style={{ fontSize: 11.5, color: 'var(--muted)', textAlign: 'center', margin: 0 }}>
                We never share your information with third parties.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: 12, color: '#ef4444', marginTop: 3, display: 'block' }}>{error}</span>}
    </div>
  )
}

const inputStyle = (hasError) => ({
  width: '100%', padding: '10px 14px',
  border: `1.5px solid ${hasError ? '#ef4444' : 'var(--border, #e5e7eb)'}`,
  borderRadius: 10, fontSize: 14, fontFamily: 'inherit',
  color: 'var(--ink)', background: 'var(--surface, #f9fafb)',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
})

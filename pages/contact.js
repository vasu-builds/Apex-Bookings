import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'

function isValidEmail(e) { return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e) }
function isValidPhone(p) { return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(p.replace(/\s/g, '')) }

export default function Contact() {
  const [form, setForm] = useState({name:'',email:'',phone:'',subject:'',message:''})
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const set = k => e => {
    let val = e.target.value
    if (k === 'name') val = val.slice(0, 100)
    if (k === 'subject') val = val.slice(0, 200)
    if (k === 'message') val = val.slice(0, 2000)
    if (k === 'phone') val = val.replace(/[^0-9+\s\-\(\)]/g, '').slice(0, 20)

    setForm(f => ({...f,[k]:val}))
    if (errors[k]) setErrors(er => ({...er,[k]:undefined}))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    else if (form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    
    if (!form.email) e.email = 'Please enter your email'
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email address'
    
    if (form.phone && !isValidPhone(form.phone)) e.phone = 'Enter a valid 10-digit phone number'
    
    if (!form.subject.trim()) e.subject = 'Please enter a subject'
    if (!form.message.trim()) e.message = 'Please enter your message'
    else if (form.message.trim().length < 10) e.message = 'Message is too short'
    return e
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setApiError('')
    try {
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({...form, source:'contact'})
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSent(true)
      } else {
        setApiError(data.error || 'Something went wrong. Please try again.')
      }
    } catch(err) {
      setApiError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <>
            <Head>
        <title>Contact Apex Bookings — Get a Free Hotel Consultation</title>
        <meta name="description" content="Contact Apex Bookings for a free consultation on hotel technology, revenue management, or OTA listing. WhatsApp, call, or email. Based in Haldwani, serving hotels across India."/>
        <meta name="keywords" content="contact apex bookings, hotel technology consultation, apex bookings haldwani, hotel management company contact"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href="https://apexbookings.in/contact"/>
        <meta property="og:title" content="Contact Apex Bookings — Get a Free Hotel Consultation"/>
        <meta property="og:description" content="Contact Apex Bookings for a free consultation on hotel technology, revenue management, or OTA listing. WhatsApp, call, or email. Based in Haldwani, serving hotels across India."/>
        <meta property="og:url" content="https://apexbookings.in/contact"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Contact Apex Bookings — Get a Free Hotel Consultation"/>
        <meta name="twitter:description" content="Contact Apex Bookings for a free consultation on hotel technology, revenue management, or OTA listing. WhatsApp, call, or email. Based in Haldwani, serving hotels across India."/>
      </Head>
      <Navbar light={true}/>
      <div style={{paddingTop:68}}>
        <div style={{background:'var(--surface)',borderBottom:'1px solid var(--border)',padding:'52px 0 40px'}}>
          <div className="container">
            <span className="label">Contact</span>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,52px)',fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:10}}>
              Let's talk about your hotel
            </h1>
            <p style={{fontSize:16,color:'var(--muted)',maxWidth:520,lineHeight:1.75,fontWeight:400}}>
              Whether you're exploring our products or ready to get started, our team responds within hours.
            </p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="contact-wrap">
              <div className="contact-left">
                <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:22,fontWeight:800,color:'white',letterSpacing:'-0.02em',marginBottom:8}}>Get in touch</h3>
                <p style={{fontSize:14,color:'rgba(255,255,255,0.4)',lineHeight:1.7,marginBottom:32,fontWeight:400}}>Available Mon–Sat, 9am–6pm IST. For fastest response, use WhatsApp.</p>
                <div>
                  {[
                    {l:'Address', v:"Phartyal's Annexe, Anupam Vihar\nHaldwani — 263139, Uttarakhand"},
                    {l:'Phone', v:'+91 8171871902\n+91 8979071902'},
                    {l:'Email', v:'info@apexbookings.in\nsupport@apexbookings.in'},
                    {l:'Hours', v:'Monday – Saturday\n9:00 AM – 6:00 PM IST'},
                  ].map((item,i) => (
                    <div key={i} className="contact-info">
                      <div className="contact-info-l">{item.l}</div>
                      <div className="contact-info-v">{item.v}</div>
                    </div>
                  ))}
                </div>
                <a href="https://api.whatsapp.com/send/?phone=918171871902" target="_blank" rel="noopener noreferrer"
                  style={{marginTop:32,display:'flex',alignItems:'center',gap:14,background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.18)',borderRadius:12,padding:'16px 20px',textDecoration:'none'}}>
                  <div style={{width:40,height:40,background:'#25D366',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:13.5,fontWeight:700,color:'#4ade80',marginBottom:2}}>Fastest — WhatsApp Us</div>
                    <div style={{fontSize:12,color:'rgba(255,255,255,0.3)'}}>Usually replies within minutes</div>
                  </div>
                </a>
              </div>

              <div className="contact-right">
                {sent ? (
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:360,textAlign:'center'}}>
                    <div style={{width:60,height:60,background:'#f0fdf4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:26,fontWeight:800,color:'var(--ink)',marginBottom:10}}>Message sent</h3>
                    <p style={{color:'var(--muted)',fontSize:15,lineHeight:1.7,maxWidth:300}}>Our team will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:24,fontWeight:800,color:'var(--ink)',letterSpacing:'-0.02em',marginBottom:6}}>Send a message</h3>
                    <p style={{fontSize:14,color:'var(--muted)',marginBottom:28,lineHeight:1.6}}>Tell us about your property and what you need.</p>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                      <div>
                        <label className="field-l">Full Name *</label>
                        <input className="field-i" type="text" placeholder="Raj Sharma" value={form.name} onChange={set('name')} style={{borderColor:errors.name?'#ef4444':undefined}}/>
                        {errors.name && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.name}</span>}
                      </div>
                      <div>
                        <label className="field-l">Email *</label>
                        <input className="field-i" type="email" placeholder="raj@hotel.com" value={form.email} onChange={set('email')} style={{borderColor:errors.email?'#ef4444':undefined}}/>
                        {errors.email && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.email}</span>}
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                      <div>
                        <label className="field-l">Phone</label>
                        <input className="field-i" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} style={{borderColor:errors.phone?'#ef4444':undefined}}/>
                        {errors.phone && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.phone}</span>}
                      </div>
                      <div>
                        <label className="field-l">Subject *</label>
                        <input className="field-i" type="text" placeholder="Channel Manager" value={form.subject} onChange={set('subject')} style={{borderColor:errors.subject?'#ef4444':undefined}}/>
                        {errors.subject && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.subject}</span>}
                      </div>
                    </div>
                    <div style={{marginBottom:16}}>
                      <label className="field-l">Message *</label>
                      <textarea className="field-i" rows={5} placeholder="Tell us about your hotel and what you're looking for..." value={form.message} onChange={set('message')} style={{resize:'none',borderColor:errors.message?'#ef4444':undefined}}/>
                      {errors.message && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.message}</span>}
                    </div>
                    {apiError && (
                      <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#dc2626',marginBottom:16}}>
                        {apiError}
                      </div>
                    )}
                    <button type="submit" disabled={loading} className="btn-blue" style={{opacity:loading?0.7:1,width:'100%',justifyContent:'center',cursor:loading?'not-allowed':'pointer'}}>
                      {loading ? 'Sending...' : 'Send Message'}
                      {!loading && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

function isValidEmail(e) { return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e) }
function isValidPhone(p) { return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(p.replace(/\s/g, '')) }

export default function Offer() {
  const [form, setForm] = useState({name:'',hotel:'',email:'',phone:''})
  const [errors, setErrors] = useState({})
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const set = k => e => {
    let val = e.target.value
    if (k === 'name') val = val.slice(0, 100)
    if (k === 'hotel') val = val.slice(0, 150)
    if (k === 'phone') val = val.replace(/[^0-9+\s\-\(\)]/g, '').slice(0, 20)
    setForm(f => ({...f,[k]:val}))
    if (errors[k]) setErrors(er => ({...er,[k]:undefined}))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    else if (form.name.trim().length < 2) e.name = 'Min 2 characters'
    
    if (!form.hotel.trim()) e.hotel = 'Please enter your hotel name'
    
    if (!form.email) e.email = 'Email required'
    else if (!isValidEmail(form.email)) e.email = 'Invalid email'
    
    if (!form.phone) e.phone = 'Phone required'
    else if (!isValidPhone(form.phone)) e.phone = 'Enter valid 10-digit number'
    return e
  }

  const submit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({...form, source:'offer', subject:'Complete Hotel Suite Offer'})
      })
      setSent(true)
    } catch {}
    setLoading(false)
  }

  const features = [
    {icon:'📡', title:'Channel Manager', desc:'Connect 15+ OTAs and sync rates and inventory in real-time with one click.'},
    {icon:'🏨', title:'Property Management System', desc:'Complete front desk, housekeeping, billing and reporting from any device.'},
    {icon:'🔖', title:'Booking Engine', desc:'Commission-free direct bookings from your hotel website. 100% revenue to you.'},
    {icon:'🌐', title:'Hotel Website Builder', desc:'Responsive, SEO-optimized hotel website designed to convert visitors into guests.'},
    {icon:'🔒', title:'Hosting + SSL Certificate', desc:'Reliable hosting, free SSL, and ongoing technical support included.'},
  ]

  return (
    <>
      <Head>
        <title>Complete Hotel Suite — Limited Time Offer | Apex Bookings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Get Channel Manager, PMS, Booking Engine, Website & Hosting in one bundle. Limited time offer from Apex Bookings."/>
      </Head>
      <Navbar light={false}/>

            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
{/* Hero */}
      <section style={{background:'var(--ink-2)',padding:'120px 0 64px',position:'relative',overflow:'hidden'}}>
        <div className="hero-tech-dots"/>
        <div className="hero-tech-bg"/>
        <div className="container" style={{position:'relative',zIndex:1,textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(240,165,0,0.12)',border:'1px solid rgba(240,165,0,0.25)',borderRadius:100,padding:'6px 16px',marginBottom:24}}>
            <span style={{fontSize:11,fontWeight:700,color:'var(--gold)',letterSpacing:'0.06em',textTransform:'uppercase'}}>🔥 Limited Time Offer</span>
          </div>
          <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(26px,5vw,56px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:20}}>
            All-in-One Hotel Technology Suite
          </h1>
          <p style={{fontSize:'clamp(14px,2vw,17px)',color:'rgba(255,255,255,0.55)',maxWidth:520,margin:'0 auto 32px',lineHeight:1.75,padding:'0 16px'}}>
            Everything your hotel needs to manage operations, maximize revenue, and grow online — in one powerful bundle.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',fontSize:13,color:'rgba(255,255,255,0.5)',padding:'0 16px'}}>
            {['200+ Hotels Trust Us','7+ Years Experience','Setup in 3–5 Days'].map(s => (
              <div key={s} style={{display:'flex',alignItems:'center',gap:6}}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-7" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Form */}
      <section className="section">
        <div className="container">
          <div className="offer-grid">
            {/* Left — Features */}
            <div>
              <span className="label">What&apos;s Included</span>
              <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(22px,3vw,34px)',fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',marginBottom:28,lineHeight:1.1}}>
                Five products. One bundle. One price.
              </h2>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {features.map((f,i) => (
                  <div key={i} style={{display:'flex',gap:14,padding:'18px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)',transition:'border-color 0.2s'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='#c5d0f5'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                    <div style={{width:40,height:40,background:'var(--blue-l)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{fontWeight:700,fontSize:14.5,color:'var(--ink)',marginBottom:3}}>{f.title}</div>
                      <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.6}}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:28,padding:'20px',background:'var(--blue)',borderRadius:12}}>
                <p style={{fontSize:13.5,fontWeight:700,color:'white',marginBottom:10}}>Trusted by hotels across India</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {['200+ Hotels','15+ OTAs Connected','Setup in 3–5 Days','24/7 Support'].map(s => (
                    <div key={s} style={{background:'rgba(255,255,255,0.12)',color:'rgba(255,255,255,0.85)',padding:'4px 11px',borderRadius:100,fontSize:12,fontWeight:600}}>{s}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="offer-form">
              {sent ? (
                <div style={{textAlign:'center',padding:'40px 20px'}}>
                  <div style={{width:60,height:60,background:'#f0fdf4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:24,fontWeight:800,color:'var(--ink)',marginBottom:10}}>Request Received!</h3>
                  <p style={{color:'var(--muted)',fontSize:14.5,lineHeight:1.7,marginBottom:20}}>Our team will contact you within 24 hours with the bundle pricing details.</p>
                  <button onClick={() => setEnquiryOpen(true)} className="btn-whatsapp" style={{border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>WhatsApp for Faster Response</button>
                </div>
              ) : (
                <>
                  <div style={{marginBottom:24}}>
                    <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:21,fontWeight:800,color:'var(--ink)',marginBottom:6}}>Claim This Offer</h3>
                    <p style={{fontSize:13.5,color:'var(--muted)',lineHeight:1.6}}>Fill in your details and we&apos;ll share the exclusive bundle pricing with you.</p>
                  </div>
                  <form onSubmit={submit}>
                    <div style={{marginBottom:14}}>
                      <label className="field-l">Your Name *</label>
                      <input className="field-i" type="text" placeholder="Raj Sharma" value={form.name} onChange={set('name')} style={{borderColor:errors.name?'#ef4444':undefined}}/>
                      {errors.name && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.name}</span>}
                    </div>
                    <div style={{marginBottom:14}}>
                      <label className="field-l">Hotel Name *</label>
                      <input className="field-i" type="text" placeholder="Hotel Grand" value={form.hotel} onChange={set('hotel')} style={{borderColor:errors.hotel?'#ef4444':undefined}}/>
                      {errors.hotel && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.hotel}</span>}
                    </div>
                    <div style={{marginBottom:14}}>
                      <label className="field-l">Email *</label>
                      <input className="field-i" type="email" placeholder="you@hotel.com" value={form.email} onChange={set('email')} style={{borderColor:errors.email?'#ef4444':undefined}}/>
                      {errors.email && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.email}</span>}
                    </div>
                    <div style={{marginBottom:24}}>
                      <label className="field-l">Phone *</label>
                      <input className="field-i" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} style={{borderColor:errors.phone?'#ef4444':undefined}}/>
                      {errors.phone && <span style={{fontSize:12,color:'#ef4444',display:'block',marginTop:3}}>{errors.phone}</span>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{width:'100%',justifyContent:'center',opacity:loading?0.7:1,padding:'14px',fontSize:15}}>
                      {loading ? 'Submitting...' : 'Get Pricing & Details →'}
                    </button>
                    <p style={{textAlign:'center',fontSize:12,color:'var(--muted)',marginTop:10}}>
                      We&apos;ll respond within 24 hours. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer/>

      <style>{`
        .offer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: flex-start;
        }
        @media (min-width: 768px) {
          .offer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 56px;
          }
        }
      `}</style>
    </>
  )
}

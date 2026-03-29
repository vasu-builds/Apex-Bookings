import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Popup({ config }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!config?.enabled) return
    const seen = sessionStorage.getItem('popup-seen')
    if (seen) return
    const t = setTimeout(() => setShow(true), 3500)
    return () => clearTimeout(t)
  }, [config])

  if (!show) return null

  const close = () => {
    sessionStorage.setItem('popup-seen', '1')
    setShow(false)
  }

  return (
    <div className="popup-overlay" onClick={e => { if (e.target === e.currentTarget) close() }}>
      <div className="popup-card">
        <button className="popup-close" onClick={close}>×</button>
        <div className="popup-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--gold-dk)"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>
          {config?.badge || 'Limited Time Offer'}
        </div>
        <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(20px,3vw,26px)',fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',marginBottom:10,lineHeight:1.15}}>
          {config?.headline || 'Complete Hotel Technology Suite'}
        </h2>
        <p style={{fontSize:14.5,color:'var(--muted)',lineHeight:1.7,marginBottom:24}}>
          {config?.subtext || 'Get Channel Manager, PMS, Booking Engine, Website & Hosting all in one powerful bundle.'}
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:28}}>
          {['Channel Manager','Property Management System','Booking Engine','Hotel Website Builder','Hosting + SSL Certificate'].map(f => (
            <div key={f} style={{display:'flex',alignItems:'center',gap:9,fontSize:14,color:'var(--ink)'}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}>
                <circle cx="8" cy="8" r="7" fill="var(--blue)" fillOpacity="0.12"/>
                <path d="M5 8l2 2 4-4" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {f}
            </div>
          ))}
        </div>
        <Link href={config?.ctaLink || '/offer'} className="btn-primary" style={{display:'block',textAlign:'center',width:'100%'}} onClick={close}>
          {config?.ctaText || 'Claim This Offer'} →
        </Link>
        <button onClick={close} style={{display:'block',width:'100%',textAlign:'center',marginTop:12,fontSize:13,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>
          No thanks
        </button>
      </div>
    </div>
  )
}

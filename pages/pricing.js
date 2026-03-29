import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const DEFAULT_PLANS = [
  {name:'Starter',price:'3,000',sub:'Get online, start getting bookings',featured:false,features:['Rates Management','Bookings Management','Payment Collection','Payment Gateway Solutions','Channel Manager','Booking Engine']},
  {name:'Growth',price:'6,000',sub:'Streamline your daily operations',featured:true,features:['Everything in Starter','Channel Manager','Booking Engine','Cloud PMS','Cloud POS','Front Desk Operations','Billing & Invoicing']},
  {name:'Pro',price:'15,000',sub:'Full suite with expert management',featured:false,features:['Everything in Growth','Website + Hosting + SSL','Google Hotel Ads + OTA Listing','Revenue Management','Dedicated Account Manager']},
]
const DEFAULT_COMBO = {visible:true,name:'Complete Hotel Suite',price:'Contact Us',badge:'🔥 Limited Time Offer',features:['Channel Manager','PMS — Property Management System','Booking Engine','Hotel Website Builder','Hosting + SSL Certificate']}

const CheckIcon = ({gold}) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{color:gold?'var(--gold-dk)':'var(--blue)',flexShrink:0}}>
    <path d="M2.5 7l3 3 6-5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Pricing() {
  const [plans, setPlans] = useState(DEFAULT_PLANS)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [combo, setCombo] = useState(DEFAULT_COMBO)

  useEffect(() => {
    fetch('/api/public-config')
      .then(r => r.json())
      .then(d => {
        if (d.pricing?.length) setPlans(d.pricing)
        if (d.combo) setCombo(d.combo)
      })
      .catch(() => {})
  }, [])

  return (
    <>
            <Head>
        <title>Hotel Technology Pricing — Starter, Growth & Pro Plans | Apex Bookings</title>
        <meta name="description" content="Transparent pricing for hotel Channel Manager, Booking Engine, PMS, and Revenue Management. Plans starting from ₹3,000/month. No hidden fees."/>
        <meta name="keywords" content="hotel technology pricing, channel manager price india, hotel PMS pricing, apex bookings pricing, hotel software cost"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href="https://apexbookings.in/pricing"/>
        <meta property="og:title" content="Hotel Technology Pricing — Starter, Growth & Pro Plans | Apex Bookings"/>
        <meta property="og:description" content="Transparent pricing for hotel Channel Manager, Booking Engine, PMS, and Revenue Management. Plans starting from ₹3,000/month. No hidden fees."/>
        <meta property="og:url" content="https://apexbookings.in/pricing"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Technology Pricing — Starter, Growth & Pro Plans | Apex Bookings"/>
        <meta name="twitter:description" content="Transparent pricing for hotel Channel Manager, Booking Engine, PMS, and Revenue Management. Plans starting from ₹3,000/month. No hidden fees."/>
      </Head>
      <Navbar light={true}/>
            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
<div style={{paddingTop:68}}>
        <div style={{background:'var(--surface)',borderBottom:'1px solid var(--border)',padding:'52px 0 40px'}}>
          <div className="container">
            <span className="label">Pricing</span>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,52px)',fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:10}}>
              Simple, transparent pricing
            </h1>
            <p style={{fontSize:16,color:'var(--muted)',lineHeight:1.75}}>Billed annually · Excl. GST · No setup fees · No hidden charges</p>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,alignItems:'start'}}>

              {/* 3 regular plans */}
              {plans.map(p => (
                <div key={p.name} className={p.featured?'price-col price-dark':'price-col'} style={{borderRadius:18,border:p.featured?'none':'1px solid var(--border)'}}>
                  {p.featured && <div className="price-badge">Most Popular</div>}
                  <div className="price-name">{p.name}</div>
                  <div style={{fontSize:12.5,color:p.featured?'rgba(255,255,255,0.3)':'var(--muted)',marginBottom:20,fontWeight:400}}>{p.sub}</div>
                  <div className="price-amt">₹{p.price}</div>
                  <div className="price-per">per month</div>
                  <div className="price-line"/>
                  {(p.features||[]).map(f => (
                    <div key={f} className="price-feature"><CheckIcon/>{f}</div>
                  ))}
                  <button onClick={() => setEnquiryOpen(true)} className="price-btn" style={{border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>Get Started</button>
                </div>
              ))}

              {/* Combo card - only if visible */}
              {combo.visible && (
                <div className="combo-card">
                  <div className="combo-badge">{combo.badge}</div>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--gold-dk)',marginBottom:12}}>{combo.name}</div>
                  <div className="combo-price" style={{marginBottom:4}}>{combo.price.startsWith('₹')?combo.price:`₹${combo.price}`}</div>
                  <div className="combo-price-sub" style={{marginBottom:20}}>Special bundle pricing</div>
                  <div style={{height:1,background:'rgba(240,165,0,0.25)',marginBottom:18}}/>
                  <div style={{fontSize:12.5,fontWeight:700,color:'var(--ink)',marginBottom:10,letterSpacing:'0.04em'}}>EVERYTHING INCLUDED:</div>
                  {(combo.features||[]).map(f => (
                    <div key={f} style={{display:'flex',alignItems:'center',gap:8,fontSize:13.5,color:'var(--ink)',padding:'5px 0'}}>
                      <CheckIcon gold/>
                      {f}
                    </div>
                  ))}
                  <Link href="/offer" style={{display:'block',textAlign:'center',marginTop:20,padding:'13px',borderRadius:10,fontWeight:700,fontSize:14,background:'var(--gold)',color:'var(--ink)',textDecoration:'none'}}>
                    Claim This Offer →
                  </Link>
                  <p style={{textAlign:'center',fontSize:12,color:'var(--muted)',marginTop:10}}>Limited availability · Offer ends soon</p>
                </div>
              )}
            </div>

            <div style={{marginTop:40,padding:'28px 32px',background:'var(--surface)',borderRadius:14,border:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
              <div>
                <p style={{fontWeight:700,fontSize:15.5,color:'var(--ink)',marginBottom:4}}>Managing a hotel chain or group?</p>
                <p style={{color:'var(--muted)',fontSize:13.5}}>We offer custom pricing and white-label solutions for multi-property businesses.</p>
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>Talk to Sales</button>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const TABS_DEFAULT = [
  {
    key: 'tab1', label: 'Reservations', img: '/images/pms-calendar.png',
    title: 'Visual Booking Calendar and Reservation Management',
    points: [['Color-Coded Room Calendar', 'Visual calendar showing all reservations, check-ins, and check-outs at a glance.'], ['Multi-Source Bookings', 'Bookings from OTAs, direct website, and walk-ins all appear in one unified calendar.'], ['Reservation Modifications', 'Easily edit check-in/out dates, room assignments, and guest details.'], ['Group Booking Management', 'Handle group reservations with shared billing and room block management.'], ['Automated Confirmations', 'Send booking confirmation emails and pre-arrival messages automatically.']]
  },
  {
    key: 'tab2', label: 'Front Desk', img: '/images/mobile-app.png',
    title: 'Streamlined Front Desk Operations',
    points: [['Quick Check-In and Check-Out', 'Process guest arrivals and departures in seconds with digital folios.'], ['Room Assignment', 'Assign and reassign rooms based on availability and housekeeping status.'], ['Guest Profiles', 'Complete guest history, preferences, and stay notes for personalized service.'], ['Billing and Invoicing', 'Generate GST-compliant invoices and manage partial payments and deposits.']]
  },
]
const HOW_STEPS = [['Share Property Setup', 'Tell us your room types, rate plans, and operational requirements.'], ['We Configure Everything', 'We set up your PMS with room types, rate plans, staff accounts, and integrations.'], ['Train and Go Live', 'Brief staff training and you are fully operational — managing your hotel from the cloud.']]
const FAQS = [['What is a Cloud PMS?', 'A Cloud PMS is hotel management software hosted on the internet, accessible from any device with a browser without installing software. It manages reservations, front desk, housekeeping, billing, and reporting.'], ['Do I need to install any software?', 'No. Our Cloud PMS is entirely web-based. You only need a browser and internet connection. It works on Windows, Mac, tablets, and smartphones.'], ['Does it integrate with my Channel Manager?', 'Yes. Our PMS integrates seamlessly with the Apex Bookings Channel Manager and Booking Engine. All bookings appear in your PMS automatically in real time.'], ['Is my data secure?', 'Yes. All data is encrypted, backed up daily, and hosted on secure cloud infrastructure.'], ['Can I access it on my phone?', 'Absolutely. The PMS is fully responsive and works on smartphones. We also provide a mobile app for quick access.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.cloud_pms || {}
  const TABS = TABS_DEFAULT.map((t,i) => ({
    ...t,
    img: i===0 ? (imgs.tab1 || t.img) : (imgs.tab2 || t.img)
  }))
  const [activeTab, setActiveTab] = useState(0)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const tab = TABS[activeTab]
  return (
    <>
            <Head>
        <title>Cloud PMS for Hotels — Property Management System | Apex Bookings</title>
        <meta name="description" content="Cloud-based hotel PMS for front desk, housekeeping, billing, and reports. Access from any device. Integrates with Channel Manager and Booking Engine."/>
        <meta name="keywords" content="cloud PMS hotel, property management system india, hotel front desk software, hotel management software, cloud hotel PMS"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/cloud-pms"/>
        <meta property="og:url" content="https://apexbookings.in/cloud-pms"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/cloud-pms"/>
        <meta property="og:title" content="Cloud PMS for Hotels — Property Management System | Apex Bookings"/>
        <meta property="og:description" content="Cloud-based hotel PMS for front desk, housekeeping, billing, and reports. Access from any device. Integrates with Channel Manager and Booking Engine."/>
        <meta property="og:url" content="https://apexbookings.in/cloud-pms"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Cloud PMS for Hotels — Property Management System | Apex Bookings"/>
        <meta name="twitter:description" content="Cloud-based hotel PMS for front desk, housekeeping, billing, and reports. Access from any device. Integrates with Channel Manager and Booking Engine."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"SoftwareApplication",
          "name":"Apex Bookings Cloud PMS",
          "applicationCategory":"BusinessApplication",
          "operatingSystem":"Web",
          "offers":{"@type":"Offer","priceCurrency":"INR","availability":"https://schema.org/InStock"},
          "provider":{"@type":"Organization","name":"Apex Bookings","url":"https://apexbookings.in"}
        })}}/>
      </Head>
      <Navbar light={false}/>
            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
<section className="inner-hero">
        <div className="inner-hero-bg"/><div className="inner-hero-glow"/>
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="inner-hero-layout">
            <div>
              <span className="label label-w">Cloud PMS</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>
                Complete property management. In the cloud.
              </h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>
                Run your entire hotel from a single cloud-based system. Front desk, housekeeping, billing, and reports — all from any device, anywhere.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get a Demo</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/pms-calendar.png"} alt="Cloud PMS" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Cloud PMS</span>
              <h2 className="heading" style={{marginBottom:18}}>Everything your front desk needs, unified.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>Our Cloud PMS brings together reservations, check-in/out, housekeeping, billing, and analytics in one clean interface — accessible from any device, anywhere.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/pms-integrations.png"} alt="Cloud PMS" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE: PMS benefits - 3-col flowing no-box */}
      <section style={{padding:'64px 0',background:'var(--surface)'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:40}}>
            <span className="label">Why Cloud PMS</span>
            <h2 className="heading">Everything your property needs, unified</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:32}}>
            {[
              {icon:'📅',title:'Visual Room Calendar',desc:'Color-coded reservation calendar showing all bookings, check-ins, and checkouts at a glance.'},
              {icon:'📱',title:'Mobile Accessible',desc:'Manage your property from any device — phone, tablet, or laptop. No installation required.'},
              {icon:'🧾',title:'GST-Compliant Billing',desc:'Auto-generate compliant invoices and manage deposits, split bills, and partial payments.'},
              {icon:'🏠',title:'Housekeeping Module',desc:'Real-time room status updates for your housekeeping team — dirty, clean, inspected.'},
              {icon:'🔗',title:'Channel Manager Sync',desc:'All OTA bookings flow into your PMS automatically. Zero manual data entry.'},
              {icon:'📊',title:'Revenue Reports',desc:'ADR, RevPAR, occupancy trends and more — daily, weekly, or monthly with one click.'},
            ].map((b,i) => (
              <div key={i} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{fontSize:24,flexShrink:0,marginTop:2}}>{b.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14.5,color:'var(--ink)',marginBottom:5}}>{b.title}</div>
                  <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.65}}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{marginBottom:28,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">Cloud PMS — Key Features</h2>
          </div>
          <div className="feature-tabs">
            {TABS.map((t,i) => (<button key={t.key} className={`feature-tab${activeTab===i?' active':''}`} onClick={()=>setActiveTab(i)}>{t.label}</button>))}
          </div>
          <div className="feature-tab-content active">
            <div style={{borderRadius:14,overflow:'hidden',boxShadow:'0 24px 64px rgba(0,0,0,0.1)'}}>
              <img src={tab.img} alt={tab.title} style={{width:'100%',height:'auto',display:'block'}} loading="lazy"/>
            </div>
            <div>
              <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:24,fontWeight:800,color:'var(--ink)',marginBottom:24,letterSpacing:'-0.02em'}}>{tab.title}</h3>
              {tab.points.map((p,i) => (<div key={i} className="feature-check-item"><div className="feature-check-dot"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><strong>{p[0]}</strong><p style={{fontSize:13.5,color:'var(--muted)',lineHeight:1.55,margin:0}}>{p[1]}</p></div></div>))}
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 24px 64px rgba(0,0,0,0.08)'}}>
              <img src={imgs.how_it_works || "/images/how-it-works.png"} alt="How it works" style={{width:'100%',height:'auto',display:'block'}} loading="lazy"/>
            </div>
            <div>
              <span className="label">How It Works</span>
              <h2 className="heading" style={{marginBottom:32}}>Get started in simple steps</h2>
              <div className="how-steps">
                {HOW_STEPS.map((step,i) => (<div key={i} className="how-step"><div className="how-step-num">{i+1}</div><div><div style={{fontWeight:700,fontSize:15,color:'var(--ink)',marginBottom:4}}>{step[0]}</div><div style={{fontSize:14,color:'var(--muted)',lineHeight:1.65}}>{step[1]}</div></div></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{maxWidth:800}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <span className="label">FAQ</span>
            <h2 className="heading">Cloud PMS — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Cloud PMS?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
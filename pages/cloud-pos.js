import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const TABS_DEFAULT = [
  {
    key: 'tab1', label: 'Order Management', img: '/images/pos-new.png',
    title: 'Effortless Order Management',
    points: [['Visual Menu with Photos', 'Display your entire menu with photos, categories, and real-time item availability.'], ['Table-Wise Ordering', 'Assign orders to specific tables with waiter assignment and order tracking.'], ['Kitchen Order Tickets', 'KOTs sent digitally to kitchen displays instantly — no paper, no delays.'], ['Order Modifications', 'Easily modify, add, or cancel items even after an order is placed.'], ['Multi-Course Management', 'Handle starters, mains, and desserts separately with course-based ordering.']]
  },
  {
    key: 'tab2', label: 'Billing and Reports', img: '/images/pms-calendar.png',
    title: 'Integrated Billing and Analytics',
    points: [['Room Bill Posting', 'Post F&B charges to guest room folios with one tap. Settled at checkout.'], ['Multiple Payment Modes', 'Accept cash, card, UPI, and room billing in a single transaction.'], ['GST Invoicing', 'Automatic GST calculation and compliant invoice generation.'], ['Sales Reports', 'Daily, weekly, and monthly sales reports with item-wise revenue analysis.']]
  },
]
const HOW_STEPS = [['Menu Setup', 'We configure your complete menu with categories, items, prices, and taxes.'], ['Staff Training', 'Brief training for waitstaff and kitchen team — usually takes less than an hour.'], ['Start Taking Orders', 'Your team takes orders digitally and kitchen receives them instantly.']]
const FAQS = [['What is a Cloud POS for hotels?', 'A Cloud POS for hotels manages restaurant and F&B operations — taking orders, sending kitchen tickets, processing payments, and posting charges to guest room bills.'], ['Can restaurant charges be added to the guest room bill?', 'Yes. F&B charges are posted to the guest room folio in real time and settled at checkout — no manual reconciliation required.'], ['Does it work on tablets?', 'Yes. Our Cloud POS works on any device including iPads, Android tablets, touchscreen monitors, and laptops.'], ['Can I manage multiple outlets?', 'Yes. The system supports multiple dining outlets — restaurant, bar, room service — from the same dashboard with separate reporting.'], ['What payment methods does the POS accept?', 'Cash, credit/debit cards, UPI, and room billing are all supported.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.cloud_pos || {}
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
        <title>Cloud POS for Hotels — Restaurant & F&B Management | Apex Bookings</title>
        <meta name="description" content="Cloud POS system for hotel restaurants and F&B operations. Table orders, kitchen tickets, room bill posting, GST invoicing — from any tablet or device."/>
        <meta name="keywords" content="hotel POS system, restaurant POS india, hotel F&B management, cloud POS hotel, hotel billing software"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/cloud-pos"/>
        <meta property="og:url" content="https://apexbookings.in/cloud-pos"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/cloud-pos"/>
        <meta property="og:title" content="Cloud POS for Hotels — Restaurant & F&B Management | Apex Bookings"/>
        <meta property="og:description" content="Cloud POS system for hotel restaurants and F&B operations. Table orders, kitchen tickets, room bill posting, GST invoicing — from any tablet or device."/>
        <meta property="og:url" content="https://apexbookings.in/cloud-pos"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Cloud POS for Hotels — Restaurant & F&B Management | Apex Bookings"/>
        <meta name="twitter:description" content="Cloud POS system for hotel restaurants and F&B operations. Table orders, kitchen tickets, room bill posting, GST invoicing — from any tablet or device."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"SoftwareApplication",
          "name":"Apex Bookings Cloud POS",
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
              <span className="label label-w">Cloud POS</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>
                Restaurant and F&B operations, simplified.
              </h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>
                Complete point-of-sale system for your hotel dining operations. Visual menu, table orders, kitchen tickets, and direct room-bill posting in one system.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get a Demo</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/pos-new.png"} alt="Cloud POS" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Cloud POS</span>
              <h2 className="heading" style={{marginBottom:18}}>From table order to room bill — automatically.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>Staff take orders on any device, KOTs go instantly to the kitchen display, and restaurant charges post directly to the guest room folio — no manual reconciliation needed.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/pos-new.png"} alt="Cloud POS" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE: POS — compact emoji benefits in pill row */}
      <section style={{padding:'48px 0',background:'var(--surface)'}}>
        <div className="container">
          <div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center'}}>
            {[
              ['🍽️','Table-wise ordering'],
              ['🖨️','Instant KOT to kitchen'],
              ['🏨','Room bill posting'],
              ['💰','UPI + card + cash'],
              ['📋','GST invoicing'],
              ['📊','Real-time sales report'],
              ['📱','Works on tablet & phone'],
              ['🔄','Multi-outlet support'],
            ].map(([icon,label],i) => (
              <div key={i} style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 18px',background:'white',border:'1px solid var(--border)',borderRadius:100,fontSize:13.5,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap'}}>
                <span style={{fontSize:16}}>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{marginBottom:28,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">Cloud POS — Key Features</h2>
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
            <h2 className="heading">Cloud POS — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Cloud POS?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
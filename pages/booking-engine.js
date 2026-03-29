import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const TABS_DEFAULT = [
  {
    key: 'tab1', label: 'Booking Flow', img: '/images/booking-engine-new.png',
    title: 'Seamless Guest Booking Experience',
    points: [['Check-In/Check-Out Selection', 'Guests select dates with a clean calendar interface showing real-time availability.'], ['Room Selection and Upgrades', 'Display room types with photos, descriptions, amenities, and upgrade options.'], ['Meal Plan Add-ons', 'Let guests choose room only, breakfast, half board, or full board options.'], ['Promo Code Support', 'Apply discounts, corporate codes, or loyalty offers directly at checkout.'], ['Secure Payment', 'Accept UPI, cards, and net banking through an integrated PCI-DSS compliant gateway.']]
  },
  {
    key: 'tab2', label: 'Admin Features', img: '/images/pms-calendar.png',
    title: 'Powerful Back-Office Controls',
    points: [['Rate and Availability Control', 'Manage rates, stop sells, and minimum stay restrictions from your dashboard.'], ['Booking Management', 'View, modify, and cancel bookings with automated guest communication.'], ['Promo Management', 'Create and schedule promotional rates, flash sales, and seasonal offers.'], ['Analytics and Reports', 'Track conversion rates, revenue, and booking source with detailed analytics.']]
  },
]
const HOW_STEPS = [['Connect Your Website', 'We embed the booking engine on your hotel website with your brand colors and styling.'], ['Configure Rooms and Rates', 'Set up your room types, rate plans, meal options, and availability.'], ['Accept Direct Bookings', 'Guests book and pay directly on your website. Revenue goes straight to you.']]
const FAQS = [['What is a hotel booking engine?', 'A hotel booking engine is software embedded on your hotel website that allows guests to check availability, select rooms, and complete a reservation — paying directly without going through an OTA. This saves you OTA commission on every booking.'], ['How much OTA commission does a booking engine save?', 'OTAs typically charge 15-25% commission per booking. A direct booking through your booking engine saves you that entire amount.'], ['Can guests book on mobile?', 'Absolutely. Our booking engine is fully mobile-optimized and tested across all device types and browsers.'], ['What payment methods are supported?', 'We support UPI, Visa, Mastercard, RuPay, net banking, and wallets through our integrated payment gateway.'], ['Does it connect with the Channel Manager?', 'Yes. The booking engine integrates with our channel manager and PMS. Direct bookings automatically update availability across all OTAs.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.booking_engine || {}
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
        <title>Hotel Booking Engine — Direct Bookings, Zero Commission | Apex Bookings</title>
        <meta name="description" content="Commission-free hotel booking engine for your website. Accept direct bookings with UPI, cards, and net banking. Mobile-first, SEO-optimized, integrates with your PMS."/>
        <meta name="keywords" content="hotel booking engine, direct hotel bookings, commission free bookings, hotel website booking, hotel reservation system india"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/booking-engine"/>
        <meta property="og:url" content="https://apexbookings.in/booking-engine"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/booking-engine"/>
        <meta property="og:title" content="Hotel Booking Engine — Direct Bookings, Zero Commission | Apex Bookings"/>
        <meta property="og:description" content="Commission-free hotel booking engine for your website. Accept direct bookings with UPI, cards, and net banking. Mobile-first, SEO-optimized, integrates with your PMS."/>
        <meta property="og:url" content="https://apexbookings.in/booking-engine"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Booking Engine — Direct Bookings, Zero Commission | Apex Bookings"/>
        <meta name="twitter:description" content="Commission-free hotel booking engine for your website. Accept direct bookings with UPI, cards, and net banking. Mobile-first, SEO-optimized, integrates with your PMS."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"SoftwareApplication",
          "name":"Apex Bookings Booking Engine",
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
              <span className="label label-w">Booking Engine</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>
                Commission-free direct bookings from your website.
              </h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>
                A mobile-first booking engine that converts website visitors into direct guests with zero OTA commission. Every booking means 100% of the revenue stays with your hotel.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get a Demo</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/booking-engine-new.png"} alt="Booking Engine" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Booking Engine</span>
              <h2 className="heading" style={{marginBottom:18}}>Turn your website into your best booking channel.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>Our booking engine integrates seamlessly with your hotel website, offering a smooth checkout with promo codes, meal plans, room upgrades, and multiple payment options.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/booking-engine-new.png"} alt="Booking Engine" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE: Booking Engine — highlighted reasons strip */}
      <section style={{padding:'56px 0',background:'white'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:36}}>
            <span className="label">Why Direct Bookings Win</span>
            <h2 className="heading">The numbers don&apos;t lie</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:0,border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
            {[
              {pct:'0%',label:'OTA Commission on direct bookings',sub:'vs 15–25% on every OTA booking',accent:'#10b981'},
              {pct:'100%',label:'Revenue stays with your hotel',sub:'No platform fees, no intermediary cuts',accent:'var(--blue)'},
              {pct:'3×',label:'Higher guest LTV from direct bookers',sub:'Direct guests return more, spend more',accent:'var(--gold)'},
            ].map((row,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:20,padding:'24px 28px',borderBottom:i<2?'1px solid var(--border)':'none',flexWrap:'wrap',gap:16}}>
                <div style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,44px)',fontWeight:800,color:row.accent,minWidth:80,flexShrink:0,lineHeight:1}}>{row.pct}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,color:'var(--ink)',marginBottom:3}}>{row.label}</div>
                  <div style={{fontSize:13,color:'var(--muted)'}}>{row.sub}</div>
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
            <h2 className="heading">Booking Engine — Key Features</h2>
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
            <h2 className="heading">Booking Engine — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Booking Engine?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
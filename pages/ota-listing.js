import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const FEATS = [['15+ OTA Setup', 'Booking.com, MakeMyTrip, Goibibo, Airbnb, Expedia, Agoda, EaseMyTrip, Cleartrip, Yatra, and more.'], ['Content Optimization', 'Professional descriptions, keyword-rich copy, and amenity listings that rank higher in OTA search.'], ['Photography Guidance', 'Direction on what to photograph and how to present your property for maximum click-through rate.'], ['Review Management', 'Our team monitors and responds to all reviews across every OTA platform professionally.'], ['Promotional Campaigns', 'Seasonal offers and OTA promotions timed to demand peaks in your specific market.'], ['Ranking Optimization', 'Ongoing work to maintain and improve your position in OTA search results over time.']]
const HOW_STEPS = [['Submit Your Property Details', 'Share your hotel information, room types, amenities, photos, and policies.'], ['We Set Up and Optimize Listings', 'We create or refine your OTA profiles with compelling descriptions and optimized content.'], ['Connect to Channel Manager', 'Your OTA accounts are linked to our channel manager for real-time rate and inventory sync.']]
const FAQS = [['How many OTAs will my hotel be listed on?', 'Apex Bookings lists your hotel on 15+ major OTAs including Booking.com, MakeMyTrip, Goibibo, Airbnb, Expedia, Agoda, EaseMyTrip, Cleartrip, Yatra, TripAdvisor, Hotels.com, and more.'], ['What does OTA listing setup involve?', 'We handle everything — creating or claiming your hotel profiles, writing professional descriptions, configuring room types and rate plans, setting cancellation policies, and optimizing your content for better search visibility.'], ['How long does OTA listing setup take?', 'We typically complete the full setup and go live on all 15+ OTAs within 5-7 business days.'], ['Do you manage reviews on OTAs?', 'Yes. Our team monitors reviews on all your OTA profiles and responds professionally and promptly to maintain your online reputation.'], ['Will you also manage promotions on OTAs?', 'Yes. We run targeted promotional campaigns on OTAs during peak demand periods and special seasons to maximize your visibility and occupancy.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.ota_listing || {}
  const [openFaq, setOpenFaq] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  return (
    <>
            <Head>
        <title>OTA Listing Setup & Management — 15+ Platforms | Apex Bookings</title>
        <meta name="description" content="Professional hotel OTA listing on 15+ platforms including Booking.com, MakeMyTrip, Airbnb, Expedia. Full setup, content optimization, review management, and promotions."/>
        <meta name="keywords" content="hotel OTA listing, hotel booking.com setup, hotel makemytrip listing, OTA management india, hotel distribution"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/ota-listing"/>
        <meta property="og:url" content="https://apexbookings.in/ota-listing"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/ota-listing"/>
        <meta property="og:title" content="OTA Listing Setup & Management — 15+ Platforms | Apex Bookings"/>
        <meta property="og:description" content="Professional hotel OTA listing on 15+ platforms including Booking.com, MakeMyTrip, Airbnb, Expedia. Full setup, content optimization, review management, and promotions."/>
        <meta property="og:url" content="https://apexbookings.in/ota-listing"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="OTA Listing Setup & Management — 15+ Platforms | Apex Bookings"/>
        <meta name="twitter:description" content="Professional hotel OTA listing on 15+ platforms including Booking.com, MakeMyTrip, Airbnb, Expedia. Full setup, content optimization, review management, and promotions."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          "name":"Hotel OTA Listing",
          "provider":{"@type":"Organization","name":"Apex Bookings","url":"https://apexbookings.in","telephone":"+918171871902"},
          "areaServed":{"@type":"Country","name":"India"},
          "serviceType":"Hotel Technology Service"
        })}}/>
      </Head>
      <Navbar light={false}/>
            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
<section className="inner-hero">
        <div className="inner-hero-bg"/><div className="inner-hero-glow"/>
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="inner-hero-layout">
            <div>
              <span className="label label-w">OTA Listing</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>Maximum visibility across 15+ platforms.</h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>Professional listing setup and ongoing management across all major OTAs. We handle content, photography guidance, review management, and promotional campaigns.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get Started</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/ota-network-new.png"} alt="OTA Listing" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">OTA Listing</span>
              <h2 className="heading" style={{marginBottom:18}}>Listed, optimized, and managed across every OTA.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>We write compelling property descriptions, configure amenities, set cancellation policies, and guide your photo strategy — all optimized to rank higher in OTA search results.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/how-it-works.png"} alt="OTA Listing" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{marginBottom:36,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">What's Included with OTA Listing</h2>
          </div>
          {/* Unique layout: full-width rows with separator lines */}
          <div style={{display:'flex',flexDirection:'column',gap:0,border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
            {FEATS.map(([ft,fd],i) => (
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:20,padding:'20px 24px',borderBottom:i<FEATS.length-1?'1px solid var(--border)':'none',background:'white',transition:'background 0.12s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
                onMouseLeave={e=>e.currentTarget.style.background='white'}>
                <div style={{fontFamily:'Outfit,sans-serif',fontSize:22,fontWeight:800,color:'var(--blue)',opacity:0.2,lineHeight:1,minWidth:36,flexShrink:0}}>{String(i+1).padStart(2,'0')}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14.5,color:'var(--ink)',marginBottom:3}}>{ft}</div>
                  <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.6}}>{fd}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 24px 64px rgba(0,0,0,0.08)'}}>
              <img src={imgs.split || "/images/how-it-works.png"} alt="How it works" style={{width:'100%',height:'auto',display:'block'}} loading="lazy"/>
            </div>
            <div>
              <span className="label">How It Works</span>
              <h2 className="heading" style={{marginBottom:32}}>How we get you started</h2>
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
            <h2 className="heading">OTA Listing — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with OTA Listing?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
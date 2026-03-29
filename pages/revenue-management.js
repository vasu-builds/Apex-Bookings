import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const FEATS = [['Dynamic Pricing', 'Automatic rate adjustments based on live occupancy, demand trends, and market conditions.'], ['Demand Forecasting', 'Predict future booking pace using historical data and market seasonality patterns.'], ['Competitor Rate Intelligence', 'Daily monitoring of competitor pricing in your market segment and location.'], ['OTA Channel Optimization', 'Identify your most profitable channels and refine your distribution strategy accordingly.'], ['Online Reputation Management', 'Monitor and respond to reviews across all platforms — reputation directly impacts revenue.'], ['Monthly Performance Reports', 'Detailed ADR, RevPAR, and GOPPAR reporting with actionable recommendations every month.']]
const HOW_STEPS = [['We Audit Your Current Setup', 'Our team reviews your current pricing, OTA presence, and market positioning.'], ['Build Your Revenue Strategy', 'We create a custom pricing strategy based on your market, seasonality, and competition.'], ['Ongoing Daily Management', 'Our team actively manages rates and distribution every day to maximize your revenue.']]
const FAQS = [['What is revenue management for hotels?', 'Revenue management is the practice of forecasting demand and optimizing pricing to maximize hotel revenue. It involves setting the right price for the right room at the right time based on market conditions, competitor rates, and occupancy patterns.'], ['How does Apex Bookings manage my hotel revenue?', 'Our revenue management team monitors your market daily, tracks competitor rates and booking pace, and adjusts your pricing across all channels accordingly. We also manage OTA promotions and channel strategy to maximize your ADR and RevPAR.'], ['What results can I expect?', 'Hotels partnering with Apex Bookings see an average 5x revenue growth in their first year. Individual results depend on your property type, location, and market, but consistent improvements in occupancy and ADR are typical within the first 3 months.'], ['Do I need to do anything myself?', 'No. Our team handles everything — daily rate management, OTA promotions, review responses, and performance reporting. You receive a monthly report and can reach us any time with questions.'], ['Is revenue management only for large hotels?', 'Not at all. Revenue management is arguably more impactful for smaller, independent hotels that lack the resources of chain hotels. Our services are specifically designed and priced for mid-segment independent properties.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.revenue_management || {}
  const [openFaq, setOpenFaq] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  return (
    <>
            <Head>
        <title>Hotel Revenue Management Services — Maximize RevPAR | Apex Bookings</title>
        <meta name="description" content="Expert hotel revenue management with dynamic pricing, demand forecasting, and competitor analysis. Apex Bookings hotels see average 5x revenue growth in year one."/>
        <meta name="keywords" content="hotel revenue management, hotel dynamic pricing, RevPAR optimization, hotel demand forecasting, hotel revenue management india"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/revenue-management"/>
        <meta property="og:url" content="https://apexbookings.in/revenue-management"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/revenue-management"/>
        <meta property="og:title" content="Hotel Revenue Management Services — Maximize RevPAR | Apex Bookings"/>
        <meta property="og:description" content="Expert hotel revenue management with dynamic pricing, demand forecasting, and competitor analysis. Apex Bookings hotels see average 5x revenue growth in year one."/>
        <meta property="og:url" content="https://apexbookings.in/revenue-management"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Revenue Management Services — Maximize RevPAR | Apex Bookings"/>
        <meta name="twitter:description" content="Expert hotel revenue management with dynamic pricing, demand forecasting, and competitor analysis. Apex Bookings hotels see average 5x revenue growth in year one."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          "name":"Hotel Revenue Management",
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
              <span className="label label-w">Revenue Management</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>Data-driven pricing. Maximized RevPAR.</h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>Our revenue management experts handle demand forecasting, dynamic pricing, and competitor analysis so your hotel maximizes revenue every day, every season.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get Started</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/revenue-mgmt-diagram.png"} alt="Revenue Management" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Revenue Management</span>
              <h2 className="heading" style={{marginBottom:18}}>Expert revenue management, fully handled.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>Our team monitors your market daily — tracking demand signals, competitor rates, and booking pace — then adjusts your pricing strategy to keep your hotel competitive and profitable.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/cm-rate-management.png"} alt="Revenue Management" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{marginBottom:36,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">What's Included with Revenue Management</h2>
          </div>
          {/* Unique layout: numbered grid with oversized index */}
          <div className="benefits-scroll">
            {FEATS.map(([ft,fd],i) => (
              <div key={i} className="benefit-scroll-item">
                <div className="benefit-scroll-num">0{i+1}</div>
                <div className="benefit-scroll-title">{ft}</div>
                <div className="benefit-scroll-desc">{fd}</div>
              </div>
            ))}
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
            <h2 className="heading">Revenue Management — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Revenue Management?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const FEATS = [['Google Ads', 'Search and display campaigns targeting travelers actively looking for hotels in your location.'], ['Social Media Management', 'Instagram and Facebook content creation, posting schedules, and paid campaign management.'], ['Online Reputation Management', 'Monitor, respond to, and strategically manage reviews across all major platforms.'], ['SEO and Content Strategy', 'Improve organic search rankings with keyword targeting and content that converts.'], ['Brand and Logo Design', 'Complete visual identity — logo, color palette, fonts, and all marketing collateral.'], ['Monthly Analytics Reports', 'Transparent reporting on reach, engagement, lead quality, and booking conversions.']]
const HOW_STEPS = [['Audit and Strategy', 'We review your current digital presence and build a targeted marketing plan for your hotel.'], ['Setup and Launch', 'We set up your campaigns, social profiles, and tracking — fully managed from day one.'], ['Optimize and Grow', 'Monthly reporting and ongoing optimization to continuously improve results and ROI.']]
const FAQS = [['What digital marketing services do you provide for hotels?', 'We provide Google Search and Display Ads, Google Hotel Ads integration, Instagram and Facebook management, SEO, online reputation management, email marketing, and brand design — everything a hotel needs to build a strong digital presence.'], ['How is hotel digital marketing different from regular marketing?', 'Hotel marketing requires understanding OTA dynamics, seasonality, traveler intent, and booking behavior. Our team specializes specifically in hospitality marketing, which means our campaigns are designed to convert travelers at the right moment in their booking journey.'], ['How long before I see results?', 'Google Ads campaigns typically show results within 2-4 weeks. SEO improvements take 3-6 months. Social media builds organically over time. We provide monthly reports so you can track progress clearly.'], ['Do you manage the hotel social media accounts?', 'Yes. We create content, manage posting schedules, run paid campaigns, and respond to comments and messages on Instagram and Facebook on your behalf.'], ['What is online reputation management?', 'ORM involves monitoring and responding to reviews on Google, TripAdvisor, Booking.com, and all major OTAs. Consistent, professional responses improve your ranking and conversion rate.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.digital_marketing || {}
  const [openFaq, setOpenFaq] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  return (
    <>
            <Head>
        <title>Hotel Digital Marketing Services — Google Ads & Social Media | Apex Bookings</title>
        <meta name="description" content="Complete hotel digital marketing: Google Ads, Instagram, Facebook, SEO, and online reputation management. Specialized in hospitality. 200+ hotels served."/>
        <meta name="keywords" content="hotel digital marketing, hotel google ads, hotel social media marketing, hotel SEO, hotel online marketing india"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/digital-marketing"/>
        <meta property="og:url" content="https://apexbookings.in/digital-marketing"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/digital-marketing"/>
        <meta property="og:title" content="Hotel Digital Marketing Services — Google Ads & Social Media | Apex Bookings"/>
        <meta property="og:description" content="Complete hotel digital marketing: Google Ads, Instagram, Facebook, SEO, and online reputation management. Specialized in hospitality. 200+ hotels served."/>
        <meta property="og:url" content="https://apexbookings.in/digital-marketing"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Digital Marketing Services — Google Ads & Social Media | Apex Bookings"/>
        <meta name="twitter:description" content="Complete hotel digital marketing: Google Ads, Instagram, Facebook, SEO, and online reputation management. Specialized in hospitality. 200+ hotels served."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          "name":"Hotel Digital Marketing",
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
              <span className="label label-w">Digital Marketing</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>Complete digital presence for your hotel.</h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>Google Ads, Instagram, Facebook, reputation management, and SEO — executed by a team that understands hospitality. Our hotel partners see up to 5x revenue growth.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get Started</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/digital-marketing.png"} alt="Digital Marketing" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Digital Marketing</span>
              <h2 className="heading" style={{marginBottom:18}}>Full-stack hotel marketing, one team.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>We manage your hotel complete digital presence — from search campaigns targeting high-intent travelers to social media that builds brand loyalty and drives direct bookings.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.hero || "/images/digital-marketing.png"} alt="Digital Marketing" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{marginBottom:36,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">What's Included with Digital Marketing</h2>
          </div>
          {/* Unique layout: border-left accent 2-col */}
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:0}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'1px',background:'var(--border)',borderRadius:16,overflow:'hidden'}}>
              {FEATS.map(([ft,fd],i) => (
                <div key={i} style={{background:'white',padding:'24px 22px',borderLeft:'3px solid',borderLeftColor:i%3===0?'var(--blue)':i%3===1?'var(--gold)':'#10b981',transition:'background 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--blue-l)'}
                  onMouseLeave={e=>e.currentTarget.style.background='white'}>
                  <div style={{fontWeight:700,fontSize:14.5,color:'var(--ink)',marginBottom:6}}>{ft}</div>
                  <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.65}}>{fd}</div>
                </div>
              ))}
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
            <h2 className="heading">Digital Marketing — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Digital Marketing?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
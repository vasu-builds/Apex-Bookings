import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const TABS_DEFAULT = [
  {
    key: 'tab1', label: 'Desktop View', img: '/images/google-ads-desktop.png',
    title: 'Top Placement in Google Search Results',
    points: [['Appear Next to OTAs', 'Your hotel shown in Google Hotel finder alongside Booking.com, MakeMyTrip, and Goibibo.'], ['Official Website Rate', 'Guests see your direct website rate with a direct booking link.'], ['Real-Time Rate Display', 'Rates and availability update in real time from your booking engine.'], ['Google Maps Visibility', 'Your hotel prominently shown in Google Maps for location-based searches.'], ['Compare Prices Box', 'Featured in the Compare prices section with all booking options.']]
  },
  {
    key: 'tab2', label: 'Mobile View', img: '/images/google-ads-mobile.png',
    title: 'Mobile-Optimized Hotel Discovery',
    points: [['Mobile Google Search', 'Travelers searching on phones see your hotel prominently with rates and photos.'], ['Direct Booking from Search', 'One tap takes guests to your booking engine — no OTA middleman.'], ['Availability Check', 'Guests can check availability right from the Google search result.'], ['Pay Per Click Model', 'You only pay when a traveler actually clicks through to your website.']]
  },
]
const HOW_STEPS = [['Connect Your Booking Engine', 'We link your Apex Bookings booking engine to Google Hotel Ads for live rate feeds.'], ['Set Up Your Google Profile', 'Optimize your Google Business Profile with photos, amenities, and verified information.'], ['Launch and Optimize', 'We manage bids, monitor performance, and optimize campaigns for maximum ROI.']]
const FAQS = [['What are Google Hotel Ads?', 'Google Hotel Ads show your hotel real-time rates and availability in Google Search and Maps. When travelers search for hotels, your property appears with a link to book directly on your website.'], ['How is it different from Google Ads?', 'Google Hotel Ads specifically show hotel rates and availability within the Google Hotel search interface — targeting travelers actively looking to book accommodation.'], ['How much does it cost?', 'Google Hotel Ads operates on pay-per-click or pay-per-conversion model. You only pay when a traveler clicks through to your website.'], ['Does my hotel need a website?', 'Yes. Google Hotel Ads links travelers directly to your booking engine. Apex Bookings can build one if you need it.'], ['How long does setup take?', 'Google Hotel Ads setup typically takes 5-7 business days including connecting your booking engine and launching the first campaign.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.google_hotel_ads || {}
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
        <title>Google Hotel Ads Management — Appear at Top of Google | Apex Bookings</title>
        <meta name="description" content="Get your hotel at the top of Google Search alongside OTAs. Google Hotel Ads with live rate feeds, direct booking links, and pay-per-click pricing. Setup in 5-7 days."/>
        <meta name="keywords" content="google hotel ads, hotel google search ads, google hotel finder, hotel metasearch, google hotel ads india"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/google-hotel-ads"/>
        <meta property="og:url" content="https://apexbookings.in/google-hotel-ads"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/google-hotel-ads"/>
        <meta property="og:title" content="Google Hotel Ads Management — Appear at Top of Google | Apex Bookings"/>
        <meta property="og:description" content="Get your hotel at the top of Google Search alongside OTAs. Google Hotel Ads with live rate feeds, direct booking links, and pay-per-click pricing. Setup in 5-7 days."/>
        <meta property="og:url" content="https://apexbookings.in/google-hotel-ads"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Google Hotel Ads Management — Appear at Top of Google | Apex Bookings"/>
        <meta name="twitter:description" content="Get your hotel at the top of Google Search alongside OTAs. Google Hotel Ads with live rate feeds, direct booking links, and pay-per-click pricing. Setup in 5-7 days."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          "name":"Google Hotel Ads Management",
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
              <span className="label label-w">Google Hotel Ads</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>
                Your hotel at the top of Google Search.
              </h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>
                When travelers search for hotels in your city, your property appears at the top of Google Search alongside OTAs — with a direct booking link to your official website.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get a Demo</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/google-ads-desktop.png"} alt="Google Hotel Ads" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Google Hotel Ads</span>
              <h2 className="heading" style={{marginBottom:18}}>Compete with OTAs on Google — and win.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>Google Hotel Ads places your official website in the most visible position when travelers have high intent to book. You pay only per click, and the booking goes directly to your website.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/google-ads-mobile.png"} alt="Google Hotel Ads" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE: GHA — OTA vs Direct comparison */}
      <section style={{padding:'64px 0',background:'white'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:36}}>
            <span className="label">Why Google Hotel Ads</span>
            <h2 className="heading">OTA listing vs Google Hotel Ads</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0,border:'1px solid var(--border)',borderRadius:16,overflow:'hidden',maxWidth:680,margin:'0 auto'}}>
            <div style={{background:'var(--surface)',padding:'20px 24px 12px',borderBottom:'2px solid var(--border)',textAlign:'center'}}>
              <span style={{fontSize:13,fontWeight:700,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.06em'}}>OTA (Booking.com etc)</span>
            </div>
            <div style={{background:'var(--blue)',padding:'20px 24px 12px',borderBottom:'2px solid rgba(255,255,255,0.1)',textAlign:'center'}}>
              <span style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.9)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Google Hotel Ads</span>
            </div>
            {[
              ['15-25% commission','Pay-per-click only'],
              ['OTA owns the guest','You own the guest data'],
              ['Their brand, not yours','Your website, your brand'],
              ['Compete on price only','Appear alongside OTAs'],
              ['No direct relationship','Direct relationship built'],
            ].map(([left,right],i) => (
              <>
                <div key={i+'l'} style={{padding:'14px 24px',borderBottom:'1px solid var(--border)',borderRight:'1px solid var(--border)',fontSize:13.5,color:'var(--muted)',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{color:'#dc2626',fontWeight:700}}>✕</span> {left}
                </div>
                <div key={i+'r'} style={{padding:'14px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(26,79,196,0.04)',fontSize:13.5,color:'var(--ink)',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{color:'#10b981',fontWeight:700}}>✓</span> {right}
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{marginBottom:28,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">Google Hotel Ads — Key Features</h2>
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
            <h2 className="heading">Google Hotel Ads — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Google Hotel Ads?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
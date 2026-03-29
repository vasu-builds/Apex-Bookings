import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const TABS_DEFAULT = [
  {
    key:'rates', label:'Rate Management', img:'/images/cm-rate-management.png',
    title:'Smart Rate Management Tools',
    points:[
      {t:'Bulk Update',d:'Update rates and inventory across all OTAs and mobile apps in one click.'},
      {t:'Dynamic Pricing',d:'Automatically adjust rates based on demand, occupancy, and custom rules.'},
      {t:'Derived Pricing',d:'Set rates based on a parent rate plan — changes cascade automatically.'},
      {t:'Copy Rates',d:'Replicate rates from one channel to another or across date ranges instantly.'},
      {t:'Channel Markups',d:'Add custom markups for specific OTAs or corporate channels.'},
    ]
  },
  {
    key:'inventory', label:'Inventory Management', img:'/images/cm-inventory.png',
    title:'Advanced Inventory Management',
    points:[
      {t:'Real-Time Sync',d:'Inventory updates across all connected OTAs the moment a booking is made.'},
      {t:'Bulk Inventory Update',d:'Update multiple room types across multiple date ranges in one action.'},
      {t:'Room Allotment Control',d:'Allocate specific inventory for OTAs, B2B, or direct bookings separately.'},
      {t:'Stop Sell & Close Out',d:'Instantly block specific dates or room types from being sold on any channel.'},
      {t:'Auto Inventory Release',d:'Automatically reclaim unused allotments before check-in date.'},
    ]
  },
  {
    key:'otas', label:'OTA Connections', img:'/images/ota-network-new.png',
    title:'Connected to 15+ Major OTAs',
    points:[
      {t:'One-Click Update',d:'Push rates and inventory to all connected OTAs simultaneously with one action.'},
      {t:'Two-Way Sync',d:'Bookings from any OTA flow back into your PMS automatically in real time.'},
      {t:'Rate Parity Alerts',d:'Get notified when rate discrepancies are detected across your channels.'},
      {t:'Channel Performance',d:'See which OTAs generate the most revenue and bookings with analytics.'},
      {t:'Special Channels',d:'Set up dedicated pricing for corporate clients, agents, and B2B partners.'},
    ]
  },
]

const FAQS = [
  {q:'What is a Hotel Channel Manager?', a:'A channel manager is software that connects your hotel to multiple online travel agencies (OTAs) and updates your room rates and availability across all of them simultaneously with a single click — eliminating manual updates and reducing overbooking risk.'},
  {q:'How many OTAs can Apex Bookings connect my hotel to?', a:'Apex Bookings connects your hotel to 15+ major OTAs including Booking.com, MakeMyTrip, Goibibo, Airbnb, Expedia, Agoda, EaseMyTrip, Cleartrip, Yatra, TripAdvisor, and more.'},
  {q:'Will the channel manager prevent overbookings?', a:'Yes. Our channel manager uses two-way real-time synchronization — when a booking is received from any OTA, all other channels are updated instantly, eliminating the risk of selling the same room twice.'},
  {q:'Does it integrate with your Cloud PMS?', a:'Absolutely. The channel manager integrates seamlessly with Apex Bookings Cloud PMS. All bookings from every OTA and direct channel appear in your PMS automatically, with no manual data entry required.'},
  {q:'How long does it take to set up?', a:'Most hotels are fully connected and live within 3–5 business days. Our team handles the entire setup including OTA account connections, rate plan configuration, and staff training.'},
]

export default function ChannelManager() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.channel_manager || {}
  const TABS = TABS_DEFAULT.map((t,i) => ({
    ...t,
    img: i===0 ? (imgs.tab1 || t.img) : i===1 ? (imgs.tab2 || t.img) : (imgs.tab3 || t.img)
  }))
  const [activeTab, setActiveTab] = useState(0)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const tab = TABS[activeTab]

  return (
    <>
            <Head>
        <title>Hotel Channel Manager — Connect 15+ OTAs | Apex Bookings</title>
        <meta name="description" content="Apex Bookings Channel Manager syncs rates and inventory across 15+ OTAs in real time. Eliminate overbookings, boost occupancy, and manage all channels from one dashboard."/>
        <meta name="keywords" content="hotel channel manager, OTA sync, hotel rate management, channel manager india, hotel inventory management"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/channel-manager"/>
        <meta property="og:url" content="https://apexbookings.in/channel-manager"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/channel-manager"/>
        <meta property="og:title" content="Hotel Channel Manager — Connect 15+ OTAs | Apex Bookings"/>
        <meta property="og:description" content="Apex Bookings Channel Manager syncs rates and inventory across 15+ OTAs in real time. Eliminate overbookings, boost occupancy, and manage all channels from one dashboard."/>
        <meta property="og:url" content="https://apexbookings.in/channel-manager"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Channel Manager — Connect 15+ OTAs | Apex Bookings"/>
        <meta name="twitter:description" content="Apex Bookings Channel Manager syncs rates and inventory across 15+ OTAs in real time. Eliminate overbookings, boost occupancy, and manage all channels from one dashboard."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"SoftwareApplication",
          "name":"Apex Bookings Channel Manager",
          "applicationCategory":"BusinessApplication",
          "operatingSystem":"Web",
          "offers":{"@type":"Offer","priceCurrency":"INR","availability":"https://schema.org/InStock"},
          "provider":{"@type":"Organization","name":"Apex Bookings","url":"https://apexbookings.in"}
        })}}/>
      </Head>
      <Navbar light={false}/>

            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
{/* Hero */}
      <section className="inner-hero">
        <div className="inner-hero-bg"/><div className="inner-hero-glow"/>
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="inner-hero-layout">
            <div>
              <span className="label label-w">Channel Manager</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>
                One dashboard.<br/>Every OTA. Real-time.
              </h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>
                Connect 15+ OTAs and sync rates, inventory, and restrictions across all platforms simultaneously — from a single dashboard.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-primary">Get a Demo</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/cm-rate-management.png"} alt="Channel Manager" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>

      {/* OTA network image */}
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">OTA Connectivity</span>
              <h2 className="heading" style={{marginBottom:18}}>Simplify your hotel operations with our advanced channel manager</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:16}}>Seamlessly sync your availability, rates, and inventory across OTAs and your hotel website in real time.</p>
              <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:28}}>
                {['Eliminate overbookings with real-time syncing','Boost occupancy and optimize every booking for maximum revenue','Easily manage and update rates with just a click'].map(p => (
                  <div key={p} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                    <div style={{width:20,height:20,borderRadius:'50%',background:'var(--blue-l)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{fontSize:14.5,color:'var(--ink)',fontWeight:500}}>{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Connect My Hotel</button>
            </div>
            <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 24px 64px rgba(0,0,0,0.1)'}}>
              <img src={imgs.split || "/images/ota-network-new.png"} alt="OTA Network" style={{width:'100%',height:'auto',display:'block'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>


      {/* UNIQUE: Horizontal icon+stat strip — channel manager specific */}
      <section style={{background:'var(--ink-2)',padding:'48px 0'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1px',background:'rgba(255,255,255,0.06)',borderRadius:16,overflow:'hidden'}}>
            {[
              {stat:'15+',label:'OTA Channels Connected',icon:'🔗'},
              {stat:'Real-time',label:'Two-Way Inventory Sync',icon:'⚡'},
              {stat:'Zero',label:'Manual Updates Needed',icon:'✋'},
              {stat:'3-5 days',label:'Average Setup Time',icon:'🚀'},
            ].map((item,i) => (
              <div key={i} style={{padding:'28px 20px',display:'flex',gap:16,alignItems:'flex-start'}}>
                <div style={{fontSize:26,flexShrink:0}}>{item.icon}</div>
                <div>
                  <div style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:22,color:'var(--gold)',marginBottom:3}}>{item.stat}</div>
                  <div style={{fontSize:13,color:'rgba(255,255,255,0.45)',fontWeight:500}}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed features */}
      <section className="section">
        <div className="container">
          <div style={{marginBottom:32,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">Everything inside the Channel Manager</h2>
          </div>
          <div className="feature-tabs">
            {TABS.map((t,i) => (
              <button key={t.key} className={`feature-tab${activeTab===i?' active':''}`} onClick={()=>setActiveTab(i)}>{t.label}</button>
            ))}
          </div>
          <div className="feature-tab-content active">
            <div style={{borderRadius:14,overflow:'hidden',boxShadow:'0 24px 64px rgba(0,0,0,0.1)'}}>
              <img src={tab.img} alt={tab.title} style={{width:'100%',height:'auto',display:'block'}} loading="lazy"/>
            </div>
            <div>
              <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:24,fontWeight:800,color:'var(--ink)',marginBottom:24,letterSpacing:'-0.02em'}}>{tab.title}</h3>
              {tab.points.map((p,i) => (
                <div key={i} className="feature-check-item">
                  <div className="feature-check-dot">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-5" stroke="var(--blue)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div><strong>{p.t}</strong><p>{p.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 24px 64px rgba(0,0,0,0.08)'}}>
              <img src={imgs.how_it_works || "/images/how-it-works.png"} alt="How it works" style={{width:'100%',height:'auto',display:'block'}} loading="lazy"/>
            </div>
            <div>
              <span className="label">How It Works</span>
              <h2 className="heading" style={{marginBottom:32}}>Get started in 3 simple steps</h2>
              <div className="how-steps">
                {[
                  {t:'Share Your Property Details',d:'Tell us about your hotel — room types, amenities, and existing OTA accounts. Our team collects everything needed.'},
                  {t:'We Set Up & Connect',d:'We configure your channel manager, connect all your OTAs, and set up rate plans and inventory rules.'},
                  {t:'Go Live & Start Receiving Bookings',d:'Your hotel is live on all channels simultaneously. Bookings start flowing in and syncing to your PMS automatically.'},
                ].map((step,i) => (
                  <div key={i} className="how-step">
                    <div className="how-step-num">{i+1}</div>
                    <div>
                      <div style={{fontWeight:700,fontSize:15,color:'var(--ink)',marginBottom:4}}>{step.t}</div>
                      <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.65}}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section">
        <div className="container" style={{maxWidth:800}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <span className="label">FAQ</span>
            <h2 className="heading">Channel Manager — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (
            <div key={i} className={`faq-item${openFaq===i?' open':''}`}>
              <button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span className="faq-q">{f.q}</span>
                <span className="faq-icon">+</span>
              </button>
              {openFaq===i && <p className="faq-ans">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2 className="cta-h">Ready to connect your hotel to 15+ OTAs?</h2>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the complete setup in 3–5 business days.</p>
            </div>
            <div className="cta-btns">
              <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
              <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

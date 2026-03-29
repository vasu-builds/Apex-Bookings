import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import TestimonialCarousel from '../src/components/TestimonialCarousel'
import EnquiryModal from '../src/components/EnquiryModal'

function Counter({ end, suffix = '' }) {
  const [v, setV] = useState(0)
  const ref = useRef(null)
  const ran = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true
        let n = 0
        const t = setInterval(() => {
          n += end / 55
          if (n >= end) { setV(end); clearInterval(t) } else setV(Math.floor(n))
        }, 28)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{v}{suffix}</span>
}

const OTAS = ['Booking.com','MakeMyTrip','Goibibo','Airbnb','Expedia','Agoda','EaseMyTrip','Cleartrip','Yatra','TripAdvisor','Hotels.com','Traveloka','Paytm Travel','Trip.com','Via.com','Ctrip','Travelocity']

const SERVICES_BASE = [
  { n:'01', label:'Channel Manager', imgKey:'channel_manager_split', imgFallback:'/images/cm-rate-management.png', desc:'One-click rate and inventory updates across 15+ OTAs simultaneously. No manual switching, no overbookings.' },
  { n:'02', label:'Booking Engine', imgKey:'booking_engine_split', imgFallback:'/images/booking-engine-new.png', desc:'Commission-free direct bookings with a mobile-first checkout. Promo codes, meal plans, and instant availability.' },
  { n:'03', label:'Cloud PMS', imgKey:'service_pms', imgFallback:'/images/pms-calendar.png', desc:'Complete property management — front desk, housekeeping, billing, and reports from any device, anywhere.' },
  { n:'04', label:'Cloud POS', imgKey:'service_pos', imgFallback:'/images/pos-new.png', desc:'F&B operations made simple. Visual menu, table orders, kitchen tickets, and room-bill posting in one system.' },
  { n:'05', label:'Google Hotel Ads', imgKey:'service_gha', imgFallback:'/images/google-ads-desktop.png', desc:'Appear alongside OTAs at the top of Google Search with a direct booking link. Pay only per click.' },
  { n:'06', label:'Revenue Management', imgKey:'service_revenue', imgFallback:'/images/revenue-mgmt-diagram.png', desc:'Demand forecasting, dynamic pricing, and competitor analysis — fully managed to maximize your ADR and RevPAR.' },
]

const TESTIMONIALS = [
  { quote:'Apex Bookings has been a genuine game-changer. Our OTA connectivity is seamless, revenue has grown significantly, and the support team is always available and knowledgeable.', name:'Mr. Rohit Panwar', hotel:'Aarogya Residency', rating:5 },
  { quote:'Occupancy improved noticeably within the first few months. The Channel Manager is reliable and their team is proactive in suggesting improvements.', name:'Mr. Sagar Negi', hotel:'Hotel Kishna Palace', rating:5 },
  { quote:'Streamlined our operations entirely. The seasonal package features and support are excellent. A trustworthy long-term partner for our hotel.', name:'Mr. Sunil Bisht', hotel:'Silver River Resort', rating:5 },
  { quote:'The Booking Engine has transformed our direct reservations. We are seeing 40% more direct bookings than before. Highly recommend Apex Bookings.', name:'Mr. Anil Sharma', hotel:'Grand Palace Hotel', rating:5 },
  { quote:'Revenue management services from Apex have helped us optimize our pricing strategy. Our RevPAR has improved by 25% since we started with them.', name:'Ms. Priya Nair', hotel:'The Hillside Resort', rating:5 },
]

const FAQS = [
  { q:'Is revenue management essential for OTA success?', a:'Yes. Revenue management is about setting the right price at the right time based on demand, competitor rates, and occupancy. Our team manages this daily so your hotel stays competitive and profitable across every channel.' },
  { q:'How many OTAs does Apex list my hotel on?', a:'We list on 15+ major OTAs including Booking.com, MakeMyTrip, Goibibo, Airbnb, Expedia, Agoda, EaseMyTrip, Cleartrip, Yatra, and TripAdvisor. Maximum distribution, maximum visibility.' },
  { q:'How do you handle no-shows on Booking.com?', a:'Our team monitors every reservation. We implement proper cancellation and no-show policies, and use credit card tokenization to charge confirmed no-shows — protecting your revenue without extra work from your end.' },
  { q:'Can I use only one product without the full suite?', a:'Absolutely. Each product is standalone. Start with just the Channel Manager or Booking Engine and add more as you grow. We also offer bundled plans with better pricing when you combine multiple products.' },
  { q:'How long does onboarding take?', a:'Most hotels are live within 3–5 business days. Our team handles the complete setup — OTA connections, PMS configuration, and channel manager activation — with dedicated onboarding support throughout.' },
]

export default function Home() {
  const [activeSvc, setActiveSvc] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const otas2 = [...OTAS, ...OTAS]
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.homepage || {}

  // Dynamic images from CMS
  const heroDashImg = imgs.hero_dashboard || '/images/analytics-illustration.png'
  const aboutImg = imgs.about_section || '/images/hotel-ota-illustration.png'
  const cmSplitImg = imgs.channel_manager_split || '/images/ota-network-new.png'
  const beSplitImg = imgs.booking_engine_split || '/images/booking-engine-new.png'

  // Build services with config images
  const SERVICES = SERVICES_BASE.map(s => ({...s, img: imgs[s.imgKey] || s.imgFallback}))

  return (
    <>
            <Head>
        <title>Apex Bookings — Hotel Revenue Management & Technology | India</title>
        <meta name="description" content="India's leading hotel revenue management company. Channel Manager, Booking Engine, Cloud PMS, OTA Listing & Digital Marketing for hotels. 200+ hotels, 5x average revenue growth."/>
        <meta name="keywords" content="hotel revenue management india, hotel channel manager, hotel booking engine, hotel PMS, hotel technology company, OTA listing hotel, apex bookings haldwani"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in"/>
        <meta property="og:title" content="Apex Bookings — Hotel Revenue Management & Technology"/>
        <meta property="og:description" content="India's leading hotel technology company. Channel Manager, Booking Engine, Cloud PMS, and Revenue Management for 200+ hotels."/>
        <meta property="og:url" content="https://apexbookings.in"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Apex Bookings — Hotel Revenue Management & Technology"/>
        <meta name="twitter:description" content="India's leading hotel technology company. 200+ hotels served, 5x average revenue growth."/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Apex Bookings",
          "description": "India's leading hotel revenue management and technology company. Channel Manager, Booking Engine, Cloud PMS, OTA Listing and Digital Marketing for hotels.",
          "url": "https://apexbookings.in",
          "telephone": "+918171871902",
          "email": "info@apexbookings.in",
          "foundingDate": "2017",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Phartyal's Annexe, Anupam Vihar",
            "addressLocality": "Haldwani",
            "addressRegion": "Uttarakhand",
            "postalCode": "263139",
            "addressCountry": "IN"
          },
          "geo": { "@type": "GeoCoordinates", "latitude": 29.2183, "longitude": 79.5130 },
          "openingHours": "Mo-Sa 09:00-18:00",
          "sameAs": [],
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "200" },
          "serviceArea": { "@type": "Country", "name": "India" },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Hotel Technology Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Channel Manager" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Booking Engine" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud PMS" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Revenue Management" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "OTA Listing" } }
            ]
          }
        })}}/>
      </Head>
      <Navbar light={false} />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />

      {/* ── HERO — tech feel, no hotel photo ── */}
      <section className="hero" style={{minHeight:'100svh'}}>
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        {/* Extra tech dots layer */}
        <div className="hero-tech-dots" />
        <div className="container">
          <div className="hero-body">
            <div>
              <div className="hero-tag anim d1">
                <span className="hero-tag-dot" />
                <span>India's Leading Hotel Revenue Management Company</span>
              </div>
              <h1 className="hero-h1 anim d2">
                Your Partner in<br />
                <em>Hotel Revenue</em><br />
                Growth
              </h1>
              <p className="hero-p anim d3">
                From channel managers and booking engines to cloud PMS and revenue management — we give hotels the tools and expertise to maximize bookings and outperform competitors.
              </p>
              <div className="hero-actions anim d4">
                <a href="tel:+918171871902" className="btn-whatsapp" style={{display:'inline-flex',alignItems:'center',gap:10,textDecoration:'none'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                  <span>
                    <span style={{display:'block',fontSize:11,fontWeight:600,opacity:0.75,letterSpacing:'0.05em',textTransform:'uppercase',lineHeight:1}}>Call Us Now</span>
                    <span style={{display:'block',fontSize:17,fontWeight:800,letterSpacing:'-0.01em',lineHeight:1.3}}>+91 81718 71902</span>
                  </span>
                </a>
                <button onClick={() => setEnquiryOpen(true)} className="btn-ghost" style={{border:'1px solid rgba(255,255,255,0.25)',cursor:'pointer'}}>Get Started</button>
              </div>
              <div className="hero-stats anim d5">
                {[['7','+','Years Active'],['200','+','Hotels Served'],['15','+','OTA Partners'],['5','x','Revenue Growth']].map(([n,s,l]) => (
                  <div key={l}>
                    <div className="hero-stat-n"><Counter end={parseInt(n)} suffix={s} /></div>
                    <div className="hero-stat-l">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — dashboard panel */}
            <div className="hero-right" style={{position:'relative'}}>
              <div className="hero-panel">
                <div className="hero-panel-bar">
                  <span className="dot" style={{background:'#ff5f57'}}/>
                  <span className="dot" style={{background:'#febc2e'}}/>
                  <span className="dot" style={{background:'#28c840'}}/>
                  <span style={{fontSize:11.5,color:'rgba(255,255,255,0.3)',marginLeft:10,fontWeight:500}}>Revenue Dashboard</span>
                  <span style={{marginLeft:'auto',fontSize:10.5,background:'rgba(40,200,64,0.15)',color:'#4ade80',padding:'2px 9px',borderRadius:100,fontWeight:700}}>● Live</span>
                </div>
                <img src={heroDashImg} alt="Revenue Analytics Dashboard" style={{width:'100%',height:'auto',display:'block'}} loading="eager" fetchpriority="high"/>
              </div>
              <div className="hero-chip" style={{bottom:-14,left:-20}}>
                <div className="hero-chip-icon" style={{background:'#f0fdf4'}}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="hero-chip-sub">New Booking</div>
                  <div className="hero-chip-val">+₹4,200</div>
                </div>
              </div>
              <div className="hero-chip" style={{top:16,right:-16}}>
                <div className="hero-chip-icon" style={{background:'#eef3ff'}}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="hero-chip-sub">Occupancy</div>
                  <div className="hero-chip-val">87% ↑</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTA MARQUEE ── */}
      <div style={{background:'var(--surface)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'20px 0',overflow:'hidden'}}>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {otas2.map((o,i) => (
              <div key={i} className="ota-pill">
                <span className="ota-dot"/>
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section style={{overflow:'hidden'}}>
        <div className="about-split">
          <div className="about-img-col" style={{minHeight:480,overflow:'hidden',position:'relative'}}>
            <Image src={aboutImg} alt="Hotel connected to OTAs" fill sizes="(max-width:768px) 100vw, 50vw" style={{objectFit:'cover'}} unoptimized={aboutImg.startsWith('/')?false:true}/>
            <div className="about-overlay"/>
            <div className="about-badge">2017<small>Est. India</small></div>
          </div>
          <div className="about-text-col">
            <span className="label label-w">About Us</span>
            <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(26px,3vw,42px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:20}}>
              Built to solve real hospitality problems
            </h2>
            <p style={{fontSize:15.5,color:'rgba(255,255,255,0.5)',lineHeight:1.8,marginBottom:14,fontWeight:400}}>
              Apex Bookings was founded in 2017 to address a clear gap — mid-segment hotels had no affordable way to compete online against large chains and OTA dominance.
            </p>
            <p style={{fontSize:15.5,color:'rgba(255,255,255,0.5)',lineHeight:1.8,fontWeight:400}}>
              Today we serve 200+ hotels across India with channel management, revenue optimization, cloud software, and digital marketing — all under one roof.
            </p>
            <div className="about-stats">
              {[['200+','Hotels Served'],['15+','OTA Partners'],['7+','Years Active'],['5x','Avg Revenue Growth']].map(([n,l]) => (
                <div key={l}>
                  <div className="about-stat-n">{n}</div>
                  <div className="about-stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES INTERACTIVE PANEL ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:40,flexWrap:'wrap',gap:16}}>
            <div>
              <span className="label">Products & Services</span>
              <h2 className="heading">Everything a hotel needs to win online</h2>
            </div>
            <Link href="/pricing" style={{fontSize:13,fontWeight:600,color:'var(--muted)',display:'inline-flex',alignItems:'center',gap:5,textDecoration:'none',letterSpacing:'0.01em',transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--blue)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--muted)'}>
              See Pricing
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div className="svc-wrap">
            <div className="svc-list">
              {SERVICES.map((s,i) => (
                <div key={s.n} className={`svc-item${activeSvc===i?' active':''}`} onClick={()=>setActiveSvc(i)}>
                  <div>
                    <div className="svc-item-num">{s.n}</div>
                    <div className="svc-item-name">{s.label}</div>
                  </div>
                  <div className="svc-item-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="svc-panel">
              <img key={activeSvc} src={SERVICES[activeSvc].img} alt={SERVICES[activeSvc].label} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}} loading="lazy"/>
              <div className="svc-panel-overlay"/>
              <div className="svc-panel-text">
                <p style={{fontSize:10.5,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>{SERVICES[activeSvc].label}</p>
                <p style={{fontSize:15,color:'rgba(255,255,255,0.82)',lineHeight:1.7,maxWidth:520}}>{SERVICES[activeSvc].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-row">
        {[['7','+','Years of Experience'],['200','+','Hotels Served'],['15','+','OTA Connections'],['5','x','Revenue Growth']].map(([n,s,l],i) => (
          <div key={i} className="stat-cell">
            <div className="stat-val"><Counter end={parseInt(n)} suffix={s}/></div>
            <div className="stat-l">{l}</div>
          </div>
        ))}
      </div>

      {/* ── CHANNEL MANAGER SPLIT ── */}
      <section className="section">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Channel Manager</span>
              <h2 className="heading" style={{marginBottom:18}}>One click. All 15+ OTAs updated instantly.</h2>
              <div className="split-text">
                <p>Connect your hotel to every major OTA simultaneously. Update rates, availability, and restrictions from a single dashboard — changes propagate across Booking.com, MakeMyTrip, Goibibo, Airbnb, Expedia and more within seconds.</p>
                <p>Two-way sync with your PMS means all bookings flow in automatically. No double data entry, no risk of overbooking.</p>
              </div>
              <Link href="/channel-manager" className="btn-primary" style={{display:'inline-flex',marginTop:16}}>
                Explore Channel Manager
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="split-img-wrap">
              <Image src={cmSplitImg} alt="OTA Network" width={680} height={420} style={{width:'100%',height:'auto',display:'block'}} loading="lazy" unoptimized={cmSplitImg.startsWith('/')?false:true}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ENGINE SPLIT reversed ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="split-row" style={{direction:'rtl'}}>
            <div style={{direction:'ltr'}}>
              <span className="label">Booking Engine</span>
              <h2 className="heading" style={{marginBottom:18}}>Commission-free direct bookings from your website.</h2>
              <div className="split-text">
                <p>A mobile-first booking engine that converts website visitors into direct guests — with zero OTA commission. Every booking means 100% of the revenue stays with your hotel.</p>
                <p>Promo codes, meal plans, room upgrades, and a secure payment gateway (UPI, cards, net banking) built in. Integrates with your website in days, not months.</p>
              </div>
              <Link href="/booking-engine" className="btn-primary" style={{display:'inline-flex',marginTop:16}}>
                Explore Booking Engine
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
            <div className="split-img-wrap" style={{direction:'ltr'}}>
              <Image src={beSplitImg} alt="Booking Engine Interface" width={680} height={420} style={{width:'100%',height:'auto',display:'block'}} loading="lazy" unoptimized={beSplitImg.startsWith('/')?false:true}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="section">
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:40,flexWrap:'wrap',gap:16}}>
            <div>
              <span className="label">Testimonials</span>
              <h2 className="heading">What our hotels say</h2>
            </div>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS}/>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-sticky">
              <span className="label">FAQ</span>
              <h2 className="heading" style={{marginBottom:14}}>Common questions</h2>
              <p className="subtext" style={{marginTop:0,marginBottom:28}}>Everything you need to know before partnering with Apex Bookings.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>
                Ask Us Directly
              </button>
            </div>
            <div>
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
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <div>
              <h2 className="cta-h">Ready to grow your hotel revenue?</h2>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>
                Join 200+ hotels across India already working with Apex Bookings.
              </p>
            </div>
            <div className="cta-btns">
              <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Get Started</button>
              <a href="tel:+918171871902" className="btn-cta-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

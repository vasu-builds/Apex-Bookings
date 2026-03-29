import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const FEATS = [['Custom Design', 'Tailored to your hotel brand — not a template. Designed to stand out and convert visitors.'], ['Mobile-First', 'Perfect experience on smartphones and tablets, where most travelers now search and book.'], ['Booking Engine Integration', 'Direct booking capability with zero commission on every booking from your website.'], ['SEO Optimization', 'On-page SEO, structured data, Core Web Vitals, and page speed properly configured.'], ['Google Hotel Ads Ready', 'Structured for immediate Google Hotel Ads integration once the site goes live.'], ['Hosting and Maintenance', 'Reliable hosting, SSL, backups, and ongoing technical support all included.']]
const HOW_STEPS = [['Design and Content', 'We design your website and write professional hotel content aligned with your brand.'], ['Development and Integration', 'We build the site and integrate your booking engine, payment gateway, and Google Hotel Ads.'], ['Launch and Handover', 'We launch your website, set up analytics, and provide you with full control and access.']]
const FAQS = [['What kind of hotel websites do you build?', 'We build custom, responsive hotel websites optimized for direct bookings — including integration with our booking engine, payment gateway, and Google Hotel Ads. The design is tailored to your brand, not from a template.'], ['Do you include a booking engine with the website?', 'Yes. All hotel websites we build include our integrated booking engine, allowing guests to book and pay directly without going through an OTA.'], ['How long does it take to build a hotel website?', 'Most hotel websites are completed and launched within 2-3 weeks from the time we receive your content, photos, and branding materials.'], ['Is hosting included?', 'Yes. We include reliable cloud hosting, SSL certificate, and ongoing technical maintenance as part of our website package.'], ['Will my hotel website rank on Google?', 'We implement all on-page SEO best practices including meta tags, structured data, page speed optimization, and mobile-first design — giving your website the best foundation to rank on Google.']]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.website_development || {}
  const [openFaq, setOpenFaq] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  return (
    <>
            <Head>
        <title>Hotel Website Development — Custom, SEO-Optimized | Apex Bookings</title>
        <meta name="description" content="Custom hotel websites built to convert visitors into direct bookings. Mobile-first, SEO-optimized, booking engine integrated, Google Hotel Ads ready. 2-3 week delivery."/>
        <meta name="keywords" content="hotel website development, hotel website design india, custom hotel website, hotel website with booking engine, hotel web development"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/website-development"/>
        <meta property="og:url" content="https://apexbookings.in/website-development"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/website-development"/>
        <meta property="og:title" content="Hotel Website Development — Custom, SEO-Optimized | Apex Bookings"/>
        <meta property="og:description" content="Custom hotel websites built to convert visitors into direct bookings. Mobile-first, SEO-optimized, booking engine integrated, Google Hotel Ads ready. 2-3 week delivery."/>
        <meta property="og:url" content="https://apexbookings.in/website-development"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Website Development — Custom, SEO-Optimized | Apex Bookings"/>
        <meta name="twitter:description" content="Custom hotel websites built to convert visitors into direct bookings. Mobile-first, SEO-optimized, booking engine integrated, Google Hotel Ads ready. 2-3 week delivery."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          "name":"Hotel Website Development",
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
              <span className="label label-w">Website Development</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>Hotel websites that look great and convert.</h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>Custom, mobile-first hotel websites built to turn visitors into direct bookings. Integrated booking engine, SEO-optimized, and Google Hotel Ads ready.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">() Get Started</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/website-design.png"} alt="Website Development" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Website Development</span>
              <h2 className="heading" style={{marginBottom:18}}>Your website is your most profitable booking channel.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:28}}>We design and build hotel websites that look premium, load fast, and convert visitors into direct guests — with integrated booking engine from day one.</p>
              <button onClick={() => setEnquiryOpen(true)} className="btn-primary" style={{display:'inline-flex',border:'none',cursor:'pointer'}}>Talk to Our Team</button>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.split || "/images/booking-engine-new.png"} alt="Website Development" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{marginBottom:36,textAlign:'center'}}>
            <span className="label">Features</span>
            <h2 className="heading">What's Included with Website Development</h2>
          </div>
          {/* Unique layout: 2-col with gold check + bold title */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24}}>
            {FEATS.map(([ft,fd],i) => (
              <div key={i} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:'rgba(240,165,0,0.12)',border:'1.5px solid rgba(240,165,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:14.5,color:'var(--ink)',marginBottom:4}}>{ft}</div>
                  <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.65}}>{fd}</div>
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
            <h2 className="heading">Website Development — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i) => (<div key={i} className={`faq-item${openFaq===i?' open':''}`}><button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="faq-q">{f[0]}</span><span className="faq-icon">+</span></button>{openFaq===i && <p className="faq-ans">{f[1]}</p>}</div>))}
        </div>
      </section>
      <div className="cta-band"><div className="container"><div className="cta-inner"><div>
        <h2 className="cta-h">Ready to get started with Website Development?</h2>
        <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
      </div><div className="cta-btns">
        <button onClick={() => setEnquiryOpen(true)} className="btn-cta-whatsapp" style={{border:'none',cursor:'pointer'}}>Contact Us</button>
        <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
      </div></div></div></div>
      <Footer/>
    </>
  )
}
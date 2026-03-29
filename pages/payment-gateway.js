import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import { useSiteConfig } from '../src/components/useSiteConfig'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'

const WA_ICON = (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>)
const CALL_ICON = (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>)

const GATEWAY_LOGOS = [
  { name:'Razorpay', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/razorpay.png', color:'#072654' },
  { name:'PayU', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/payu-payment-gateway.jpg', color:'#00b0f4' },
  { name:'PaySwiff', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/payswiff.png', color:'#ee2e31' },
  { name:'PayPal', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/paypal-payment-gateway.jpg', color:'#003087' },
  { name:'ICICI', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/icici-payment-gateway.jpg', color:'#f4813f' },
  { name:'HDFC', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/hdfc-payment-gateway.jpg', color:'#004c8f' },
  { name:'Federal Bank', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/federalbank-payment-gateway.jpg', color:'#e31e26' },
  { name:'EBS', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/ebs-payment-gateway.jpg', color:'#0070b8' },
  { name:'Citrus Pay', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/citrus-payment-gateway.jpg', color:'#f5a623' },
  { name:'CCAvenue', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/ccavenue-payment-gateway.jpg', color:'#d01c2e' },
  { name:'Axis Bank', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/axis-payment-gateway.jpg', color:'#97144d' },
  { name:'Atom', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/atom-payment-gateway.jpg', color:'#00509e' },
  { name:'Airpay', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/airpay.png', color:'#00b4e3' },
  { name:'Sampath Bank', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/sampath.png', color:'#e30613' },
  { name:'Worldline', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/worldline.jpg', color:'#e30613' },
  { name:'iPay', src:'https://eglobewebsite.s3.eu-west-1.amazonaws.com/images/api/ipay.jpg', color:'#0b5cab' },
]
const LOGOS_DOUBLED = [...GATEWAY_LOGOS, ...GATEWAY_LOGOS]

const BENEFITS = [
  { icon:'🔒', title:'PCI-DSS Compliant', desc:'Enterprise-grade security with end-to-end encryption on every transaction processed.', cls:'' },
  { icon:'💳', title:'All Payment Methods', desc:'UPI, credit & debit cards, net banking, wallets — domestic and international.', cls:'gold-icon' },
  { icon:'🌍', title:'International Cards', desc:'Accept Visa, Mastercard, and Amex from international guests in multiple currencies.', cls:'green-icon' },
  { icon:'🚫', title:'No-Show Protection', desc:'Credit card tokenization lets you charge confirmed no-shows and late cancellations.', cls:'' },
  { icon:'⚡', title:'Fast Settlement', desc:'Transparent settlement cycles with no hidden fees or unexpected deductions.', cls:'gold-icon' },
  { icon:'📊', title:'Transaction Analytics', desc:'Track success rates, revenue, and preferred payment methods in real time.', cls:'green-icon' },
]

const HOW_STEPS = [
  ['Link to Your Booking Engine','We integrate the payment gateway directly into your Apex Bookings booking engine and PMS.'],
  ['Configure Settlement','We set up your bank account details and configure settlement cycles to your preference.'],
  ['Go Live','Your guests can immediately pay through all available payment methods at checkout.'],
]

const FAQS = [
  ['What payment methods can guests use?','Guests can pay using UPI, Visa, Mastercard, RuPay, American Express, all major net banking options, and wallets including Paytm, PhonePe, and Google Pay.'],
  ['Is the payment gateway PCI-DSS compliant?','Yes. Our payment gateway is fully PCI-DSS compliant with end-to-end encryption, ensuring all transactions are processed securely.'],
  ['Can I charge guests for no-shows?','Yes. We implement credit card tokenization which allows you to charge guests for confirmed no-shows and late cancellations as per your cancellation policy.'],
  ['How quickly do settlements happen?','Settlement timelines are typically T+2 business days. We work with gateways that offer competitive settlement cycles.'],
  ['Are there additional transaction fees?','Transaction fees depend on the payment method and gateway provider. We provide full transparency on all fees before setup — no hidden charges.'],
]

export default function Page() {
  const cfg = useSiteConfig()
  const imgs = cfg?.images?.payment_gateway || {}
  const [openFaq, setOpenFaq] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <>
            <Head>
        <title>Hotel Payment Gateway — All Methods, PCI-DSS Secure | Apex Bookings</title>
        <meta name="description" content="Integrated hotel payment gateway supporting UPI, cards, net banking, and wallets. PCI-DSS compliant, T+2 settlement, no-show protection. Works with Apex Booking Engine."/>
        <meta name="keywords" content="hotel payment gateway, hotel UPI payment, hotel online payment india, hotel booking payment, PCI DSS hotel payment"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="index, follow"/>
        <link rel="canonical" href="https://apexbookings.in/payment-gateway"/>
        <meta property="og:url" content="https://apexbookings.in/payment-gateway"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:image" content="https://apexbookings.in/images/og-image.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:image" content="https://apexbookings.in/images/og-image.png"/>
        <link rel="canonical" href="https://apexbookings.in/payment-gateway"/>
        <meta property="og:title" content="Hotel Payment Gateway — All Methods, PCI-DSS Secure | Apex Bookings"/>
        <meta property="og:description" content="Integrated hotel payment gateway supporting UPI, cards, net banking, and wallets. PCI-DSS compliant, T+2 settlement, no-show protection. Works with Apex Booking Engine."/>
        <meta property="og:url" content="https://apexbookings.in/payment-gateway"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Hotel Payment Gateway — All Methods, PCI-DSS Secure | Apex Bookings"/>
        <meta name="twitter:description" content="Integrated hotel payment gateway supporting UPI, cards, net banking, and wallets. PCI-DSS compliant, T+2 settlement, no-show protection. Works with Apex Booking Engine."/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Service",
          "name":"Hotel Payment Gateway",
          "provider":{"@type":"Organization","name":"Apex Bookings","url":"https://apexbookings.in","telephone":"+918171871902"},
          "areaServed":{"@type":"Country","name":"India"},
          "serviceType":"Hotel Technology Service"
        })}}/>
      </Head>
      <Navbar light={false}/>

            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
{/* HERO */}
      <section className="inner-hero">
        <div className="inner-hero-bg"/><div className="inner-hero-glow"/>
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="inner-hero-layout">
            <div>
              <span className="label label-w">Payment Gateway</span>
              <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(30px,5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.08,marginBottom:18}}>
                Secure payments.<br/>Every method.<br/>Instant settlement.
              </h1>
              <p style={{fontSize:16,color:'rgba(255,255,255,0.5)',lineHeight:1.8,maxWidth:460,marginBottom:36,fontWeight:400}}>
                Accept all major payment methods through a PCI-DSS compliant gateway integrated directly into your hotel booking engine and front desk system.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">Get Started on WhatsApp</button>
                <Link href="/pricing" className="btn-ghost">See Pricing</Link>
              </div>
            </div>
            <div className="inner-hero-img-wrap">
              <img src={imgs.hero || "/images/booking-engine-new.png"} alt="Payment Gateway" style={{width:'100%',height:'auto',display:'block'}} loading="eager"/>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section style={{background:'var(--ink-2)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
            {[['16+','Payment Gateways'],['PCI-DSS','Certified Security'],['T+2','Settlement Cycle']].map(([val,label],i)=>(
              <div key={i} style={{padding:'24px 16px',textAlign:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.07)':'none'}}>
                <div style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(20px,2.5vw,28px)',fontWeight:800,color:'var(--gold)',marginBottom:4}}>{val}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.35)',fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase'}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT GATEWAYS MARQUEE */}
      <section className="pg-marquee-section">
        <div className="container">
          <div className="pg-heading">
            <span className="label">Integrations</span>
            <h2 className="heading" style={{marginBottom:6}}>Connected Payment Gateways</h2>
            <p style={{fontSize:14.5,color:'var(--muted)',maxWidth:480,margin:'0 auto'}}>
              We integrate with all major Indian and international payment gateways so your guests can pay the way they prefer.
            </p>
          </div>
        </div>
        <div className="pg-track-wrap">
          <div className="pg-track">
            {LOGOS_DOUBLED.map((gw,i)=>(
              <div key={i} className="pg-logo-card" title={gw.name}>
                <img src={gw.src} alt={gw.name}
                  onError={e=>{e.target.style.display='none';e.target.parentElement.innerHTML=`<span style="font-size:12px;font-weight:700;color:${gw.color}">${gw.name}</span>`}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS — flowing no-box grid */}
      <section className="section">
        <div className="container">
          <div style={{marginBottom:40,textAlign:'center'}}>
            <span className="label">What&apos;s Included</span>
            <h2 className="heading">Everything in your Payment Gateway</h2>
          </div>
          <div className="benefits-flow" style={{border:'1px solid var(--border)',borderRadius:16,overflow:'hidden'}}>
            {BENEFITS.map((b,i)=>(
              <div key={i} className="benefit-item">
                <div className={`benefit-icon ${b.cls}`}><span>{b.icon}</span></div>
                <div>
                  <div className="benefit-text-title">{b.title}</div>
                  <div className="benefit-text-desc">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — centered timeline */}
      <section className="section section-alt">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:40}}>
            <span className="label">How It Works</span>
            <h2 className="heading">Up and running in 3 steps</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0,maxWidth:560,margin:'0 auto'}}>
            {HOW_STEPS.map((step,i)=>(
              <div key={i} style={{display:'flex',gap:20,paddingBottom:i<2?32:0,position:'relative'}}>
                {i<2&&<div style={{position:'absolute',left:19,top:40,bottom:0,width:2,background:'var(--border)'}}/>}
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--blue)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:16,flexShrink:0,zIndex:1}}>{i+1}</div>
                <div style={{paddingTop:8}}>
                  <div style={{fontWeight:700,fontSize:15,color:'var(--ink)',marginBottom:4}}>{step[0]}</div>
                  <div style={{fontSize:13.5,color:'var(--muted)',lineHeight:1.65}}>{step[1]}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:36}}>
            <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">Chat with Our Team</button>
          </div>
        </div>
      </section>

      {/* SPLIT: Every payment method */}
      <section className="section">
        <div className="container">
          <div className="split-row">
            <div>
              <span className="label">Payment Methods</span>
              <h2 className="heading" style={{marginBottom:18}}>Every payment method your guests expect.</h2>
              <p style={{fontSize:15.5,color:'var(--muted)',lineHeight:1.8,marginBottom:24}}>
                Visa, Mastercard, RuPay, UPI, Paytm, PhonePe, Google Pay, and all major net banking options — domestic and international guests can pay the way they prefer.
              </p>
              <div className="benefits-inline" style={{marginBottom:28}}>
                {['Zero manual reconciliation — all transactions logged automatically','Refunds and partial charges handled from one dashboard','Webhook alerts for failed, pending, or disputed payments'].map((txt,i)=>(
                  <div key={i} className="benefit-inline-item">
                    <div className="benefit-inline-dot"/>
                    <span style={{fontSize:14,color:'var(--ink)',fontWeight:500,lineHeight:1.6}}>{txt}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-whatsapp">Talk to Our Team</button>
                <a href="tel:+918171871902" className="btn-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
              </div>
            </div>
            <div className="split-img-wrap">
              <img src={imgs.hero||"/images/booking-engine-new.png"} alt="Payment Gateway" style={{width:'100%',height:'auto'}} loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container" style={{maxWidth:800}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <span className="label">FAQ</span>
            <h2 className="heading">Payment Gateway — Frequently Asked Questions</h2>
          </div>
          {FAQS.map((f,i)=>(
            <div key={i} className={`faq-item${openFaq===i?' open':''}`}>
              <button className="faq-trigger" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span className="faq-q">{f[0]}</span><span className="faq-icon">+</span>
              </button>
              {openFaq===i&&<p className="faq-ans">{f[1]}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band"><div className="container"><div className="cta-inner">
        <div>
          <h2 className="cta-h">Ready to get started with Payment Gateway?</h2>
          <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>Our team handles the full setup. You focus on running the hotel.</p>
        </div>
        <div className="cta-btns">
          <button onClick={() => setEnquiryOpen(true)} style={{border:"none",cursor:"pointer",background:"none",padding:0,font:"inherit",display:"inline-flex",alignItems:"center"}} className="btn-cta-whatsapp">WhatsApp Us</button>
          <a href="tel:+918171871902" className="btn-cta-call" style={{display:"inline-flex",alignItems:"center",gap:8}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg> +91 81718 71902</a>
        </div>
      </div></div></div>
      <Footer/>
    </>
  )
}

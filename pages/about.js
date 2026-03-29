import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import EnquiryModal from '../src/components/EnquiryModal'
import { useState } from 'react'
import { useSiteConfig } from '../src/components/useSiteConfig'

export default function About() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const cfg = useSiteConfig()
  return (
    <>
            <Head>
        <title>About Apex Bookings — India's Leading Hotel Technology Company</title>
        <meta name="description" content="Apex Bookings is India's leading hotel revenue management company. 7+ years, 200+ hotels, full-stack hospitality technology and expert management services."/>
        <meta name="keywords" content="apex bookings, hotel technology company india, hotel management company haldwani, hotel revenue management company"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href="https://apexbookings.in/about"/>
        <meta property="og:title" content="About Apex Bookings — India's Leading Hotel Technology Company"/>
        <meta property="og:description" content="Apex Bookings is India's leading hotel revenue management company. 7+ years, 200+ hotels, full-stack hospitality technology and expert management services."/>
        <meta property="og:url" content="https://apexbookings.in/about"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="About Apex Bookings — India's Leading Hotel Technology Company"/>
        <meta name="twitter:description" content="Apex Bookings is India's leading hotel revenue management company. 7+ years, 200+ hotels, full-stack hospitality technology and expert management services."/>
      </Head>
      <Navbar light={true} />
            <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
<div style={{paddingTop:68}}>
        <div style={{background:'var(--ink-2)',padding:'80px 0 64px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(26,79,196,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(26,79,196,0.05) 1px, transparent 1px)',backgroundSize:'52px 52px',WebkitMaskImage:'radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent)',maskImage:'radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent)'}}/>
          <div className="container" style={{position:'relative',zIndex:1}}>
            <span className="label label-w">About Apex Bookings</span>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4.5vw,60px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:16,maxWidth:640}}>
              Built to solve real hospitality problems
            </h1>
            <p style={{fontSize:17,color:'rgba(255,255,255,0.5)',maxWidth:540,lineHeight:1.8,fontWeight:400}}>
              Founded in 2017 with one goal — give every hotel, regardless of size or budget, the tools to compete online and grow independently.
            </p>
          </div>
        </div>

        <section style={{overflow:'hidden'}}>
          <div className="about-split" style={{overflow:'hidden'}}>
           <div style={{position:'relative', minHeight:'400px', overflow:'hidden', width:'100%', minWidth:0}}>
              <Image src={cfg?.images?.about?.hero || "/images/hotel-ota-illustration.png"} alt="Apex Bookings" fill style={{objectFit:'cover', objectPosition:'center'}} sizes="50vw" />
              <div className="about-overlay"/>
              <div className="about-badge">2017<small>Est. India</small></div>
            </div>
            <div className="about-text-col">
              <span className="label label-w">Our Story</span>
              <h2 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(24px,3vw,38px)',fontWeight:800,color:'white',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:20}}>
                From a real problem to a leading company
              </h2>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.5)',lineHeight:1.8,marginBottom:14,fontWeight:400}}>
                Mid-segment hotels had no affordable, effective way to build a strong online presence. They were losing revenue to OTA commissions and struggling with fragmented, expensive tools.
              </p>
              <p style={{fontSize:15.5,color:'rgba(255,255,255,0.5)',lineHeight:1.8,fontWeight:400}}>
                We built the tools, the strategies, and the team to fix that. Today Apex Bookings serves 200+ hotels across India with channel management, revenue optimization, cloud software, and digital marketing — under one roof, with one team.
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

        <section className="section">
          <div className="container">
            <span className="label">Our Team</span>
            <h2 className="heading" style={{marginBottom:40}}>The people behind Apex Bookings</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))',gap:1,background:'var(--border)',border:'1px solid var(--border)',borderRadius:18,overflow:'hidden'}}>
              {[
                {name:'Veera Saravanan',role:'Founder & CEO',initials:'VS',bg:'#1a4fc4'},
                {name:'Uma Maheswari',role:'Director & VP — Sales',initials:'UM',bg:'#7c3aed'},
                {name:'Sangeetha Vijay',role:'Technical Head',initials:'SV',bg:'#0891b2'},
                {name:'Lakshmi Sree',role:'Strategic Consultant & Operations',initials:'LS',bg:'#059669'},
              ].map((m,i) => (
                <div key={i} style={{background:'white',padding:'36px 28px',transition:'background 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#fafbff'}
                  onMouseLeave={e=>e.currentTarget.style.background='white'}>
                  <div style={{width:52,height:52,borderRadius:13,background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:19,fontWeight:800,color:'white',marginBottom:16,fontFamily:'Outfit,sans-serif'}}>{m.initials}</div>
                  <div style={{fontSize:16,fontWeight:700,color:'var(--ink)',marginBottom:4,letterSpacing:'-0.01em'}}>{m.name}</div>
                  <div style={{fontSize:13,color:'var(--muted)'}}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="cta-band">
          <div className="container">
            <div className="cta-inner">
              <div>
                <h2 className="cta-h">Partner with Apex Bookings</h2>
                <p style={{fontSize:15.5,color:'rgba(255,255,255,0.55)',lineHeight:1.75}}>200+ hotels across India trust us with their revenue growth.</p>
              </div>
              <div className="cta-btns">
                <button onClick={() => setEnquiryOpen(true)} className="btn-cta-gold" style={{border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>Get Started</button>
                <a href="/contact" className="btn-cta-out">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

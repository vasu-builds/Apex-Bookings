import { useState, useEffect } from 'react'
import Link from 'next/link'

const PRODUCTS = [
  ['Channel Manager', '/channel-manager'],
  ['Booking Engine', '/booking-engine'],
  ['Google Hotel Ads', '/google-hotel-ads'],
  ['Cloud PMS', '/cloud-pms'],
  ['Cloud POS', '/cloud-pos'],
]
const SERVICES = [
  ['Revenue Management', '/revenue-management'],
  ['OTA Listing', '/ota-listing'],
  ['Digital Marketing', '/digital-marketing'],
  ['Website Development', '/website-development'],
  ['Payment Gateway', '/payment-gateway'],
]

export default function Navbar({ light = false }) {
  const [scrolled, setScrolled] = useState(light)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (light) { setScrolled(true); return }
    const fn = () => setScrolled(window.scrollY > 30)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [light])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Dark hero → white logo. Scrolled/light pages → coloured logo.
  // Two separate PNGs, no CSS filter needed.
  const logoSrc = scrolled ? '/images/logo.png' : '/images/logo-white.png'
  const barColor = scrolled ? 'var(--ink)' : 'white'

  return (
    <>
      <nav className={`nav${scrolled ? ' solid' : ''}`}>
        <div className="container">
          <div className="nav-inner">

            {/* LOGO */}
            <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="Apex Bookings"
                style={{
                  height: '36px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  transition: 'opacity 0.25s ease',
                }}
              />
            </Link>

            {/* Desktop links */}
            <div className="nav-links">
              <Link href="/" className="nav-btn">Home</Link>

              <div className="nav-drop">
                <button className="nav-btn">
                  Products
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="nav-drop-menu">
                  {PRODUCTS.map(([l, h]) => (
                    <Link key={h} href={h} className="nav-drop-item">{l}</Link>
                  ))}
                </div>
              </div>

              <div className="nav-drop">
                <button className="nav-btn">
                  Services
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="nav-drop-menu">
                  {SERVICES.map(([l, h]) => (
                    <Link key={h} href={h} className="nav-drop-item">{l}</Link>
                  ))}
                </div>
              </div>

              <Link href="/pricing" className="nav-btn">Pricing</Link>
              <Link href="/about" className="nav-btn">About</Link>
              <Link href="/contact" className="nav-btn">Contact</Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <Link
                href="/contact"
                className="nav-cta"
              >
                Get Started
              </Link>

              <button
                className="nav-hamburger"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle navigation"
              >
                <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', background: barColor }} />
                <span style={{ opacity: mobileOpen ? 0 : 1, background: barColor }} />
                <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', background: barColor }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <Link href="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/pricing" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Pricing</Link>
        <Link href="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>Contact</Link>

        <div className="mobile-nav-group">
          <p className="mobile-nav-group-title">Products</p>
          {PRODUCTS.map(([l, h]) => (
            <Link key={h} href={h} className="mobile-nav-sub" onClick={() => setMobileOpen(false)}>{l}</Link>
          ))}
        </div>

        <div className="mobile-nav-group">
          <p className="mobile-nav-group-title">Services</p>
          {SERVICES.map(([l, h]) => (
            <Link key={h} href={h} className="mobile-nav-sub" onClick={() => setMobileOpen(false)}>{l}</Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="mobile-nav-cta"
          onClick={() => setMobileOpen(false)}
        >
          Get Started
        </Link>
      </div>
    </>
  )
}

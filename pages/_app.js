import '../src/styles/globals.css'
import FloatingButtons from '../src/components/FloatingButtons'
import Popup from '../src/components/Popup'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [siteConfig, setSiteConfig] = useState(null)
  const router = useRouter()
  const isAdmin = router.pathname.startsWith('/admin')

  useEffect(() => {
    // Load popup config from static data
    try {
      const config = {
        enabled: true,
        badge: 'Limited Time Offer',
        headline: 'Complete Hotel Technology Suite',
        subtext: 'Get Channel Manager, PMS, Booking Engine, Website & Hosting — all in one powerful bundle at a special price.',
        ctaText: 'Claim This Offer',
        ctaLink: '/offer'
      }
      setSiteConfig(config)
    } catch(e) {}
  }, [])

  return (
    <>
      <Component {...pageProps} />
      {!isAdmin && <FloatingButtons />}
      {!isAdmin && router.pathname === '/' && siteConfig && <Popup config={siteConfig} />}
    </>
  )
}

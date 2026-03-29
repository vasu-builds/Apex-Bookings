import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-body">
        <div>
          <img src="/images/logo-white.png" alt="Apex Bookings" style={{height:'34px',width:'auto',display:'block',objectFit:'contain'}}/>
          <p className="footer-tagline">India's leading hotel revenue management &amp; technology company. Established 2017.</p>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            <span className="footer-contact-item">Phartyal's Annexe, Anupam Vihar, Haldwani — 263139</span>
            <span className="footer-contact-item">+91 8171871902 &nbsp;/&nbsp; +91 8979071902</span>
            <span className="footer-contact-item">info@apexbookings.in &nbsp;/&nbsp; support@apexbookings.in</span>
          </div>
        </div>
        {[
          {h:'Products',links:[['Booking Engine','/booking-engine'],['Channel Manager','/channel-manager'],['Cloud PMS','/cloud-pms'],['Cloud POS','/cloud-pos'],['Google Hotel Ads','/google-hotel-ads']]},
          {h:'Services',links:[['Revenue Management','/revenue-management'],['OTA Listing','/ota-listing'],['Digital Marketing','/digital-marketing'],['Website Development','/website-development'],['Payment Gateway','/payment-gateway']]},
          {h:'Company',links:[['Home','/'],['About Us','/about'],['Pricing','/pricing'],['Blog','/blog'],['Contact','/contact']]},
        ].map(({h,links}) => (
          <div key={h}>
            <p className="footer-col-h">{h}</p>
            {links.map(([label,href]) => <Link key={href} href={href} className="footer-link">{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2024 Apex Bookings. All rights reserved.</span>
      </div>
    </footer>
  )
}

import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@700;800&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico"/>
        {/* Preload critical above-fold images */}
        <link rel="preload" as="image" href="/images/analytics-illustration.png"/>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com"/>
        <link rel="dns-prefetch" href="https://fonts.gstatic.com"/>
        <meta name="robots" content="index, follow"/>
        <meta name="author" content="Apex Bookings"/>
        <meta name="theme-color" content="#1a4fc4"/>
        <meta property="og:site_name" content="Apex Bookings"/>
        <meta property="og:locale" content="en_IN"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@ApexBookings"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Organization",
          "name":"Apex Bookings",
          "url":"https://apexbookings.in",
          "logo":"https://apexbookings.in/images/logo.png",
          "description":"India's leading hotel revenue management company — Channel Manager, Booking Engine, Cloud PMS, OTA Listing and Digital Marketing.",
          "telephone":"+918171871902",
          "email":"info@apexbookings.in",
          "address":{"@type":"PostalAddress","streetAddress":"Phartyal's Annexe, Anupam Vihar","addressLocality":"Haldwani","addressRegion":"Uttarakhand","postalCode":"263139","addressCountry":"IN"},
          "foundingDate":"2017",
          "areaServed":{"@type":"Country","name":"India"},
          "sameAs":["https://apexbookings.in"],
          "contactPoint":{"@type":"ContactPoint","telephone":"+918171871902","contactType":"customer service","areaServed":"IN","availableLanguage":["English","Hindi"]}
        })}}/>
      </Head>
      <body><Main/><NextScript/></body>
    </Html>
  )
}

const SITE_URL = 'https://apexbookings.in'

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/channel-manager', priority: '0.9', changefreq: 'monthly' },
  { url: '/booking-engine', priority: '0.9', changefreq: 'monthly' },
  { url: '/cloud-pms', priority: '0.9', changefreq: 'monthly' },
  { url: '/cloud-pos', priority: '0.8', changefreq: 'monthly' },
  { url: '/revenue-management', priority: '0.9', changefreq: 'monthly' },
  { url: '/digital-marketing', priority: '0.8', changefreq: 'monthly' },
  { url: '/website-development', priority: '0.8', changefreq: 'monthly' },
  { url: '/google-hotel-ads', priority: '0.8', changefreq: 'monthly' },
  { url: '/ota-listing', priority: '0.8', changefreq: 'monthly' },
  { url: '/payment-gateway', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.7', changefreq: 'daily' },
  { url: '/offer', priority: '0.7', changefreq: 'weekly' },
]

function generateSiteMap(staticPages, blogPosts) {
  const today = new Date().toISOString().split('T')[0]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
${blogPosts.map(p => `  <url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <lastmod>${p.createdAt || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  let blogPosts = []
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const r = await fetch(`${baseUrl}/api/admin/blog`)
    const data = await r.json()
    blogPosts = Array.isArray(data) ? data.filter(p => p.published && p.slug) : []
  } catch(e) {}

  const sitemap = generateSiteMap(STATIC_PAGES, blogPosts)
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.write(sitemap)
  res.end()
  return { props: {} }
}

export default function Sitemap() { return null }

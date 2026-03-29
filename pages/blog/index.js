import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../src/components/Navbar'
import Footer from '../../src/components/Footer'
import { getSupabaseServer } from '../../lib/supabase'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

function readLocalPosts() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) } catch { return [] }
}

function normalizePost(row) {
  if (!row) return null
  return {
    id: String(row.id),
    title: row.title || '',
    slug: row.slug || '',
    excerpt: row.excerpt || '',
    content: row.content || '',
    coverImage: row.cover_image || row.coverImage || '',
    category: row.category || 'General',
    author: row.author || 'Apex Bookings Team',
    readTime: row.read_time || row.readTime || '4 min read',
    published: !!row.published,
    createdAt: (row.created_at || row.createdAt || new Date().toISOString()).split('T')[0],
  }
}

export async function getServerSideProps() {
  let posts = []

  // Try Supabase first
  const sb = getSupabaseServer()
  if (sb) {
    try {
      const { data, error } = await sb
        .from('blog_posts').select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      if (!error && data) {
        posts = data.map(normalizePost)
        return { props: { posts } }
      }
    } catch(e) { /* fall through */ }
  }

  // JSON fallback — read directly, no HTTP fetch
  posts = readLocalPosts()
    .filter(p => p.published)
    .map(normalizePost)
    .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  return { props: { posts } }
}

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog — Hotel Technology &amp; Revenue Management Insights | Apex Bookings</title>
        <meta name="description" content="Hotel revenue management tips, OTA strategies, channel manager guides, and technology insights from Apex Bookings — India's leading hotel management company."/>
        <meta name="keywords" content="hotel management blog, hotel revenue tips, OTA strategy hotel, hotel technology blog, hotel channel manager guide"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href="https://apexbookings.in/blog"/>
        <meta property="og:title" content="Blog — Apex Bookings Hotel Technology Insights"/>
        <meta property="og:description" content="Hotel revenue management tips, OTA strategies, and technology guides from Apex Bookings."/>
        <meta property="og:url" content="https://apexbookings.in/blog"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://apexbookings.in/images/logo.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <Navbar light={true}/>
      <div style={{paddingTop:68}}>
        <div style={{background:'var(--surface)',borderBottom:'1px solid var(--border)',padding:'52px 0 40px'}}>
          <div className="container">
            <span className="label">Blog</span>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(28px,4vw,52px)',fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',marginBottom:10,lineHeight:1.1}}>
              Hotel Technology Insights
            </h1>
            <p style={{fontSize:16,color:'var(--muted)',lineHeight:1.75,maxWidth:520,fontWeight:400}}>
              Tips, guides, and industry insights to help hoteliers grow revenue and streamline operations.
            </p>
          </div>
        </div>
        <section className="section">
          <div className="container">
            {posts.length === 0 ? (
              <p style={{color:'var(--muted)',textAlign:'center',padding:'60px 0',fontSize:16}}>No posts published yet. Check back soon.</p>
            ) : (
              <div className="blog-grid">
                {posts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                    {post.coverImage && (
                      <div className="blog-card-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage} alt={post.title} loading="lazy"/>
                      </div>
                    )}
                    <div className="blog-card-body">
                      <div className="blog-category">{post.category}</div>
                      <h2 className="blog-title">{post.title}</h2>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-meta">
                        <span>{post.readTime}</span>
                        <span>·</span>
                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ''}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

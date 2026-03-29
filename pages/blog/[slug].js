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

function parseMarkdown(md) {
  if (!md) return ''
  return md
    .replace(/^#### (.*$)/gm,'<h4>$1</h4>')
    .replace(/^### (.*$)/gm,'<h3>$1</h3>')
    .replace(/^## (.*$)/gm,'<h2>$1</h2>')
    .replace(/^# (.*$)/gm,'<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/`(.*?)`/g,'<code>$1</code>')
    .replace(/^- (.*$)/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>')
    .split('\n\n')
    .map(p => {
      if (!p.trim()) return ''
      if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<li')) return p
      return `<p>${p.replace(/\n/g,' ')}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

export async function getServerSideProps({ params }) {
  const slug = params.slug

  // Try Supabase first
  const sb = getSupabaseServer()
  if (sb) {
    try {
      const { data: post, error } = await sb
        .from('blog_posts').select('*')
        .eq('slug', slug).eq('published', true).single()
      if (!error && post) {
        // Get related posts
        let related = []
        try {
          const { data: allPosts } = await sb
            .from('blog_posts').select('*')
            .eq('published', true).eq('category', post.category)
            .neq('id', post.id).limit(2)
          related = (allPosts || []).map(normalizePost)
        } catch(e) {}
        return { props: { post: normalizePost(post), related } }
      }
    } catch(e) { /* fall through */ }
  }

  // JSON fallback — read directly
  const allPosts = readLocalPosts()
  const raw = allPosts.find(p => p.slug === slug && p.published)
  if (!raw) return { notFound: true }

  const post = normalizePost(raw)
  const related = allPosts
    .filter(p => p.slug !== slug && p.published && p.category === raw.category)
    .slice(0, 2)
    .map(normalizePost)

  return { props: { post, related } }
}

export default function BlogPost({ post, related }) {
  const htmlContent = parseMarkdown(post.content)
  const siteUrl = `https://apexbookings.in/blog/${post.slug}`

  return (
    <>
      <Head>
        <title>{`${post.title} — Apex Bookings Blog`}</title>
        <meta name="description" content={post.excerpt || post.title}/>
        <meta name="keywords" content={`${post.category}, hotel management, apex bookings, ${post.title}`}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="canonical" href={siteUrl}/>
        <meta property="og:title" content={post.title}/>
        <meta property="og:description" content={post.excerpt || post.title}/>
        <meta property="og:url" content={siteUrl}/>
        <meta property="og:type" content="article"/>
        <meta property="og:image" content={post.coverImage || 'https://apexbookings.in/images/logo.png'}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={post.title}/>
        <meta name="twitter:description" content={post.excerpt || post.title}/>
        <meta name="twitter:image" content={post.coverImage || 'https://apexbookings.in/images/logo.png'}/>
        <meta property="article:published_time" content={post.createdAt}/>
        <meta property="article:author" content={post.author || 'Apex Bookings Team'}/>
        <meta property="article:section" content={post.category}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.coverImage,
          "url": siteUrl,
          "datePublished": post.createdAt,
          "dateModified": post.createdAt,
          "author": {"@type":"Organization","name": post.author || "Apex Bookings Team","url":"https://apexbookings.in"},
          "publisher": {"@type":"Organization","name":"Apex Bookings","url":"https://apexbookings.in","logo":{"@type":"ImageObject","url":"https://apexbookings.in/images/logo.png"}},
          "mainEntityOfPage": {"@type":"WebPage","@id": siteUrl}
        })}}/>
      </Head>
      <Navbar light={true}/>
      <div style={{paddingTop:68}}>
        <div style={{background:'var(--surface)',borderBottom:'1px solid var(--border)',padding:'52px 0 40px'}}>
          <div className="container" style={{maxWidth:780}}>
            <Link href="/blog" style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:13,fontWeight:600,color:'var(--blue)',textDecoration:'none',marginBottom:20}}>
              ← Back to Blog
            </Link>
            <div className="blog-category" style={{marginBottom:12}}>{post.category}</div>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:'clamp(26px,4vw,44px)',fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:16}}>{post.title}</h1>
            <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',fontSize:13,color:'var(--muted)'}}>
              <span>{post.author || 'Apex Bookings Team'}</span>
              <span>·</span>
              <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : ''}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container" style={{maxWidth:780}}>
            {post.coverImage && (
              <div style={{borderRadius:16,overflow:'hidden',marginBottom:40,boxShadow:'0 16px 48px rgba(0,0,0,0.1)'}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.title} style={{width:'100%',height:'auto',display:'block'}}/>
              </div>
            )}

            <div className="blog-content" dangerouslySetInnerHTML={{__html: htmlContent}}/>

            {/* Share */}
            <div style={{marginTop:48,padding:'24px',background:'var(--surface)',borderRadius:14,border:'1px solid var(--border)',display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
              <span style={{fontSize:14,fontWeight:700,color:'var(--ink)'}}>Share:</span>
              <div style={{display:'flex',gap:10}}>
                {[
                  {l:'WhatsApp',href:`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title+' '+siteUrl)}`,bg:'#25D366'},
                  {l:'LinkedIn',href:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,bg:'#0077b5'},
                  {l:'X / Twitter',href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(siteUrl)}`,bg:'#0f1623'},
                ].map(s => (
                  <a key={s.l} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{background:s.bg,color:'white',padding:'7px 14px',borderRadius:8,fontSize:12.5,fontWeight:700,textDecoration:'none'}}>{s.l}</a>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{marginTop:56}}>
                <h3 style={{fontFamily:'Outfit,sans-serif',fontSize:22,fontWeight:800,color:'var(--ink)',marginBottom:24}}>Related Articles</h3>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
                  {related.map(r => (
                    <Link key={r.id} href={`/blog/${r.slug}`} className="blog-card">
                      {r.coverImage && (
                        <div className="blog-card-img" style={{height:160}}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.coverImage} alt={r.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                        </div>
                      )}
                      <div className="blog-card-body">
                        <div className="blog-category">{r.category}</div>
                        <h4 className="blog-title" style={{fontSize:15}}>{r.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer/>
    </>
  )
}

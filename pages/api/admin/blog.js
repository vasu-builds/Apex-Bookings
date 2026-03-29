import jwt from 'jsonwebtoken'
import { getSupabaseServer } from '../../../lib/supabase'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

function verify(req) {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    return jwt.verify(token, process.env.JWT_SECRET || 'apex-bookings-secret')
  } catch { return null }
}

function readLocal() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) } catch { return [] }
}
function writeLocal(posts) {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2)) } catch (e) {
    throw new Error('Could not write blog-posts.json: ' + e.message)
  }
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

export default async function handler(req, res) {
  const sb = getSupabaseServer()
  const hasAuth = !!(req.headers.authorization || '').replace('Bearer ', '').trim()

  // ── PUBLIC READ (no auth) ────────────────────────────────────
  if (req.method === 'GET' && !hasAuth) {
    const { slug } = req.query

    if (sb) {
      try {
        if (slug) {
          const { data, error } = await sb
            .from('blog_posts').select('*')
            .eq('slug', slug).eq('published', true).single()
          if (!error && data) return res.json(normalizePost(data))
        } else {
          const { data, error } = await sb
            .from('blog_posts').select('*')
            .eq('published', true).order('created_at', { ascending: false })
          if (!error && data) return res.json(data.map(normalizePost))
        }
      } catch (e) { /* fall through */ }
    }

    // JSON fallback
    const posts = readLocal().filter(p => p.published)
    if (slug) {
      const post = posts.find(p => p.slug === slug)
      return post ? res.json(normalizePost(post)) : res.status(404).json({ error: 'Not found' })
    }
    return res.json(posts.map(normalizePost))
  }

  // ── ADMIN ROUTES (auth required) ────────────────────────────
  if (!verify(req)) return res.status(401).json({ error: 'Unauthorized' })

  // GET all (admin — includes drafts)
  if (req.method === 'GET') {
    if (sb) {
      try {
        const { data, error } = await sb
          .from('blog_posts').select('*')
          .order('created_at', { ascending: false })
        if (!error && data) return res.json(data.map(normalizePost))
      } catch (e) { /* fall through */ }
    }
    return res.json(readLocal().map(normalizePost))
  }

  const sanitize = (str, maxLen = 5000) => {
    if (!str) return ''
    return String(str).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim().slice(0, maxLen)
  }

  // POST — create
  if (req.method === 'POST') {
    const body = req.body || {}
    if (!body.title || !body.slug) {
      return res.status(400).json({ error: 'title and slug are required' })
    }

    const title = sanitize(body.title, 200)
    const slug = body.slug.replace(/[^a-z0-9-]/g, '').toLowerCase().slice(0, 200)
    const excerpt = sanitize(body.excerpt, 1000)
    const content = sanitize(body.content, 50000)

    if (sb) {
      try {
        const row = {
          title, slug, excerpt, content,
          cover_image: body.coverImage || body.cover_image || '',
          category: body.category || 'General',
          author: body.author || 'Apex Bookings Team',
          read_time: body.readTime || body.read_time || '4 min read',
          published: !!body.published,
        }
        const { data, error } = await sb.from('blog_posts').insert(row).select().single()
        if (error) {
          if (error.code === '23505') return res.status(409).json({ error: 'A post with this slug already exists.' })
          if (!error.message?.includes('fetch')) throw new Error(error.message)
        }
        if (data) return res.json(normalizePost(data))
      } catch (e) {
        if (!e.message?.includes('fetch') && !e.message?.includes('network')) return res.status(500).json({ error: e.message })
      }
    }

    // JSON fallback
    const posts = readLocal()
    if (posts.find(p => p.slug === slug)) return res.status(409).json({ error: 'A post with this slug already exists.' })
    const newPost = {
      title, slug, excerpt, content,
      id: Date.now().toString(),
      coverImage: body.coverImage || '',
      category: body.category || 'General',
      readTime: body.readTime || '4 min read',
      published: !!body.published,
      createdAt: new Date().toISOString().split('T')[0],
    }
    posts.unshift(newPost)
    writeLocal(posts)
    return res.json(normalizePost(newPost))
  }

  // PUT — update
  if (req.method === 'PUT') {
    const body = req.body || {}
    if (!body.id) return res.status(400).json({ error: 'id is required' })
    if (!body.title || !body.slug) return res.status(400).json({ error: 'title and slug are required' })

    const title = sanitize(body.title, 200)
    const slug = body.slug.replace(/[^a-z0-9-]/g, '').toLowerCase().slice(0, 200)
    const excerpt = sanitize(body.excerpt, 1000)
    const content = sanitize(body.content, 50000)

    if (sb) {
      try {
        const row = {
          title, slug, excerpt, content,
          cover_image: body.coverImage || body.cover_image || '',
          category: body.category || 'General',
          read_time: body.readTime || body.read_time || '4 min read',
          published: !!body.published,
          updated_at: new Date().toISOString(),
        }
        const { data, error } = await sb.from('blog_posts').update(row).eq('id', body.id).select().single()
        if (error && !error.message?.includes('fetch')) return res.status(500).json({ error: error.message })
        if (data) return res.json(normalizePost(data))
      } catch (e) {
        if (!e.message?.includes('fetch') && !e.message?.includes('network')) return res.status(500).json({ error: e.message })
      }
    }

    // JSON fallback
    const posts = readLocal()
    const idx = posts.findIndex(p => String(p.id) === String(body.id))
    if (idx === -1) return res.status(404).json({ error: 'Post not found' })
    posts[idx] = { ...posts[idx], title, slug, excerpt, content, published: !!body.published }
    writeLocal(posts)
    return res.json(normalizePost(posts[idx]))
  }

  // DELETE
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'id is required' })

    if (sb) {
      try {
        const { error } = await sb.from('blog_posts').delete().eq('id', id)
        if (!error) return res.json({ success: true })
        if (!error.message?.includes('fetch')) return res.status(500).json({ error: error.message })
      } catch (e) {
        if (!e.message?.includes('fetch') && !e.message?.includes('network')) {
          return res.status(500).json({ error: e.message })
        }
      }
    }

    writeLocal(readLocal().filter(p => String(p.id) !== String(id)))
    return res.json({ success: true })
  }

  res.status(405).end()
}

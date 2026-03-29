import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ── Sidebar sections — Setup & Connection REMOVED ──
const SECTIONS = [
  { key:'hero',         label:'Hero Section',     icon:'🏠' },
  { key:'images',       label:'Images Manager',   icon:'🖼️' },
  { key:'popup',        label:'Popup Offer',       icon:'📢' },
  { key:'combo',        label:'Combo Offer Card',  icon:'🔥' },
  { key:'pricing',      label:'Pricing Plans',     icon:'💰' },
  { key:'testimonials', label:'Testimonials',      icon:'⭐' },
  { key:'team',         label:'Team Members',      icon:'👥' },
  { key:'contact',      label:'Contact Info',      icon:'📞' },
  { key:'blog',         label:'Blog Manager',      icon:'📝' },
]

const IMAGE_SECTIONS = {
  homepage: {
    label: 'Homepage',
    fields: {
      hero_dashboard:       'Hero Section — Main Dashboard/Illustration Image',
      about_section:        'About Section — Hotel/OTA Illustration',
      channel_manager_split:'Services Section — Channel Manager Image',
      booking_engine_split: 'Services Section — Booking Engine Image',
      service_pms:          'Services Section — Cloud PMS Image',
      service_pos:          'Services Section — Cloud POS Image',
      service_gha:          'Services Section — Google Hotel Ads Image',
      service_revenue:      'Services Section — Revenue Management Image',
    }
  },
  channel_manager: {
    label: 'Channel Manager Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'OTA Connectivity Section — Split Image',
      tab1:         'Features Tab 1 — Rate Management Screenshot',
      tab2:         'Features Tab 2 — Inventory Management Screenshot',
      tab3:         'Features Tab 3 — OTA Connections Screenshot',
      how_it_works: 'How It Works Section — Image',
    }
  },
  booking_engine: {
    label: 'Booking Engine Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      tab1:         'Features Tab 1 — Booking Flow Screenshot',
      tab2:         'Features Tab 2 — Admin Features Screenshot',
      how_it_works: 'How It Works Section — Image',
    }
  },
  cloud_pms: {
    label: 'Cloud PMS Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      tab1:         'Features Tab 1 — Reservations/Calendar Screenshot',
      tab2:         'Features Tab 2 — Front Desk Screenshot',
      how_it_works: 'How It Works Section — Image',
    }
  },
  cloud_pos: {
    label: 'Cloud POS Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      tab1:         'Features Tab 1 — Order Management Screenshot',
      tab2:         'Features Tab 2 — Billing & Reports Screenshot',
      how_it_works: 'How It Works Section — Image',
    }
  },
  google_hotel_ads: {
    label: 'Google Hotel Ads Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      tab1:         'Features Tab 1 — Desktop View Screenshot',
      tab2:         'Features Tab 2 — Mobile View Screenshot',
      how_it_works: 'How It Works Section — Image',
    }
  },
  revenue_management: {
    label: 'Revenue Management Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      how_it_works: 'How It Works Section — Image',
    }
  },
  ota_listing: {
    label: 'OTA Listing Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      how_it_works: 'How It Works Section — Image',
    }
  },
  digital_marketing: {
    label: 'Digital Marketing Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      how_it_works: 'How It Works Section — Image',
    }
  },
  website_development: {
    label: 'Website Development Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      how_it_works: 'How It Works Section — Image',
    }
  },
  payment_gateway: {
    label: 'Payment Gateway Page',
    fields: {
      hero:         'Hero Section — Main Image (top right)',
      split:        'Split Section — Image',
      how_it_works: 'How It Works Section — Image',
    }
  },
  about: {
    label: 'About Page',
    fields: {
      hero: 'About Page — Hero/Story Illustration Image',
    }
  },
}

// ── Supabase status banner shown at top ──────────────────────────────────────
function SupabaseBanner({ status }) {
  if (!status) return null
  const connected = status?.supabase?.connected
  const configured = status?.env?.supabase_url?.startsWith('✓')

  if (connected) return (
    <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:'10px 16px',marginBottom:20,display:'flex',alignItems:'center',gap:10,fontSize:13}}>
      <span style={{fontSize:16}}>🟢</span>
      <span style={{fontWeight:700,color:'#166534'}}>Supabase Connected</span>
      <span style={{color:'#166534',opacity:0.7}}>— All changes sync to database in real time</span>
    </div>
  )
  if (!configured) return (
    <div style={{background:'#fffbf0',border:'1px solid rgba(240,165,0,0.35)',borderRadius:10,padding:'10px 16px',marginBottom:20,fontSize:13,color:'#92400e'}}>
      <span style={{fontSize:16}}>🟡</span>
      <strong> Local mode</strong> — Changes save to JSON files. Add Supabase credentials to <code style={{background:'rgba(0,0,0,0.06)',padding:'1px 5px',borderRadius:4}}>.env.local</code> for cloud sync.{' '}
      <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{color:'#b45309',fontWeight:700}}>Setup guide ↗</a>
    </div>
  )
  return (
    <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'10px 16px',marginBottom:20,fontSize:13,color:'#991b1b'}}>
      <span style={{fontSize:16}}>🔴</span>
      <strong> Supabase error</strong> — {status?.supabase?.error || 'Could not connect. Check credentials in .env.local'}
    </div>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <label className="admin-toggle">
      <input type="checkbox" checked={!!checked} onChange={e => onChange(e.target.checked)} />
      <span className="admin-toggle-slider" />
    </label>
  )
}

// ── Image upload field ────────────────────────────────────────────────────────
function ImageField({ label, value, onChange, token }) {
  const [inputVal, setInputVal] = useState(value || '')
  const [preview, setPreview] = useState(value || '')
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => { setInputVal(value || ''); setPreview(value || '') }, [value])

  const apply = (v) => {
    const val = v !== undefined ? v : inputVal
    setPreview(val); onChange(val); setInputVal(val)
  }

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true); setMsg('Uploading...')
    try {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ filename: file.name, data: ev.target.result, mimetype: file.type })
        })
        const data = await res.json()
        if (res.ok) { apply(data.url); setMsg('✓ Uploaded!'); setTimeout(() => setMsg(''), 2500) }
        else { setMsg('✗ ' + (data.error || 'Upload failed')) }
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch { setMsg('✗ Upload failed'); setUploading(false) }
  }

  return (
    <div style={{marginBottom:16,padding:'14px 16px',background:'var(--surface)',borderRadius:10,border:'1px solid var(--border)'}}>
      <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <div style={{width:88,height:58,borderRadius:8,overflow:'hidden',background:'#e5e7eb',flexShrink:0,border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {preview
            ? <img src={preview} alt={label} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>{e.target.style.display='none'}}/>
            : <span style={{color:'#9ca3af',fontSize:20}}>🖼️</span>}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <label className="admin-label" style={{marginBottom:8}}>{label}</label>
          <div style={{marginBottom:8,display:'flex',alignItems:'center',gap:10}}>
            <label style={{display:'inline-flex',alignItems:'center',gap:6,background:'var(--blue)',color:'white',padding:'7px 14px',borderRadius:7,fontSize:12.5,fontWeight:700,cursor:'pointer',opacity:uploading?0.7:1,flexShrink:0}}>
              {uploading ? 'Uploading…' : '↑ Upload'}
              <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} style={{display:'none'}}/>
            </label>
            {msg && <span style={{fontSize:12,fontWeight:600,color:msg.startsWith('✓')?'#16a34a':'#dc2626'}}>{msg}</span>}
          </div>
          <div style={{display:'flex',gap:8}}>
            <input className="admin-input" value={inputVal} onChange={e=>setInputVal(e.target.value)} onKeyDown={e=>e.key==='Enter'&&apply()} placeholder="Or paste URL..." style={{flex:1,fontSize:12.5}}/>
            <button className="admin-btn" onClick={()=>apply()} style={{padding:'7px 10px',fontSize:12,flexShrink:0}}>Use</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter()
  const [active, setActive] = useState('hero')
  const [config, setConfig] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [blogMsg, setBlogMsg] = useState(null)
  const [blogSaving, setBlogSaving] = useState(false)
  const [connStatus, setConnStatus] = useState(null)
  const [activeImgSection, setActiveImgSection] = useState('homepage')
  const [newPost, setNewPost] = useState({title:'',slug:'',_slugEdited:false,excerpt:'',content:'',coverImage:'',category:'Revenue Management',readTime:'4 min read',published:false})
  const [editPost, setEditPost] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('admin-token') || '' : ''}`
  })
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') || '' : ''

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin-token')) {
      router.push('/admin'); return
    }
    fetchConfig()
    fetchBlogs()
    checkConnection()
  }, [])

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config', { headers: getHeaders() })
      if (!res.ok) { localStorage.removeItem('admin-token'); router.push('/admin'); return }
      setConfig(await res.json())
    } catch {}
  }

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blog', { headers: getHeaders() })
      if (!res.ok) return
      const data = await res.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch {}
  }

  const checkConnection = async () => {
    try {
      const res = await fetch('/api/admin/test-connection', { headers: getHeaders() })
      if (res.ok) setConnStatus(await res.json())
    } catch {}
  }

  const saveConfig = async () => {
    setSaving(true); setSaveError('')
    try {
      const res = await fetch('/api/admin/config', { method:'POST', headers:getHeaders(), body:JSON.stringify(config) })
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500) }
      else { const d = await res.json(); setSaveError(d.error || 'Save failed') }
    } catch (e) { setSaveError('Network error') }
    setSaving(false)
  }

  const updateField = (section, field, val) => setConfig(c => ({ ...c, [section]: { ...c[section], [field]: val } }))
  const updateImage = (pageKey, fieldKey, val) => setConfig(c => ({ ...c, images: { ...c.images, [pageKey]: { ...(c.images||{})[pageKey], [fieldKey]: val } } }))
  const logout = () => { localStorage.removeItem('admin-token'); router.push('/admin') }

  // ── Loading spinner ──────────────────────────────────────────────────────────
  if (!config) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Plus Jakarta Sans,sans-serif',background:'var(--surface)'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:40,height:40,border:'3px solid var(--border)',borderTopColor:'var(--blue)',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 16px'}}/>
        <p style={{color:'var(--muted)',fontSize:14,fontWeight:500}}>Loading dashboard…</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const isNonSaveSection = active === 'blog'

  return (
    <>
      <Head><title>Admin — Apex Bookings CMS</title></Head>
      <div style={{fontFamily:'Plus Jakarta Sans,sans-serif',minHeight:'100vh',background:'#f1f5f9',display:'flex'}}>

        {/* Mobile overlay */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:40}}/>}

        {/* ── Sidebar ── */}
        <div id="admin-sidebar" style={{position:'fixed',top:0,left:sidebarOpen?0:'-260px',bottom:0,width:248,background:'#0f1c2e',zIndex:50,transition:'left 0.28s ease',display:'flex',flexDirection:'column',boxShadow:'4px 0 24px rgba(0,0,0,0.15)'}}>

          {/* Logo */}
          <div style={{padding:'22px 20px 18px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:34,height:34,borderRadius:9,background:'var(--blue)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>🏨</div>
              <div>
                <div style={{fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:16,color:'white',letterSpacing:'-0.01em'}}>Apex Bookings</div>
                <div style={{fontSize:10.5,color:'rgba(255,255,255,0.28)',fontWeight:500,letterSpacing:'0.05em',textTransform:'uppercase'}}>Admin CMS</div>
              </div>
            </div>
          </div>

          {/* Supabase status dot in sidebar */}
          <div style={{padding:'10px 16px 6px'}}>
            <div style={{display:'flex',alignItems:'center',gap:7,fontSize:11.5,color:'rgba(255,255,255,0.3)',fontWeight:500}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:connStatus?.supabase?.connected?'#4ade80':connStatus===null?'#94a3b8':'#f97316',flexShrink:0,display:'inline-block'}}/>
              {connStatus?.supabase?.connected ? 'Supabase connected' : connStatus === null ? 'Checking…' : 'Local mode (JSON)'}
            </div>
          </div>

          {/* Nav items */}
          <nav style={{flex:1,overflowY:'auto',padding:'8px 10px'}}>
            {SECTIONS.map(s => (
              <button key={s.key}
                onClick={() => { setActive(s.key); setSidebarOpen(false) }}
                style={{
                  display:'flex', alignItems:'center', gap:10, width:'100%',
                  padding:'10px 12px', border:'none', borderRadius:8,
                  marginBottom:2,
                  background: active===s.key ? 'rgba(26,79,196,0.35)' : 'none',
                  color: active===s.key ? 'white' : 'rgba(255,255,255,0.42)',
                  fontSize:13.5, fontWeight:600, cursor:'pointer', textAlign:'left',
                  fontFamily:'inherit', transition:'all 0.12s',
                  borderLeft: active===s.key ? '3px solid var(--blue)' : '3px solid transparent',
                }}>
                <span style={{fontSize:15,opacity:active===s.key?1:0.7}}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div style={{padding:'14px 16px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
            <a href="/" target="_blank" style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'rgba(255,255,255,0.28)',marginBottom:10,textDecoration:'none',transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.28)'}>
              ↗ View Live Site
            </a>
            <button onClick={logout} style={{fontSize:12,color:'rgba(255,255,255,0.28)',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',padding:0,transition:'color 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.28)'}>
              Sign out →
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div id="admin-main" style={{flex:1,minWidth:0,display:'flex',flexDirection:'column'}}>

          {/* Top bar */}
          <div style={{background:'white',borderBottom:'1px solid var(--border)',padding:'0 24px',height:60,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:30,gap:12,boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <button onClick={() => setSidebarOpen(o => !o)}
                style={{background:'none',border:'none',cursor:'pointer',padding:'6px',borderRadius:6,display:'flex',flexDirection:'column',gap:4.5,transition:'background 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
                onMouseLeave={e=>e.currentTarget.style.background='none'}>
                {[0,1,2].map(i => <span key={i} style={{display:'block',width:18,height:2,background:'var(--ink)',borderRadius:2}}/>)}
              </button>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:18}}>{SECTIONS.find(s => s.key===active)?.icon}</span>
                <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:16,fontWeight:800,color:'var(--ink)',margin:0,letterSpacing:'-0.01em'}}>
                  {SECTIONS.find(s => s.key===active)?.label}
                </h1>
              </div>
            </div>

            {!isNonSaveSection && (
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                {saveError && <span style={{fontSize:12,color:'#dc2626',fontWeight:600}}>{saveError}</span>}
                <button className="admin-btn" onClick={saveConfig}
                  style={{minWidth:120,fontSize:13,background:saved?'#16a34a':saving?'#94a3b8':'var(--blue)',color:'white',border:'none',padding:'9px 20px',borderRadius:8,fontWeight:700,cursor:saving?'not-allowed':'pointer',transition:'background 0.2s'}}>
                  {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Content area */}
          <div style={{padding:'24px',maxWidth:920,width:'100%'}}>

            {/* Supabase status banner */}
            <SupabaseBanner status={connStatus} />

            {/* ── HERO ── */}
            {active==='hero' && (
              <div>
                <div className="admin-card">
                  <h3 style={{fontWeight:700,color:'var(--ink)',marginBottom:20,fontSize:15}}>Hero Text</h3>
                  <div style={{marginBottom:16}}>
                    <label className="admin-label">Main Headline</label>
                    <input className="admin-input" value={config.hero?.headline||''} onChange={e=>updateField('hero','headline',e.target.value)}/>
                  </div>
                  <div>
                    <label className="admin-label">Sub-headline</label>
                    <textarea className="admin-input" rows={3} value={config.hero?.subheadline||''} onChange={e=>updateField('hero','subheadline',e.target.value)} style={{resize:'vertical'}}/>
                  </div>
                </div>
                <div className="admin-card">
                  <h3 style={{fontWeight:700,color:'var(--ink)',marginBottom:6,fontSize:15}}>Hero Dashboard Image</h3>
                  <p style={{fontSize:13,color:'var(--muted)',marginBottom:16}}>Screenshot shown inside the browser mockup on the homepage hero section.</p>
                  <ImageField label="Dashboard Screenshot" value={config.images?.homepage?.hero_dashboard||''} onChange={val=>updateImage('homepage','hero_dashboard',val)} token={token}/>
                </div>
              </div>
            )}

            {/* ── IMAGES MANAGER ── */}
            {active==='images' && (
              <div>
                <div style={{background:'var(--blue-l)',border:'1px solid rgba(26,79,196,0.2)',borderRadius:12,padding:'13px 16px',marginBottom:24,fontSize:13,color:'var(--blue)',fontWeight:500,lineHeight:1.6}}>
                  Upload or paste an image URL below. Click <strong>Save Changes</strong> to sync to the live site.
                </div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:20}}>
                  {Object.entries(IMAGE_SECTIONS).map(([key,sec]) => (
                    <button key={key} onClick={()=>setActiveImgSection(key)}
                      style={{padding:'6px 13px',borderRadius:7,fontSize:12,fontWeight:600,border:'1.5px solid',cursor:'pointer',fontFamily:'inherit',transition:'all 0.12s',
                        background:activeImgSection===key?'var(--blue)':'white',
                        color:activeImgSection===key?'white':'var(--muted)',
                        borderColor:activeImgSection===key?'var(--blue)':'var(--border)'}}>
                      {sec.label}
                    </button>
                  ))}
                </div>
                <div className="admin-card">
                  <h3 style={{fontWeight:800,color:'var(--ink)',marginBottom:4,fontFamily:'Outfit,sans-serif',fontSize:17}}>{IMAGE_SECTIONS[activeImgSection]?.label}</h3>
                  <p style={{fontSize:13,color:'var(--muted)',marginBottom:20,lineHeight:1.6}}>Images update on the live site after saving.</p>
                  {Object.entries(IMAGE_SECTIONS[activeImgSection]?.fields||{}).map(([fieldKey,fieldLabel]) => (
                    <ImageField key={fieldKey} label={fieldLabel} value={config.images?.[activeImgSection]?.[fieldKey]||''} onChange={val=>updateImage(activeImgSection,fieldKey,val)} token={token}/>
                  ))}
                </div>
              </div>
            )}

            {/* ── POPUP ── */}
            {active==='popup' && (
              <div className="admin-card">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,padding:'14px 16px',background:'var(--surface)',borderRadius:10,border:'1px solid var(--border)'}}>
                  <div>
                    <p style={{fontWeight:700,color:'var(--ink)',fontSize:15,marginBottom:2}}>Popup Enabled</p>
                    <p style={{fontSize:13,color:'var(--muted)'}}>Shows on homepage after 3.5 sec (once per session)</p>
                  </div>
                  <Toggle checked={config.popup?.enabled} onChange={v=>updateField('popup','enabled',v)}/>
                </div>
                {[['badge','Badge Text'],['headline','Popup Headline'],['subtext','Sub Text'],['ctaText','CTA Button Text'],['ctaLink','CTA Link (URL)']].map(([k,l]) => (
                  <div key={k} style={{marginBottom:16}}>
                    <label className="admin-label">{l}</label>
                    <input className="admin-input" value={config.popup?.[k]||''} onChange={e=>updateField('popup',k,e.target.value)}/>
                  </div>
                ))}
              </div>
            )}

            {/* ── COMBO ── */}
            {active==='combo' && (
              <div>
                <div className="admin-card">
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,padding:'14px 16px',background:'var(--surface)',borderRadius:10,border:'1px solid var(--border)'}}>
                    <div>
                      <p style={{fontWeight:700,color:'var(--ink)',fontSize:15,marginBottom:2}}>Show Combo Card on Pricing Page</p>
                      <p style={{fontSize:13,color:'var(--muted)'}}>The special offer card alongside the 3 regular plans</p>
                    </div>
                    <Toggle checked={config.combo?.visible} onChange={v=>updateField('combo','visible',v)}/>
                  </div>
                  {[['name','Plan Name'],['price','Price Display'],['badge','Badge Text']].map(([k,l]) => (
                    <div key={k} style={{marginBottom:16}}>
                      <label className="admin-label">{l}</label>
                      <input className="admin-input" value={config.combo?.[k]||''} onChange={e=>updateField('combo',k,e.target.value)}/>
                    </div>
                  ))}
                  <div>
                    <label className="admin-label">Included Features (one per line)</label>
                    <textarea className="admin-input" rows={6} value={(config.combo?.features||[]).join('\n')} onChange={e=>updateField('combo','features',e.target.value.split('\n').filter(Boolean))} style={{resize:'vertical',fontFamily:'monospace',fontSize:13}}/>
                  </div>
                </div>
                <div className="admin-card" style={{background:'#f0fdf4',border:'1px solid #bbf7d0'}}>
                  <h3 style={{fontWeight:700,color:'#166534',marginBottom:10,fontSize:14}}>How the Combo Offer Works</h3>
                  {['Pricing page shows Combo card alongside Starter, Growth, Pro','Popup shows after 3.5s on homepage — once per session','Both link to /offer landing page','Lead form sends email via Resend + auto-confirmation to guest','You follow up via WhatsApp or call'].map((item,i) => (
                    <div key={i} style={{display:'flex',gap:8,fontSize:13,color:'#166534',lineHeight:1.7}}><span>✓</span><span>{item}</span></div>
                  ))}
                  <a href="/offer" target="_blank" style={{display:'inline-flex',marginTop:14,background:'#16a34a',color:'white',padding:'7px 14px',borderRadius:7,fontSize:12.5,fontWeight:700,textDecoration:'none'}}>Preview Offer Page ↗</a>
                </div>
              </div>
            )}

            {/* ── PRICING ── */}
            {active==='pricing' && (
              <div>
                <div style={{background:'var(--blue-l)',border:'1px solid rgba(26,79,196,0.2)',borderRadius:10,padding:'12px 16px',marginBottom:20,fontSize:13,color:'var(--blue)',fontWeight:500}}>
                  3 fixed plans: Starter, Growth, Pro. Combo Offer card is managed under "Combo Offer Card".
                </div>
                {(config.pricing||[]).map((plan,i) => (
                  <div key={i} className="admin-card">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,flexWrap:'wrap',gap:8}}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{width:30,height:30,background:'var(--blue)',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:13}}>{i+1}</div>
                        <h3 style={{fontWeight:800,color:'var(--ink)',fontFamily:'Outfit,sans-serif',fontSize:16}}>{plan.name||`Plan ${i+1}`}</h3>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:12,color:'var(--muted)',fontWeight:600}}>Featured</span>
                        <Toggle checked={!!plan.featured} onChange={v=>{const p=[...config.pricing];p[i]={...p[i],featured:v};setConfig(c=>({...c,pricing:p}))}}/>
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                      {[['name','Plan Name'],['price','Monthly Price (₹)']].map(([k,l]) => (
                        <div key={k}>
                          <label className="admin-label">{l}</label>
                          <input className="admin-input" value={plan[k]||''} onChange={e=>{
                            let val = e.target.value
                            if (k === 'price') val = val.replace(/[^0-9]/g, '')
                            const p=[...config.pricing];p[i]={...p[i],[k]:val};setConfig(c=>({...c,pricing:p}))
                          }}/>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:14}}>
                      <label className="admin-label">Subtitle</label>
                      <input className="admin-input" value={plan.sub||''} onChange={e=>{const p=[...config.pricing];p[i]={...p[i],sub:e.target.value};setConfig(c=>({...c,pricing:p}))}}/>
                    </div>
                    <div>
                      <label className="admin-label">Features (one per line)</label>
                      <textarea className="admin-input" rows={5} value={(plan.features||[]).join('\n')} onChange={e=>{const p=[...config.pricing];p[i]={...p[i],features:e.target.value.split('\n').filter(Boolean)};setConfig(c=>({...c,pricing:p}))}} style={{resize:'vertical',fontFamily:'monospace',fontSize:13}}/>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── TESTIMONIALS ── */}
            {active==='testimonials' && (
              <div>
                {(config.testimonials||[]).map((t,i) => (
                  <div key={i} className="admin-card">
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                      <h3 style={{fontWeight:700,color:'var(--ink)',fontSize:14}}>Testimonial {i+1}</h3>
                      <button onClick={()=>{if(confirm('Remove?')){const ts=[...config.testimonials];ts.splice(i,1);setConfig(c=>({...c,testimonials:ts}))}}} style={{background:'none',border:'none',color:'#dc2626',cursor:'pointer',fontSize:13,fontWeight:600,fontFamily:'inherit'}}>Remove</button>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:12}}>
                      {[['name','Guest Name'],['hotel','Hotel / Property']].map(([k,l]) => (
                        <div key={k}>
                          <label className="admin-label">{l}</label>
                          <input className="admin-input" value={t[k]||''} onChange={e=>{const ts=[...config.testimonials];ts[i]={...ts[i],[k]:e.target.value};setConfig(c=>({...c,testimonials:ts}))}}/>
                        </div>
                      ))}
                    </div>
                    <div style={{marginBottom:12}}>
                      <label className="admin-label">Star Rating (1–5)</label>
                      <input className="admin-input" type="number" min={1} max={5} value={t.rating||5} onChange={e=>{
                        let val = parseInt(e.target.value)
                        if (isNaN(val)) val = 5
                        if (val < 1) val = 1
                        if (val > 5) val = 5
                        const ts=[...config.testimonials];ts[i]={...ts[i],rating:val};setConfig(c=>({...c,testimonials:ts}))
                      }} style={{width:72}}/>
                    </div>
                    <div>
                      <label className="admin-label">Quote</label>
                      <textarea className="admin-input" rows={3} value={t.quote||''} onChange={e=>{const ts=[...config.testimonials];ts[i]={...ts[i],quote:e.target.value};setConfig(c=>({...c,testimonials:ts}))}} style={{resize:'vertical'}}/>
                    </div>
                  </div>
                ))}
                <button className="admin-btn" onClick={()=>setConfig(c=>({...c,testimonials:[...(c.testimonials||[]),{name:'',hotel:'',quote:'',rating:5}]}))}>+ Add Testimonial</button>
              </div>
            )}

            {/* ── TEAM ── */}
            {active==='team' && (
              <div>
                {(config.team||[]).map((m,i) => (
                  <div key={i} className="admin-card">
                    <h3 style={{fontWeight:700,color:'var(--ink)',marginBottom:16,fontSize:14}}>{m.name||`Member ${i+1}`}</h3>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                      {[['name','Full Name'],['role','Role / Title'],['initials','Initials (2 letters)']].map(([k,l]) => (
                        <div key={k}>
                          <label className="admin-label">{l}</label>
                          <input className="admin-input" value={m[k]||''} onChange={e=>{const t=[...config.team];t[i]={...t[i],[k]:e.target.value};setConfig(c=>({...c,team:t}))}}/>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="admin-label">Photo URL <span style={{fontWeight:400,color:'var(--muted)',fontSize:11}}>(optional — leave blank to show initials)</span></label>
                      <div style={{display:'flex',gap:10,alignItems:'center'}}>
                        {m.photo && <img src={m.photo} alt={m.name} style={{width:40,height:40,borderRadius:'50%',objectFit:'cover',flexShrink:0}} onError={e=>e.target.style.display='none'}/>}
                        <input className="admin-input" value={m.photo||''} placeholder="https://..." onChange={e=>{const t=[...config.team];t[i]={...t[i],photo:e.target.value};setConfig(c=>({...c,team:t}))}}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── CONTACT ── */}
            {active==='contact' && (
              <div className="admin-card">
                <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:'12px 14px',marginBottom:20,fontSize:13,color:'var(--muted)',lineHeight:1.6}}>
                  Only <strong>info@</strong> and <strong>support@</strong> emails are shown publicly. Phone numbers appear in the contact page and floating buttons.
                </div>
                {[['email','Primary Email (info@)'],['support','Support Email'],['phone','Phone 1'],['phone2','Phone 2'],['whatsapp','WhatsApp Number (digits only, no + or spaces)'],['address','Full Address']].map(([k,l]) => (
                  <div key={k} style={{marginBottom:16}}>
                    <label className="admin-label">{l}</label>
                    <input className="admin-input" value={config.contact?.[k]||''} onChange={e=>{
                      let val = e.target.value
                      if (k === 'whatsapp') val = val.replace(/[^0-9]/g, '').slice(0, 15)
                      if (k.startsWith('phone')) val = val.replace(/[^0-9+\s-]/g, '').slice(0, 20)
                      setConfig(c=>({...c,contact:{...c.contact,[k]:val}}))
                    }}/>
                  </div>
                ))}
              </div>
            )}

            {/* ── BLOG ── */}
            {active==='blog' && (
              <div>
                {blogMsg && (
                  <div style={{padding:'11px 16px',borderRadius:10,marginBottom:18,fontSize:13.5,fontWeight:600,display:'flex',alignItems:'center',gap:10,
                    background:blogMsg.type==='success'?'#f0fdf4':'#fef2f2',
                    color:blogMsg.type==='success'?'#166534':'#991b1b',
                    border:`1px solid ${blogMsg.type==='success'?'#bbf7d0':'#fecaca'}`}}>
                    <span>{blogMsg.type==='success'?'✓':'⚠'}</span>
                    {blogMsg.text}
                    <button onClick={()=>setBlogMsg(null)} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',fontSize:18,color:'inherit',lineHeight:1}}>×</button>
                  </div>
                )}

                {/* Blog form */}
                <div key={editPost?`edit-${editPost.id}`:'new-post'} className="admin-card" style={{marginBottom:20}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:editPost?4:20,flexWrap:'wrap',gap:8}}>
                    <h3 style={{fontWeight:800,color:'var(--ink)',fontFamily:'Outfit,sans-serif',fontSize:17,margin:0}}>
                      {editPost ? `Editing post` : 'Create New Post'}
                    </h3>
                    {editPost && (
                      <span style={{fontSize:11.5,color:'var(--muted)',background:'var(--surface)',padding:'3px 8px',borderRadius:5,border:'1px solid var(--border)'}}>
                        ID: {editPost.id}
                      </span>
                    )}
                  </div>
                  {editPost && <p style={{fontSize:12,color:'var(--muted)',marginBottom:18}}>/blog/{editPost.slug}</p>}

                  <div style={{marginBottom:14}}>
                    <label className="admin-label">Title *</label>
                    <input className="admin-input" placeholder="e.g. How to Increase Hotel Occupancy in 2025"
                      value={editPost?editPost.title||'':newPost.title}
                      onChange={e=>{
                        const v=e.target.value
                        if(editPost){setEditPost(p=>({...p,title:v}))}
                        else{
                          const slug=v.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')
                          setNewPost(p=>({...p,title:v,slug:p._slugEdited?p.slug:slug}))
                        }
                      }}
                    />
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                    <div>
                      <label className="admin-label">URL Slug * <span style={{fontSize:11,fontWeight:400,color:'var(--muted)'}}>auto from title</span></label>
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <span style={{fontSize:12,color:'var(--muted)',flexShrink:0,whiteSpace:'nowrap'}}>/blog/</span>
                        <input className="admin-input" placeholder="url-slug"
                          value={editPost?editPost.slug||'':newPost.slug}
                          onChange={e=>{
                            const v=e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'')
                            if(editPost)setEditPost(p=>({...p,slug:v}))
                            else setNewPost(p=>({...p,slug:v,_slugEdited:true}))
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">Read Time</label>
                      <input className="admin-input" placeholder="5 min read"
                        value={editPost?editPost.readTime||'':newPost.readTime}
                        onChange={e=>{const v=e.target.value;editPost?setEditPost(p=>({...p,readTime:v})):setNewPost(p=>({...p,readTime:v}))}}
                      />
                    </div>
                  </div>

                  <div style={{marginBottom:14}}>
                    <label className="admin-label">Category</label>
                    <select className="admin-input"
                      value={editPost?editPost.category||'':newPost.category}
                      onChange={e=>{const v=e.target.value;editPost?setEditPost(p=>({...p,category:v})):setNewPost(p=>({...p,category:v}))}}>
                      {['Revenue Management','Technology','OTA Strategy','Digital Marketing','Hotel Operations','Tips & Guides','General'].map(c=>(
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{marginBottom:14}}>
                    <label className="admin-label">Cover Image URL</label>
                    <div style={{display:'flex',gap:10,alignItems:'center'}}>
                      {(editPost?.coverImage||newPost.coverImage)&&(
                        <img src={editPost?.coverImage||newPost.coverImage} alt="Cover" style={{width:72,height:48,borderRadius:6,objectFit:'cover',flexShrink:0,border:'1px solid var(--border)'}} onError={e=>e.target.style.display='none'}/>
                      )}
                      <input className="admin-input" placeholder="https://images.unsplash.com/..."
                        value={editPost?editPost.coverImage||'':newPost.coverImage}
                        onChange={e=>{const v=e.target.value;editPost?setEditPost(p=>({...p,coverImage:v})):setNewPost(p=>({...p,coverImage:v}))}}
                      />
                    </div>
                  </div>

                  <div style={{marginBottom:14}}>
                    <label className="admin-label">Excerpt <span style={{fontWeight:400,color:'var(--muted)',fontSize:11}}>shown on blog listing</span></label>
                    <textarea className="admin-input" rows={2} placeholder="1-2 sentence summary..." style={{resize:'vertical'}}
                      value={editPost?editPost.excerpt||'':newPost.excerpt}
                      onChange={e=>{const v=e.target.value;editPost?setEditPost(p=>({...p,excerpt:v})):setNewPost(p=>({...p,excerpt:v}))}}
                    />
                  </div>

                  <div style={{marginBottom:18}}>
                    <label className="admin-label">Content <span style={{fontWeight:400,color:'var(--muted)',fontSize:11}}>Markdown: # Heading, **bold**, - list</span></label>
                    <textarea className="admin-input" rows={12} placeholder="# Main Heading&#10;&#10;Start writing here..." style={{resize:'vertical',fontFamily:'monospace',fontSize:13,lineHeight:1.6}}
                      value={editPost?editPost.content||'':newPost.content}
                      onChange={e=>{const v=e.target.value;editPost?setEditPost(p=>({...p,content:v})):setNewPost(p=>({...p,content:v}))}}
                    />
                  </div>

                  <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap',paddingTop:14,borderTop:'1px solid var(--border)'}}>
                    <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13.5,fontWeight:600,color:'var(--ink)',cursor:'pointer'}}>
                      <Toggle checked={editPost?!!editPost.published:!!newPost.published} onChange={v=>editPost?setEditPost(p=>({...p,published:v})):setNewPost(p=>({...p,published:v}))}/>
                      {(editPost?editPost.published:newPost.published)?'Published':'Draft'}
                    </label>
                    <div style={{marginLeft:'auto',display:'flex',gap:8}}>
                      {editPost&&(
                        <button className="admin-btn" style={{background:'var(--surface)',color:'var(--muted)',border:'1px solid var(--border)'}}
                          onClick={()=>{setEditPost(null);setBlogMsg(null)}}>Cancel</button>
                      )}
                      <button className="admin-btn"
                        style={{background:blogSaving?'#94a3b8':'var(--blue)',cursor:blogSaving?'not-allowed':'pointer'}}
                        onClick={async()=>{
                          const post=editPost||newPost
                          if(!post.title?.trim())return setBlogMsg({type:'error',text:'Title is required'})
                          if(!post.slug?.trim())return setBlogMsg({type:'error',text:'Slug is required'})
                          setBlogSaving(true)
                          try{
                            const method=editPost?'PUT':'POST'
                            const res=await fetch('/api/admin/blog',{method,headers:getHeaders(),body:JSON.stringify(post)})
                            const data=await res.json()
                            if(res.ok){
                              if(!editPost)setNewPost({title:'',slug:'',_slugEdited:false,excerpt:'',content:'',coverImage:'',category:'Revenue Management',readTime:'4 min read',published:false})
                              setEditPost(null)
                              await fetchBlogs()
                              setBlogMsg({type:'success',text:editPost?`"${data.title}" updated!`:`"${data.title}" ${data.published?'published':'saved as draft'}!`})
                              setTimeout(()=>setBlogMsg(null),4000)
                            }else{
                              setBlogMsg({type:'error',text:data.error||'Failed to save'})
                            }
                          }catch(e){setBlogMsg({type:'error',text:'Network error: '+e.message})}
                          setBlogSaving(false)
                        }}>
                        {blogSaving?'Saving…':editPost?'Update Post':(newPost.published?'Publish':'Save Draft')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Posts list */}
                <div className="admin-card">
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,flexWrap:'wrap',gap:8}}>
                    <h3 style={{fontWeight:800,color:'var(--ink)',fontFamily:'Outfit,sans-serif',fontSize:16,margin:0}}>All Posts ({blogs.length})</h3>
                    <div style={{fontSize:12,color:'var(--muted)',display:'flex',gap:10}}>
                      <span style={{color:'#16a34a',fontWeight:700}}>{blogs.filter(p=>p.published).length} published</span>
                      <span>· {blogs.filter(p=>!p.published).length} drafts</span>
                    </div>
                  </div>
                  {blogs.length===0&&(
                    <div style={{textAlign:'center',padding:'36px 0',color:'var(--muted)'}}>
                      <div style={{fontSize:28,marginBottom:10}}>📝</div>
                      <p style={{fontSize:14,fontWeight:600,marginBottom:4}}>No posts yet</p>
                      <p style={{fontSize:13}}>Create your first post above</p>
                    </div>
                  )}
                  {blogs.map(p=>(
                    <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid var(--border)',gap:12,flexWrap:'wrap'}}>
                      <div style={{display:'flex',gap:10,alignItems:'center',flex:1,minWidth:0}}>
                        {p.coverImage
                          ?<img src={p.coverImage} alt={p.title} style={{width:56,height:38,borderRadius:5,objectFit:'cover',flexShrink:0,border:'1px solid var(--border)'}} onError={e=>e.target.style.display='none'}/>
                          :<div style={{width:56,height:38,borderRadius:5,background:'var(--surface)',border:'1px solid var(--border)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📄</div>
                        }
                        <div style={{minWidth:0}}>
                          <p style={{fontWeight:600,fontSize:13.5,color:'var(--ink)',marginBottom:3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.title}</p>
                          <div style={{display:'flex',gap:6,fontSize:11.5,color:'var(--muted)',flexWrap:'wrap',alignItems:'center'}}>
                            <span style={{background:'var(--surface)',padding:'1px 7px',borderRadius:4,border:'1px solid var(--border)'}}>{p.category}</span>
                            <span style={{color:p.published?'#16a34a':'#d97706',fontWeight:700}}>{p.published?'● Published':'○ Draft'}</span>
                            <span>{p.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{display:'flex',gap:5,flexShrink:0}}>
                        <a href={`/blog/${p.slug}`} target="_blank" style={{background:'var(--surface)',color:'var(--muted)',padding:'6px 9px',borderRadius:6,fontSize:12,fontWeight:600,border:'1px solid var(--border)',textDecoration:'none'}}>↗</a>
                        <button className="admin-btn" style={{padding:'6px 12px',fontSize:12.5}}
                          onClick={()=>{setEditPost({...p});setBlogMsg(null);window.scrollTo({top:0,behavior:'smooth'})}}>Edit</button>
                        <button className="admin-btn admin-btn-danger" style={{padding:'6px 10px',fontSize:12.5}}
                          onClick={async()=>{
                            if(!confirm(`Delete "${p.title}"?`))return
                            try{
                              const res=await fetch(`/api/admin/blog?id=${p.id}`,{method:'DELETE',headers:getHeaders()})
                              if(res.ok){await fetchBlogs();setBlogMsg({type:'success',text:'Post deleted.'});setTimeout(()=>setBlogMsg(null),3000)}
                              else{const d=await res.json();setBlogMsg({type:'error',text:d.error||'Delete failed'})}
                            }catch(e){setBlogMsg({type:'error',text:'Network error: '+e.message})}
                          }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #admin-sidebar { left: 0 !important; }
          #admin-main { margin-left: 248px !important; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}

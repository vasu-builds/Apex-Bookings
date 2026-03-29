import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [form, setForm] = useState({username:'',password:''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin-token')) {
      router.push('/admin/dashboard')
    }
  }, [router])

  const submit = async e => {
    e.preventDefault()
    if (!form.username || form.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }
    if (!form.password || form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('admin-token', data.token)
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid username or password')
      }
    } catch { setError('Connection error') }
    setLoading(false)
  }

  return (
    <>
      <Head><title>Admin Login — Apex Bookings</title></Head>
      <div style={{minHeight:'100vh',background:'var(--ink-2)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'Plus Jakarta Sans,sans-serif'}}>
        <div style={{background:'white',borderRadius:20,padding:40,width:'100%',maxWidth:400,boxShadow:'0 40px 80px rgba(0,0,0,0.3)'}}>
          <div style={{marginBottom:32,textAlign:'center'}}>
            <div style={{width:56,height:56,background:'var(--blue)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h1 style={{fontFamily:'Outfit,sans-serif',fontSize:22,fontWeight:800,color:'var(--ink)',marginBottom:4}}>Admin Login</h1>
            <p style={{fontSize:13.5,color:'var(--muted)'}}>Apex Bookings CMS</p>
          </div>
          <form onSubmit={submit}>
            <div style={{marginBottom:16}}>
              <label className="admin-label">Username</label>
              <input className="admin-input" type="text" value={form.username} onChange={e=>setForm(f=>({...f,username:e.target.value}))} placeholder="admin" required/>
            </div>
            <div style={{marginBottom:24}}>
              <label className="admin-label">Password</label>
              <input className="admin-input" type="password" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="••••••••" required/>
            </div>
            {error && <p style={{color:'#dc2626',fontSize:13,marginBottom:16,textAlign:'center'}}>{error}</p>}
            <button type="submit" disabled={loading} className="admin-btn" style={{width:'100%',padding:'12px',opacity:loading?0.7:1}}>
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

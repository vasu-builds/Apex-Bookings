import { useState, useEffect, useRef } from 'react'

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f0a500">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

export default function TestimonialCarousel({ testimonials = [] }) {
  const [idx, setIdx] = useState(0)
  const [perView, setPerView] = useState(3)
  const timerRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIdx = Math.max(0, testimonials.length - perView)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx(i => i >= maxIdx ? 0 : i + 1)
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [maxIdx])

  const go = (dir) => {
    clearInterval(timerRef.current)
    setIdx(i => dir === 'prev' ? Math.max(0, i - 1) : Math.min(maxIdx, i + 1))
  }

  const offset = (100 / perView) * idx

  return (
    <div style={{position:'relative',padding:'0 8px'}}>
      {/* Prev */}
      <button className="testi-nav prev" onClick={() => go('prev')} style={{display: idx === 0 ? 'none' : 'flex'}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div className="testi-carousel">
        <div
          className="testi-track"
          style={{transform:`translateX(-${offset}%)`, willChange:'transform'}}
        >
          {testimonials.map((t, i) => (
            <div key={i} style={{minWidth:`${100/perView}%`, padding:'0 8px', boxSizing:'border-box'}}>
              <div className={`testi-card${i === 0 ? ' featured' : ''}`} style={{height:'100%'}}>
                <div className="testi-stars" style={{display:'flex',gap:2,marginBottom:14}}>
                  {[...Array(t.rating || 5)].map((_,j) => <StarIcon key={j}/>)}
                </div>
                <div className="testi-quote">"</div>
                <p className="testi-body">{t.quote}</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:40,height:40,borderRadius:'50%',background:i===0?'rgba(255,255,255,0.15)':'var(--blue-l)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,color:i===0?'white':'var(--blue)',flexShrink:0}}>
                    {t.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-hotel">{t.hotel}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next */}
      <button className="testi-nav next" onClick={() => go('next')} style={{display: idx >= maxIdx ? 'none' : 'flex'}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Dots */}
      <div className="testi-dots">
        {Array.from({length: maxIdx + 1}).map((_, i) => (
          <button key={i} className={`testi-dot${idx === i ? ' active' : ''}`} onClick={() => { clearInterval(timerRef.current); setIdx(i) }}/>
        ))}
      </div>
    </div>
  )
}

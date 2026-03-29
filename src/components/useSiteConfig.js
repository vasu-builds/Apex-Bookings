import { useState, useEffect } from 'react'

const DEFAULT_CONFIG = {
  images: {
    homepage: {
      hero_dashboard:       '/images/gemini_generated_image_58jves58jves58jv.png',
      about_section:        '/images/gemini_generated_image_mth63vmth63vmth6.png',
      channel_manager_split:'/images/chatgpt-image-mar-19--2026--08_01_36-pm.png',
      booking_engine_split: '/images/gemini_generated_image_mr7hevmr7hevmr7h--1-.png',
      service_pms:          '/images/gemini_generated_image_oiaqimoiaqimoiaq--2-.png',
      service_pos:          '/images/gemini_generated_image_xcwzqixcwzqixcwz--1-.png',
      service_gha:          '/images/gemini_generated_image_72ajeq72ajeq72aj.png',
      service_revenue:      '/images/gemini_generated_image_k2xsfak2xsfak2xs--1-.png',
    },
    channel_manager: {
      hero:'/images/ideogram-v3.0_hyper-detailed_isometric_3d_illustration_hotel_channel_management_concept_centra-0.jpg', split:'/images/ota-network-new.png',
      tab1:'/images/cm-rate-management.png', tab2:'/images/cm-inventory.png',
      tab3:'/images/ota-network-new.png', how_it_works:'/images/gemini_generated_image_skxp5nskxp5nskxp.png',
    },
    booking_engine: {
      hero:'/images/gemini_generated_image_mr7hevmr7hevmr7h--1-.png', split:'/images/booking-engine-new.png',
      tab1:'/images/booking-engine-new.png', tab2:'/images/pms-calendar.png',
      how_it_works:'/images/how-it-works.png',
    },
    cloud_pms: {
      hero:'/images/gemini_generated_image_oiaqimoiaqimoiaq--2-.png', split:'/images/pms.jpg',
      tab1:'/images/pms-calendar.png', tab2:'/images/mpss.jpg',
      how_it_works:'/images/how-it-works.png',
    },
    cloud_pos: {
      hero:'/images/gemini_generated_image_xcwzqixcwzqixcwz--1-.png', split:'/images/pos-new.png',
      tab1:'/images/pos-new.png', tab2:'/images/pms-calendar.png',
      how_it_works:'/images/how-it-works.png',
    },
    google_hotel_ads: {
      hero:'/images/google-ads-desktop.png', split:'/images/google-ads-mobile.png',
      tab1:'/images/google-ads-desktop.png', tab2:'/images/google-ads-mobile.png',
      how_it_works:'/images/how-it-works.png',
    },
    revenue_management: {
      hero:'/images/gemini_generated_image_lg6j26lg6j26lg6j--1-.png', split:'/images/cm-rate-management.png',
      how_it_works:'/images/how-it-works.png',
    },
    ota_listing: {
      hero:'/images/gemini_generated_image_k2xsfak2xsfak2xs--1-.png', split:'/images/ideogram-v3.0_hyper-detailed_isometric_3d_illustration_premium_hotel_technology_ecosystem_visu-0.jpg',
      how_it_works:'/images/gemini_generated_image_skxp5nskxp5nskxp.png',
    },
    digital_marketing: {
      hero:'/images/gemini_generated_image_72ajeq72ajeq72aj.png', split:'/images/gemini_generated_image_72ajeq72ajeq72aj.png',
      how_it_works:'/images/how-it-works.png',
    },
    website_development: {
      hero:'/images/website-design.png', split:'/images/booking-engine-new.png',
      how_it_works:'/images/how-it-works.png',
    },
    payment_gateway: {
      hero:'/images/gemini_generated_image_97m6pb97m6pb97m6.png', split:'/images/gemini_generated_image_97m6pb97m6pb97m6.png',
      how_it_works:'/images/how-it-works.png',
    },
    about: { hero:'/images/gemini_generated_image_mth63vmth63vmth6.png' },
  }
}

// Deep merge so missing keys fall back to defaults
function deepMerge(defaults, overrides) {
  if (!overrides || typeof overrides !== 'object') return defaults
  const result = { ...defaults }
  for (const key of Object.keys(overrides)) {
    if (overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(overrides[key])) {
      result[key] = deepMerge(defaults[key] || {}, overrides[key])
    } else if (overrides[key] !== undefined && overrides[key] !== null && overrides[key] !== '') {
      result[key] = overrides[key]
    }
  }
  return result
}

const CACHE_KEY = 'apex_site_config_v3'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getLocalCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(CACHE_KEY); return null }
    return data
  } catch { return null }
}

function setLocalCache(data) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })) } catch {}
}

// Module-level promise cache — survives re-renders
let _promise = null
let _resolved = null

export function useSiteConfig() {
  // Start with DEFAULT_CONFIG always — no flash
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Check session cache first — instant, no flicker
    const cached = getLocalCache()
    if (cached) {
      setConfig(deepMerge(DEFAULT_CONFIG, cached))
      setReady(true)
      return
    }

    // Already resolved from another component on this page
    if (_resolved) {
      setConfig(deepMerge(DEFAULT_CONFIG, _resolved))
      setReady(true)
      return
    }

    // Fetch once, share across all hook instances
    if (!_promise) {
      _promise = fetch('/api/public-config')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data && Object.keys(data).length > 0) {
            _resolved = data
            setLocalCache(data)
          }
          return data
        })
        .catch(() => null)
    }

    _promise.then(data => {
      if (data && Object.keys(data).length > 0) {
        setConfig(deepMerge(DEFAULT_CONFIG, data))
      }
      setReady(true)
    })
  }, [])

  return config
}

// Call this after admin saves config — clears cache so site picks up new images
export function clearSiteConfigCache() {
  try { sessionStorage.removeItem(CACHE_KEY) } catch {}
  _promise = null
  _resolved = null
}

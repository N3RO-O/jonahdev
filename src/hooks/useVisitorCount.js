import { useEffect, useRef, useState } from 'react'

/**
 * Live visitor counter, backed by counterapi.com — a free, keyless counter
 * API (no signup, no server of our own required). One shared tally for the
 * whole site, namespaced to this project so it can't collide with anyone
 * else's counts no matter which domain the build ends up on (Vercel,
 * custom domain, XAMPP, a preview URL, etc).
 *
 * - Increments once per browser session (guarded via sessionStorage) so
 *   refreshes/navigating between sections don't inflate the count.
 * - Caches the last known value in localStorage so returning visitors see
 *   a real number immediately instead of a loading state, then reconciles
 *   with the network in the background.
 * - Fails soft: if the API is unreachable, we fall back to the last cached
 *   value (marked "offline") instead of showing a broken UI.
 */
const NAMESPACE = 'jonahdevportfolio-vercel-app'
const COUNTER_KEY = 'site-visits'
const SESSION_FLAG = 'jt-visit-counted'
const CACHE_KEY = 'jt-visit-cache'
const API_BASE = 'https://counterapi.com/api'

export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return null
    const cached = Number(window.localStorage.getItem(CACHE_KEY))
    return Number.isFinite(cached) && cached > 0 ? cached : null
  })
  const [status, setStatus] = useState('connecting') // connecting | live | offline
  const rafRef = useRef(null)
  const displayRef = useRef(count)

  useEffect(() => {
    let cancelled = false

    const animateTo = (target) => {
      const start = displayRef.current ?? Math.max(target - 1, 0)
      const startTime = performance.now()
      const duration = 900
      const ease = (t) => 1 - Math.pow(1 - t, 3)

      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1)
        const value = Math.round(start + (target - start) * ease(t))
        displayRef.current = value
        if (!cancelled) setCount(value)
        if (t < 1) rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    }

    const alreadyCounted = window.sessionStorage.getItem(SESSION_FLAG) === '1'
    const url = `${API_BASE}/${NAMESPACE}/view/${COUNTER_KEY}${alreadyCounted ? '?readOnly=true' : ''}`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('counter unavailable')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const next = Number(data?.value)
        if (!Number.isFinite(next) || next <= 0) throw new Error('bad payload')
        if (!alreadyCounted) window.sessionStorage.setItem(SESSION_FLAG, '1')
        window.localStorage.setItem(CACHE_KEY, String(next))
        setStatus('live')
        animateTo(next)
      })
      .catch(() => {
        if (cancelled) return
        setStatus('offline')
      })

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { count, status }
}

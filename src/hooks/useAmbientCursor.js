import { useEffect, useRef } from 'react'

/**
 * Extends the hero's cursor-tracked spotlight across the *entire* page —
 * a soft, lagged accent glow that trails the pointer. Same visual language
 * as `.spotlight` and the card spotlight in useCardSpotlight.js, just at
 * page scope. Renders into a ref supplied by the caller (see AmbientGlow.jsx)
 * so it stays a single fixed layer instead of one per section.
 *
 * No-ops for touch/coarse pointers and reduced-motion, matching the other
 * cursor-driven effects in this codebase.
 */
export function useAmbientCursor(targetRef) {
  const raf = useRef(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isCoarsePointer) return undefined

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let glowX = mouseX
    let glowY = mouseY
    let active = false

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!active) {
        active = true
        el.style.opacity = '1'
      }
    }

    const handleLeave = () => {
      active = false
      el.style.opacity = '0'
    }

    const tick = () => {
      glowX += (mouseX - glowX) * 0.09
      glowY += (mouseY - glowY) * 0.09
      el.style.setProperty('--gx', `${glowX}px`)
      el.style.setProperty('--gy', `${glowY}px`)
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [targetRef])
}

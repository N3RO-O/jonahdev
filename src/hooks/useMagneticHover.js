import { useEffect } from 'react'

/**
 * Gives buttons a small, springy pull toward the cursor while hovered —
 * not a full drag, just enough to feel alive. Delegated to a single
 * listener pair (same pattern as useCardSpotlight.js) so it stays cheap
 * regardless of how many buttons are on the page. Skipped for touch/coarse
 * pointers and reduced-motion.
 */
const SELECTOR = '.btn-primary, .btn-secondary'
const STRENGTH = 0.25
const MAX_OFFSET = 9
const LIFT = 2 // px — mirrors the existing hover:-translate-y-0.5 lift so we don't lose it

export function useMagneticHover() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isCoarsePointer) return undefined

    let current = null
    let raf = null
    let pending = null

    const release = (el) => {
      el.style.transform = ''
    }

    const apply = () => {
      raf = null
      if (!pending) return
      const { el, x, y } = pending
      el.style.transform = `translate(${x}px, ${y - LIFT}px)`
      pending = null
    }

    const handleMove = (e) => {
      const el = e.target.closest?.(SELECTOR)
      if (!el) {
        if (current) {
          release(current)
          current = null
        }
        return
      }
      if (current && current !== el) release(current)
      current = el

      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relX * STRENGTH))
      const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, relY * STRENGTH))
      pending = { el, x, y }
      if (raf === null) raf = requestAnimationFrame(apply)
    }

    const handleOut = (e) => {
      if (!e.relatedTarget && current) {
        release(current)
        current = null
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseout', handleOut)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseout', handleOut)
      if (raf !== null) cancelAnimationFrame(raf)
      if (current) release(current)
    }
  }, [])
}

import { useEffect } from 'react'

/**
 * Lights up a soft, cursor-tracking glow on any `.card` element the pointer
 * passes over — a single delegated listener rather than one per card, so it
 * stays cheap even on pages with dozens of cards. Pairs with the `.card::after`
 * spotlight layer defined in index.css. No-ops entirely for touch/coarse
 * pointers and for people who've asked for reduced motion.
 */
export function useCardSpotlight() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isCoarsePointer) return undefined

    let raf = null
    let pending = null

    const apply = () => {
      raf = null
      if (!pending) return
      const { card, x, y } = pending
      card.style.setProperty('--spot-x', `${x}px`)
      card.style.setProperty('--spot-y', `${y}px`)
      pending = null
    }

    const handleMove = (e) => {
      const card = e.target.closest?.('.card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      pending = { card, x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (raf === null) raf = requestAnimationFrame(apply)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])
}

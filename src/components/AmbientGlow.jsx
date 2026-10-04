import { useRef } from 'react'
import { useAmbientCursor } from '../hooks/useAmbientCursor'

export default function AmbientGlow() {
  const glowRef = useRef(null)
  useAmbientCursor(glowRef)

  return <div ref={glowRef} className="ambient-glow" aria-hidden="true" />
}

/**
 * Wraps content in camera-viewfinder corner brackets — a nod to Jonah's
 * photography work, reused anywhere a photo is the focus (hero portrait,
 * creative grid, lightbox). Brackets are always at low-intensity presence
 * and sharpen to full accent color on hover/focus, echoing a lens
 * snapping to focus.
 *
 * variant="static"  -> brackets always visible at full strength (hero)
 * variant="hover"   -> brackets fade in on hover/focus (grids, tiles)
 */
export default function ViewfinderFrame({ children, variant = 'hover', className = '', rounded = 'rounded-2xl' }) {
  const active = variant === 'static'
  return (
    <div className={`viewfinder group/vf relative ${className}`}>
      <div className={`relative overflow-hidden ${rounded}`}>{children}</div>
      {['tl', 'tr', 'bl', 'br'].map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={`vf-corner vf-${corner} ${active ? 'vf-corner-active' : ''}`}
        />
      ))}
    </div>
  )
}

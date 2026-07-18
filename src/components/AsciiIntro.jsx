import { useEffect, useRef, useState } from 'react'

// ── ASCII-art banner (figlet "Standard" font) ────────────────────────────
// Renders the brand wordmark as a solid block of text. Every row is kept
// verbatim; the banner is scaled down with clamp() so it fits on mobile.
const ASCII_BANNER = String.raw`
                                                           
   ▄▄▄▄▄▄                            ▄▄▄▄▄▄               
  █▀ ██                   █▄        █▀██▀▀██              
     ██       ▄           ██          ██   ██             
     ██ ▄███▄ ████▄ ▄▀▀█▄ ████▄       ██   ██ ▄█▀█▄▀█▄ ██▀
     ██ ██ ██ ██ ██ ▄█▀██ ██ ██     ▄ ██   ██ ██▄█▀ ██▄██ 
     ██▄▀███▀▄██ ▀█▄▀█▄██▄██ ██ ██  ▀██▀███▀ ▄▀█▄▄▄  ▀█▀  
 ▄   ██                                                   
 ▀████▀
`

// Normalize the banner into equal-width rows so the block renders as one
// coherent unit regardless of stray leading/trailing whitespace.
const BANNER_ROWS = (() => {
  const rows = ASCII_BANNER.replace(/^\n|\n$/g, '').split('\n')
  const width = Math.max(...rows.map((r) => r.length))
  return rows.map((r) => r.padEnd(width, ' '))
})()

// Column at which the "DEV" block begins, so it can be tinted with the
// site accent while "JONAH" stays the default text color.
const DEV_SPLIT = 31

const BOOT_LINES = [
  '> initializing system ............ OK',
  '> loading render pipeline ........ OK',
  '> establishing secure channel .... OK',
  '> rez: 80x24  ·  tty0  ·  user: guest',
  '> welcome. before the web itself —',
]

const TYPE_SPEED = 23
const BANNER_HOLD = 450
const TOTAL_HOLD = 1300

export default function AsciiIntro({ onComplete, onHide }) {
  const [typed, setTyped] = useState('')
  const [showBanner, setShowBanner] = useState(false)
  const [line, setLine] = useState(0)
  const [done, setDone] = useState(false)
  const completeRef = useRef(false)

  // 1) type out the boot log line by line
  useEffect(() => {
    if (line >= BOOT_LINES.length) {
      const t = setTimeout(() => setShowBanner(true), BANNER_HOLD)
      return () => clearTimeout(t)
    }
    const full = BOOT_LINES[line]
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped((prev) => {
        const lines = prev.split('\n')
        lines[line] = full.slice(0, i)
        return lines.join('\n')
      })
      if (i >= full.length) {
        clearInterval(id)
        setLine((l) => l + 1)
      }
    }, TYPE_SPEED)
    return () => clearInterval(id)
  }, [line])

  // 2) after the banner appears, wait then fire completion + hide
  useEffect(() => {
    if (!showBanner) return
    const completeTimer = setTimeout(() => {
      completeRef.current = true
      onComplete?.()
    }, TOTAL_HOLD)
    const hideTimer = setTimeout(() => {
      setDone(true)
      onHide?.()
    }, TOTAL_HOLD + 700)
    return () => {
      clearTimeout(completeTimer)
      clearTimeout(hideTimer)
    }
  }, [showBanner, onComplete, onHide])

  if (done) return null

  return (
    <div
      className={`intro-overlay ${completeRef.current ? 'intro-hidden' : ''}`}
      aria-hidden="true"
    >
      <div className="intro-panel">
        <pre
          className="font-mono text-[var(--text)]"
          style={{
            fontSize: 'clamp(3px, 1.15vw, 9px)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            textAlign: 'left',
            margin: 0,
            whiteSpace: 'pre',
            overflow: 'hidden',
          }}
        >
          {typed}
          {line < BOOT_LINES.length && <span className="ascii-caret">▋</span>}
        </pre>

        {showBanner && (
          <div
            className="mt-5 flex justify-center"
            style={{ animation: 'ascii-banner-in 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            <pre
              className="ascii-banner font-mono"
              style={{
                fontSize: 'clamp(3px, 1.15vw, 9px)',
                lineHeight: 1.0,
                letterSpacing: '0.02em',
                textAlign: 'left',
                margin: 0,
                whiteSpace: 'pre',
                overflow: 'visible',
              }}
            >
              {BANNER_ROWS.map((row, idx) => (
                <div key={idx} className="ascii-row">
                  {row}
                </div>
              ))}
            </pre>
          </div>
        )}

        {showBanner && (
          <p className="intro-tagline mt-4" style={{ animationDelay: '0.2s' }}>
            Building polished web experiences with code, clarity, and craft.
          </p>
        )}
      </div>
    </div>
  )
}

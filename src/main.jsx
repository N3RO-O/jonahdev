import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { initAnalytics } from './analytics'
import './index.css'

initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user" makes every framer-motion animation in the app
        honor prefers-reduced-motion automatically — previously only Hero
        checked useReducedMotion explicitly, so section reveals elsewhere
        (SectionHeader, Creative, Testimonials, etc.) still animated for
        people who'd asked the OS to reduce motion. This covers all of them
        from one place. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)

import { useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useCardSpotlight } from './hooks/useCardSpotlight'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubStrip from './components/GitHubStrip'
import Experience from './components/Experience'
import Creative from './components/Creative'
import Education from './components/Education'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  const { theme, toggle } = useTheme()
  useCardSpotlight()
  const [mounted, setMounted] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroComplete(true), 2800)
    const hideTimer = window.setTimeout(() => setShowIntro(false), 3600)
    return () => {
      window.clearTimeout(introTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className={`app-shell ${mounted ? 'is-mounted' : ''}`}>
      {showIntro && (
        <div className={`intro-overlay ${introComplete ? 'intro-hidden' : ''}`} aria-hidden="true">
          <div className="intro-panel">
            <div className="intro-brand">
              <span className="intro-brand-text">
                jonah<span className="intro-brand-suffix">.dev</span>
              </span>
            </div>
            <p className="intro-tagline">Building polished web experiences with code, clarity, and craft.</p>
            <div className="intro-loading" aria-hidden="true">
              <div className="intro-loading-fill" />
            </div>
          </div>
        </div>
      )}

      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubStrip />
        <Experience />
        <Creative />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

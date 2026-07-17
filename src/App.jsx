import { useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { useCardSpotlight } from './hooks/useCardSpotlight'
import { useMagneticHover } from './hooks/useMagneticHover'
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
import FAQ from './components/FAQ'
import Blog from './components/Blog'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import AsciiIntro from './components/AsciiIntro'

import AmbientGlow from './components/AmbientGlow'

export default function App() {
  const { theme, toggle } = useTheme()
  useCardSpotlight()
  useMagneticHover()
  const [mounted, setMounted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`app-shell ${mounted ? 'is-mounted' : ''}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Skip to content
      </a>
      <AmbientGlow />
      {showIntro && (
        <AsciiIntro
          onComplete={() => setIntroComplete(true)}
          onHide={() => setShowIntro(false)}
        />
      )}

      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero introDone={!showIntro} />
        <About />
      <Skills />
      <Projects />
        <GitHubStrip />
        <Experience />
        <Creative />
        <Education />
        <Testimonials />
        <FAQ />
      <Blog />
      <Contact />

      </main>
      <Footer />
      <BackToTop />

    </div>
  )
}

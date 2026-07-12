import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { site } from '../data/siteData'
import SocialLinks from './SocialLinks'
import ViewfinderFrame from './ViewfinderFrame'
import { useTypewriter } from '../hooks/useTypewriter'

const bootLines = [
  `whoami`,
  `→ ${site.name} — Full-Stack Developer & QA Engineer`,
  `status --check availability`,
  `● ${site.availability}`,
  `location`,
  `→ ${site.location}`,
]

export default function Hero() {
  const heroRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const { printed, lineIndex, done } = useTypewriter(bootLines, { speed: 16, lineDelay: 220, startDelay: 500 })

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden pt-24 pb-16"
    >
      <div className="spotlight" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="section-eyebrow mb-4"
            >
              {site.location} · BSIS Graduate
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {site.name}
              <br />
              <span className="text-secondary">{site.title}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-[var(--text-muted)]"
            >
              {site.tagline}
            </motion.p>

            {/* Signature moment: a boot-log style terminal that "types" out
                who he is, echoing the QA / systems-engineer identity in his
                own words rather than a decorative flourish. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="terminal-frame mt-8 max-w-xl"
            >
              <div className="terminal-titlebar">
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-dot is-accent" />
                <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
                  guest@jonah-dev — zsh
                </span>
              </div>
              <div className="terminal-body" aria-live="polite">
                {bootLines.map((_, i) => {
                  const text = printed[i]
                  if (!text && i > lineIndex) return null
                  const isCommand = i % 2 === 0
                  const isCurrentLine = i === lineIndex && !done
                  return (
                    <div
                      key={i}
                      className={`terminal-line ${isCommand ? 'terminal-line-command mt-2 first:mt-0' : 'terminal-line-output'} ${isCurrentLine ? 'terminal-line-current' : ''}`}
                    >
                      {isCommand ? (
                        <>
                          <span className="terminal-prompt">$</span> {text}
                        </>
                      ) : (
                        <span>{text}</span>
                      )}
                      {isCurrentLine && <span className="terminal-caret" />}
                    </div>
                  )
                })}
                {done && <span className="terminal-caret" />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-primary inline-flex items-center gap-2"
              >
                View Projects
                <ArrowDown size={16} />
              </button>
              <a href={site.cvUrl} download className="btn-secondary inline-flex items-center gap-2">
                <Download size={16} />
                Download CV
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Mail size={16} />
                Contact Me
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <SocialLinks />
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-accent"
              >
                <Mail size={15} />
                {site.email}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
            className="relative mx-auto lg:mx-0 overflow-visible"
          >
            {/* Viewfinder-framed portrait — the recurring signature motif
                tying his photography eye to the rest of the site. */}
            <ViewfinderFrame variant="static" rounded="rounded-2xl" className="h-64 w-64 sm:h-80 sm:w-80">
              <div className="h-64 w-64 border-2 border-accent/30 shadow-2xl sm:h-80 sm:w-80">
                <img
                  src={site.photo}
                  alt={site.name}
                  className="h-full w-full object-cover"
                  width={320}
                  height={320}
                />
              </div>
            </ViewfinderFrame>
            <div className="hero-badge absolute bottom-0 right-0 z-30 translate-x-6 translate-y-6 rounded-2xl border-2 border-accent/50 bg-accent/25 px-4 py-2 text-xs font-mono text-[var(--text)] shadow-[0_32px_80px_-32px_rgba(220,170,78,0.95)] transition duration-300 hover:scale-[1.03] hover:border-accent/70 hover:bg-accent/30">
              <span className="text-accent">◎</span> jonah.dev · 2026
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

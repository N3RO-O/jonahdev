import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { site } from '../data/siteData'
import SocialLinks from './SocialLinks'
import ViewfinderFrame from './ViewfinderFrame.jsx'
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
  const loopOneRef = useRef(null)
  const loopTwoRef = useRef(null)
  const loopThreeRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5 })
  const reduceMotion = useReducedMotion()

  const motionHidden = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
  const motionTransition = (delay, opts = {}) =>
    reduceMotion ? { duration: 0 } : { delay, duration: 0.5, ...opts }

  const handleMouseMove = (e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    pointerRef.current = {
      x: Math.min(1, Math.max(0, x)),
      y: Math.min(1, Math.max(0, y)),
    }
  }

  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.scrollY || window.pageYOffset
    const distance = targetY - startY
    if (!distance || duration === 0) {
      window.scrollTo(0, targetY)
      return
    }

    const ease = (t) => 1 - Math.pow(1 - t, 3)
    const startTime = performance.now()

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, startY + distance * ease(progress))
      if (progress < 1) window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return
    const headerOffset = 72
    const elementPosition = section.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset

    smoothScrollTo(offsetPosition, 620)
  }

  const { printed, lineIndex, done } = useTypewriter(bootLines, { speed: 16, lineDelay: 220, startDelay: 500 })

  useEffect(() => {
    if (reduceMotion) return

    const refs = [loopOneRef, loopTwoRef, loopThreeRef]
    const duration = 10000
    const startTime = performance.now()
    let rafId

    const animate = (now) => {
      const elapsed = (now - startTime) % duration
      const pointer = pointerRef.current

      refs.forEach((ref, index) => {
        const el = ref.current
        if (!el) return

        const phase = (elapsed / duration + index * 0.33) % 1
        const ease = Math.sin(phase * Math.PI * 0.5)
        const scale = 0.85 + 2.2 * ease
        const opacity = Math.max(0, 0.5 * Math.pow(1 - phase, 1.8))
        const offsetX = (pointer.x - 0.5) * 16 * (1 + index * 0.45)
        const offsetY = (pointer.y - 0.5) * 10 * (1 + index * 0.35)
        const rotate = index === 2 ? 10 + 24 * phase : 0

        el.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale}) rotate(${rotate}deg)`
        el.style.opacity = `${opacity}`
      })

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [reduceMotion])

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden pt-24 pb-16"
    >
      <div className="spotlight" aria-hidden="true" />
      <div className="hero-loop-group pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-loop hero-loop-one" ref={loopOneRef} />
        <div className="hero-loop hero-loop-two" ref={loopTwoRef} />
        <div className="hero-loop hero-loop-three" ref={loopThreeRef} />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-accent/8 blur-3xl" aria-hidden="true" />
      </div>

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={motionHidden}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.1)}
              className="section-eyebrow mb-4"
            >
              {site.location} · BSIS Graduate
            </motion.p>

            <motion.h1
              initial={motionHidden}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.15)}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {site.name}
              <br />
              <span className="text-secondary">{site.title}</span>
            </motion.h1>

            <motion.p
              initial={motionHidden}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.25)}
              className="mt-6 max-w-xl text-lg text-[var(--text-muted)]"
            >
              {site.tagline}
            </motion.p>

            {/* Signature moment: a boot-log style terminal that "types" out
                who he is, echoing the QA / systems-engineer identity in his
                own words rather than a decorative flourish. */}
            <motion.div
              initial={motionHidden}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.32)}
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
              initial={motionHidden}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.4)}
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
              initial={motionHidden}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.5)}
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
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            transition={reduceMotion ? { duration: 0 } : { delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120, damping: 18 }}
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
            <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            transition={reduceMotion ? { duration: 0 } : { delay: 0.55, duration: 0.45, ease: 'easeOut' }}
            className="hero-badge absolute right-4 bottom-4 z-40 rounded-2xl border border-accent/90 bg-black/80 px-3 py-1.5 text-[11px] font-mono text-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45),0_0_0_1px_rgba(220,170,78,0.65)]"
          >
            <span className="text-accent">◎</span> jonah<span className="text-accent">.dev</span> · 2026
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Camera, GraduationCap, Zap, Briefcase, ChevronDown } from 'lucide-react'
import { about } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

const icons = { camera: Camera, graduate: GraduationCap, zap: Zap, briefcase: Briefcase }

// The opening paragraph carries the pitch, so it runs as a lede at display
// size. The rest is body copy, trimmed until asked for.
const [lede, ...body] = about.paragraphs
const BODY_PREVIEW = 2

export default function About() {
  const [ref, inView] = useInView()
  const reduceMotion = useReducedMotion()
  const [showAll, setShowAll] = useState(false)

  const visibleBody = showAll ? body : body.slice(0, BODY_PREVIEW)
  const hiddenCount = body.length - BODY_PREVIEW

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: reduceMotion ? { duration: 0 } : { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <SectionHeader
          index="01"
          eyebrow="// about"
          title="About Me"
          subtitle="Developer, systems thinker, and visual storyteller from Catanduanes."
        />

        <div ref={ref}>
          {/* Lede — one statement at display size, set off by an accent rule
              rather than boxed in a card like the body copy below it. */}
          <motion.p {...reveal(0)} className="about-lede">
            {lede}
          </motion.p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
            {/* Body copy */}
            <motion.div {...reveal(0.08)} className="about-prose">
              {visibleBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}

              <AnimatePresence initial={false}>
                {!showAll && hiddenCount > 0 && (
                  <motion.button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="about-more"
                    exit={{ opacity: 0 }}
                  >
                    Read more
                    <ChevronDown size={15} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Rail — the facts someone skimming actually wants, plus the
                four things that define the work. */}
            <motion.aside {...reveal(0.16)} className="about-rail">
              <div className="sheet">
                <div className="sheet-head">
                  <span>At a glance</span>
                </div>
                <dl>
                  {about.facts.map((f) => (
                    <div key={f.label} className="sheet-row about-fact">
                      <dt className="about-fact-label">{f.label}</dt>
                      <dd className="about-fact-value">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="about-highlights">
                {about.highlights.map((h) => {
                  const Icon = icons[h.icon]
                  return (
                    <div key={h.label} className="about-highlight">
                      <span className="about-highlight-icon">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="about-highlight-label">{h.label}</span>
                        <span className="about-highlight-desc">{h.desc}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  )
}

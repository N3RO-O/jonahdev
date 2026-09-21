import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Camera, GraduationCap, Zap, Briefcase, ChevronDown, ArrowUpRight } from 'lucide-react'
import { about, projects, certifications, creative } from '../data/siteData'
import SectionHeader from './SectionHeader'
import ViewfinderFrame from './ViewfinderFrame.jsx'
import { useInView } from '../hooks/useInView'

const icons = { camera: Camera, graduate: GraduationCap, zap: Zap, briefcase: Briefcase }

// Four numbers, each already claimed in prose somewhere on the site — the
// projects list, the "2+ years" in the lede, the 462-hour OJT in the
// experience timeline, and the certifications array. Stating them as
// figures gives the section something a skimmer can actually catch.
const stats = [
  { value: String(projects.length), label: 'systems built' },
  { value: '2+', label: 'years hands-on' },
  { value: '462', label: 'OJT hours' },
  { value: String(certifications.length), label: 'certificates' },
]

// Three frames from the Creative section — the "visual storyteller" half
// of the pitch, shown rather than asserted.
const frames = creative.items.filter((i) => i.type === 'photo').slice(0, 3)

const BODY_PREVIEW = 2

export default function About() {
  const [ref, inView] = useInView()
  const reduceMotion = useReducedMotion()
  const [showAll, setShowAll] = useState(false)

  const body = about.paragraphs
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
          {/* Lede — one claim at display size, marked by a viewfinder-style
              bracket rather than boxed into a card. */}
          <motion.div {...reveal(0)} className="about-lede-wrap">
            <span className="about-lede-mark" aria-hidden="true" />
            <p className="about-lede">{about.lede}</p>
          </motion.div>

          {/* Figures — hairline-divided so the band reads as one object. */}
          <motion.dl {...reveal(0.08)} className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="about-stat">
                <dt className="about-stat-value">{s.value}</dt>
                <dd className="about-stat-label">{s.label}</dd>
              </div>
            ))}
          </motion.dl>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-12">
            <motion.div {...reveal(0.14)} className="about-prose">
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
                    Read {hiddenCount} more
                    <ChevronDown size={15} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.aside {...reveal(0.2)} className="about-rail">
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

              {frames.length > 0 && (
                <div className="about-frames">
                  <div className="about-frames-grid">
                    {frames.map((f) => (
                      <ViewfinderFrame key={f.src} rounded="rounded-lg" className="about-frame">
                        <img src={f.src} alt={f.alt} loading="lazy" />
                      </ViewfinderFrame>
                    ))}
                  </div>
                  <a href="#creative" className="about-frames-link">
                    See the creative work
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </motion.aside>
          </div>

          {/* What defines the work, four across. */}
          <motion.div {...reveal(0.26)} className="about-highlights">
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

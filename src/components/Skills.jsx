import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Layout,
  Server,
  Wrench,
  Briefcase,
  Camera,
  BookOpen,
  ChevronDown,
} from 'lucide-react'
import { skillCategories, coreStack } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

const iconMap = {
  layout: Layout,
  server: Server,
  wrench: Wrench,
  briefcase: Briefcase,
  camera: Camera,
  book: BookOpen,
}

export default function Skills() {
  const [ref, inView] = useInView()
  const reduceMotion = useReducedMotion()

  // Rows start collapsed — the primary-stack strip above carries the
  // headline, so the breakdown stays available without costing a screen
  // and a half of scroll to get past it.
  const [open, setOpen] = useState({})
  const allOpen = skillCategories.every((_, i) => open[i])

  const toggleRow = (i) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }))
  const toggleAll = () =>
    setOpen(allOpen ? {} : Object.fromEntries(skillCategories.map((_, i) => [i, true])))

  const toolCount = skillCategories.reduce((n, c) => n + c.skills.length, 0)

  return (
    <section id="skills" className="relative overflow-hidden bg-[var(--surface-elevated)]/50 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent/6 blur-3xl" />
      </div>

      <div className="section-container relative">
        <SectionHeader
          index="02"
          eyebrow="// skills"
          title="Skills & Tools"
          subtitle="The stack that carries the shipped work, then everything around it."
        />

        {/* Primary stack — the five words worth reading if nothing else in
            this section gets read, so it stays open at all times. */}
        <div className="stack-strip">
          <p className="stack-strip-label">Primary stack</p>
          <div className="stack-strip-items">
            {coreStack.map((tool, i) => (
              <motion.span
                key={tool}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={
                  reduceMotion ? { duration: 0 } : { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }
                className="stack-chip"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Collapsed datasheet — one row per category, each opening on demand. */}
        <div ref={ref} className="sheet">
          <div className="sheet-head">
            <span>
              {skillCategories.length} groups · {toolCount} tools
            </span>
            <button type="button" onClick={toggleAll} className="sheet-head-btn">
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            const isOpen = Boolean(open[i])
            const panelId = `skills-${cat.title.replace(/\W+/g, '-').toLowerCase()}`

            return (
              <motion.div
                key={cat.title}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={
                  reduceMotion ? { duration: 0 } : { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }
                className={`sheet-row ${cat.accent ? 'is-learning' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggleRow(i)}
                  className="skill-row-btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="skill-row-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="skill-row-icon">
                    <Icon size={15} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="skill-row-title">
                      {cat.title}
                      {cat.accent && <span className="skill-row-tag">in progress</span>}
                    </span>
                    <span className="skill-row-caption">{cat.caption}</span>
                  </span>

                  <span className="skill-row-count">{cat.skills.length} tools</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="skill-row-chips">
                        {cat.skills.map((skill) => (
                          <span key={skill} className="badge">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

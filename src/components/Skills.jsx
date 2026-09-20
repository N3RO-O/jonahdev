import { motion, useReducedMotion } from 'framer-motion'
import {
  Layout,
  Server,
  Wrench,
  Briefcase,
  Camera,
  BookOpen,
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

  const toolCount = skillCategories.reduce((n, c) => n + c.skills.length, 0)

  const rowMotion = (i) => ({
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: reduceMotion ? { duration: 0 } : { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  })

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

        {/* Primary stack — the five words worth reading if nothing else on
            this section gets read. Deliberately outsized against the
            breakdown below it. */}
        <div className="stack-strip">
          <p className="stack-strip-label">Primary stack</p>
          <div className="stack-strip-items">
            {coreStack.map((tool, i) => (
              <motion.span
                key={tool}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={reduceMotion ? { duration: 0 } : { delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="stack-chip"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Spec sheet — one row per category, read top-to-bottom like a
            datasheet instead of six identical cards competing for the eye. */}
        <div ref={ref} className="skill-sheet">
          <div className="skill-sheet-head" aria-hidden="true">
            <span>Category</span>
            <span>
              {skillCategories.length} groups · {toolCount} tools
            </span>
          </div>

          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            const motionProps = rowMotion(i)

            return (
              <motion.div
                key={cat.title}
                initial={motionProps.initial}
                animate={motionProps.animate}
                transition={motionProps.transition}
                className={`skill-row ${cat.accent ? 'is-learning' : ''}`}
              >
                <div className="skill-row-head">
                  <span className="skill-row-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="skill-row-icon">
                    <Icon size={15} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="skill-row-title">
                      {cat.title}
                      {cat.accent && <span className="skill-row-tag">in progress</span>}
                    </h3>
                    <p className="skill-row-caption">{cat.caption}</p>
                  </div>
                </div>

                <div className="skill-row-chips">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

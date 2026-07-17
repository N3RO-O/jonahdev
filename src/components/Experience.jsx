import { motion } from 'framer-motion'
import { experience } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience" className="py-20 bg-[var(--surface-elevated)]/50">
      <div className="section-container">
        <SectionHeader
          index="04"
          eyebrow="// experience"
          title="Experience"
          subtitle="Transferable skills from tech, government, and client-facing roles."
        />

        <div ref={ref} className="relative max-w-3xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />
          {experience.map((exp, i) => (
            <motion.div
              key={exp.title + exp.period}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group relative mb-8 pl-8 last:mb-0"
            >
              <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-[var(--surface)] transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_4px_var(--accent-glow)]" />
              <time className="font-mono text-xs text-accent">{exp.period}</time>
              <h3 className="mt-1 text-lg font-semibold transition-colors group-hover:text-accent">{exp.title}</h3>
              <p className="text-secondary text-sm font-medium">{exp.company}</p>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

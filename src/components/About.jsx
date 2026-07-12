import { motion } from 'framer-motion'
import { Code2, Camera, GraduationCap, Zap, Briefcase } from 'lucide-react'
import { about } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

const icons = { code: Code2, camera: Camera, graduate: GraduationCap, zap: Zap, briefcase: Briefcase }

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <SectionHeader
          eyebrow="// about"
          title="About Me"
          subtitle="Developer, systems thinker, and visual storyteller from Catanduanes."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="card lg:col-span-2"
          >
            <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
          >
            {about.highlights.map((h) => {
              const Icon = icons[h.icon]
              return (
                <div key={h.label} className="card flex items-start gap-3 !p-4">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{h.label}</div>
                    <div className="text-xs text-[var(--text-muted)]">{h.desc}</div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

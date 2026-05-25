import { motion } from 'framer-motion'
import {
  Layout,
  Server,
  Wrench,
  Briefcase,
  Camera,
  BookOpen,
} from 'lucide-react'
import { skillCategories } from '../data/siteData'
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

  return (
    <section id="skills" className="py-20 bg-[var(--surface-elevated)]/50">
      <div className="section-container">
        <SectionHeader
          eyebrow="// skills"
          title="Skills & Tools"
          subtitle="Organized by category — technical, professional, and creative."
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`card ${cat.accent ? 'border-accent/40 ring-1 ring-accent/20' : ''}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
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

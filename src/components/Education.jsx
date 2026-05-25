import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import { education, certifications } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

export default function Education() {
  const [ref, inView] = useInView()

  return (
    <section id="education" className="py-20 bg-[var(--surface-elevated)]/50">
      <div className="section-container">
        <SectionHeader
          eyebrow="// education & certs"
          title="Education & Certifications"
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="card"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold">{education.degree}</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {education.school} · {education.period}
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              {education.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-accent">▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className={`card flex flex-col items-center text-center ${
                  cert.placeholder ? 'border-dashed opacity-70' : ''
                }`}
              >
                <div className="mb-3 rounded-lg bg-accent/10 p-3 text-accent">
                  <Award size={24} />
                </div>
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="mb-3 max-h-32 rounded-lg object-contain"
                  />
                ) : (
                  <div className="mb-3 flex h-24 w-full items-center justify-center rounded-lg bg-[var(--surface-elevated)] font-mono text-xs text-[var(--text-muted)]">
                    {cert.placeholder ? 'Add cert image' : cert.title}
                  </div>
                )}
                <h4 className="font-semibold text-sm">{cert.title}</h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

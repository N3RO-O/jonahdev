import { motion } from 'framer-motion'
import { Printer, Download } from 'lucide-react'
import { site, education, experience, certifications, skillCategories, projects } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

export default function Resume() {
  const [ref, inView] = useInView()

  const handlePrint = () => window.print()

  return (
    <section id="resume" className="py-20">
      <div className="section-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="// résumé"
            title="Resume"
            subtitle="A structured, printable snapshot of my background and work."
          />
          <div className="flex gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
            <a href={site.cvUrl} download className="btn-secondary inline-flex items-center gap-2">
              <Download size={16} />
              Download
            </a>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="card mt-8 p-6 sm:p-10"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-[var(--text)]">{site.name}</h2>
              <p className="mt-1 text-accent">{site.title}</p>
            </div>
            <div className="space-y-1 text-sm text-[var(--text-muted)]">
              <p>{site.email}</p>
              <p>{site.phone}</p>
              <p>{site.location}</p>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-6 text-sm leading-7 text-[var(--text-muted)]">{site.tagline}</p>

          {/* Experience */}
          <div className="mt-8">
            <h3 className="mb-4 font-display text-lg font-semibold text-[var(--text)]">Experience</h3>
            <ul className="space-y-5">
              {experience.map((exp) => (
                <li key={exp.title + exp.period} className="border-l-2 border-[var(--border)] pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-medium text-[var(--text)]">{exp.title}</p>
                    <span className="text-xs font-mono text-[var(--text-muted)]">{exp.period}</span>
                  </div>
                  <p className="text-sm text-accent">{exp.company}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{exp.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="mt-8">
            <h3 className="mb-4 font-display text-lg font-semibold text-[var(--text)]">Education</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-[var(--border)] pl-4">
                <p className="font-medium text-[var(--text)]">{education.degree}</p>
                <p className="text-sm text-accent">{education.school} · {education.period}</p>
              </div>
              {education.secondary && (
                <div className="border-l-2 border-[var(--border)] pl-4">
                  <p className="font-medium text-[var(--text)]">{education.secondary.degree}</p>
                  <p className="text-sm text-accent">
                    {education.secondary.school} · {education.secondary.period}
                    {education.secondary.note ? ` · ${education.secondary.note}` : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h3 className="mb-4 font-display text-lg font-semibold text-[var(--text)]">Skills</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <div key={cat.title}>
                  <p className="mb-2 text-sm font-semibold text-[var(--text)]">{cat.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span key={s} className="badge">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mt-8">
            <h3 className="mb-4 font-display text-lg font-semibold text-[var(--text)]">Selected Projects</h3>
            <ul className="space-y-4">
              {projects.map((p) => (
                <li key={p.id} className="border-l-2 border-[var(--border)] pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="font-medium text-[var(--text)]">{p.title}</p>
                    <span className="text-xs font-mono text-[var(--text-muted)]">{p.year}</span>
                  </div>
                  <p className="text-sm leading-6 text-[var(--text-muted)]">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="mt-8">
            <h3 className="mb-4 font-display text-lg font-semibold text-[var(--text)]">Trainings & Certifications</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c.title} className="text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--text)]">{c.title}</span>
                  <span className="block text-xs">{c.issuer} · {c.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

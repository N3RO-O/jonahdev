import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, Calendar, ChevronDown, Sparkles, BadgeCheck } from 'lucide-react'
import { education, certifications } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

export default function Education() {
  const [ref, inView] = useInView()
  const [expandedDegree, setExpandedDegree] = useState(false)
  const [expandedCerts, setExpandedCerts] = useState({})
  const [lightbox, setLightbox] = useState({ images: [], index: null })

  const certImages = certifications
    .filter((c) => c.image)
    .map((c) => ({ src: c.image, caption: `${c.title} — ${c.issuer}` }))

  const dotStyles = ['bg-accent', 'bg-sky-400', 'bg-violet-400']

  return (
    <section id="education" className="py-20">
      <div className="section-container">
        <SectionHeader eyebrow="// education & certs" title="Education & Certifications" />

        <div ref={ref} className="space-y-10">
          {/* Main Degree Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* accent rail */}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-accent/70 to-transparent" />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                {/* Identity */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                    <GraduationCap size={28} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                        Education
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Graduated
                      </span>
                    </div>
                    <h3 className="mt-1 text-xl font-bold leading-tight text-[var(--text)] sm:text-2xl">
                      {education.degree}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-[var(--text-muted)]">
                      {education.school}
                      <span className="text-[var(--border)]">·</span>
                      <span className="inline-flex items-center gap-1 text-accent">
                        <Sparkles size={12} />
                        Full-Stack Focus
                      </span>
                    </p>
                  </div>
                </div>

                {/* Meta + toggle */}
                <div className="flex shrink-0 items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    <Calendar size={12} />
                    {education.period}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedDegree(!expandedDegree)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:border-accent hover:text-accent"
                    aria-expanded={expandedDegree}
                  >
                    Details
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${expandedDegree ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {expandedDegree && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-6 border-t border-[var(--border)] pt-6">
                      <p className="text-sm leading-7 text-[var(--text-muted)]">
                        A polished summary of coursework, project achievements, and hands-on training with a focus on
                        practical systems delivery across academic and live projects — collaborative development, data-driven
                        decision making, and production-ready deployment.
                      </p>

                      {/* Highlight timeline */}
                      <ol className="relative space-y-4 pl-6">
                        <span className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-[var(--border)]" />
                        {education.details.map((detail, index) => (
                          <li key={detail} className="relative">
                            <span
                              className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-[var(--surface)] ${dotStyles[index]}`}
                            />
                            <span className="text-sm font-medium text-[var(--text)]">{detail}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="section-eyebrow !mb-0">
                <span className="inline-flex items-center gap-3">
                  <motion.span
                    animate={{ scaleX: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-px w-8 rounded-full bg-gradient-to-r from-accent/0 to-accent"
                  />
                  <span className="font-medium text-[var(--text-muted)]">// certifications & training</span>
                </span>
              </h3>
              <p className="max-w-2xl text-sm text-[var(--text-muted)]">
                Selected certificates, workshops, and participation that support the practical systems work shown elsewhere on the site.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  {/* Image or Icon */}
                  {cert.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          images: certImages,
                          index: certImages.findIndex((item) => item.src === cert.image),
                        })
                      }
                      className="relative block aspect-[16/10] overflow-hidden bg-[var(--surface-elevated)]"
                      aria-label={`View ${cert.title}`}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                        <Calendar size={10} />
                        {cert.year}
                      </span>
                    </button>
                  ) : (
                    <div className="relative flex aspect-[16/10] items-center justify-center bg-[var(--surface-elevated)]">
                      <Award size={36} className="text-accent" />
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                        <Calendar size={10} />
                        {cert.year}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                      <BadgeCheck size={13} />
                      {cert.issuer}
                    </div>
                    <h4 className="text-base font-bold leading-snug text-[var(--text)] transition-colors group-hover:text-accent">
                      {cert.title}
                    </h4>

                    <button
                      type="button"
                      onClick={() => setExpandedCerts((prev) => ({ ...prev, [i]: !prev[i] }))}
                      className="mt-auto inline-flex w-fit items-center gap-1 text-xs font-medium text-[var(--text-muted)] transition-colors hover:text-accent"
                      aria-expanded={expandedCerts[i]}
                    >
                      Details
                      <ChevronDown size={14} className={`transition-transform ${expandedCerts[i] ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Expandable Detail */}
                  <AnimatePresence>
                    {expandedCerts[i] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4 text-xs leading-6 text-[var(--text-muted)]"
                      >
                        A recognition of professional growth and commitment to continuous learning in systems development and
                        practical implementation, issued by {cert.issuer} ({cert.year}).
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox.index !== null && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox({ images: [], index: null })}
          onPrev={() =>
            setLightbox((lb) => ({
              ...lb,
              index: (lb.index - 1 + lb.images.length) % lb.images.length,
            }))
          }
          onNext={() =>
            setLightbox((lb) => ({
              ...lb,
              index: (lb.index + 1) % lb.images.length,
            }))
          }
        />
      )}
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, Calendar } from 'lucide-react'
import { education, certifications } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

export default function Education() {
  const [ref, inView] = useInView()
  const [lightbox, setLightbox] = useState({ images: [], index: null })

  const certImages = certifications
    .filter((c) => c.image)
    .map((c) => ({ src: c.image, caption: `${c.title} — ${c.issuer}` }))

  const detailStyles = [
    'border-accent/40 bg-white/95 dark:bg-[var(--surface-elevated)] text-[var(--text)] hover:border-accent/70',
    'border-sky-400/30 bg-white/95 dark:bg-[var(--surface-elevated)] text-[var(--text)] hover:border-sky-400/70',
    'border-violet-400/30 bg-white/95 dark:bg-[var(--surface-elevated)] text-[var(--text)] hover:border-violet-400/70',
  ]

  const dotStyles = ['bg-accent', 'bg-sky-400', 'bg-violet-400']

  return (
    <section id="education" className="py-20">
      <div className="section-container">
        <SectionHeader eyebrow="// education & certs" title="Education & Certifications" />

        <div ref={ref} className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto grid max-w-5xl gap-8 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[320px_minmax(360px,1fr)]">
              <aside className="rounded-[1.8rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-3xl bg-accent/10 text-accent shadow-sm">
                      <GraduationCap size={30} className="min-w-[1.75rem] min-h-[1.75rem]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--text-muted)]">Degree</p>
                      <h3 className="text-3xl font-semibold text-[var(--text)] leading-tight">
                        {education.degree}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">{education.school}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                    {education.period}
                  </span>
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                    Full-Stack Focus
                  </span>
                </div>
              </aside>

              <div className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                    A polished summary of coursework, project achievements, and hands-on training with a focus on practical systems delivery.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {education.details.map((detail, index) => (
                    <div
                      key={detail}
                      className={`group rounded-[1.5rem] border p-4 text-sm shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${detailStyles[index]}`} 
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dotStyles[index]}`} />
                        <span>{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-sm text-[var(--text-muted)] shadow-sm">
                  <h4 className="mb-3 text-base font-semibold text-[var(--text)]">What this degree represents</h4>
                  <p>
                    Real systems delivery across academic and live projects, including collaborative development, data-driven decision making, and production-ready deployment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="section-eyebrow !mb-0">
                <span className="inline-flex items-center gap-3">
                  <span className="h-px w-8 rounded-full bg-accent/40" />
                  <span className="font-medium text-[var(--text-muted)]">// certifications & training</span>
                </span>
              </h3>
              <p className="max-w-2xl text-sm text-[var(--text-muted)]">
                Selected certificates, workshops, and participation that support the practical systems work shown elsewhere on the site.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 * i, duration: 0.45 }}
                  className="group overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-elevated)] text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="h-1 w-full bg-accent/10" />
                  {cert.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          images: certImages,
                          index: certImages.findIndex((item) => item.src === cert.image),
                        })
                      }
                      className="relative block overflow-hidden bg-[var(--surface)]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[var(--surface-elevated)]">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={10} />
                          {cert.year}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="relative flex aspect-[4/3] items-center justify-center bg-accent/10 text-accent">
                      <Award size={32} />
                      <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
                        {cert.year}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                      <span>{cert.issuer}</span>
                      <span>{cert.year}</span>
                    </div>
                    <h4 className="text-base font-semibold leading-snug text-[var(--text)]">{cert.title}</h4>
                  </div>
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

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
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
            className="grid gap-4 sm:grid-cols-1"
          >
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="card flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-4"
              >
                {cert.image ? (
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        images: certImages,
                        index: certImages.findIndex((i) => i.src === cert.image),
                      })
                    }
                    className="mb-3 w-full shrink-0 overflow-hidden rounded-lg border border-[var(--border)] transition-transform hover:scale-[1.02] sm:mb-0 sm:w-36"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="max-h-44 w-full object-contain p-2"
                    />
                  </button>
                ) : (
                  <div className="mb-3 flex h-24 w-36 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent sm:mb-0">
                    <Award size={32} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm leading-snug">{cert.title}</h4>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
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

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

  return (
    <section id="education" className="py-20 bg-[var(--surface-elevated)]/50">
      <div className="section-container">
        <SectionHeader eyebrow="// education & certs" title="Education & Certifications" />

        <div ref={ref} className="space-y-10">
          {/* Degree — full-width highlighted banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="card flex flex-col gap-5 border-accent/30 !bg-gradient-to-br !from-accent/10 !to-transparent sm:flex-row sm:items-center"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <GraduationCap size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{education.degree}</h3>
              <p className="text-secondary text-sm font-medium">
                {education.school} · {education.period}
              </p>
              <ul className="mt-3 space-y-3 text-sm text-[var(--text-muted)]">
                {education.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Certifications — poster-style card grid */}
          <div>
            <h3 className="section-eyebrow !mb-5">// certifications & training</h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.06 * i }}
                  className="card group flex flex-col overflow-hidden !p-0"
                >
                  {cert.image ? (
                    <button
                      type="button"
                      onClick={() =>
                        setLightbox({
                          images: certImages,
                          index: certImages.findIndex((im) => im.src === cert.image),
                        })
                      }
                      className="relative block aspect-[4/3] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface-elevated)]"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        loading="lazy"
                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
                        <Calendar size={10} />
                        {cert.year}
                      </span>
                    </button>
                  ) : (
                    <div className="relative flex aspect-[4/3] w-full items-center justify-center border-b border-[var(--border)] bg-accent/10 text-accent">
                      <Award size={32} />
                      <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
                        <Calendar size={10} />
                        {cert.year}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <h4 className="text-sm font-semibold leading-snug transition-colors group-hover:text-accent">
                      {cert.title}
                    </h4>
                    <p className="text-secondary mt-auto text-xs">{cert.issuer}</p>
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

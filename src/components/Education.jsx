import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Award, Calendar, ChevronDown, Sparkles } from 'lucide-react'
import { education, certifications } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

export default function Education() {
  const [ref, inView] = useInView()
  const [expandedDegree, setExpandedDegree] = useState(true)
  const [expandedCerts, setExpandedCerts] = useState({})
  const [lightbox, setLightbox] = useState({ images: [], index: null })

  const certImages = certifications
    .filter((c) => c.image)
    .map((c) => ({ src: c.image, caption: `${c.title} — ${c.issuer}` }))

  const detailStyles = [
    'from-accent/15 to-accent/5 border-accent/30',
    'from-sky-400/15 to-sky-400/5 border-sky-400/30',
    'from-violet-400/15 to-violet-400/5 border-violet-400/30',
  ]

  const dotStyles = ['bg-accent', 'bg-sky-400', 'bg-violet-400']

  return (
    <section id="education" className="py-20">
      <div className="section-container">
        <SectionHeader eyebrow="// education & certs" title="Education & Certifications" />

        <div ref={ref} className="space-y-10">
          {/* Main Degree Card - Expandable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-accent/20 bg-gradient-to-br from-accent/8 via-transparent to-transparent shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
          >
            <button
              onClick={() => setExpandedDegree(!expandedDegree)}
              className="w-full text-left"
            >
              <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[320px_minmax(360px,1fr)]">
                {/* Left Sidebar */}
                <motion.aside
                  layout
                  className="rounded-[1.8rem] border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 shadow-sm backdrop-blur-md transition-all duration-300"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-accent via-accent/80 to-accent/60 text-white shadow-lg shadow-accent/30"
                      >
                        <GraduationCap size={30} />
                      </motion.div>
                      <div className="space-y-1">
                        <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--text-muted)]">Degree</p>
                        <h3 className="text-2xl font-bold text-[var(--text)] leading-tight">
                          {education.degree}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-muted)]">{education.school}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent backdrop-blur-sm">
                      {education.period}
                    </span>
                    <span className="rounded-full border border-accent/50 bg-gradient-to-r from-accent/20 to-accent/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-accent flex items-center gap-1.5 backdrop-blur-sm">
                      <Sparkles size={12} />
                      Full-Stack Focus
                    </span>
                  </div>
                </motion.aside>

                {/* Right Content */}
                <div className="flex items-center justify-between">
                  <div className="space-y-6 flex-1">
                    <p className="text-sm leading-7 text-[var(--text-muted)]">
                      A polished summary of coursework, project achievements, and hands-on training with a focus on practical systems delivery.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {education.details.map((detail, index) => (
                        <motion.div
                          key={detail}
                          whileHover={{ scale: 1.02, translateY: -4 }}
                          className={`group rounded-[1.5rem] border bg-gradient-to-br p-4 text-sm shadow-sm transition duration-300 hover:shadow-lg ${detailStyles[index]}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${dotStyles[index]}`} />
                            <span className="text-[var(--text)]">{detail}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedDegree ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0 text-accent"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedDegree && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-accent/20 bg-gradient-to-b from-transparent to-accent/5 px-8 py-6 sm:px-10"
                >
                  <div className="rounded-[1.5rem] border border-accent/30 bg-gradient-to-br from-accent/5 via-transparent to-transparent p-6 backdrop-blur-sm">
                    <h4 className="mb-3 text-base font-bold text-[var(--text)] flex items-center gap-2">
                      <Sparkles size={18} className="text-accent" />
                      What this degree represents
                    </h4>
                    <p className="text-sm leading-6 text-[var(--text-muted)]">
                      Real systems delivery across academic and live projects, including collaborative development, data-driven decision making, and production-ready deployment. This foundation enables me to build scalable, user-focused applications that solve real business problems.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                  onClick={() => setExpandedCerts((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-accent/20 bg-gradient-to-br from-accent/8 via-transparent to-transparent shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  {/* Gradient Line */}
                  <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/50 to-transparent" />

                  {/* Image or Icon */}
                  {cert.image ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightbox({
                          images: certImages,
                          index: certImages.findIndex((item) => item.src === cert.image),
                        })
                      }}
                      className="relative block overflow-hidden bg-[var(--surface)]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-accent/20 to-transparent">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-[11px] text-white backdrop-blur-md shadow-lg">
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Calendar size={10} />
                          {cert.year}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Award size={40} className="text-accent" />
                      </motion.div>
                      <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1.5 text-[11px] text-white backdrop-blur-md shadow-lg font-semibold">
                        {cert.year}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.35em] text-accent font-bold">
                      <span>{cert.issuer}</span>
                      <span className="text-[var(--text-muted)]">{cert.year}</span>
                    </div>
                    <h4 className="text-base font-bold leading-snug text-[var(--text)] group-hover:text-accent transition-colors">
                      {cert.title}
                    </h4>
                  </div>

                  {/* Expandable Detail */}
                  <AnimatePresence>
                    {expandedCerts[i] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-accent/20 bg-gradient-to-b from-transparent to-accent/5 px-5 py-4 text-xs leading-6 text-[var(--text-muted)] backdrop-blur-sm"
                      >
                        A recognition of professional growth and commitment to continuous learning in systems development and practical implementation.
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

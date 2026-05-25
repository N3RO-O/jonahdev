import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronDown, Maximize2, TrendingUp } from 'lucide-react'
import { projects } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState({ images: [], index: null })
  const allImages = project.galleries?.flatMap((g) => g.images) ?? []

  const openLightbox = (src) => {
    const idx = allImages.findIndex((img) => img.src === src)
    setLightbox({ images: allImages, index: idx >= 0 ? idx : 0 })
  }

  if (project.wip) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="card border-dashed opacity-80"
        style={{ borderColor: project.accent + '40' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="badge mb-3">In Progress</span>
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-sm text-[var(--text-muted)]">{project.subtitle} · {project.year}</p>
          </div>
          <span
            className="font-mono text-4xl font-bold opacity-20"
            style={{ color: project.accent }}
          >
            03
          </span>
        </div>
        <p className="mt-4 text-[var(--text-muted)]">{project.description}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
          <div
            className="h-full w-2/3 animate-pulse rounded-full"
            style={{ backgroundColor: project.accent }}
          />
        </div>
      </motion.article>
    )
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="card overflow-hidden"
        style={{ borderTopColor: project.accent, borderTopWidth: '3px' }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="badge mb-2">{project.subtitle}</span>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-sm text-[var(--text-muted)]">{project.year}</p>
          </div>
          <span
            className="font-mono text-5xl font-bold opacity-15"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="mt-4 text-[var(--text-muted)]">{project.description}</p>

        {project.metrics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
              >
                <TrendingUp size={14} />
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>

        <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-accent">▸</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn-secondary"
          >
            Case Study
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-6 text-sm">
                <div>
                  <h4 className="font-semibold text-accent">Problem</h4>
                  <p className="mt-1 text-[var(--text-muted)]">{project.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-accent">Solution</h4>
                  <p className="mt-1 text-[var(--text-muted)]">{project.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-accent">My Role</h4>
                  <p className="mt-1 text-[var(--text-muted)]">{project.role}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {project.galleries?.length > 0 && (
          <div className="mt-8 space-y-6">
            {project.galleries.map((gallery) => (
              <div key={gallery.label}>
                <p className="mb-3 font-mono text-xs text-[var(--text-muted)]">
                  {gallery.label} — click to expand
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {gallery.images.slice(0, 8).map((img) => (
                    <button
                      key={img.src}
                      onClick={() => openLightbox(img.src)}
                      className="group relative shrink-0 overflow-hidden rounded-lg border border-[var(--border)] transition-transform hover:scale-[1.02]"
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        loading="lazy"
                        className="h-28 w-44 object-cover object-top sm:h-32 sm:w-52"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                        <Maximize2 className="text-white" size={20} />
                      </span>
                    </button>
                  ))}
                  {gallery.images.length > 8 && (
                    <button
                      onClick={() => openLightbox(gallery.images[8].src)}
                      className="flex h-28 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-accent hover:text-accent sm:h-32"
                    >
                      +{gallery.images.length - 8} more
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.article>

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
    </>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <SectionHeader
          eyebrow="// featured work"
          title="Featured Projects"
          subtitle="Quality over quantity — capstone and OJT systems with real impact."
        />

        <div ref={ref} className="space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

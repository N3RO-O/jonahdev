import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  TrendingUp,
  CheckCircle2,
  CircleDot,
  Lightbulb,
  UserCog,
} from 'lucide-react'
import { projects } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

function GalleryViewer({ galleries, accent, onExpand }) {
  const [tab, setTab] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)

  const active = galleries[tab]
  const images = active.images
  const current = images[imgIdx]

  const goTo = (i) => setImgIdx((i + images.length) % images.length)

  return (
    <div className="mt-8">
      {galleries.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {galleries.map((g, i) => (
            <button
              key={g.label}
              onClick={() => {
                setTab(i)
                setImgIdx(0)
              }}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                i === tab
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-accent/40 hover:text-[var(--text)]'
              }`}
            >
              {g.label}
              <span className="ml-1.5 opacity-60">{g.images.length}</span>
            </button>
          ))}
        </div>
      )}

      <div
        className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]"
        style={{ borderColor: accent + '30' }}
      >
        <button
          onClick={() => onExpand(images, imgIdx)}
          className="block aspect-[16/10] w-full"
          aria-label="Expand screenshot"
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.caption}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-opacity duration-200"
          />
        </button>

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100">
          <Maximize2 className="text-white" size={22} />
        </span>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goTo(imgIdx - 1)
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goTo(imgIdx + 1)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label="Next screenshot"
            >
              <ChevronRight size={18} />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 font-mono text-[11px] text-white backdrop-blur-sm">
              {imgIdx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setImgIdx(i)}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                i === imgIdx ? 'opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              style={i === imgIdx ? { borderColor: accent } : undefined}
              aria-label={`View ${img.caption}`}
            >
              <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState({ images: [], index: null })

  const openLightbox = (images, idx) => {
    setLightbox({ images, index: idx })
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
        <span className="eyebrow-tag mb-3">In Progress</span>
        <h3 className="font-display text-xl font-semibold">{project.title}</h3>
        <p className="text-sm text-[var(--text-muted)]">
          {project.subtitle} · {project.year}
        </p>
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
        transition={{ delay: index * 0.08 }}
        className="card overflow-hidden"
        style={{ borderTopColor: project.accent, borderTopWidth: '3px' }}
      >
        <div>
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide"
            style={{
              borderColor: project.accent + '40',
              color: project.accent,
              backgroundColor: project.accent + '12',
            }}
          >
            <CircleDot size={11} />
            {project.subtitle}
          </span>
          <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{project.year}</p>
        </div>

        <p className="mt-4 text-[var(--text-muted)]">{project.description}</p>

        {project.metrics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
              >
                <TrendingUp size={13} />
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
            <li key={f} className="flex gap-2.5">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.links.liveSecondary && (
            <a
              href={project.links.liveSecondary}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <ExternalLink size={16} />
              {project.links.liveSecondaryLabel || 'View module'}
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Github size={16} />
              GitHub
            </a>
          )}
          <button onClick={() => setExpanded(!expanded)} className="btn-secondary">
            Case Study
            <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
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
              <div className="mt-6 grid gap-5 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <CircleDot size={14} />
                    The Problem
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{project.problem}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Lightbulb size={14} />
                    The Solution
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{project.solution}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <UserCog size={14} />
                    My Role
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{project.role}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {project.screenshotsPending && (!project.galleries || project.galleries.length === 0) && (
          <p className="mt-8 rounded-lg border border-dashed border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
            // Screenshots coming soon — role-based IMS views will be added when ready
          </p>
        )}

        {project.galleries?.length > 0 && (
          <GalleryViewer galleries={project.galleries} accent={project.accent} onExpand={openLightbox} />
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

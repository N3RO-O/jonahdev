import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  TrendingUp,
  CheckCircle2,
  CircleDot,
  Lightbulb,
  UserCog,
  ImageOff,
} from 'lucide-react'
import { projects } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

function GalleryViewer({ galleries, accent, onExpand }) {
  const [tab, setTab] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const reduceMotion = useReducedMotion()

  const active = galleries[tab]
  const images = active.images
  const current = images[imgIdx]

  const goTo = (i) => setImgIdx((i + images.length) % images.length)

  const captionLines = String(current.caption ?? '')
    .split(/\s*[—–|]\s*|\s*[:·]\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
  const lines = captionLines.length > 0 ? captionLines : [String(current.caption ?? '')]

  return (
    <div>
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </button>

        <AnimatePresence>
          {hovered && current.caption && (
            <motion.div
              key={current.src + '-caption'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-14"
            >
              {lines.map((line, i) => (
                <motion.p
                  key={line + i}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          delay: 0.06 + i * 0.06,
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className={
                    i === 0
                      ? 'text-sm font-semibold leading-snug text-white'
                      : 'text-xs leading-snug text-white/75'
                  }
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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

export default function Projects() {
  const [ref] = useInView()

  const techOptions = Array.from(
    new Set(
      projects
        .flatMap((p) => p.tech ?? [])
        .map((t) => String(t).trim())
        .filter(Boolean),
    ),
  )

  const [activeTech, setActiveTech] = useState('All')

  const filtered =
    activeTech === 'All' ? projects : projects.filter((p) => (p.tech ?? []).includes(activeTech))

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <SectionHeader
          index="03"
          eyebrow="// featured work"
          title="Featured Projects"
          subtitle="Quality over quantity — capstone and OJT systems with real impact."
        />

        {techOptions.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTech('All')}
              className={`filter-pill ${activeTech === 'All' ? 'is-active' : ''}`}
            >
              All
            </button>

            {techOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTech(t)}
                className={`filter-pill ${activeTech === t ? 'is-active' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div ref={ref} className="sheet">
          <div className="sheet-head">
            <span>
              {filtered.length} of {projects.length} projects
            </span>
            <span>{activeTech === 'All' ? 'all stacks' : activeTech}</span>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="px-6 py-10 text-center font-mono text-sm text-[var(--text-muted)]">
              no projects use {activeTech}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project }) {
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState({ images: [], index: null })
  const reduceMotion = useReducedMotion()

  const cover = project.galleries?.[0]?.images?.[0]
  const shotCount = (project.galleries ?? []).reduce((n, g) => n + g.images.length, 0)
  const panelId = `${project.id}-details`

  const openLightbox = (images, idx) => setLightbox({ images, index: idx })

  return (
    <motion.div
      layout={!reduceMotion}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 130, damping: 20 }}
      className="sheet-row"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="project-row"
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <span className="project-row-thumb" style={{ borderColor: project.accent + '40' }}>
          {cover ? (
            <img src={cover.src} alt="" loading="lazy" />
          ) : (
            <ImageOff size={18} className="text-[var(--text-muted)]" />
          )}
          {shotCount > 0 && <span className="project-row-shots">{shotCount}</span>}
        </span>

        <span className="min-w-0 flex-1">
          <span className="project-row-kicker" style={{ color: project.accent }}>
            <CircleDot size={10} />
            {project.subtitle}
            {project.wip && <span className="project-row-wip">In progress</span>}
          </span>
          <span className="project-row-title">{project.title}</span>
          <span className="project-row-desc">{project.description}</span>
          <span className="project-row-chips">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="badge">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="badge border-dashed">+{project.tech.length - 4}</span>
            )}
          </span>
        </span>

        <span className="project-row-side">
          <span className="project-row-year">{project.year}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 border-t border-[var(--border)] px-5 py-6 sm:px-6">
              {project.galleries?.length > 0 && (
                <GalleryViewer
                  galleries={project.galleries}
                  accent={project.accent}
                  onExpand={openLightbox}
                />
              )}

              {project.screenshotsPending && !project.galleries?.length && (
                <p className="rounded-lg border border-dashed border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
                  Screenshots coming soon
                </p>
              )}

              {project.metrics?.length > 0 && (
                <div className="flex flex-wrap gap-2">
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

              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <CircleDot size={14} />
                    The Problem
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{project.problem}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Lightbulb size={14} />
                    The Solution
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{project.solution}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <UserCog size={14} />
                    My Role
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{project.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </motion.div>
  )
}

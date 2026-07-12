import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Volume2, X } from 'lucide-react'
import { creative } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

// Uniform grid — same-size tiles for every item so the layout never
// wraps into an awkward gap regardless of item count or order.
const TILE_SPAN = 'aspect-[4/5]'

function VideoTile({ item, spanClass, onOpen }) {
  const videoRef = useRef(null)

  const handleEnter = () => {
    // Desktop-only silent preview loop. Guarded so touch devices never rely on this.
    if (window.matchMedia?.('(hover: hover)').matches) {
      videoRef.current?.play().catch(() => {})
    }
  }
  const handleLeave = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative w-full overflow-hidden rounded-2xl border border-[var(--border)] ${spanClass}`}
      aria-label={`Play video: ${item.alt}`}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        playsInline
        loop
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 via-black/0 to-black/10 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="self-end rounded-full bg-black/50 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
          Videography
        </span>
      </div>
      {/* Always-visible play affordance so it never *looks* like a dead tile */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Play size={22} className="ml-0.5" fill="currentColor" />
        </span>
      </span>
    </button>
  )
}

function VideoModal({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video preview"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <video
          src={item.src}
          poster={item.poster}
          controls
          autoPlay
          playsInline
          className="max-h-[80vh] w-full rounded-lg bg-black"
        />
        <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-white/80">
          <Volume2 size={14} />
          {item.alt}
        </p>
      </div>
    </div>
  )
}

export default function Creative() {
  const [ref, inView] = useInView()
  const [lightbox, setLightbox] = useState({ images: [], index: null })
  const [activeVideo, setActiveVideo] = useState(null)

  const photos = creative.items
    .filter((i) => i.type === 'photo')
    .map((i) => ({ src: i.src, caption: i.alt }))

  return (
    <section id="creative" className="py-20">
      <div className="section-container">
        <SectionHeader
          eyebrow="// creative work"
          title="Photography & Videography"
          subtitle={creative.intro}
        />

        <div
          ref={ref}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[1fr]"
        >
          {creative.items.map((item, i) => {
            const spanClass = TILE_SPAN

            if (item.type === 'video') {
              return (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.08 }}
                  className={spanClass}
                >
                  <VideoTile item={item} spanClass="h-full" onOpen={setActiveVideo} />
                </motion.div>
              )
            }

            return (
              <motion.button
                key={item.src}
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08 }}
                onClick={() =>
                  setLightbox({
                    images: photos,
                    index: photos.findIndex((p) => p.src === item.src),
                  })
                }
                className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] ${spanClass}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">Photography</span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Want to see more or discuss a shoot?{' '}
          <a
            href="https://tabuzoportfolio.vercel.app/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Let's talk ↓
          </a>
        </p>
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

      <AnimatePresence>
        {activeVideo && <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </section>
  )
}

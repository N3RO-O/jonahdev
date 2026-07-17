import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Volume2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { creative } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

const TILE_SPAN = 'aspect-[4/5]'

function VideoTile({ item, spanClass, onOpen }) {
  const videoRef = useRef(null)

  const handleEnter = () => {
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

function PhotoCarousel({ photos, onOpen }) {
  const [idx, setIdx] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef(null)

  const startAuto = () => {
    stopAuto()
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setIdx((i) => (i + 1) % photos.length)
    }, 5000)
  }
  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [photos.length])

  const go = (delta) => {
    stopAuto()
    setDirection(delta)
    setIdx((i) => (i + delta + photos.length) % photos.length)
    startAuto()
  }

  const current = photos[idx]
  const captionLines = String(current.caption ?? '')
    .split(/\s*[—–|]\s*|\s*[:·]\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
  const lines = captionLines.length > 0 ? captionLines : [String(current.caption ?? '')]

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]">
        <button
          onClick={() =>
            onOpen(photos, photos.findIndex((p) => p.src === current.src))
          }
          className="block h-[50vh] sm:h-[60vh] w-full max-h-[600px]"
          aria-label="Expand screenshot"
        >
          <AnimatePresence mode="crossFade">
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.caption}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
              style={{ objectPosition: 'top center' }}
            />
          </AnimatePresence>
        </button>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-4 left-4 right-4"
            >
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`text-sm ${i === 0 ? 'font-semibold text-white' : 'text-white/80'}`}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-0.5 font-mono text-[11px] text-white backdrop-blur-sm">
          {idx + 1} / {photos.length}
        </div>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
              style={{ opacity: hovered ? 1 : 0 }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
              style={{ opacity: hovered ? 1 : 0 }}
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > idx ? 1 : -1)
                setIdx(i)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-6 bg-accent' : 'w-1.5 bg-[var(--border)] hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      )}
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

  const videos = creative.items.filter((i) => i.type === 'video')

  return (
    <section id="creative" className="py-20">
      <div className="section-container">
        <SectionHeader
          index="05"
          eyebrow="// creative work"
          title="Photography & Videography"
          subtitle={creative.intro}
        />

        <div ref={ref} className="space-y-8">
          {photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhotoCarousel photos={photos} onOpen={(images, index) => setLightbox({ images, index })} />
            </motion.div>
          )}

          {videos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[1fr]">
              {videos.map((item, i) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`viewfinder group relative ${TILE_SPAN}`}
                >
                  <VideoTile item={item} spanClass="h-full" onOpen={setActiveVideo} />
                  <span aria-hidden="true" className="vf-corner vf-tl" />
                  <span aria-hidden="true" className="vf-corner vf-tr" />
                  <span aria-hidden="true" className="vf-corner vf-bl" />
                  <span aria-hidden="true" className="vf-corner vf-br" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Want to see more or discuss a shoot?{' '}
          <a href="#contact" className="link-underline text-accent">
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

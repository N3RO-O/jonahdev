import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { creative } from '../data/siteData'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { useInView } from '../hooks/useInView'

export default function Creative() {
  const [ref, inView] = useInView()
  const [lightbox, setLightbox] = useState({ images: [], index: null })

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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {creative.items.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--border)]"
            >
              {item.type === 'photo' ? (
                <button
                  className="h-full w-full"
                  onClick={() =>
                    setLightbox({
                      images: photos,
                      index: photos.findIndex((p) => p.src === item.src),
                    })
                  }
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  loop
                  preload="none"
                  className="h-full w-full object-cover"
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause()
                    e.target.currentTime = 0
                  }}
                />
              )}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1 text-sm font-medium text-white">
                  {item.type === 'video' && <Play size={14} />}
                  {item.type === 'photo' ? 'Photography' : 'Videography'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Want to see more or discuss a shoot?{' '}
          <a href="#contact" className="text-accent hover:underline">
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
    </section>
  )
}

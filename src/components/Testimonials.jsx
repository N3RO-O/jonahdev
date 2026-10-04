import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

export default function Testimonials() {
  const [ref, inView] = useInView()
  const items = useMemo(() => testimonials ?? [], [])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView || items.length <= 1) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length)
    }, 5500)

    return () => window.clearInterval(id)
  }, [inView, items.length])

  const t = items[active]

  return (
    <section id="testimonials" className="py-20">
      <div className="section-container">
        <SectionHeader index="07" eyebrow="// social proof" title="Kind Words" />

        <div ref={ref} className="relative">
          <AnimatePresence mode="wait">
            {t && (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="card relative"
              >
                <Quote
                  className="absolute right-3 top-3 text-accent/5 pointer-events-none"
                  size={20}
                  aria-hidden
                />
                <p className="text-[var(--text-muted)] leading-relaxed italic">"{t.quote}"</p>
                <footer className="mt-6 border-t border-[var(--border)] pt-4">
                  <cite className="not-italic font-semibold">{t.name}</cite>
                  <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                </footer>
              </motion.blockquote>
            )}
          </AnimatePresence>

          {items.length > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {items.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    idx === active ? 'bg-accent' : 'bg-[var(--border)] hover:bg-accent/70'
                  }`}
                  aria-label={`Show testimonial ${idx + 1}`}
                  aria-pressed={idx === active}
                />
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Have we worked together?{' '}
          <a href="#contact" className="link-underline text-accent">
            I'd love to add your testimonial ↓
          </a>
        </p>
      </div>
    </section>
  )
}


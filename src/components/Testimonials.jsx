import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/siteData'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

export default function Testimonials() {
  const [ref, inView] = useInView()

  return (
    <section id="testimonials" className="py-20">
      <div className="section-container">
        <SectionHeader eyebrow="// social proof" title="Kind Words" />

        <div ref={ref} className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="card relative"
            >
              <Quote
                className="absolute right-4 top-4 text-accent/10 pointer-events-none"
                size={28}
                aria-hidden
              />
              <p className="text-[var(--text-muted)] leading-relaxed italic">"{t.quote}"</p>
              <footer className="mt-6 border-t border-[var(--border)] pt-4">
                <cite className="not-italic font-semibold">{t.name}</cite>
                <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Have we worked together?{' '}
          <a href="#contact" className="text-accent hover:underline">
            I'd love to add your testimonial ↓
          </a>
        </p>
      </div>
    </section>
  )
}

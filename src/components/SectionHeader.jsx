import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

// Shared "expo-out" curve used everywhere else on the site (intro overlay,
// scroll-to easing) — reused here so every reveal on the page moves with
// the same signature feel instead of framer-motion's generic default ease.
const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.02 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export default function SectionHeader({ eyebrow, title, subtitle, index }) {
  const [ref, inView] = useInView()

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="mb-12 md:mb-16 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5rem)_1fr] lg:items-end lg:gap-8"
    >
      {index && (
        <motion.div
          variants={item}
          aria-hidden="true"
          className="hidden lg:flex lg:items-end lg:gap-4"
        >
          <span className="section-index">{index}</span>
          <span className="section-index-rule mb-1 h-10 w-px" />
        </motion.div>
      )}

      <div>
        {eyebrow && (
          <motion.p variants={item} className="section-eyebrow">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {eyebrow}
          </motion.p>
        )}
        <motion.h2 variants={item} className="section-title">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={item} className="mt-3 max-w-2xl text-[var(--text-muted)]">
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

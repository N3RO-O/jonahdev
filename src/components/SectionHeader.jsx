import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function SectionHeader({ eyebrow, title, subtitle }) {
  const [ref, inView] = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-[var(--text-muted)]">{subtitle}</p>}
    </motion.div>
  )
}

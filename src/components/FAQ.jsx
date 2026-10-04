import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import SectionHeader from './SectionHeader'

const faqs = [
  {
    q: 'Are you open for entry-level roles?',
    a: 'Yes — I’m open to entry-level roles in IT Support, Web Development, and Systems Analysis. I also collaborate well on QA and internal tooling work.',
  },
  {
    q: 'Do you work with remote or onsite teams?',
    a: 'I’m comfortable working with remote workflows (docs, async updates, clear handoffs) and can also support onsite collaboration when needed.',
  },
  {
    q: 'What’s your timezone?',
    a: 'I’m based in the Philippines (UTC+8). I plan my work to overlap with team hours when possible.',
  },
  {
    q: 'How do you handle collaboration and requirements?',
    a: 'I focus on understanding the user flow first, then align with stakeholders on scope. I document decisions and track progress with short, clear updates.',
  },
]

export default function FAQ() {
  const [ref, inView] = useInView()

  return (
    <section id="faq" className="py-20">
      <div className="section-container">
        <SectionHeader index="08" eyebrow="// faq" title="Quick Answers" subtitle="Short, practical details before we build." />

        <div ref={ref} className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((item, idx) => (
            <motion.details
              key={item.q}
              className="card cursor-pointer !p-5"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.06 }}
            >
              <summary className="list-none">
                <span className="text-sm font-semibold text-[var(--text)]">{item.q}</span>
                <span className="ml-2 inline-flex text-[var(--text-muted)]">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}


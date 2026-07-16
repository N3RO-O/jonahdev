import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { posts } from '../data/blog'
import SectionHeader from './SectionHeader'
import { useInView } from '../hooks/useInView'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function PostBody({ body }) {
  return (
    <div className="space-y-4 text-[var(--text-muted)]">
      {body.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h3 key={i} className="mt-6 font-display text-xl font-semibold text-[var(--text)]">
              {block.text}
            </h3>
          )
        }
        if (block.type === 'code') {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 font-mono text-xs leading-relaxed text-[var(--text)]"
            >
              <code>{block.text}</code>
            </pre>
          )
        }
        return (
          <p key={i} className="leading-7">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export default function Blog() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(null)

  return (
    <section id="blog" className="py-20">
      <div className="section-container">
        <SectionHeader
          eyebrow="// writing"
          title="Blog & Notes"
          subtitle="Short, practical pieces on building fast, thoughtful web experiences."
        />

        <div ref={ref}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.article
                key={active.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="card"
              >
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-accent"
                >
                  <ArrowLeft size={16} />
                  All posts
                </button>

                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={13} />
                    {formatDate(active.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} />
                    {active.readingTime}
                  </span>
                </div>

                <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--text)]">
                  {active.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="badge">
                      <Tag size={11} />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <PostBody body={active.body} />
                </div>
              </motion.article>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {posts.map((post, i) => (
                  <motion.button
                    key={post.slug}
                    type="button"
                    onClick={() => setActive(post)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="card group flex flex-col text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[var(--text)] transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-7 text-[var(--text-muted)]">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span key={t} className="badge">
                          <Tag size={11} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { site } from '../data/siteData'
import SocialLinks from './SocialLinks'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-sm font-medium text-accent">{site.availability}</span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="section-eyebrow mb-4"
            >
              {site.location} · BSIS Graduate
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              {site.name}
              <br />
              <span className="text-[var(--text-muted)]">{site.title}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-[var(--text-muted)]"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#projects" className="btn-primary">
                View Projects
                <ArrowDown size={16} />
              </a>
              <a href={site.cvUrl} download className="btn-secondary">
                <Download size={16} />
                Download CV
              </a>
              <a href="#contact" className="btn-secondary">
                <Mail size={16} />
                Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <SocialLinks />
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-accent"
              >
                <Mail size={15} />
                {site.email}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative mx-auto lg:mx-0"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-2 border-accent/30 shadow-2xl sm:h-80 sm:w-80">
              <img
                src={site.photo}
                alt={site.name}
                className="h-full w-full object-cover"
                width={320}
                height={320}
              />
            </div>
            <div className="absolute -bottom-3 -right-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs shadow-lg">
              <span className="text-accent">$</span> open_to_work: true
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

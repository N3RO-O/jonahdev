import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Copy, Check, FileDown } from 'lucide-react'
import { site } from '../data/siteData'
import SectionHeader from './SectionHeader'
import SocialLinks from './SocialLinks'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [ref, inView] = useInView()
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(site.formspree, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/3 -top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/6 blur-3xl" />
      </div>
      <div className="section-container relative">
        <SectionHeader
          index="10"
          eyebrow="// contact"
          title="Let's Build Something"
          subtitle="Web systems, shoots, or collaborations — I deliver work built to last."
        />

        <div ref={ref} className="grid gap-12 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            onSubmit={handleSubmit}
            className="card space-y-4"
          >
            <input type="hidden" name="_subject" value="Portfolio Contact — tabuzoportfolio.vercel.app" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block font-mono text-xs text-[var(--text-muted)]">
                  name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block font-mono text-xs text-[var(--text-muted)]">
                  email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm outline-none focus:border-accent"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block font-mono text-xs text-[var(--text-muted)]">
                subject
              </label>
              <input
                id="subject"
                name="subject"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block font-mono text-xs text-[var(--text-muted)]">
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm outline-none focus:border-accent"
                placeholder="Tell me about your project..."
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-center text-sm text-green-500">
                ✓ Message sent! I'll reply within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm text-red-500">
                Something went wrong. Email me directly at {site.email}
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="card space-y-6"
          >
            <div>
              <p className="mb-2 text-sm text-[var(--text-muted)]">Or reach out directly</p>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-lg font-medium hover:text-accent"
                >
                  <Mail size={20} />
                  {site.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-accent"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} />
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="text-[var(--text-muted)] hover:text-accent"
              >
                {site.phone}
              </a>
            </div>

            <div>
              <p className="mb-3 text-sm text-[var(--text-muted)]">Find me elsewhere</p>
              <SocialLinks variant="list" />
            </div>

            <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-4">
              <a
                href={site.cvUrl}
                download
                className="btn-primary inline-flex w-full items-center justify-center gap-2 border border-accent/70 hover:border-accent"
              >
                <FileDown size={16} />
                Download résumé
              </a>
              <p className="text-xs text-[var(--text-muted)]">
                Save a copy of my résumé or email me directly for faster response.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

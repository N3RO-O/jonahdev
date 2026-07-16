import { useEffect, useState } from 'react'
import { site } from '../data/siteData'
import SocialLinks from './SocialLinks'
import { FileDown } from 'lucide-react'
// NOTE (QA): SocialLinks was previously rendered twice in this footer
// (once here, once again in the row below) — a leftover duplicate from
// an earlier layout pass. Kept to a single instance now.

export default function Footer() {
  const [time, setTime] = useState('')
  const year = new Date().getFullYear()

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-PH', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    }
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="section-container">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Brand + socials */}
          <div className="space-y-4">
            <span className="font-mono text-lg font-bold">
              jonah<span className="brand-accent">.dev</span>
            </span>
            <p className="max-w-xs text-sm text-[var(--text-muted)]">
              {site.tagline}
            </p>
            <SocialLinks includeEmail />
          </div>

          {/* Contact + CV */}
          <div>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-mono text-xs">
                  {time} PHT · open_to_work: <span className="text-accent">true</span>
                </span>
              </li>
              <li className="pt-1">
                <a href={site.cvUrl} download className="btn-secondary inline-flex items-center gap-2 text-xs">
                  <FileDown size={14} />
                  Download résumé
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <span>© {year} Jonah Mark Tabuzo. All rights reserved.</span>
          <span>
            Made with <span className="text-accent">React</span> +{' '}
            <span className="text-accent">Vite</span> &amp;{' '}
            <a
              href="https://github.com/N3RO-O/jonahdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent hover:underline"
            >
              source on GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}


import { useEffect, useState } from 'react'
import { site } from '../data/siteData'
import SocialLinks from './SocialLinks'

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
    <footer className="border-t border-[var(--border)] py-16">
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          <span className="font-mono text-2xl font-bold">
            jonah<span className="brand-accent">.dev</span>
          </span>
          <p className="mt-3 max-w-md text-sm text-[var(--text-muted)]">
            {site.tagline}
          </p>
          <SocialLinks includeEmail className="mt-6" />

          <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]"></span>
            </span>
            <span>{time} PHT</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <span>© {year} Jonah Mark Tabuzo. All rights reserved.</span>
          <span>
            Built with <span className="text-[var(--accent)]">React</span> +{' '}
            <span className="text-[var(--accent)]">Vite</span> &amp;{' '}
            <a
              href="https://github.com/N3RO-O/jonahdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] hover:underline"
            >
              source on GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}


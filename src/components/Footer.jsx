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
    <footer className="border-t border-[var(--border)] py-10">
      <div className="section-container flex flex-col items-center gap-6">
        <SocialLinks includeEmail />

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:w-full sm:flex-row">
          <span>© {year} {site.name} · BSIS Graduate</span>
          <span className="font-mono">
            jonah<span className="text-accent">.dev</span>
          </span>
          <span className="font-mono text-xs">
            {time} PHT · open_to_work: <span className="text-accent">true</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

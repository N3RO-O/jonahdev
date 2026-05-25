import { useEffect, useState } from 'react'
import { site } from '../data/siteData'

export default function Footer() {
  const [time, setTime] = useState('')

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
    <footer className="border-t border-[var(--border)] py-8">
      <div className="section-container flex flex-col items-center justify-between gap-4 text-sm text-[var(--text-muted)] sm:flex-row">
        <span>© 2026 {site.name}</span>
        <span className="font-mono">
          jonah<span className="text-accent">.dev</span>
        </span>
        <span className="font-mono text-xs">
          {time} PHT · open_to_work: <span className="text-accent">true</span>
        </span>
      </div>
    </footer>
  )
}

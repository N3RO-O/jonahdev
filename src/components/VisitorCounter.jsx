import { Eye } from 'lucide-react'
import { useVisitorCount } from '../hooks/useVisitorCount'

export default function VisitorCounter() {
  const { count, status } = useVisitorCount()

  // Nothing to show yet and the API's unreachable — fail silently rather
  // than displaying a permanently broken badge.
  if (count === null && status === 'offline') return null

  return (
    <div
      className="visitor-badge fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-3.5 py-2 font-mono text-xs text-[var(--text-muted)] shadow-lg backdrop-blur-xl"
      aria-live="polite"
      title={status === 'live' ? 'Live visitor count' : 'Last known visitor count'}
    >
      <span className={`visitor-dot ${status === 'live' ? 'is-live' : ''}`} aria-hidden="true" />
      <Eye size={13} className="text-accent" aria-hidden="true" />
      <span className="tabular-nums text-[var(--text)]">
        {count !== null ? count.toLocaleString() : '···'}
      </span>
      <span className="hidden text-[var(--text-muted)] sm:inline">visitors</span>
    </div>
  )
}

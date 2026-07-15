import { Eye } from 'lucide-react'

export default function VisitorCounter() {
  return (
    <div
      className="visitor-badge fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/90 px-3.5 py-2 font-mono text-xs text-[var(--text-muted)] shadow-lg backdrop-blur-xl"
      aria-live="polite"
      title="Visitor counter is currently disabled"
    >
      <span className="visitor-dot" aria-hidden="true" />
      <Eye size={13} className="text-accent" aria-hidden="true" />
      <span className="tabular-nums text-[var(--text)]">—</span>
      <span className="hidden text-[var(--text-muted)] sm:inline">people visited this site</span>
    </div>
  )
}


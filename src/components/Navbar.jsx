import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { navLinks, site } from '../data/siteData'

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    // Prevent the page from getting stuck unscrollable if the user
    // changes viewport size while the mobile menu is open.
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // If switching between desktop/mobile breakpoints while the menu is open,
  // close it to avoid a stuck overlay state.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const current = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      setProgress(Number(current.toFixed(2)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => e.isIntersecting && setActive(id),
        { rootMargin: '-40% 0px -50% 0px' },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.scrollY || window.pageYOffset
    const distance = targetY - startY
    if (!distance || duration === 0) {
      window.scrollTo(0, targetY)
      return
    }

    const ease = (t) => 1 - Math.pow(1 - t, 3)
    const startTime = performance.now()

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, startY + distance * ease(progress))
      if (progress < 1) window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }

  const scrollTo = (id) => {
    setOpen(false)
    const section = document.getElementById(id)
    if (!section) return
    const headerOffset = 72
    const elementPosition = section.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset

    smoothScrollTo(offsetPosition, 620)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-2xl shadow-xl'
          : 'bg-[var(--surface)]/10 backdrop-blur-2xl'
      }`}
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[var(--surface)]/50"
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full bg-accent transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <nav aria-label="Primary navigation" className="section-container flex h-16 items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('hero')
            }}
            className="group font-mono text-lg font-bold transition-transform duration-200 hover:-translate-y-0.5"
          >
            jonah<span className="brand-accent">.dev</span>
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  aria-current={active === link.id ? 'page' : undefined}
                  className={`link-underline rounded-lg px-3 py-2 text-sm transition-colors ${
                    active === link.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] transition-all duration-300 hover:rotate-45 hover:border-accent hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={site.cvUrl} download className="btn-primary hidden sm:inline-flex">
              <Download size={16} />
              CV
            </a>
            <button
              type="button"
              className="rounded-lg border border-[var(--border)] p-2 md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-haspopup="true"
              aria-expanded={open}
              aria-controls="navbar-mobile-menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-200 md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              id="navbar-mobile-menu"
              className="fixed inset-x-0 top-0 z-50 w-full border-t border-[var(--border)] bg-[var(--surface)] shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
                  <span className="font-mono text-sm font-semibold text-[var(--text)]">Menu</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-muted)] transition-colors hover:border-accent hover:text-accent"
                  >
                    <X size={20} />
                  </button>
                </div>
                <ul className="flex flex-col gap-1 py-4">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(link.id)}
                        role="menuitem"
                        aria-current={active === link.id ? 'page' : undefined}
                        className={`w-full rounded-lg px-3 py-3 text-left text-sm transition-colors ${
                          active === link.id
                            ? 'bg-accent/10 text-accent'
                            : 'text-[var(--text-muted)] hover:bg-[var(--surface-elevated)]'
                        }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <a href={site.cvUrl} download className="btn-primary mt-2 w-full">
                      <Download size={16} />
                      Download CV
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

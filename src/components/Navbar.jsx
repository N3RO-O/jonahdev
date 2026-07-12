import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { navLinks, site } from '../data/siteData'

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
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

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('hero')
          }}
          className="group font-mono text-lg font-bold transition-transform duration-200 hover:-translate-y-0.5"
        >
            jonah<span className="text-accent">.dev</span>
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
            className="rounded-lg border border-[var(--border)] p-2 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] md:hidden">
          <ul className="section-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="w-full rounded-lg px-3 py-3 text-left text-sm hover:bg-[var(--surface-elevated)]"
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
      )}
    </header>
  )
}

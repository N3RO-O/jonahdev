import { useEffect, useState } from 'react'
import { Github, Star } from 'lucide-react'
import { site } from '../data/siteData'
import { useInView } from '../hooks/useInView'

export default function GitHubStrip() {
  const [ref, inView] = useInView()
  const [stats, setStats] = useState({
    repos: '—',
    stars: '—',
    topLang: '—',
  })

  useEffect(() => {
    if (!inView) return

    fetch(`https://api.github.com/users/${site.githubUser}`)
      .then((r) => r.json())
      .then((user) => {
        setStats((s) => ({ ...s, repos: user.public_repos ?? '—' }))
      })
      .catch(() => {})

    fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100`)
      .then((r) => r.json())
      .then((repos) => {
        if (!Array.isArray(repos)) return
        const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0)
        const langs = {}
        repos.forEach((r) => {
          if (r.language) langs[r.language] = (langs[r.language] || 0) + 1
        })
        const topLang =
          Object.entries(langs).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
        setStats({ repos: repos.length, stars, topLang })
      })
      .catch(() => {})
  }, [inView])

  return (
    <div ref={ref} className="border-y border-[var(--border)] bg-[var(--surface)] py-8">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a
            href={`https://github.com/${site.githubUser}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-accent hover:underline"
          >
            <Github size={18} />
            {site.githubUser} ↗
          </a>
          <div className="flex flex-wrap gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                <Star size={18} className="text-accent" />
                {stats.stars}
              </div>
              <div className="text-xs text-[var(--text-muted)]">total stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.repos}</div>
              <div className="text-xs text-[var(--text-muted)]">public repos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">{stats.topLang}</div>
              <div className="text-xs text-[var(--text-muted)]">top language</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

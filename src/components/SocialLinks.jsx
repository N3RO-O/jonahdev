import { Github, Linkedin, Globe, Mail, Phone } from 'lucide-react'
import DiscordIcon from './icons/DiscordIcon'
import { site } from '../data/siteData'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  discord: DiscordIcon,
}

/**
 * variant="icons"  -> circular icon-only buttons (Hero, Footer)
 * variant="list"   -> icon + label rows (Contact section)
 */
export default function SocialLinks({ variant = 'icons', includeEmail = false, className = '' }) {
  if (variant === 'list') {
    return (
      <ul className={`flex flex-col gap-3 ${className}`}>
        {site.socials.map((s) => {
          const Icon = iconMap[s.icon]
          return (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-[var(--text-muted)] transition-colors hover:text-accent"
              >
                <span className="icon-btn h-9 w-9 shrink-0 group-hover:border-accent group-hover:text-accent">
                  <Icon size={16} />
                </span>
                <span>
                  <span className="block font-medium text-[var(--text)] group-hover:text-accent">
                    {s.label}
                  </span>
                  <span className="block text-xs">{s.handle || s.href.replace(/^https?:\/\//, '')}</span>
                </span>
              </a>
            </li>
          )
        })}
        {includeEmail && (
          <li>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 text-sm text-[var(--text-muted)] transition-colors hover:text-accent"
            >
              <span className="icon-btn h-9 w-9 shrink-0 group-hover:border-accent group-hover:text-accent">
                <Mail size={16} />
              </span>
              <span>
                <span className="block font-medium text-[var(--text)] group-hover:text-accent">Email</span>
                <span className="block text-xs">{site.email}</span>
              </span>
            </a>
          </li>
        )}
      </ul>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {site.socials.map((s) => {
        const Icon = iconMap[s.icon]
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="icon-btn"
          >
            <Icon size={17} />
          </a>
        )
      })}
      {includeEmail && (
        <a href={`mailto:${site.email}`} aria-label="Email" title="Email" className="icon-btn">
          <Mail size={17} />
        </a>
      )}
    </div>
  )
}

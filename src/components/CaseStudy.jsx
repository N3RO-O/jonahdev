import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus, X } from "lucide-react";
import { site } from "../data/siteData";
import ScreenshotGallery from "./ScreenshotGallery";
import StageBadge from "./StageBadge";

function Section({ title, count, open = false, children }) {
  return (
    <details className="case-section" open={open}>
      <summary>
        <h3>{title}</h3>
        {count != null && <span className="case-count">{count}</span>}
        <Plus className="expand-plus" size={18} aria-hidden="true" />
        <Minus className="expand-minus" size={18} aria-hidden="true" />
      </summary>
      <div className="case-section-body">{children}</div>
    </details>
  );
}

/*
  Full-screen case study. The first view stays clean (title, links,
  screenshots, key facts); the longer story lives in expandable sections.
  Only real links are shown; private projects offer an email enquiry.
*/
export default function CaseStudy({ project, previous, next, onClose, onSwitch }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  // A new project starts at the top.
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
    ref.current?.querySelector(".case-close")?.focus({ preventScroll: true });
  }, [project.id]);

  const links = [
    project.liveUrl && ["Live demo", project.liveUrl],
    project.documentationUrl && ["Documentation", project.documentationUrl],
    project.repository?.url && ["Source on GitHub", project.repository.url],
  ].filter(Boolean);

  const facts = [
    ["Status", project.status],
    ["Platform", project.platform],
    ["Year", project.year],
    ["Context", project.context],
  ].filter(([, value]) => value);

  return (
    <dialog
      ref={ref}
      className="case-study"
      aria-labelledby="case-title"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="case-bar">
        <button type="button" className="case-back" onClick={onClose}>
          <ArrowLeft size={16} aria-hidden="true" /> All products
        </button>
        <span className="case-bar-title" aria-hidden="true">
          {project.title}
        </span>
        <button type="button" className="icon-button case-close" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>
      </div>

      <article className="case-body" key={project.id}>
        <header className="case-head">
          <div className="case-meta">
            <StageBadge stage={project.stage} fallback={project.status} />
            <span>{project.subtitle}</span>
          </div>
          <h2 id="case-title">{project.title}</h2>
          <p className="case-lede">{project.description}</p>
          <ul className="case-stack" aria-label="Technologies">
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className="case-links">
            {links.map(([label, href]) => (
              <a key={href} className="button button-light" href={href} target="_blank" rel="noreferrer">
                {label} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
            {!project.repository?.url && (
              <a
                className="button button-ghost"
                href={`mailto:${site.email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
              >
                Ask about this project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        <ScreenshotGallery galleries={project.galleries} title={project.title} />

        <dl className="case-facts">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        {project.facts && (
          <ul className="case-numbers">
            {project.facts.map(([value, label]) => (
              <li key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        )}

        {project.statusNote && <p className="case-note">{project.statusNote}</p>}

        <div className="case-sections">
          {(project.problem || project.audience) && (
            <Section title="Overview" open>
              {project.problem && (
                <div className="case-pair">
                  <h4>Problem</h4>
                  <p>{project.problem}</p>
                </div>
              )}
              {project.audience && (
                <div className="case-pair">
                  <h4>Who it’s for</h4>
                  <p>{project.audience}</p>
                </div>
              )}
              {project.solution && (
                <div className="case-pair">
                  <h4>Approach</h4>
                  <p>{project.solution}</p>
                </div>
              )}
            </Section>
          )}

          {project.modules && (
            <Section title="Modules" count={project.modules.length}>
              <ul className="module-list">
                {project.modules.map(([name, text]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              {project.upcomingModules && (
                <p className="case-muted">Marked “Soon” in the app: {project.upcomingModules.join(" and ")}.</p>
              )}
            </Section>
          )}

          {project.featureGroups ? (
            <Section title="Features" count={project.features.length}>
              <p className="case-muted">
                Every implemented capability, grouped by the task it supports. Test evidence and external
                acceptance limits are recorded in the project documentation.
              </p>
              <div className="pcec-feature-groups">
                {project.featureGroups.map((group) => (
                  <details key={group.module}>
                    <summary>
                      {group.module} <span>{group.features.length}</span>
                    </summary>
                    <ul>
                      {group.features.map((feature) => (
                        <li key={feature.id}>
                          <a
                            href={`https://update-pcec-app.vercel.app/product-requirements.html#${feature.id.toLowerCase()}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {feature.name}
                          </a>
                          <span className="pcec-feature-id">{feature.id}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
              {project.futureFeatures && (
                <div className="case-pair">
                  <h4>Planned or waiting on outside services</h4>
                  <ul className="case-list">
                    {project.futureFeatures.map((feature) => (
                      <li key={feature.id}>
                        {feature.name} ({feature.status})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
          ) : (
            project.features.length > 0 && (
              <Section title="Key features" count={project.features.length} open={!project.problem}>
                <ul className="case-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </Section>
            )
          )}

          {project.role && (
            <Section title="My role">
              <p>{project.role}</p>
            </Section>
          )}

          {project.technical && (
            <Section title="Technical details" count={project.technical.length}>
              <div className="case-grid">
                {project.technical.map(([heading, text]) => (
                  <div className="case-pair" key={heading}>
                    <h4>{heading}</h4>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {project.motion && (
            <Section title="Interaction detail" count={project.motion.length}>
              <p className="case-muted">
                Each strip is the real interface paused at the moments shown, measured from the tap. Every
                animation switches off when a device asks for reduced motion.
              </p>
              {project.motion.map((item) => (
                <figure className="motion-strip" key={item.title}>
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </figcaption>
                  <ol>
                    {item.frames.map((frame) => (
                      <li key={frame.src}>
                        <img src={frame.src} alt="" loading="lazy" decoding="async" />
                        <span>{frame.label}</span>
                      </li>
                    ))}
                  </ol>
                </figure>
              ))}
            </Section>
          )}

          {project.story && (
            <Section title="Development story">
              {project.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Section>
          )}

          {project.variants && (
            <Section title="Related editions" count={project.variants.length}>
              <ul className="case-list">
                {project.variants.map((variant) => (
                  <li key={variant}>{variant}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {project.attribution && <p className="case-note">{project.attribution}</p>}

        <nav className="case-pager" aria-label="More projects">
          {previous && (
            <a
              href={`/work/${previous.id}`}
              onClick={(event) => {
                event.preventDefault();
                onSwitch(previous.id);
              }}
            >
              <span>
                <ArrowLeft size={14} aria-hidden="true" /> Previous
              </span>
              <strong>{previous.title}</strong>
            </a>
          )}
          {next && (
            <a
              className="case-next"
              href={`/work/${next.id}`}
              onClick={(event) => {
                event.preventDefault();
                onSwitch(next.id);
              }}
            >
              <span>
                Next <ArrowRight size={14} aria-hidden="true" />
              </span>
              <strong>{next.title}</strong>
            </a>
          )}
        </nav>
      </article>
    </dialog>
  );
}

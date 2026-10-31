import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  FileText,
  Check,
} from "lucide-react";
import { site } from "../data/siteData";
import NeroMark from "./nero/NeroMark";

export function Modal({ title, children, kind, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    if (kind === "cv") element.querySelector(".hold-button")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      className={`editorial-modal modal-${kind}`}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
      aria-label={title}
    >
      <div className="modal-header">
        <span>
          <NeroMark size={18} radius={20} />
          {`Nero / ${
                {
                  project: "Project notes",
                  post: "Field notes",
                  cv: "Résumé",
                }[kind] || "Image archive"
              }`}
        </span>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
          autoFocus={kind !== "cv"}
        >
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export function ProjectDetail({ project }) {
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const gallery = project.galleries?.[tab];
  const current = gallery?.images[index];
  const move = (direction) =>
    setIndex(
      (previous) =>
        (previous + direction + gallery.images.length) % gallery.images.length,
    );
  return (
    <article className="project-detail">
      <div className="detail-intro">
        <span className="eyebrow">
          {project.subtitle}
          {project.year ? ` / ${project.year}` : ""}
        </span>
        <h2>{project.title}</h2>
        <p className="lede">{project.description}</p>
        <div className="skill-tags">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-links">
          <span className="eyebrow">{project.status || "Project notes"}</span>
          {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Open app <ArrowUpRight size={16} /></a>}
          {project.documentationUrl && <a className="text-link" href={project.documentationUrl} target="_blank" rel="noreferrer">Requirements & documentation <ArrowUpRight size={16} /></a>}
          {project.repository?.url ? (
            <a
              className="text-link"
              href={project.repository.url}
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub <ArrowUpRight size={16} />
            </a>
          ) : (
            <a
              className="text-link"
              href={`mailto:${site.email}?subject=${encodeURIComponent(`Tell me about ${project.title}`)}`}
            >
              Ask about this project <ArrowUpRight size={16} />
            </a>
          )}
        </div>
        {project.statusNote && (
          <p className="project-status-note">{project.statusNote}</p>
        )}
        {project.attribution && (
          <p className="project-attribution">{project.attribution}</p>
        )}
      </div>
      {gallery && (
        <>
          <div
            className="gallery-tabs"
            role="group"
            aria-label="Project galleries"
          >
            {project.galleries.map((item, i) => (
              <button
                key={item.label}
                className={i === tab ? "active" : ""}
                aria-pressed={i === tab}
                onClick={() => {
                  setTab(i);
                  setIndex(0);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <figure className="detail-gallery">
            <img
              src={current.src}
              alt={current.caption}
              width="1400"
              height="900"
            />
            <figcaption>
              <span>{current.caption}</span>
              <span className="gallery-controls">
                <button
                  className="icon-button"
                  onClick={() => move(-1)}
                  disabled={gallery.images.length < 2}
                  aria-label="Previous screenshot"
                >
                  <ArrowLeft size={18} />
                </button>
                <span aria-live="polite">
                  {index + 1} / {gallery.images.length}
                </span>
                <button
                  className="icon-button"
                  onClick={() => move(1)}
                  disabled={gallery.images.length < 2}
                  aria-label="Next screenshot"
                >
                  <ArrowRight size={18} />
                </button>
              </span>
            </figcaption>
          </figure>
        </>
      )}
      <div className="project-story">
        {project.problem && (
          <div>
            <span className="eyebrow">01 / The challenge</span>
            <p>{project.problem}</p>
          </div>
        )}
        {project.solution && (
          <div>
            <span className="eyebrow">02 / The approach</span>
            <p>{project.solution}</p>
          </div>
        )}
        {project.role && (
          <div>
            <span className="eyebrow">03 / My role</span>
            <p>{project.role}</p>
          </div>
        )}
        <div className={project.featureGroups ? "pcec-feature-inventory" : undefined}>
          <span className="eyebrow">In the details</span>
          {project.featureGroups ? <><h3>Every implemented capability.</h3><p>Source inventory, grouped by the task it supports. Test evidence and external acceptance limits are recorded in the project documentation.</p><div className="pcec-feature-groups">{project.featureGroups.map(group => <details key={group.module}><summary>{group.module} <span>{group.features.length}</span></summary><ul>{group.features.map(feature => <li key={feature.id}><a href={`https://update-pcec-app.vercel.app/product-requirements.html#${feature.id.toLowerCase()}`} target="_blank" rel="noreferrer">{feature.name}</a><span className="pcec-feature-id">{feature.id}</span></li>)}</ul></details>)}</div></> : <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>}
        </div>
        {project.futureFeatures && <div className="pcec-feature-inventory"><span className="eyebrow">Planned / external dependencies</span><p>These are separate from the implemented feature inventory.</p><ul>{project.futureFeatures.map(feature => <li key={feature.id}>{feature.name} — {feature.status}</li>)}</ul></div>}
        {project.variants && (
          <div>
            <span className="eyebrow">
              Related editions & working materials
            </span>
            <ul>
              {project.variants.map((variant) => (
                <li key={variant}>{variant}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export function MediaDetail({ item, items, start = 0 }) {
  const [index, setIndex] = useState(start);
  const current = items?.[index] || item;
  const video = useRef(null);
  useEffect(() => {
    const onKey = (event) => {
      if (!items || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      setIndex(
        (previous) =>
          (previous + (event.key === "ArrowRight" ? 1 : -1) + items.length) %
          items.length,
      );
    };
    document.addEventListener("keydown", onKey);
    const player = video.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      player?.pause();
    };
  }, [items]);
  return (
    <figure className="media-detail">
      {current.type === "video" ? (
        <video
          ref={video}
          src={current.src}
          poster={current.poster}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <img src={current.src} alt={current.alt} />
      )}
      <figcaption>
        <span>{current.alt}</span>
        {items && (
          <span className="gallery-controls">
            <button
              className="icon-button"
              aria-label="Previous photograph"
              onClick={() =>
                setIndex((index - 1 + items.length) % items.length)
              }
            >
              <ArrowLeft size={19} />
            </button>
            <span aria-live="polite">
              {index + 1} / {items.length}
            </span>
            <button
              className="icon-button"
              aria-label="Next photograph"
              onClick={() => setIndex((index + 1) % items.length)}
            >
              <ArrowRight size={19} />
            </button>
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState("idle");
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(site.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Message could not be sent");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <input
        type="hidden"
        name="_subject"
        value="Nero — Portfolio enquiry"
      />
      <div className="form-pair">
        <label htmlFor="contact-name">
          Your name
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            required
            maxLength={120}
          />
        </label>
        <label htmlFor="contact-email">
          Email address
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="juan@example.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label htmlFor="contact-subject">
        What’s this about?
        <input
          id="contact-subject"
          name="subject"
          placeholder="A project, a role, an idea…"
          maxLength={200}
        />
      </label>
      <label htmlFor="contact-message">
        Tell me a little more
        <textarea
          id="contact-message"
          name="message"
          placeholder="I’m thinking about…"
          rows={3}
          required
          maxLength={6000}
        />
      </label>
      <button
        className="button button-cream"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send your message"}
        <ArrowUpRight size={18} />
      </button>
      <div className="form-status" role="status">
        {status === "success" &&
          "Message sent. Thanks for reaching out — I’ll be in touch."}
        {status === "error" && (
          <>
            Couldn’t send this time. Please try again or{" "}
            <a href={`mailto:${site.email}`}>email me directly</a>.
          </>
        )}
      </div>
    </form>
  );
}

/*
  Résumé download with a press-and-hold check. Crawlers and link scrapers
  follow plain <a href> links; there is no such link to the PDF on the page
  until a person has held the button, and the file is marked noindex in
  vercel.json. It is a deterrent, not a lock: the PDF itself stays public.
*/
const HOLD_MS = 900;

function startCvDownload() {
  const link = document.createElement("a");
  link.href = site.cvUrl;
  link.download = "Jonah-Mark-Tabuzo-CV.pdf";
  link.rel = "nofollow";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function CvDownload() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hint, setHint] = useState(false);
  const frame = useRef(0);
  const started = useRef(0);
  const holding = useRef(false);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const tick = (now) => {
    const value = Math.min(1, (now - started.current) / HOLD_MS);
    setProgress(value);
    if (value < 1) {
      frame.current = requestAnimationFrame(tick);
      return;
    }
    holding.current = false;
    setDone(true);
    startCvDownload();
  };

  const begin = () => {
    if (done || holding.current) return;
    holding.current = true;
    setHint(false);
    started.current = performance.now();
    frame.current = requestAnimationFrame(tick);
  };

  const release = () => {
    if (done || !holding.current) return;
    holding.current = false;
    cancelAnimationFrame(frame.current);
    if (progress < 1) setHint(true);
    setProgress(0);
  };

  const isHoldKey = (event) => event.key === " " || event.key === "Enter";
  const label = progress > 0 ? "Keep holding…" : "Press and hold to download";
  const meter = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;

  return (
    <div className="cv-download">
      <div className="cv-file">
        <span className="cv-file-icon" aria-hidden="true">
          <FileText size={22} strokeWidth={1.5} />
        </span>
        <div>
          <h2>Jonah Mark Tabuzo — CV</h2>
          <p>PDF · 95 KB · Full-stack development, IT support and QA</p>
        </div>
      </div>
      <p className="cv-note">
        A quick human check keeps bots and scrapers away from the file.
      </p>
      {done ? (
        <div className="cv-done" role="status">
          <Check size={18} aria-hidden="true" />
          <span>
            Thanks — your download has started.{" "}
            <a href={site.cvUrl} download="Jonah-Mark-Tabuzo-CV.pdf" rel="nofollow">
              Download again
            </a>
          </span>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="hold-button"
            style={{ "--hold": progress }}
            aria-describedby="cv-hold-help"
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.currentTarget.setPointerCapture?.(event.pointerId);
              begin();
            }}
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={release}
            onKeyDown={(event) => {
              if (!isHoldKey(event)) return;
              event.preventDefault();
              if (!event.repeat) begin();
            }}
            onKeyUp={(event) => {
              if (isHoldKey(event)) release();
            }}
            onClick={(event) => event.preventDefault()}
            onContextMenu={(event) => event.preventDefault()}
          >
            <span className="hold-label">{label}</span>
            <span className="hold-meter" aria-hidden="true">
              {meter}
            </span>
            {/* Ink copy of the label, revealed as the terracotta fill grows. */}
            <span className="hold-fill" aria-hidden="true">
              <span className="hold-label">{label}</span>
              <span className="hold-meter">{meter}</span>
            </span>
          </button>
          <p id="cv-hold-help" className={hint ? "cv-help is-hint" : "cv-help"}>
            {hint
              ? "Almost — hold a little longer (about one second)."
              : "Hold with your mouse or finger, or hold Space / Enter, for about one second."}
          </p>
        </>
      )}
      <p className="cv-alt">
        Prefer email?{" "}
        <a href={`mailto:${site.email}?subject=CV%20request`}>
          Ask for a copy
        </a>{" "}
        and I’ll send it over.
      </p>
    </div>
  );
}

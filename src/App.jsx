import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Asterisk,
  Menu,
  X,
  Terminal,
  Download,
  Plus,
  Minus,
  Github,
} from "lucide-react";
import {
  site,
  about,
  skillCategories,
  coreStack,
  experience,
  education,
  certifications,
  creative,
} from "./data/siteData";
import {
  selectedProjects as projects,
  projectCatalog,
} from "./data/projectCatalog";
import ProjectIndex from "./components/ProjectIndex";
import EditorialCursor from "./components/EditorialCursor";
import NsMark from "./components/NsMark";
import useEditorialEffects from "./hooks/useEditorialEffects";
import { posts } from "./data/blog";
import {
  Modal,
  ProjectDetail,
  MediaDetail,
  SystemConsole,
  ContactForm,
  CvDownload,
} from "./components/EditorialTools";

const navigation = [
  ["projects", "Work"],
  ["about", "About"],
  ["skills", "Expertise"],
  ["creative", "Off the clock"],
  ["contact", "Contact"],
];
const projectNames = {
  philrads: "PHILRADS / Assets",
  "philrads-ims": "PHILRADS / Inventory",
};
const faqs = [
  [
    "Are you open to new opportunities?",
    "Yes. I’m open to entry-level roles in web development, IT support, and systems analysis, as well as collaborations on QA and internal tools.",
  ],
  [
    "Can we work together remotely?",
    "Absolutely. I work with clear documentation, async updates, and thoughtful handoffs. I’m based in the Philippines (UTC+8) and plan for overlap with team hours.",
  ],
  [
    "How does a project usually start?",
    "With a conversation about the people using it. We align on requirements, define a practical scope, and work toward a solution with clear updates along the way.",
  ],
];

const disciplines = [
  "Code with purpose",
  "Systems that work",
  "Stories that stay",
  "Made by NeroSec",
];

const manilaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
});

function useManilaClock() {
  const [time, setTime] = useState(() => manilaTime.format(new Date()));
  useEffect(() => {
    const tick = () => setTime(manilaTime.format(new Date()));
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function isTypingTarget(element) {
  return (
    element instanceof HTMLElement &&
    (element.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName))
  );
}

function SectionLabel({ number, children, note }) {
  return (
    <div className="section-label">
      <span>
        <span className="index">{number} /</span> {children}
      </span>
      {note && <span className="label-note">{note}</span>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("All work");
  const [modal, setModal] = useState(null);
  const [morePhotos, setMorePhotos] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const clock = useManilaClock();
  useEditorialEffects();

  // Sticky header state + reading progress, updated once per frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      headerRef.current?.style.setProperty("--progress", progress.toFixed(4));
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Press "/" anywhere (outside a text field) to open the System Console.
  useEffect(() => {
    const onKey = (event) => {
      if (
        event.key !== "/" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isTypingTarget(event.target) ||
        document.querySelector("dialog[open]")
      )
        return;
      event.preventDefault();
      setMenuOpen(false);
      setModal({ type: "console" });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    document
      .getElementById(window.location.hash.slice(1))
      ?.scrollIntoView({ behavior: "instant" });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const filtered = projects.filter(
    (project) =>
      filter === "All work" ||
      (filter === "Desktop"
        ? project.category === "desktop"
        : project.category !== "desktop"),
  );
  const photos = creative.items.filter((item) => item.type === "photo");

  return (
    <div className="portfolio bg-grain">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={scrolled ? "site-header is-scrolled" : "site-header"}
      >
        <a className="brand" href="#hero" aria-label="NeroSec home">
          <NsMark size={44} />
          NeroSec<span className="registered">™</span>
        </a>
        <nav
          className={menuOpen ? "navigation is-open" : "navigation"}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map(([id, label]) => (
            <a
              key={id}
              className={active === id ? "active" : ""}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <span className="nav-dot">.</span>
            </a>
          ))}
        </nav>
        <a className="header-contact" href={`mailto:${site.email}`}>
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <span className="scroll-progress" aria-hidden="true" />
      </header>
      <main id="main">
        <section id="hero" className="hero wrap">
          <div className="hero-topline">
            <span className="eyebrow">
              Independent developer & visual storyteller
            </span>
            <span className="availability">
              <i /> Open to opportunities
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-intro">
                Jonah Mark Tabuzo <span>— aka NeroSec</span>
              </p>
              <h1>
                Logic meets
                <br />
                <em>instinct.</em>
                <span className="hero-cursor" aria-hidden="true" />
              </h1>
              <div className="hero-description">
                <span className="small-cross" aria-hidden="true">
                  +
                </span>
                <p>
                  Full-stack web developer. Systems creator.
                  <br />
                  Visual storyteller. Building thoughtful digital
                  <br className="desktop-break" /> experiences from the
                  Philippines.
                </p>
              </div>
              <div className="hero-actions">
                <a className="button button-cream" href="#projects">
                  Explore my work <ArrowDown size={17} />
                </a>
                <button
                  className="text-link"
                  onClick={() => setModal({ type: "cv" })}
                  aria-haspopup="dialog"
                >
                  Download CV <Download size={15} />
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-frame">
                <span className="frame-corner tl" />
                <span className="frame-corner tr" />
                <span className="frame-corner bl" />
                <span className="frame-corner br" />
                <img
                  src={site.photo}
                  alt="Jonah Mark Tabuzo, the developer behind NeroSec"
                  width="1000"
                  height="1000"
                  fetchpriority="high"
                />
                <span className="portrait-coordinate">
                  13°35′ N — 124°14′ E
                </span>
                <div className="portrait-caption">
                  <span>The person behind the pixels.</span>
                  <ArrowUpRight size={19} />
                </div>
              </div>
              <div className="portrait-stamp" aria-hidden="true">
                <NsMark
                  size={46}
                  marks={false}
                  color="var(--ink)"
                  accent="var(--ink)"
                />
                <span>
                  HUMAN IDEAS.
                  <br />
                  PURPOSEFUL CODE.
                </span>
              </div>
              <span className="portrait-note">
                A little logic. A lot of heart.
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <button
              className="console-badge"
              onClick={() => setModal({ type: "console" })}
              aria-keyshortcuts="/"
              aria-label="Open the NeroSec System Console (shortcut: slash)"
            >
              <span className="console-badge-icon" aria-hidden="true">
                <Terminal size={18} />
              </span>
              <span className="console-badge-copy">
                <span className="console-badge-title">
                  NeroSec System Console
                </span>
                <span className="console-badge-line">
                  <b>nerosec ~ $</b> whoami
                  <i className="caret" aria-hidden="true" />
                </span>
              </span>
              <span className="console-badge-meta">
                <span className="console-status">
                  <i aria-hidden="true" />
                  ONLINE
                </span>
                <span>{clock} PHT</span>
              </span>
              <kbd aria-hidden="true">/</kbd>
            </button>
            <a className="scroll-note" href="#projects">
              Scroll to discover <ArrowDown size={14} />
            </a>
            <span className="edition">Portfolio — Vol. 01 / 2026</span>
          </div>
        </section>
        <div className="discipline-strip">
          <p className="sr-only">{disciplines.join(". ")}.</p>
          <div className="marquee" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {[...disciplines, ...disciplines].map((label, index) => [
                  <span key={`${label}-${index}`}>{label}</span>,
                  <i className="marquee-mark" key={`mark-${index}`} />,
                ])}
              </div>
            ))}
          </div>
        </div>
        <section id="projects" className="work-section wrap section-space">
          <SectionLabel number="01" note="A selection of things I’ve built">
            Selected work
          </SectionLabel>
          <div className="section-heading">
            <h2>
              Ideas into
              <br />
              <em>real things.</em>
            </h2>
            <div className="section-aside">
              <p>
                Useful systems. Considered interfaces.
                <br />
                Real problems, thoughtfully solved.
              </p>
              <span className="eyebrow">
                {String(projects.length).padStart(2, "0")} selected /{" "}
                {projectCatalog.length} in the archive
              </span>
              <a className="text-link" href="#project-index">
                Browse all {projectCatalog.length} projects{" "}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="filter-bar" aria-label="Filter projects">
            {["All work", "Web systems", "Desktop"].map((label) => (
              <button
                aria-pressed={filter === label}
                onClick={() => setFilter(label)}
                className={filter === label ? "filter active" : "filter"}
                key={label}
              >
                {label}
                {label === "All work" && <sup>{projects.length}</sup>}
              </button>
            ))}
            <span className="filter-count" aria-live="polite">
              {String(filtered.length).padStart(2, "0")} selected
            </span>
          </div>
          <div className="project-grid">
            {filtered.map((project) => (
              <article
                key={project.id}
                className={`project-card project-${project.id}`}
              >
                <button
                  className="project-art"
                  onClick={() => setModal({ type: "project", project })}
                  aria-label={`Explore ${project.title}`}
                >
                  <div className="project-art-top">
                    <span>
                      NeroSec / Project{" "}
                      {String(projects.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                    <span>{project.year}</span>
                  </div>
                  {project.galleries.length > 0 ? (
                    <div className="project-image">
                      <div className="browser-chrome">
                        <i />
                        <i />
                        <i />
                        <span>{project.galleries[0].label}</span>
                      </div>
                      <img
                        src={
                          project.cover || project.galleries[0].images[0].src
                        }
                        alt={`${project.title} — ${project.galleries[0].label}`}
                        loading="lazy"
                        width="1200"
                        height="750"
                      />
                    </div>
                  ) : (
                    <div className="project-identity">
                      <Asterisk size={46} strokeWidth={1} />
                      <span>PHILRADS</span>
                      <strong>Staff Portal.</strong>
                      <span>People. Processes. Purpose.</span>
                    </div>
                  )}
                  <div className="project-art-bottom">
                    <span>
                      {project.category === "desktop"
                        ? "Desktop application"
                        : "Web application"}
                    </span>
                    <span className="project-open">
                      View project <ArrowUpRight size={16} />
                    </span>
                  </div>
                </button>
                <div className="project-caption">
                  <div>
                    <span className="eyebrow">{project.subtitle}</span>
                    <h3>
                      <button
                        onClick={() => setModal({ type: "project", project })}
                      >
                        {projectNames[project.id] || project.title}
                        <ArrowUpRight size={21} />
                      </button>
                    </h3>
                  </div>
                  <span className="project-tech">
                    {project.tech.slice(0, 3).join(" / ")}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <a
            className="github-link"
            href={site.socials[0].href}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} />
            <span>More experiments, commits & works in progress.</span>
            <span>
              Find NeroSec on GitHub <ArrowUpRight size={16} />
            </span>
          </a>
          <ProjectIndex
            onOpen={(project) => setModal({ type: "project", project })}
          />
        </section>
        <section id="about" className="about-section paper bg-grain">
          <div className="wrap section-space">
            <SectionLabel number="02" note="A person, before a portfolio">
              Behind NeroSec
            </SectionLabel>
            <div className="about-grid">
              <div className="about-title">
                <h2>
                  A systems mind.
                  <br />
                  <em>A storyteller’s eye.</em>
                </h2>
                <div className="about-signature">Jonah Mark.</div>
                <span className="eyebrow">
                  Based in Catanduanes, Philippines
                </span>
              </div>
              <div className="about-copy">
                <p className="lede">
                  Hello, I’m Jonah. <span>NeroSec</span> is my digital identity
                  — where practical engineering meets a visual way of thinking.
                </p>
                <p>{about.paragraphs[0]}</p>
                <p>
                  From inventory systems for disaster relief to an offline
                  control room for church services, I care about building tools
                  people can actually use. Beyond the screen, you’ll find me
                  behind a camera, chasing a good story.
                </p>
                <a className="text-link" href="#contact">
                  Let’s make something meaningful <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="about-facts">
              <div>
                <strong>{projectCatalog.length}</strong>
                <span>
                  Projects & experiments
                  <br />
                  across code and visuals
                </span>
              </div>
              <div>
                <strong>
                  02<span>+</span>
                </strong>
                <span>
                  Years of hands-on
                  <br />
                  building & learning
                </span>
              </div>
              <div>
                <strong>462</strong>
                <span>
                  Hours of full-stack
                  <br />
                  development OJT
                </span>
              </div>
              <div>
                <strong>BSIS</strong>
                <span>
                  Catanduanes State University
                  <br />
                  Class of 2026
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="wrap section-space">
          <SectionLabel number="03" note="The tools behind the thinking">
            NeroSec toolkit
          </SectionLabel>
          <div className="section-heading">
            <h2>
              Different tools.
              <br />
              <em>One considered approach.</em>
            </h2>
            <p className="section-aside">
              From the database to the last pixel,
              <br />
              every detail has a job to do.
            </p>
          </div>
          <div className="core-stack">
            <span className="eyebrow">My everyday stack</span>
            <div>
              {coreStack.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-list">
            {skillCategories.map((category, index) => (
              <details
                key={category.title}
                className="skill-row"
                open={index === 0 ? true : undefined}
              >
                <summary>
                  <span className="row-index">0{index + 1}</span>
                  <h3>{category.title}</h3>
                  <span className="skill-caption">{category.caption}</span>
                  <Plus className="expand-plus" size={19} />
                  <Minus className="expand-minus" size={19} />
                </summary>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
        <section
          id="experience"
          className="wrap section-space experience-section"
        >
          <SectionLabel number="04" note="Learning by doing">
            Experience & education
          </SectionLabel>
          <div className="section-heading">
            <h2>
              The work
              <br />
              <em>behind the work.</em>
            </h2>
            <button
              className="text-link"
              onClick={() => setModal({ type: "cv" })}
              aria-haspopup="dialog"
            >
              Get the full résumé <Download size={16} />
            </button>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <details key={item.title} className="experience-row">
                <summary>
                  <span className="eyebrow">{item.period}</span>
                  <div>
                    <h3>
                      {item.title
                        .replace("Freelance — ", "")
                        .replace(" — On-the-Job Training", "")}
                    </h3>
                    <p>{item.company}</p>
                  </div>
                  <Plus className="expand-plus" size={19} />
                  <Minus className="expand-minus" size={19} />
                </summary>
                <p className="experience-description">{item.description}</p>
              </details>
            ))}
          </div>
          <div id="education" className="education-strip">
            <span className="eyebrow">The foundation</span>
            <div>
              <h3>{education.degree}</h3>
              <p>
                {education.school} / {education.period}
              </p>
            </div>
            <span className="education-mark" aria-hidden="true">
              ↗
            </span>
          </div>
          <button
            className="text-link certificate-toggle"
            aria-expanded={showCerts}
            aria-controls="certificates"
            onClick={() => setShowCerts(!showCerts)}
          >
            {showCerts ? "Close" : "View"} certifications & training{" "}
            <span>({certifications.length})</span>
            {showCerts ? <Minus size={16} /> : <Plus size={16} />}
          </button>
          {showCerts && (
            <div className="certificates" id="certificates">
              {certifications.map((cert) => (
                <div key={cert.title}>
                  <span className="eyebrow">{cert.year}</span>
                  <div>
                    <h4>{cert.title}</h4>
                    <p>{cert.issuer}</p>
                  </div>
                  {cert.image && (
                    <button
                      className="icon-button"
                      onClick={() =>
                        setModal({
                          type: "media",
                          item: {
                            type: "photo",
                            src: cert.image,
                            alt: cert.title,
                          },
                        })
                      }
                      aria-label={`View certificate: ${cert.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
        <section id="creative" className="creative-section section-space">
          <div className="wrap">
            <SectionLabel number="05" note="A different kind of image-making">
              Off the clock / On the record
            </SectionLabel>
            <div className="section-heading">
              <h2>
                Life through
                <br />
                <em>another lens.</em>
              </h2>
              <div className="section-aside">
                <p>
                  Photography, motion, and moments
                  <br />
                  worth paying attention to.
                </p>
                <span className="eyebrow">Visual stories by NeroSec</span>
              </div>
            </div>
            <div className="photo-grid">
              {photos
                .slice(0, morePhotos ? undefined : 3)
                .map((item, index) => (
                  <button
                    key={item.src}
                    onClick={() =>
                      setModal({ type: "media", item, items: photos, index })
                    }
                    aria-label={`View photograph ${index + 1}`}
                    className={`photo photo-${index + 1}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      width="800"
                      height="1000"
                    />
                    <span>
                      <span>FRAME / {String(index + 1).padStart(2, "0")}</span>
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                ))}
            </div>
            <div className="creative-bottom">
              <p>Same curiosity. Different medium.</p>
              <button
                className="text-link"
                onClick={() => setMorePhotos(!morePhotos)}
                aria-expanded={morePhotos}
              >
                {morePhotos ? "Fewer frames" : `All ${photos.length} frames`}
                {morePhotos ? <Minus size={16} /> : <Plus size={16} />}
              </button>
            </div>
            <div className="video-grid">
              {creative.items
                .filter((item) => item.type === "video")
                .map((item, index) => (
                  <button
                    key={item.src}
                    className="video-preview"
                    onClick={() => setModal({ type: "media", item })}
                    aria-label={`Play ${item.alt}`}
                  >
                    <img
                      src={item.poster}
                      alt={item.alt}
                      loading="lazy"
                      width="640"
                      height="360"
                    />
                    <span className="play-button" aria-hidden="true">
                      ▶
                    </span>
                    <span className="video-caption">
                      Motion study / 0{index + 1}
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </section>
        <section id="blog" className="wrap section-space notes-section">
          <SectionLabel number="06" note="Notes from the process">
            NeroSec field notes
          </SectionLabel>
          <div className="section-heading">
            <h2>
              A few things
              <br />
              <em>on my mind.</em>
            </h2>
            <p className="section-aside">
              Thoughts on building well,
              <br />
              and the things learned along the way.
            </p>
          </div>
          <div className="notes-list">
            {posts.map((post, index) => (
              <button
                key={post.slug}
                onClick={() => setModal({ type: "post", post })}
                className="note-row"
              >
                <span className="row-index">0{index + 1}</span>
                <div>
                  <span className="eyebrow">{post.tags.join(" / ")}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <span className="note-reading">{post.readingTime}</span>
                <ArrowUpRight size={24} />
              </button>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section wrap section-space">
          <SectionLabel
            number="07"
            note="Good things start with a conversation"
          >
            Connect with NeroSec
          </SectionLabel>
          <div className="contact-heading">
            <span className="availability">
              <i /> Open to opportunities
            </span>
            <h2>
              Have something
              <br />
              in <em>mind?</em>
              <span className="heading-cursor" aria-hidden="true" />
            </h2>
          </div>
          <div className="contact-grid">
            <div className="contact-details">
              <p>
                A project, a role, or a creative collaboration.
                <br />
                I’d love to hear what you’re thinking.
              </p>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
                <ArrowUpRight size={24} />
              </a>
              <a
                className="contact-phone"
                href={`tel:${site.phone.replace(/\s/g, "")}`}
              >
                {site.phone}
              </a>
              <div className="social-links">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} — NeroSec`}
                  >
                    {social.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
              <button
                className="text-link"
                onClick={() => setModal({ type: "cv" })}
                aria-haspopup="dialog"
              >
                Download my résumé <Download size={16} />
              </button>
            </div>
            <ContactForm />
          </div>
          <div className="faq">
            <span className="eyebrow">Before we begin</span>
            <div>
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <Plus className="expand-plus" size={16} />
                    <Minus className="expand-minus" size={16} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <span className="eyebrow">Thoughtfully built. Always evolving.</span>
          <a className="text-link" href="#hero">
            Back to top <ArrowUp size={15} />
          </a>
        </div>
        <a href="#hero" className="footer-wordmark" aria-label="NeroSec home">
          NeroSec<span>™</span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NeroSec — Jonah Mark Tabuzo</span>
          <span>
            Full-stack developer / Systems creator / Visual storyteller
          </span>
          <span>
            Made in the Philippines <span className="accent">↗</span>
          </span>
        </div>
      </footer>
      <EditorialCursor />
      {modal && (
        <Modal
          title={
            modal.type === "console"
              ? "NeroSec System Console"
              : modal.type === "cv"
                ? "Download résumé"
              : modal.type === "project"
                ? modal.project.title
                : modal.type === "post"
                  ? modal.post.title
                  : modal.item.alt
          }
          kind={modal.type}
          onClose={() => setModal(null)}
        >
          {modal.type === "console" && (
            <SystemConsole
              onNavigate={(id) => {
                setModal(null);
                requestAnimationFrame(() => {
                  window.location.hash = id;
                });
              }}
            />
          )}
          {modal.type === "cv" && <CvDownload />}
          {modal.type === "project" && (
            <ProjectDetail project={modal.project} />
          )}
          {modal.type === "media" && (
            <MediaDetail
              item={modal.item}
              items={modal.items}
              start={modal.index}
            />
          )}
          {modal.type === "post" && (
            <article className="post-body">
              <span className="eyebrow">
                NeroSec field notes /{" "}
                {new Date(modal.post.date + "T00:00:00").toLocaleDateString(
                  "en",
                  { month: "long", day: "numeric", year: "numeric" },
                )}{" "}
                / {modal.post.readingTime}
              </span>
              <h2>{modal.post.title}</h2>
              {modal.post.body.map((block, index) =>
                block.type === "h2" ? (
                  <h3 key={index}>{block.text}</h3>
                ) : block.type === "code" ? (
                  <pre key={index}>
                    <code>{block.text}</code>
                  </pre>
                ) : (
                  <p key={index}>{block.text}</p>
                ),
              )}
            </article>
          )}
        </Modal>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Menu,
  X,
  Terminal,
  Download,
  Plus,
  Minus,
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
import { posts } from "./data/blog";
import {
  Modal,
  ProjectDetail,
  MediaDetail,
  SystemConsole,
  ContactForm,
  CvDownload,
} from "./components/EditorialTools";
import NeroMark from "./components/nero/NeroMark";
import PixelIcon from "./components/nero/PixelIcon";
import Scramble from "./components/nero/Scramble";
import ParticleWave from "./components/nero/ParticleWave";
import PinnedWork from "./components/nero/PinnedWork";
import CardFan from "./components/nero/CardFan";
import PortraitReveal from "./components/nero/PortraitReveal";
import useLenis from "./hooks/useLenis";
import useReveal from "./hooks/useReveal";

const navigation = [
  ["projects", "Work"],
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["creative", "Creative"],
];

const services = [
  {
    icon: "code",
    title: "Full-stack web",
    text: "React, PHP and MySQL applications taken from requirements to a live deployment.",
  },
  {
    icon: "data",
    title: "Systems & data",
    text: "Role-based systems, relational schemas, approval workflows and activity logs.",
  },
  {
    icon: "check",
    title: "QA & IT support",
    text: "Freelance QA at PIXODE: test plans, bug reports and calm troubleshooting.",
  },
  {
    icon: "camera",
    title: "Visual stories",
    text: "Photography and video edits that make information easier to remember.",
  },
];

const principles = [
  [
    "Requirements first",
    "I gather needs from the people who will use the system before writing a line of code.",
  ],
  [
    "Interfaces for everyone",
    "Clear, readable screens that non-technical staff can use on their first day.",
  ],
  [
    "Shipped, not shelved",
    "Two live management systems at PHILRADS — deployed, documented and in use.",
  ],
  [
    "A storyteller’s eye",
    "The same sense of composition that frames a photograph shapes every layout.",
  ],
];

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

const marqueeItems = [
  ...coreStack,
  "TypeScript",
  "Next.js",
  "Supabase",
  "Electron",
  "Node.js",
  "Figma",
];

const manilaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
});

function useManilaClock() {
  const [time, setTime] = useState(() => manilaTime.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(manilaTime.format(new Date())), 15000);
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

/* Section title: a pixel "//" kicker line over a display line. */
function Title({ pixel, children, align = "left", as: Tag = "h2" }) {
  return (
    <div className={`title title-${align}`} data-reveal>
      <Scramble as="p" className="pixel-kicker" text={pixel} />
      <Tag className="display">{children}</Tag>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [modal, setModal] = useState(null);
  const [morePhotos, setMorePhotos] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const clock = useManilaClock();
  const lenis = useLenis();
  useReveal();

  // Header state + reading progress.
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

  // Active section in the nav.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Pause smooth scrolling while a dialog or the mobile menu is open.
  useEffect(() => {
    if (!lenis.current) return;
    if (modal || menuOpen) lenis.current.stop();
    else lenis.current.start();
  }, [modal, menuOpen, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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

  const photos = creative.items.filter((item) => item.type === "photo");
  const videos = creative.items.filter((item) => item.type === "video");
  const openCv = () => setModal({ type: "cv" });

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={scrolled ? "site-header is-scrolled" : "site-header"}
      >
        <a className="brand" href="#hero" aria-label="Nero home">
          <NeroMark size={34} />
          <span>Nero</span>
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
            </a>
          ))}
          <a
            className="nav-cta-mobile"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <ArrowUpRight size={18} />
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="header-console"
            onClick={() => setModal({ type: "console" })}
            aria-label="Open the Nero System Console (shortcut: slash)"
            aria-keyshortcuts="/"
          >
            <Terminal size={16} />
            <kbd aria-hidden="true">/</kbd>
          </button>
          <a className="button button-red header-cta" href="#contact">
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <span className="scroll-progress" aria-hidden="true" />
      </header>

      <main id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section id="hero" className="hero">
          <div className="wrap hero-head">
            <h1>
              <span className="hero-line">Logic meets</span>
              <Scramble
                className="hero-line hero-pixel"
                text="//instinct"
                duration={1100}
              />
            </h1>
          </div>
          <ParticleWave className="hero-wave" />
          <div className="wrap hero-foot">
            <p className="hero-intro">
              <strong>Jonah Mark Tabuzo</strong> — aka Nero. Full-stack web
              developer, systems creator and visual storyteller from
              Catanduanes, Philippines.
            </p>
            <div className="hero-actions">
              <button
                className="console-pill"
                onClick={() => setModal({ type: "console" })}
                aria-keyshortcuts="/"
                aria-label="Open the Nero System Console (shortcut: slash)"
              >
                <span className="console-pill-icon" aria-hidden="true">
                  <Terminal size={16} />
                </span>
                <span className="console-pill-copy">
                  <span>Nero System Console</span>
                  <span className="console-pill-line">
                    <b>nero ~ $</b> whoami<i className="caret" />
                  </span>
                </span>
                <span className="console-pill-status">
                  <span>
                    <i aria-hidden="true" /> Online
                  </span>
                  <span>{clock} PHT</span>
                </span>
              </button>
              <a className="button button-red" href="#projects">
                Explore my work <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <div className="wrap hero-scrollbar" aria-hidden="true">
            <span>Scroll</span>
            <i />
            <span>Vol. 02 / 2026</span>
          </div>
        </section>

        {/* ---------------------------------------------------- What I do */}
        <section id="services" className="section services">
          <div className="wrap">
            <Title pixel="//what I do" align="center">
              Code with purpose
            </Title>
            <p className="lede lede-center" data-reveal>
              I build practical web systems for organisations that need them to
              work on day one — and I tell their stories with the same care.
            </p>
            <div className="service-grid">
              {services.map((service) => (
                <article className="soft-card service-card" key={service.title} data-reveal>
                  <PixelIcon name={service.icon} size={64} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Everyday stack">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
                {marqueeItems.map((item) => (
                  <span className="marquee-tile" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------ Selected work */}
        <PinnedWork
          projects={projects}
          total={projectCatalog.length}
          onOpen={(project) => setModal({ type: "project", project })}
        />

        <section className="section archive-section">
          <div className="wrap">
            <ProjectIndex
              onOpen={(project) => setModal({ type: "project", project })}
            />
            <a
              className="link-arrow github-link"
              href={site.socials[0].href}
              target="_blank"
              rel="noreferrer"
            >
              More experiments and commits on GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* -------------------------------------------------------- About */}
        <section id="about" className="section about">
          <div className="wrap">
            <Scramble as="p" className="pixel-giant" text="Jonah Mark" duration={1200} />
            <div className="title title-center" data-reveal>
              <h2 className="display">A systems mind. A storyteller’s eye.</h2>
              <p className="kicker">Nero is my digital identity</p>
            </div>
            <div className="about-grid">
              <div className="principles">
                {principles.map(([title, text]) => (
                  <div className="principle" key={title} data-reveal>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
                <a className="button button-black" href="#contact" data-reveal>
                  Let’s make something meaningful <ArrowUpRight size={16} />
                </a>
              </div>
              <figure className="portrait" data-reveal>
                <PortraitReveal
                  src={site.photo}
                  alt="Jonah Mark Tabuzo, the developer behind Nero"
                />
                <figcaption>
                  <span>Catanduanes, PH</span>
                  <span>13°35′ N — 124°14′ E</span>
                </figcaption>
              </figure>
            </div>
            <p className="about-body" data-reveal>
              {about.paragraphs[0]}
            </p>
            <div className="facts">
              {[
                [String(projectCatalog.length), "Projects & experiments"],
                ["02+", "Years building & learning"],
                ["462", "Hours of full-stack OJT"],
                ["BSIS", "CatSU, class of 2026"],
              ].map(([value, label]) => (
                <div className="fact" key={label} data-reveal>
                  <Scramble as="strong" text={value} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CardFan />

        <section className="section manifesto">
          <div className="wrap">
            {["Your idea.", "Your system.", "Built with care."].map((line, index) => (
              <Scramble
                key={line}
                as="p"
                className={index === 2 ? "manifesto-line is-red" : "manifesto-line"}
                text={line}
                duration={700 + index * 250}
              />
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- Skills */}
        <section id="skills" className="section skills">
          <div className="wrap">
            <Title pixel="//toolkit">Different tools, one approach</Title>
            <div className="skill-grid">
              {skillCategories.map((category, index) => (
                <article className="soft-card skill-card" key={category.title} data-reveal>
                  <div className="skill-card-head">
                    <span className="index">0{index + 1}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <p>{category.caption}</p>
                  <ul className="chips">
                    {category.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- Experience */}
        <section id="experience" className="section experience">
          <div className="wrap">
            <div className="split-head">
              <Title pixel="//experience">The work behind the work</Title>
              <button className="button button-outline" onClick={openCv} aria-haspopup="dialog">
                Get the full résumé <Download size={16} />
              </button>
            </div>
            <div className="rows">
              {experience.map((item) => (
                <details key={item.title} className="row" data-reveal>
                  <summary>
                    <span className="row-period">{item.period}</span>
                    <span className="row-main">
                      <h3>
                        {item.title
                          .replace("Freelance — ", "")
                          .replace(" — On-the-Job Training", "")}
                      </h3>
                      <span>{item.company}</span>
                    </span>
                    <Plus className="expand-plus" size={20} />
                    <Minus className="expand-minus" size={20} />
                  </summary>
                  <p className="row-detail">{item.description}</p>
                </details>
              ))}
              <div id="education" className="row row-static" data-reveal>
                <span className="row-period">The foundation</span>
                <span className="row-main">
                  <h3>{education.degree}</h3>
                  <span>
                    {education.school} / {education.period}
                  </span>
                </span>
                <PixelIcon name="note" size={28} />
              </div>
            </div>
            <button
              className="link-arrow certificate-toggle"
              aria-expanded={showCerts}
              aria-controls="certificates"
              onClick={() => setShowCerts(!showCerts)}
            >
              {showCerts ? "Hide" : "View"} certifications & training (
              {certifications.length})
              {showCerts ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            {showCerts && (
              <div className="certificates" id="certificates">
                {certifications.map((cert) => (
                  <div className="certificate" key={cert.title}>
                    <span className="row-period">{cert.year}</span>
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
                            item: { type: "photo", src: cert.image, alt: cert.title },
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
          </div>
        </section>

        {/* ----------------------------------------------------- Creative */}
        <section id="creative" className="section creative">
          <div className="wrap">
            <div className="split-head">
              <Title pixel="//off the clock">Life through another lens</Title>
              <p className="lede" data-reveal>
                Photography, motion, and moments worth paying attention to.
              </p>
            </div>
            <div className="photo-grid">
              {photos.slice(0, morePhotos ? undefined : 4).map((item, index) => (
                <button
                  key={item.src}
                  className="photo-tile"
                  onClick={() => setModal({ type: "media", item, items: photos, index })}
                  aria-label={`View photograph ${index + 1}`}
                  data-reveal
                >
                  <img src={item.src} alt={item.alt} loading="lazy" width="800" height="1000" />
                  <span>Frame {String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <button
              className="link-arrow"
              onClick={() => setMorePhotos(!morePhotos)}
              aria-expanded={morePhotos}
            >
              {morePhotos ? "Fewer frames" : `All ${photos.length} frames`}
              {morePhotos ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <div className="video-grid">
              {videos.map((item, index) => (
                <button
                  key={item.src}
                  className="video-tile"
                  onClick={() => setModal({ type: "media", item })}
                  aria-label={`Play ${item.alt}`}
                  data-reveal
                >
                  <img src={item.poster} alt="" loading="lazy" width="640" height="360" />
                  <span className="play" aria-hidden="true">▶</span>
                  <span className="video-label">Motion study {String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- Notes */}
        <section id="blog" className="section notes">
          <div className="wrap">
            <div className="split-head">
              <Title pixel="//field notes">A few things on my mind</Title>
            </div>
            <div className={`note-grid count-${Math.min(3, posts.length)}`}>
              {posts.map((post, index) => (
                <button
                  key={post.slug}
                  className="note-card"
                  onClick={() => setModal({ type: "post", post })}
                  data-reveal
                >
                  <span className="note-thumb">
                    <NeroMark size={28} />
                    <Scramble as="span" className="note-thumb-title" text={`Field note ${String(index + 1).padStart(2, "0")}`} />
                    <span className="note-thumb-meta">{post.readingTime}</span>
                  </span>
                  <span className="note-date">
                    {new Date(post.date + "T00:00:00").toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h3>{post.title}</h3>
                  <span className="note-more">
                    Read more <ArrowUpRight size={15} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Connect */}
        <section className="section connect">
          <div className="wrap">
            <Title pixel="//join me" align="center">
              Find Nero online
            </Title>
            <div className="pills" data-reveal>
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  className="pill"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label} <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Contact */}
        <section id="contact" className="section contact">
          <div className="wrap">
            <div className="contact-panel">
              <div className="contact-head">
                <p className="availability">
                  <i aria-hidden="true" /> Open to opportunities
                </p>
                <h2 className="display">
                  Have something
                  <br />
                  <Scramble className="pixel-inline" text="//in mind?" />
                </h2>
              </div>
              <div className="contact-grid">
                <div className="contact-details">
                  <p>
                    A project, a role, or a creative collaboration. I’d love to
                    hear what you’re thinking.
                  </p>
                  <a className="contact-email" href={`mailto:${site.email}`}>
                    {site.email} <ArrowUpRight size={22} />
                  </a>
                  <a className="contact-phone" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    {site.phone}
                  </a>
                  <button className="button button-white" onClick={openCv} aria-haspopup="dialog">
                    Download my résumé <Download size={16} />
                  </button>
                </div>
                <ContactForm />
              </div>
            </div>
            <div className="faq">
              <p className="kicker">Before we begin</p>
              <div>
                {faqs.map(([question, answer]) => (
                  <details key={question} data-reveal>
                    <summary>
                      {question}
                      <Plus className="expand-plus" size={18} />
                      <Minus className="expand-minus" size={18} />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="brand" href="#hero" aria-label="Nero home">
                <NeroMark size={34} />
                <span>Nero</span>
              </a>
              <p>Thoughtfully built in Catanduanes, Philippines. Always evolving.</p>
            </div>
            <div className="footer-col">
              <p>Navigate</p>
              {navigation.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <p>Elsewhere</p>
              {site.socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <p>Contact</p>
              <a href={`mailto:${site.email}`}>Email</a>
              <button onClick={openCv}>Résumé</button>
              <button onClick={() => setModal({ type: "console" })}>Console</button>
            </div>
          </div>
          <Scramble as="p" className="footer-giant" text="NERO" duration={1000} />
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Nero — Jonah Mark Tabuzo</span>
            <a href="#hero">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </footer>

      {modal && (
        <Modal
          title={
            modal.type === "console"
              ? "Nero System Console"
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
                  const target = document.getElementById(id);
                  if (window.__lenis && target) window.__lenis.scrollTo(target);
                  else window.location.hash = id;
                });
              }}
            />
          )}
          {modal.type === "cv" && <CvDownload />}
          {modal.type === "project" && <ProjectDetail project={modal.project} />}
          {modal.type === "media" && (
            <MediaDetail item={modal.item} items={modal.items} start={modal.index} />
          )}
          {modal.type === "post" && (
            <article className="post-body">
              <span className="eyebrow">
                Nero field notes /{" "}
                {new Date(modal.post.date + "T00:00:00").toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
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

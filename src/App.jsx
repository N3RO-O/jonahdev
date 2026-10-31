import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Download, Menu, Minus, Play, Plus, X } from "lucide-react";
import { site, about, experience, education, certifications, creative } from "./data/siteData";
import { projectCatalog, featuredProducts, projectById } from "./data/projectCatalog";
import { posts } from "./data/blog";
import { Modal, MediaDetail, ContactForm, CvDownload } from "./components/EditorialTools";
import ProductReel from "./components/ProductReel";
import ProjectIndex from "./components/ProjectIndex";
import CaseStudy from "./components/CaseStudy";
import Toolkit from "./components/Toolkit";
import NeroMark from "./components/nero/NeroMark";
import PortraitReveal from "./components/nero/PortraitReveal";
import DotSphere from "./components/fx/DotSphere";
import RidgeLines from "./components/fx/RidgeLines";
import KineticTitle from "./components/fx/KineticTitle";
import Wordmark from "./components/fx/Wordmark";
import RollText from "./components/fx/RollText";
import Cursor from "./components/fx/Cursor";
import useLenis from "./hooks/useLenis";
import useRoute from "./hooks/useRoute";
import useReveal from "./hooks/useReveal";

// Numbered primary navigation; the Nero mark sits between the halves.
const navigation = [
  ["products", "Products"],
  ["projects", "Projects"],
  ["about", "About"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

const principles = [
  ["Requirements first", "I gather needs from the people who will use the system before writing a line of code."],
  ["Interfaces for everyone", "Clear, readable screens that non-technical staff can use on their first day."],
  ["Shipped, not shelved", "Two live management systems at PHILRADS — deployed, documented and in use."],
  ["A storyteller’s eye", "The same sense of composition that frames a photograph shapes every layout."],
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

const marquee = ["Design", "Build", "Ship", "Document", "Iterate"];
const pad = (value) => String(value).padStart(2, "0");
const defaultTitle = document.title;
const defaultDescription = document.querySelector('meta[name="description"]')?.content || "";

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

/* Section head: a bracketed index label, a condensed display title and a meta note. */
function Heading({ id, label, children, meta }) {
  return (
    <div className="section-head">
      <p className="label">{label}</p>
      <div className="section-head-row">
        <h2 id={id} className="display">
          {children}
        </h2>
        {meta && <p className="label section-meta">{meta}</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [modal, setModal] = useState(null);
  const [allPhotos, setAllPhotos] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const menuRef = useRef(null);
  const clock = useManilaClock();
  const lenis = useLenis();
  const { projectId, openProject, switchProject, closeProject } = useRoute();
  const project = projectId ? projectById(projectId) : null;
  useReveal([allPhotos, showCerts]);

  // Case studies page through featured products first, then the archive.
  const order = useMemo(() => [...featuredProducts, ...projectCatalog.filter((item) => !item.featured)], []);
  const position = project ? order.indexOf(project) : -1;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      setShowTop(window.scrollY > window.innerHeight * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Active section in the nav.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Pause smooth scrolling while any overlay is open.
  useEffect(() => {
    if (!lenis.current) return;
    if (modal || menuOpen || project) lenis.current.stop();
    else lenis.current.start();
  }, [modal, menuOpen, project, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector("a")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Page title and description follow the open case study.
  useEffect(() => {
    const description = document.querySelector('meta[name="description"]');
    if (project) {
      document.title = `${project.title} — Nero / Jonah Mark Tabuzo`;
      description?.setAttribute("content", project.summary || project.description);
    } else {
      document.title = defaultTitle;
      description?.setAttribute("content", defaultDescription);
    }
  }, [project]);

  // An unknown /work/ address falls back to the homepage.
  useEffect(() => {
    if (projectId && !project) closeProject();
  }, [projectId, project, closeProject]);

  const photos = creative.items.filter((item) => item.type === "photo");
  const shownPhotos = allPhotos ? photos : photos.filter((item) => item.featured);
  const videos = creative.items.filter((item) => item.type === "video");
  const openCv = () => setModal({ type: "cv" });
  const closeMenu = () => setMenuOpen(false);
  const navLink = ([id, label], index) => (
    <a
      key={id}
      href={`#${id}`}
      className={active === id ? "active" : undefined}
      aria-current={active === id ? "location" : undefined}
      onClick={closeMenu}
    >
      <span className="nav-index" aria-hidden="true">
        {pad(index + 1)}
      </span>
      <RollText>{label}</RollText>
    </a>
  );

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <div className="frame" aria-hidden="true" />

      <header className={scrolled || menuOpen ? "site-header is-scrolled" : "site-header"}>
        <div className="header-inner">
          <a className="brand-text" href="#top" aria-label="Nero, back to top">
            Jonah<span>.</span>Tabuzo
          </a>
          <nav
            ref={menuRef}
            className={menuOpen ? "navigation is-open" : "navigation"}
            id="primary-navigation"
            aria-label="Primary"
          >
            {navigation.slice(0, 2).map(navLink)}
            <a className="nav-mark" href="#top" aria-label="Back to top" onClick={closeMenu}>
              <NeroMark size={26} radius={10} />
            </a>
            {navigation.slice(2).map((item, i) => navLink(item, i + 2))}
          </nav>
          <div className="header-actions">
            <span className="header-time label">
              PH <time>{clock}</time>
            </span>
            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <DotSphere />
          <a className="hero-ticker" href="#contact">
            <NeroMark size={16} radius={12} />
            <span>Available for new projects — Nero</span>
            <span className="hero-ticker-cta">
              Write <ArrowRight size={13} aria-hidden="true" />
            </span>
          </a>
          <dl className="hero-info">
            <div>
              <dt>Nero</dt>
              <dd>Jonah Mark Tabuzo</dd>
            </div>
            <div>
              <dt>Catanduanes</dt>
              <dd>Philippines</dd>
            </div>
            <div>
              <dt>Product builder</dt>
              <dd>Full-stack · Systems · Desktop</dd>
            </div>
            <div className="hero-info-time">
              <dt>Local time</dt>
              <dd>
                <time>{clock}</time> UTC+8
              </dd>
            </div>
          </dl>
          <div className="hero-main">
            <div className="hero-copy">
              <p className="label hero-kicker">
                <i className="dot-live" aria-hidden="true" /> [ 00 ] · Available for work
              </p>
              <KineticTitle
                id="hero-title"
                lines={[
                  { text: "Building digital products." },
                  { text: "Turning ideas into", outline: true },
                  { text: "working systems." },
                ]}
              />
            </div>
            <div className="hero-card">
              <p>
                Independent product builder and full-stack developer creating practical software, digital
                systems, and interactive experiences.
              </p>
              <div className="hero-actions">
                <a className="button button-ghost" href="#products">
                  Explore products <ArrowDown size={14} aria-hidden="true" />
                </a>
                <a className="button button-light" href="#contact">
                  Get in touch <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <Wordmark className="hero-wordmark" />
          <div className="hero-bottom label">
            <span>Product builder & full-stack developer — 2026</span>
            <span className="hero-scroll">
              Scroll <i aria-hidden="true" />
            </span>
          </div>
        </section>

        <div className="band" aria-hidden="true">
          <div className="band-track">
            {[0, 1].map((copy) => (
              <div className="band-group" key={copy}>
                {[...marquee, ...marquee].map((word, i) => (
                  <span key={i}>
                    {word} <b>✳</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="band-statement wrap label">Practical software for real-world work.</p>

        {/* ------------------------------------------------------ Products */}
        <ProductReel
          products={featuredProducts}
          totalProjects={projectCatalog.length}
          onOpen={openProject}
          head={
            <Heading id="products-title" label="[ 01 / 05 ] · Products" meta={`${pad(featuredProducts.length)} products`}>
              Selected products
            </Heading>
          }
        />

        {/* ------------------------------------------------------ Archive */}
        <section id="projects" className="section archive" aria-labelledby="projects-title">
          <div className="wrap">
            <Heading id="projects-title" label="[ 02 / 05 ] · Archive" meta={`${projectCatalog.length} entries`}>
              All projects
            </Heading>
            <ProjectIndex onOpen={openProject} />
            <a className="text-link" href={site.socials[0].href} target="_blank" rel="noreferrer">
              More experiments on GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* -------------------------------------------------------- About */}
        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="wrap">
            <Heading id="about-title" label="[ 03 / 05 ] · About">
              From ideas to working systems
            </Heading>
            <div className="about-grid">
              <div className="about-text">
                <p className="about-lede" data-reveal>
                  I’m Jonah Mark Tabuzo, also known as Nero. I build practical software, design digital
                  experiences, and turn real-world requirements into working systems.
                </p>
                <div className="principles" data-reveal>
                  {principles.map(([title, text], index) => (
                    <details key={title}>
                      <summary>
                        <span className="label">#{pad(index + 1)}</span>
                        {title}
                        <Plus className="expand-plus" size={16} aria-hidden="true" />
                        <Minus className="expand-minus" size={16} aria-hidden="true" />
                      </summary>
                      <p>{text}</p>
                    </details>
                  ))}
                  <details>
                    <summary>
                      <span className="label">#05</span>
                      More about me
                      <Plus className="expand-plus" size={16} aria-hidden="true" />
                      <Minus className="expand-minus" size={16} aria-hidden="true" />
                    </summary>
                    {about.paragraphs.slice(0, 2).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </details>
                </div>
              </div>
              <aside className="profile box" data-reveal aria-label="Profile">
                <figure className="portrait">
                  <PortraitReveal src={site.photo} alt="Jonah Mark Tabuzo, the developer behind Nero" />
                </figure>
                <p className="label">Profile</p>
                <dl>
                  <div>
                    <dt>Based in</dt>
                    <dd>Catanduanes, PH</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>Product builder</dd>
                  </div>
                  <div>
                    <dt>QA</dt>
                    <dd>PIXODE Philippines</dd>
                  </div>
                  <div>
                    <dt>Degree</dt>
                    <dd>BSIS · CatSU 2026</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>Web · Desktop · Systems</dd>
                  </div>
                </dl>
                <button type="button" className="button button-light button-row" onClick={openCv} aria-haspopup="dialog">
                  Download résumé <Download size={14} aria-hidden="true" />
                </button>
                <a className="button button-ghost button-row" href={`mailto:${site.email}`}>
                  Email me <ArrowRight size={14} aria-hidden="true" />
                </a>
              </aside>
            </div>
            <dl className="numbers">
              {[
                [String(projectCatalog.length), "Projects and experiments in the archive"],
                ["3+", "Years building systems"],
                ["462", "Hours of full-stack OJT at PHILRADS"],
                ["2026", "BS Information Systems graduate"],
              ].map(([value, label]) => (
                <div key={label} data-reveal>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------- Experience */}
        <section id="experience" className="section experience" aria-labelledby="experience-title">
          <div className="wrap">
            <Heading id="experience-title" label="[ 04 / 05 ] · Experience" meta="Roles · Training · Education">
              Professional experience
            </Heading>
            <ol className="timeline">
              {experience.map((item, index) => (
                <li key={item.title} className="timeline-item" data-reveal>
                  <div className="timeline-meta">
                    <p className="label">
                      #{index + 1} · {item.period}
                    </p>
                    <h3>{item.title}</h3>
                    <p className="label timeline-company">
                      {item.company} <span>{item.type}</span>
                    </p>
                  </div>
                  <div className="timeline-body">
                    <p>{item.summary}</p>
                    {item.highlight && <p className="timeline-highlight label">{item.highlight}</p>}
                    <details>
                      <summary className="label">
                        Read more
                        <Plus className="expand-plus" size={14} aria-hidden="true" />
                        <Minus className="expand-minus" size={14} aria-hidden="true" />
                      </summary>
                      <ul className="timeline-details">
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                      {item.projects && (
                        <ul className="tags">
                          {item.projects.map((id) => (
                            <li key={id}>
                              <a
                                href={`/work/${id}`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  openProject(id);
                                }}
                              >
                                {projectById(id).title} <ArrowUpRight size={12} aria-hidden="true" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </details>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="label subhead" id="education">
              Education
            </h3>
            <div className="cells cells-2">
              <article className="cell" data-reveal>
                <p className="label">{education.period}</p>
                <h4>{education.degree}</h4>
                <p>{education.school}</p>
                <p className="muted">Capstone lead programmer · KiddyTrack</p>
              </article>
              <article className="cell" data-reveal>
                <p className="label">{education.secondary.period}</p>
                <h4>{education.secondary.degree}</h4>
                <p>{education.secondary.school}</p>
                <p className="muted">{education.secondary.note}</p>
              </article>
            </div>

            <div className="experience-actions">
              <button type="button" className="button button-light" onClick={openCv} aria-haspopup="dialog">
                Download résumé <Download size={14} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="button button-ghost"
                aria-expanded={showCerts}
                aria-controls="certificates"
                onClick={() => setShowCerts(!showCerts)}
              >
                Certifications and training ({certifications.length})
                {showCerts ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
              </button>
            </div>
            <ul className="certificates" id="certificates" hidden={!showCerts}>
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <span className="label">{cert.year}</span>
                  <span className="cert-main">
                    <strong>{cert.title}</strong>
                    <span>{cert.issuer}</span>
                  </span>
                  {cert.image && (
                    <button
                      type="button"
                      className="text-link label"
                      onClick={() => setModal({ type: "media", item: { type: "photo", src: cert.image, alt: cert.title } })}
                      aria-label={`View certificate: ${cert.title}`}
                    >
                      View
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ Toolkit */}
        <section id="toolkit" className="section toolkit-section" aria-labelledby="toolkit-title">
          <div className="wrap">
            <Heading id="toolkit-title" label="[ Stack ] · Toolkit" meta="Counts come from project stacks">
              Skills
            </Heading>
            <Toolkit />
          </div>
        </section>

        {/* ----------------------------------------------------- Creative */}
        <section id="creative" className="section creative" aria-labelledby="creative-title">
          <div className="wrap">
            <Heading id="creative-title" label="[ Lens ] · Off the clock" meta={`${photos.length} frames · ${videos.length} films`}>
              Visual storytelling
            </Heading>
            <p className="creative-intro" data-reveal>
              {creative.intro}
            </p>
            <div className={allPhotos ? "photo-grid is-all" : "photo-grid"}>
              {shownPhotos.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className="photo-tile"
                  data-cursor="Open"
                  onClick={() => setModal({ type: "media", item, items: photos, index: photos.indexOf(item) })}
                  aria-label={`View photograph: ${item.alt}`}
                >
                  <img src={item.thumb} alt={item.alt} loading="lazy" decoding="async" width="1200" height="800" />
                </button>
              ))}
            </div>
            <button type="button" className="text-link label" onClick={() => setAllPhotos(!allPhotos)} aria-expanded={allPhotos}>
              {allPhotos ? "Show fewer photographs" : `Show all ${photos.length} photographs`}
              {allPhotos ? <Minus size={14} aria-hidden="true" /> : <Plus size={14} aria-hidden="true" />}
            </button>
            <h3 className="label subhead">Video</h3>
            <ul className="video-grid">
              {videos.map((item, index) => (
                <li key={item.src}>
                  <button
                    type="button"
                    className="video-tile"
                    data-cursor="Play"
                    onClick={() => setModal({ type: "media", item })}
                    aria-label={`Play video: ${item.alt}`}
                  >
                    <img src={item.poster} alt="" loading="lazy" decoding="async" width="1200" height="675" />
                    <span className="play" aria-hidden="true">
                      <Play size={16} />
                    </span>
                  </button>
                  <p className="label">
                    {pad(index + 1)} · {item.alt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ Contact */}
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="wrap">
            <Heading id="contact-title" label="[ 05 / 05 ] · Contact" meta="Replies from UTC+8">
              Have a project in mind?
            </Heading>
            <div className="contact-grid">
              <div className="contact-details" data-reveal>
                <p>A project, a role or an idea. Send a message here or email me directly.</p>
                <a className="contact-email" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <a className="contact-phone label" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
                <button type="button" className="button button-ghost" onClick={openCv} aria-haspopup="dialog">
                  Download résumé <Download size={14} aria-hidden="true" />
                </button>
                <ul className="socials">
                  {site.socials.map((social) => (
                    <li key={social.label}>
                      <a className="label" href={social.href} target="_blank" rel="noreferrer">
                        {social.label} <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <ContactForm />
            </div>
            <div className="contact-more">
              <div className="faq">
                <h3 className="label subhead">Before we begin</h3>
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <Plus className="expand-plus" size={16} aria-hidden="true" />
                      <Minus className="expand-minus" size={16} aria-hidden="true" />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
              <div className="notes">
                <h3 className="label subhead">Field notes</h3>
                <ul>
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <button type="button" onClick={() => setModal({ type: "post", post })}>
                        <strong>{post.title}</strong>
                        <span className="label">
                          {new Date(post.date + "T00:00:00").toLocaleDateString("en", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          · {post.readingTime}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-art">
          <RidgeLines />
          <p className="footer-giant" aria-hidden="true">
            Jonah Tabuzo
          </p>
        </div>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="nav-mark" href="#top" aria-label="Nero, back to top">
                <NeroMark size={30} radius={10} />
              </a>
              <p className="label">Product builder & full-stack developer — Catanduanes, Philippines</p>
              <p>Practical software, digital systems and interactive experiences, built from real requirements.</p>
            </div>
            <div className="footer-col">
              <p className="label">01</p>
              <h3>Products</h3>
              {featuredProducts.slice(0, 5).map((item) => (
                <a
                  key={item.id}
                  className="label"
                  href={`/work/${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    openProject(item.id);
                  }}
                >
                  {item.title}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <p className="label">02</p>
              <h3>Social</h3>
              {site.socials.slice(0, 4).map((social) => (
                <a key={social.label} className="label" href={social.href} target="_blank" rel="noreferrer">
                  {social.label} ↗
                </a>
              ))}
            </div>
            <div className="footer-col">
              <p className="label">03</p>
              <h3>Contact</h3>
              <a className="label" href={`mailto:${site.email}`}>
                Email
              </a>
              <button type="button" className="label" onClick={openCv}>
                Résumé
              </button>
              <a className="label" href="#toolkit">
                Skills
              </a>
              <a className="label" href="#creative">
                Visual storytelling
              </a>
            </div>
            <div className="footer-col">
              <p className="label">04</p>
              <h3>Catanduanes</h3>
              <p className="label">Philippines</p>
              <p className="label">13.58°N · 124.23°E</p>
            </div>
          </div>
          <div className="footer-bottom label">
            <span>© {new Date().getFullYear()} Nero — Jonah Mark Tabuzo. All rights reserved.</span>
            <span>Design & code — Nero · Big Shoulders Display, Geist · React</span>
            <a href="#top">
              Back to top <ArrowUp size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      <a
        className={showTop && !project && !modal ? "to-top is-visible" : "to-top"}
        href="#top"
        aria-label="Back to top"
        aria-hidden={!showTop || undefined}
        tabIndex={showTop ? undefined : -1}
      >
        <ArrowUp size={16} aria-hidden="true" />
      </a>

      {project && (
        <CaseStudy
          project={project}
          previous={position > 0 ? order[position - 1] : null}
          next={position < order.length - 1 ? order[position + 1] : null}
          onClose={closeProject}
          onSwitch={switchProject}
        />
      )}

      {modal && (
        <Modal
          title={modal.type === "cv" ? "Download résumé" : modal.type === "post" ? modal.post.title : modal.item.alt}
          kind={modal.type}
          onClose={() => setModal(null)}
        >
          {modal.type === "cv" && <CvDownload />}
          {modal.type === "media" && <MediaDetail item={modal.item} items={modal.items} start={modal.index} />}
          {modal.type === "post" && (
            <article className="post-body">
              <p className="post-meta label">
                {new Date(modal.post.date + "T00:00:00").toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {modal.post.readingTime}
              </p>
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

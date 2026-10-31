import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  Minus,
  Play,
  Plus,
  X,
} from "lucide-react";
import { site, about, experience, education, certifications, creative } from "./data/siteData";
import { projectCatalog, featuredProducts, projectById } from "./data/projectCatalog";
import { posts } from "./data/blog";
import { Modal, MediaDetail, ContactForm, CvDownload } from "./components/EditorialTools";
import ProductGrid from "./components/ProductGrid";
import ProjectIndex from "./components/ProjectIndex";
import CaseStudy from "./components/CaseStudy";
import Toolkit from "./components/Toolkit";
import NeroMark from "./components/nero/NeroMark";
import Scramble from "./components/nero/Scramble";
import PortraitReveal from "./components/nero/PortraitReveal";
import useLenis from "./hooks/useLenis";
import useRoute from "./hooks/useRoute";

const navigation = [
  ["products", "Products"],
  ["projects", "Projects"],
  ["about", "About"],
  ["experience", "Experience"],
  ["contact", "Contact"],
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

/* Section heading: the title and, where it helps, a pixel-type count. */
function Heading({ id, children, count, aside }) {
  return (
    <div className="section-head">
      <h2 id={id}>
        {children}
        {count != null && <span className="count">{pad(count)}</span>}
      </h2>
      {aside && <p>{aside}</p>}
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
  const [showFab, setShowFab] = useState(false);
  const menuRef = useRef(null);
  const clock = useManilaClock();
  const lenis = useLenis();
  const { projectId, openProject, switchProject, closeProject } = useRoute();
  const project = projectId ? projectById(projectId) : null;

  // Case studies page through featured products first, then the archive.
  const order = useMemo(
    () => [...featuredProducts, ...projectCatalog.filter((item) => !item.featured)],
    [],
  );
  const position = project ? order.indexOf(project) : -1;

  // Header state and the floating contact button.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const contact = document.getElementById("contact");
      const nearContact = contact && contact.getBoundingClientRect().top < window.innerHeight;
      setShowFab(window.scrollY > window.innerHeight * 0.9 && !nearContact);
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
      { rootMargin: "-35% 0px -60% 0px" },
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
  const featuredPhotos = photos.filter((item) => item.featured);
  const shownPhotos = allPhotos ? photos : featuredPhotos;
  const videos = creative.items.filter((item) => item.type === "video");
  const openCv = () => setModal({ type: "cv" });
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={scrolled || menuOpen ? "site-header is-scrolled" : "site-header"}>
        <div className="wrap header-inner">
          <a className="brand" href="#top" aria-label="Nero, back to top">
            <NeroMark size={30} />
            <span>Nero</span>
          </a>
          <nav
            ref={menuRef}
            className={menuOpen ? "navigation is-open" : "navigation"}
            id="primary-navigation"
            aria-label="Primary"
          >
            {navigation.map(([id, label]) => (
              <a
                key={id}
                className={active === id ? "active" : undefined}
                aria-current={active === id ? "location" : undefined}
                href={`#${id}`}
                onClick={closeMenu}
              >
                {label}
                {id === "products" && <span className="nav-count">{pad(featuredProducts.length)}</span>}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="button button-light header-cta" href="#contact">
              Let’s talk
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* ---------------------------------------------------------- Hero */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="wrap">
            <p className="hero-name">Jonah Mark Tabuzo, also known as Nero</p>
            <h1 id="hero-title">
              <span>Building digital products.</span>
              <span>Turning ideas into working systems.</span>
            </h1>
            <div className="hero-foot">
              <p className="hero-intro">
                Independent product builder and full-stack developer creating practical software, digital
                systems, and interactive experiences.
              </p>
              <div className="hero-side">
                <a className="button button-red" href="#products">
                  Explore products <ArrowDown size={16} aria-hidden="true" />
                </a>
                <ul className="hero-status">
                  <li>
                    <i className="dot-live" aria-hidden="true" /> Available for work
                  </li>
                  <li>
                    Philippines <time>{clock}</time> UTC+8
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Products */}
        <section id="products" className="section products" aria-labelledby="products-title">
          <div className="wrap">
            <Heading
              id="products-title"
              count={featuredProducts.length}
              aside="Applications and systems I designed and built. Open one for screenshots, features and the technical story."
            >
              Products
            </Heading>
            <ProductGrid products={featuredProducts} onOpen={openProject} />
          </div>
        </section>

        {/* ------------------------------------------------------ Archive */}
        <section id="projects" className="section archive" aria-labelledby="projects-title">
          <div className="wrap">
            <Heading
              id="projects-title"
              count={projectCatalog.length}
              aside="Every project and experiment, including internal tools, bots, prototypes and earlier editions."
            >
              All projects
            </Heading>
            <ProjectIndex onOpen={openProject} />
            <a className="text-link" href={site.socials[0].href} target="_blank" rel="noreferrer">
              More experiments on GitHub <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* -------------------------------------------------------- About */}
        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <div className="about-text">
              <Heading id="about-title">About</Heading>
              <p className="about-lede">
                I’m Jonah Mark Tabuzo, also known as Nero. I build practical software, design digital
                experiences, and turn real-world requirements into working systems.
              </p>
              <div className="principles">
                {principles.map(([title, text]) => (
                  <details key={title}>
                    <summary>
                      {title}
                      <Plus className="expand-plus" size={16} aria-hidden="true" />
                      <Minus className="expand-minus" size={16} aria-hidden="true" />
                    </summary>
                    <p>{text}</p>
                  </details>
                ))}
                <details>
                  <summary>
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
            <figure className="portrait">
              <PortraitReveal src={site.photo} alt="Jonah Mark Tabuzo, the developer behind Nero" />
              <figcaption>Catanduanes, Philippines</figcaption>
            </figure>
            <dl className="facts">
              {[
                [String(projectCatalog.length), "projects and experiments"],
                ["3+", "years building systems"],
                ["462", "hours of full-stack OJT"],
                ["2026", "BS Information Systems graduate"],
              ].map(([value, label]) => (
                <div key={label}>
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
            <Heading id="experience-title" aside="Roles, training and education. Open a row for the details.">
              Experience
            </Heading>
            <ol className="timeline">
              {experience.map((item) => (
                <li key={item.title}>
                  <details className="timeline-item">
                    <summary>
                      <span className="timeline-period">{item.period}</span>
                      <span className="timeline-main">
                        <h3>{item.title}</h3>
                        <span>
                          {item.company} <em>{item.type}</em>
                        </span>
                      </span>
                      {item.highlight && <span className="timeline-highlight">{item.highlight}</span>}
                      <Plus className="expand-plus" size={18} aria-hidden="true" />
                      <Minus className="expand-minus" size={18} aria-hidden="true" />
                    </summary>
                    <div className="timeline-detail">
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                      {item.projects && (
                        <p className="timeline-links">
                          Systems contributed to:
                          {item.projects.map((id) => (
                            <a
                              key={id}
                              href={`/work/${id}`}
                              onClick={(event) => {
                                event.preventDefault();
                                openProject(id);
                              }}
                            >
                              {projectById(id).title} <ArrowUpRight size={14} aria-hidden="true" />
                            </a>
                          ))}
                        </p>
                      )}
                    </div>
                  </details>
                </li>
              ))}
              <li>
                <div className="timeline-item timeline-static" id="education">
                  <span className="timeline-period">{education.period}</span>
                  <span className="timeline-main">
                    <h3>{education.degree}</h3>
                    <span>
                      {education.school} <em>Education</em>
                    </span>
                  </span>
                </div>
              </li>
            </ol>
            <div className="experience-actions">
              <button type="button" className="button button-light" onClick={openCv} aria-haspopup="dialog">
                Download résumé <Download size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="button button-ghost"
                aria-expanded={showCerts}
                aria-controls="certificates"
                onClick={() => setShowCerts(!showCerts)}
              >
                Certifications and training ({certifications.length})
                {showCerts ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
              </button>
            </div>
            <ul className="certificates" id="certificates" hidden={!showCerts}>
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <span className="cert-year">{cert.year}</span>
                  <span className="cert-main">
                    <strong>{cert.title}</strong>
                    <span>{cert.issuer}</span>
                  </span>
                  {cert.image && (
                    <button
                      type="button"
                      className="text-link"
                      onClick={() =>
                        setModal({ type: "media", item: { type: "photo", src: cert.image, alt: cert.title } })
                      }
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
            <Heading id="toolkit-title" aside="What I use most, with the projects that use it. Open a category for the rest.">
              Toolkit
            </Heading>
            <Toolkit />
          </div>
        </section>

        {/* ----------------------------------------------------- Creative */}
        <section id="creative" className="section creative" aria-labelledby="creative-title">
          <div className="wrap">
            <Heading id="creative-title" aside={creative.intro}>
              Visual storytelling
            </Heading>
            <div className={allPhotos ? "photo-grid is-all" : "photo-grid"}>
              {shownPhotos.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className="photo-tile"
                  onClick={() =>
                    setModal({ type: "media", item, items: photos, index: photos.indexOf(item) })
                  }
                  aria-label={`View photograph: ${item.alt}`}
                >
                  <img src={item.thumb} alt={item.alt} loading="lazy" decoding="async" width="1200" height="800" />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="text-link"
              onClick={() => setAllPhotos(!allPhotos)}
              aria-expanded={allPhotos}
            >
              {allPhotos ? "Show fewer photographs" : `Show all ${photos.length} photographs`}
              {allPhotos ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
            </button>
            <h3 className="subhead">Video</h3>
            <ul className="video-grid">
              {videos.map((item) => (
                <li key={item.src}>
                  <button
                    type="button"
                    className="video-tile"
                    onClick={() => setModal({ type: "media", item })}
                    aria-label={`Play video: ${item.alt}`}
                  >
                    <img src={item.poster} alt="" loading="lazy" decoding="async" width="1200" height="675" />
                    <span className="play" aria-hidden="true">
                      <Play size={18} />
                    </span>
                  </button>
                  <p>{item.alt}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------ Contact */}
        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="contact-grid">
              <div className="contact-details">
                <h2 id="contact-title">Have a project, a role or an idea?</h2>
                <p>Send a message here or email me directly. I reply from the Philippines, UTC+8.</p>
                <a className="contact-email" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <a className="contact-phone" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
                <button type="button" className="button button-ghost" onClick={openCv} aria-haspopup="dialog">
                  Download résumé <Download size={16} aria-hidden="true" />
                </button>
                <ul className="socials">
                  {site.socials.map((social) => (
                    <li key={social.label}>
                      <a href={social.href} target="_blank" rel="noreferrer">
                        {social.label} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <ContactForm />
            </div>
            <div className="contact-more">
              <div className="faq">
                <h3 className="subhead">Before we begin</h3>
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
                <h3 className="subhead">Field notes</h3>
                <ul>
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <button type="button" onClick={() => setModal({ type: "post", post })}>
                        <strong>{post.title}</strong>
                        <span>
                          {new Date(post.date + "T00:00:00").toLocaleDateString("en", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                          , {post.readingTime}
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
        <div className="wrap">
          <div className="footer-top">
            <a className="brand" href="#top" aria-label="Nero, back to top">
              <NeroMark size={30} />
              <span>Nero</span>
            </a>
            <nav className="footer-nav" aria-label="Footer">
              {navigation.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
              <a href="#toolkit">Toolkit</a>
              <a href="#creative">Visual storytelling</a>
            </nav>
          </div>
          <Scramble as="p" className="footer-giant" text="NERO" duration={1000} aria-hidden="true" />
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Nero — Jonah Mark Tabuzo. Built in Catanduanes, Philippines.</span>
            <a href="#top">
              Back to top <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      <a
        className={showFab && !project && !modal ? "fab is-visible" : "fab"}
        href="#contact"
        aria-hidden={!showFab || undefined}
        tabIndex={showFab ? undefined : -1}
      >
        <Mail size={16} aria-hidden="true" /> Contact
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
          title={
            modal.type === "cv" ? "Download résumé" : modal.type === "post" ? modal.post.title : modal.item.alt
          }
          kind={modal.type}
          onClose={() => setModal(null)}
        >
          {modal.type === "cv" && <CvDownload />}
          {modal.type === "media" && <MediaDetail item={modal.item} items={modal.items} start={modal.index} />}
          {modal.type === "post" && (
            <article className="post-body">
              <p className="post-meta">
                {new Date(modal.post.date + "T00:00:00").toLocaleDateString("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                , {modal.post.readingTime}
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

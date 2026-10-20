import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import useScrollProgress from "../../hooks/useScrollProgress";
import Scramble from "./Scramble";

const shortNames = {
  philrads: "PHILRADS / Assets",
  "philrads-ims": "PHILRADS / Inventory",
};

/*
  Selected work as a horizontal reel that is pinned while you scroll down,
  mirroring the reference's sticky, scroll-driven sections. On narrow
  screens or with reduced motion it becomes a simple vertical grid.
*/
export default function PinnedWork({ projects, total, onOpen }) {
  const section = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const [travel, setTravel] = useState(0);
  const [pinned, setPinned] = useState(false);
  const progress = useScrollProgress(section);

  // Pin only on wide screens without a reduced-motion preference.
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Measure how far the reel has to travel once the pinned layout is in
  // place, and again whenever the track or viewport changes size.
  useLayoutEffect(() => {
    if (!pinned) {
      setTravel(0);
      return undefined;
    }
    const measure = () => {
      if (!track.current || !viewport.current) return;
      setTravel(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track.current);
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [pinned, projects]);

  const offset = pinned ? progress * travel : 0;

  return (
    <section
      id="projects"
      ref={section}
      className={pinned ? "pinned-work is-pinned" : "pinned-work"}
      style={pinned ? { height: `calc(100vh + ${travel}px)` } : undefined}
    >
      <div className="pinned-sticky">
        <div className="pinned-head wrap">
          <div>
            <Scramble as="p" className="pixel-kicker" text="//selected work" />
            <h2 className="display">
              Ideas into
              <br />
              real things
            </h2>
          </div>
          <div className="pinned-meta">
            <p>
              Useful systems and considered interfaces — built for real people,
              from requirements to deployment.
            </p>
            <div className="pinned-counter" aria-hidden="true">
              <span>{String(Math.min(projects.length, Math.round(progress * (projects.length - 1)) + 1)).padStart(2, "0")}</span>
              <i>
                <b style={{ transform: `scaleX(${pinned ? progress : 1})` }} />
              </i>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>
            <a className="link-arrow" href="#project-index">
              Browse all {total} projects <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="pinned-viewport" ref={viewport}>
          <div
            className="pinned-track"
            ref={track}
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          >
            {projects.map((project, index) => {
              const image = project.cover || project.galleries[0]?.images[0]?.src;
              return (
                <article className="work-card" key={project.id}>
                  <button
                    className="work-card-hit"
                    onClick={() => onOpen(project)}
                    aria-label={`Open ${project.title}`}
                  >
                    <div className="work-card-top">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="work-card-media">
                      {image ? (
                        <img
                          src={image}
                          alt=""
                          loading={index < 3 ? "eager" : "lazy"}
                          width="1200"
                          height="750"
                        />
                      ) : (
                        <div className="work-card-identity">
                          <span>PHILRADS</span>
                          <strong>Staff Portal</strong>
                          <span>People. Processes. Purpose.</span>
                        </div>
                      )}
                    </div>
                    <div className="work-card-body">
                      <h3>{shortNames[project.id] || project.title}</h3>
                      <p>{project.subtitle}</p>
                      <div className="work-card-foot">
                        <span>{project.tech.slice(0, 3).join(" / ")}</span>
                        <span className="work-card-open">
                          View <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

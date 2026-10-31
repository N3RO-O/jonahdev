import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import DitherImage from "./fx/DitherImage";
import { prefersReducedMotion } from "./fx/useCanvas";
import StageBadge from "./StageBadge";

const pad = (value) => String(value).padStart(2, "0");
const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function ProductCard({ product, index, total, onOpen }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const href = `/work/${product.id}`;
  const open = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onOpen(product.id);
  };

  // Touch screens have no hover, so the screenshot resolves once the card
  // is mostly on screen.
  useEffect(() => {
    if (canHover()) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setRevealed(true), {
      threshold: 0.45,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`reel-card reel-${product.size || "sm"}`}
      onPointerEnter={() => canHover() && setRevealed(true)}
      onPointerLeave={() => canHover() && setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setRevealed(false)}
    >
      <div className="reel-top">
        <span>
          {pad(index + 1)} / {pad(total)}
        </span>
        <span>
          {product.context} · {product.year}
        </span>
      </div>
      <a className="reel-media" href={href} onClick={open} tabIndex={-1} aria-hidden="true" data-cursor="View">
        <DitherImage
          src={product.size === "lg" ? product.cover : product.coverSmall}
          srcSet={`${product.coverSmall} 800w, ${product.cover} 1600w`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt=""
          revealed={revealed}
          eager={index < 2}
        />
        {product.coverNote && <span className="product-note">{product.coverNote}</span>}
      </a>
      <div className="reel-body">
        <div className="reel-heading">
          <StageBadge stage={product.stage} />
          <h3>
            <a className="product-link" href={href} onClick={open}>
              {product.title}
            </a>
          </h3>
        </div>
        <div className="reel-text">
          <p>{product.summary}</p>
          <ul className="tags" aria-label="Technologies">
            {product.tech.slice(0, 4).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className="reel-actions">
            <a className="button button-light" href={href} onClick={open} aria-label={`View details: ${product.title}`}>
              View details
            </a>
            {product.liveUrl && (
              <a className="button button-ghost" href={product.liveUrl} target="_blank" rel="noreferrer">
                Open app <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/*
  Featured products. On large screens with a mouse the section pins and
  the cards travel sideways as you scroll; the offset is written straight
  from the scroll position on each frame, so it moves exactly with the
  (Lenis-smoothed) scroll and never lags behind it. Phones, tablets and
  reduced motion get a plain vertical list.
*/
export default function ProductReel({ products, totalProjects, onOpen, head }) {
  const section = useRef(null);
  const track = useRef(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setPinned(query.matches && !prefersReducedMotion());
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const host = section.current;
    const rail = track.current;
    if (!pinned) {
      host.style.height = "";
      rail.style.transform = "";
      return;
    }
    let distance = 0;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const top = host.getBoundingClientRect().top;
      const travel = host.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -top / travel)) : 0;
      rail.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      host.style.setProperty("--reel-progress", progress.toFixed(4));
    };
    const measure = () => {
      distance = Math.max(0, rail.scrollWidth - rail.parentElement.clientWidth);
      host.style.height = `${distance + window.innerHeight}px`;
      paint();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // Keyboard users tabbing into an off-screen card: scroll to it.
    const onFocus = (event) => {
      const card = event.target.closest(".reel-card, .reel-end");
      if (!card || !distance) return;
      const travel = host.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, (card.offsetLeft - 32) / distance));
      const y = host.getBoundingClientRect().top + window.scrollY + progress * travel;
      if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    host.addEventListener("focusin", onFocus);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      host.removeEventListener("focusin", onFocus);
    };
  }, [pinned]);

  return (
    <section
      id="products"
      ref={section}
      className={pinned ? "reel is-pinned" : "reel"}
      aria-labelledby="products-title"
    >
      <div className="reel-sticky">
        <div className="wrap">{head}</div>
        <div className="reel-viewport">
          <ul className="reel-track" ref={track}>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                total={products.length}
                onOpen={onOpen}
              />
            ))}
            <li className="reel-end">
              <span className="label">All projects · {totalProjects}</span>
              <a href="#projects" className="reel-all">
                View all projects <ArrowRight aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        {pinned && (
          <div className="reel-progress" aria-hidden="true">
            <i />
          </div>
        )}
      </div>
    </section>
  );
}

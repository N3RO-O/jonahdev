import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import NeroMark from "./nero/NeroMark";

/*
  Screenshot gallery for a case study: group tabs, one large frame, a
  thumbnail strip and a full-screen viewer. Arrow keys move through the
  screenshots whenever focus is inside the gallery or the viewer.
*/
export default function ScreenshotGallery({ galleries, title }) {
  const [tab, setTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState(false);
  const strip = useRef(null);
  const group = galleries[tab];
  const images = group?.images || [];
  const current = images[index];

  const move = (step) => setIndex((value) => (value + step + images.length) % images.length);

  // Keep the active thumbnail in view without scrolling the page.
  useEffect(() => {
    const button = strip.current?.children[index];
    if (!button) return;
    const host = strip.current;
    const left = button.offsetLeft - host.clientWidth / 2 + button.clientWidth / 2;
    host.scrollTo({ left, behavior: "smooth" });
  }, [index, tab]);

  if (!current) {
    return (
      <div className="gallery-empty">
        <NeroMark size={28} />
        <p>No screenshots are published for this project yet.</p>
      </div>
    );
  }

  const onKeyDown = (event) => {
    if (images.length < 2) return;
    if (event.key === "ArrowRight") move(1);
    else if (event.key === "ArrowLeft") move(-1);
    else return;
    event.preventDefault();
  };

  return (
    <section className="gallery" aria-label={`${title} screenshots`} onKeyDown={onKeyDown}>
      {galleries.length > 1 && (
        <div className="gallery-tabs" role="group" aria-label="Screenshot sets">
          {galleries.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={i === tab}
              onClick={() => {
                setTab(i);
                setIndex(0);
              }}
            >
              {item.label}
              <span>{item.images.length}</span>
            </button>
          ))}
        </div>
      )}
      <figure className={current.portrait ? "detail-gallery is-portrait" : "detail-gallery"}>
        <button
          type="button"
          className="gallery-frame"
          onClick={() => setViewer(true)}
          aria-label={`Open full screen: ${current.caption}`}
        >
          <img key={current.src} src={current.src} alt={current.caption} width="1600" height="1000" />
          <span className="gallery-zoom" aria-hidden="true">
            <Maximize2 size={16} />
          </span>
        </button>
        <figcaption>
          <span>{current.caption}</span>
          <span className="gallery-controls">
            <button
              type="button"
              className="icon-button"
              onClick={() => move(-1)}
              disabled={images.length < 2}
              aria-label="Previous screenshot"
            >
              <ArrowLeft size={18} />
            </button>
            <span aria-live="polite">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              className="icon-button"
              onClick={() => move(1)}
              disabled={images.length < 2}
              aria-label="Next screenshot"
            >
              <ArrowRight size={18} />
            </button>
          </span>
        </figcaption>
      </figure>
      {images.length > 1 && (
        <div className="gallery-strip" ref={strip}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={image.portrait ? "is-portrait" : undefined}
              aria-label={`Show screenshot ${i + 1}: ${image.caption}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            >
              <img src={image.thumb || image.src} alt="" loading="lazy" decoding="async" width="320" height="200" />
            </button>
          ))}
        </div>
      )}
      {viewer && (
        <Lightbox
          image={current}
          position={`${index + 1} / ${images.length}`}
          onMove={images.length > 1 ? move : null}
          onClose={() => setViewer(false)}
        />
      )}
    </section>
  );
}

function Lightbox({ image, position, onMove, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Screenshot viewer"
      data-lenis-prevent
      onCancel={(event) => {
        // React passes cancel up to the case-study dialog; keep it here.
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
      onKeyDown={(event) => {
        if (!onMove) return;
        if (event.key === "ArrowRight") onMove(1);
        else if (event.key === "ArrowLeft") onMove(-1);
        else return;
        event.preventDefault();
        event.stopPropagation();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <img src={image.src} alt={image.caption} />
      <div className="lightbox-bar">
        <span>{image.caption}</span>
        <span className="gallery-controls">
          {onMove && (
            <button type="button" className="icon-button" onClick={() => onMove(-1)} aria-label="Previous screenshot">
              <ArrowLeft size={18} />
            </button>
          )}
          <span>{position}</span>
          {onMove && (
            <button type="button" className="icon-button" onClick={() => onMove(1)} aria-label="Next screenshot">
              <ArrowRight size={18} />
            </button>
          )}
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close viewer" autoFocus>
            <X size={18} />
          </button>
        </span>
      </div>
    </dialog>
  );
}

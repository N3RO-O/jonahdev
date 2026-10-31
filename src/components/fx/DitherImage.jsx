import { useEffect, useRef, useState } from "react";

const CELL = 5;

/*
  A screenshot shown first as a dot-matrix print of itself, then revealed
  in full when `revealed` is true (hover or focus on the card, or the card
  scrolling into view on touch screens). The dither is drawn once from the
  loaded image and redrawn only when the frame changes size, so it costs
  nothing while scrolling.
*/
export default function DitherImage({ src, srcSet, sizes, alt, revealed, eager, width = 1600, height = 1000 }) {
  const canvas = useRef(null);
  const image = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = image.current;
    const surface = canvas.current;
    if (!img || !surface) return;
    const context = surface.getContext("2d");
    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });

    const draw = () => {
      if (!img.naturalWidth) return;
      const box = surface.getBoundingClientRect();
      if (!box.width) return;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      surface.width = Math.round(box.width * ratio);
      surface.height = Math.round(box.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const columns = Math.ceil(box.width / CELL);
      const rows = Math.ceil(box.height / CELL);
      sample.width = columns;
      sample.height = rows;
      // object-fit: cover, anchored top left, like the real image.
      const scale = Math.max(columns / img.naturalWidth, rows / img.naturalHeight);
      sampleContext.drawImage(img, 0, 0, img.naturalWidth * scale, img.naturalHeight * scale);
      const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      // Light interfaces would print as a solid white block, so they are
      // inverted and read as light marks on black, like the dark ones.
      let total = 0;
      for (let i = 0; i < pixels.length; i += 4)
        total += pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
      const invert = total / (pixels.length / 4) / 255 > 0.5;
      context.fillStyle = "#050505";
      context.fillRect(0, 0, box.width, box.height);
      context.fillStyle = "#f2f2ee";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const i = (y * columns + x) * 4;
          const raw = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255;
          const lum = invert ? 1 - raw : raw;
          const size = CELL * Math.min(0.92, lum * lum * 1.1 + 0.04);
          if (size < 0.6) continue;
          context.fillRect(x * CELL + (CELL - size) / 2, y * CELL + (CELL - size) / 2, size, size);
        }
      }
      setReady(true);
    };

    if (img.complete) draw();
    img.addEventListener("load", draw);
    const observer = new ResizeObserver(draw);
    observer.observe(surface);
    return () => {
      img.removeEventListener("load", draw);
      observer.disconnect();
    };
  }, [src]);

  return (
    <span className={`dither ${revealed ? "is-revealed" : ""} ${ready ? "is-ready" : ""}`}>
      <canvas ref={canvas} className="dither-print" aria-hidden="true" />
      <img
        ref={image}
        className="dither-photo"
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </span>
  );
}

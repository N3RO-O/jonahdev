import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01NERO";
const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Decodes its text from random glyphs the first time it scrolls into view,
  like the pixel headlines on the reference site. Screen readers get the
  final text straight away from a visually hidden copy.
*/
export default function Scramble({ text, as: Tag = "span", className = "", duration = 900, ...props }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    setShown(text);
    if (reduceMotion() || !("IntersectionObserver" in window)) return;
    const element = ref.current;
    let frame = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const settled = Math.floor(progress * text.length);
        let next = "";
        for (let i = 0; i < text.length; i += 1) {
          const char = text[i];
          if (i < settled || char === " ") next += char;
          else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setShown(next);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // Start fully scrambled so the decode reads from the first frame.
    setShown(text.replace(/[^ ]/g, "_"));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, duration]);

  return (
    <Tag ref={ref} className={`scramble ${className}`} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </Tag>
  );
}

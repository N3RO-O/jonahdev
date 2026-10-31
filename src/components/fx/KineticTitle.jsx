import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useCanvas";

const LIGHT = 260;
const HEAVY = 720;
const REACH = 190; // px from the pointer where letters start to thicken

/*
  The hero headline. Letters rise into place on load, then thicken as the
  pointer comes near them, using the variable font's weight axis. The
  weight is set on the very next frame after the pointer moves, so the
  type responds without lag. Screen readers get each line as plain text.
*/
export default function KineticTitle({ lines, id }) {
  const ref = useRef(null);

  useEffect(() => {
    const title = ref.current;
    const chars = [...title.querySelectorAll(".char")];
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    let frame = 0;
    let px = -9999;
    let py = -9999;
    let centers = [];
    const measure = () => {
      centers = chars.map((char) => {
        const box = char.getBoundingClientRect();
        return [box.left + box.width / 2 + window.scrollX, box.top + box.height / 2 + window.scrollY];
      });
    };
    const paint = () => {
      frame = 0;
      chars.forEach((char, i) => {
        const [cx, cy] = centers[i];
        const d = Math.hypot(px - (cx - window.scrollX), py - (cy - window.scrollY));
        const k = d < REACH ? Math.pow(1 - d / REACH, 1.6) : 0;
        char.style.fontVariationSettings = `"wght" ${Math.round(LIGHT + (HEAVY - LIGHT) * k)}`;
      });
    };
    const move = (event) => {
      px = event.clientX;
      py = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => {
      px = py = -9999;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // Measure after the entrance has settled and whenever layout changes.
    const settle = setTimeout(measure, 900);
    const observer = new ResizeObserver(measure);
    observer.observe(title);
    document.fonts?.ready.then(measure);
    window.addEventListener("pointermove", move, { passive: true });
    title.closest("section")?.addEventListener("pointerleave", leave);
    return () => {
      clearTimeout(settle);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      title.closest("section")?.removeEventListener("pointerleave", leave);
    };
  }, []);

  let index = 0;
  return (
    <h1 className="kinetic" id={id} ref={ref}>
      {lines.map(({ text, outline }) => (
        <span className={outline ? "kinetic-line is-outline" : "kinetic-line"} key={text}>
          <span className="sr-only">{text}</span>
          <span className="kinetic-mask" aria-hidden="true">
            {[...text].map((char, i) => (
              <span className="char" key={i} style={{ "--i": index++ }}>
                {char === " " ? " " : char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

import { useEffect, useRef, useState } from "react";

/*
  A terracotta "loupe" that trails the pointer on desktop. The system cursor
  stays visible; this only adds a soft ring that grows over interactive
  elements and names the action over work samples ("View", "Play", "Open").
  Rendered only for fine pointers without a reduced-motion preference.
*/

const LABELS = [
  [".project-art", "View"],
  [".video-preview", "Play"],
  [".photo", "Open"],
  [".console-badge", "Run"],
];

function labelFor(target) {
  for (const [selector, label] of LABELS) {
    if (target.closest(selector)) return label;
  }
  return "";
}

export default function EditorialCursor() {
  const [enabled, setEnabled] = useState(false);
  const ring = useRef(null);
  const dot = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const pointer = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const render = () => {
      trail.x += (pointer.x - trail.x) * 0.18;
      trail.y += (pointer.y - trail.y) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      if (dot.current)
        dot.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      const settled =
        Math.abs(pointer.x - trail.x) < 0.1 && Math.abs(pointer.y - trail.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!visible) {
        visible = true;
        trail.x = pointer.x;
        trail.y = pointer.y;
        document.documentElement.classList.add("has-loupe");
      }
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest("a, button, summary, label, input, textarea");
      const text = labelFor(target);
      ring.current?.classList.toggle("is-active", Boolean(interactive));
      ring.current?.classList.toggle("is-labelled", Boolean(text));
      setLabel(text);
    };

    const onLeave = () => {
      visible = false;
      document.documentElement.classList.remove("has-loupe");
    };

    const onDown = () => ring.current?.classList.add("is-pressed");
    const onUp = () => ring.current?.classList.remove("is-pressed");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-loupe");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="loupe" aria-hidden="true">
        <span>{label}</span>
      </div>
      <div ref={dot} className="loupe-dot" aria-hidden="true" />
    </>
  );
}

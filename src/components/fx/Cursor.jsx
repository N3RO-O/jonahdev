import { useEffect, useRef } from "react";

/*
  A dot that sits exactly on the pointer and a ring that grows over
  anything clickable, with a short label over elements that set
  data-cursor (for example "View"). Position updates are written straight
  to the transform on the next frame, so the cursor never trails behind.
  Only for fine pointers; the system cursor stays for touch and pens.
*/
export default function Cursor() {
  const root = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const element = root.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    let frame = 0;
    let x = -100;
    let y = -100;
    const paint = () => {
      frame = 0;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
      const target = event.target.closest?.("a, button, summary, label, input, textarea, [data-cursor]");
      const text = target?.closest("[data-cursor]")?.getAttribute("data-cursor") || "";
      element.classList.toggle("is-active", Boolean(target));
      element.classList.toggle("has-label", Boolean(text));
      element.classList.toggle("is-text", Boolean(target?.matches("input, textarea")));
      if (label.current.textContent !== text) label.current.textContent = text;
      element.classList.add("is-visible");
    };
    const leave = () => element.classList.remove("is-visible");
    const down = () => element.classList.add("is-down");
    const up = () => element.classList.remove("is-down");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-dot" />
      <span ref={label} className="cursor-label" />
    </div>
  );
}

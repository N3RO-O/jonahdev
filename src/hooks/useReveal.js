import { useEffect } from "react";

/*
  Elements marked data-reveal fade up as they approach the viewport. The
  observer fires before an element is on screen (the bottom margin is
  positive), the move is short and quick, and siblings are offset by at
  most a few frames, so content is already settling by the time it is
  seen. Nothing is hidden without JavaScript or with reduced motion.
*/
export default function useReveal(deps = []) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll("[data-reveal]:not(.is-in)")];
    const order = new Map();
    elements.forEach((element) => {
      const parent = element.parentElement;
      const position = order.get(parent) ?? 0;
      order.set(parent, position + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(position, 3) * 45}ms`);
      element.classList.add("will-reveal");
    });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }),
      { rootMargin: "0px 0px 12% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, deps);
}

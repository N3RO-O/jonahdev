import { useEffect } from "react";

/*
  Elements marked data-reveal rise and fade in as they enter the viewport,
  staggered among siblings. Content is only hidden once JavaScript runs,
  and nothing is hidden for reduced motion.
*/
export default function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const order = new Map();
    elements.forEach((element) => {
      const parent = element.parentElement;
      const position = order.get(parent) ?? 0;
      order.set(parent, position + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(position, 6) * 70}ms`);
      element.classList.add("reveal");
    });
    const timers = [];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          element.classList.add("is-revealed");
          observer.unobserve(element);
          const delay = parseFloat(element.style.getPropertyValue("--reveal-delay")) || 0;
          // Hand the element back to its own hover transitions once settled.
          timers.push(
            setTimeout(() => {
              element.classList.remove("reveal", "is-revealed");
              element.style.removeProperty("--reveal-delay");
            }, delay + 1100),
          );
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      elements.forEach((element) => element.classList.remove("reveal", "is-revealed"));
    };
  }, []);
}

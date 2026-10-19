import { useEffect } from "react";

/*
  Print-inspired motion for the NeroSec editorial theme.
  - Reveal: blocks "develop" into view (fade, rise, de-blur) as they enter.
  - Stagger: siblings in the same group arrive one after another.
  All of it is skipped for people who prefer reduced motion, and content is
  only hidden after JavaScript has run, so nothing disappears without it.
*/

const REVEAL_TARGETS = [
  ".section-label",
  ".section-heading",
  ".filter-bar",
  ".project-card",
  ".github-link",
  ".index-heading",
  ".index-search",
  ".about-title",
  ".about-copy",
  ".about-facts > div",
  ".core-stack",
  ".skill-row",
  ".experience-row",
  ".education-strip",
  ".photo",
  ".video-preview",
  ".note-row",
  ".contact-heading",
  ".contact-details",
  ".contact-form",
  ".faq",
  ".footer-wordmark",
].join(",");

export default function useEditorialEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const elements = [...document.querySelectorAll(REVEAL_TARGETS)];
    const groups = new Map();
    const timers = [];
    elements.forEach((element) => {
      const parent = element.parentElement;
      const position = groups.get(parent) ?? 0;
      groups.set(parent, position + 1);
      element.style.setProperty("--reveal-delay", `${Math.min(position, 5) * 80}ms`);
      element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          element.classList.add("is-revealed");
          observer.unobserve(element);
          // Hand the element back to its own hover transitions once settled.
          const delay = parseFloat(element.style.getPropertyValue("--reveal-delay")) || 0;
          timers.push(
            setTimeout(() => {
              element.classList.remove("reveal", "is-revealed");
              element.style.removeProperty("--reveal-delay");
            }, delay + 1300),
          );
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      elements.forEach((element) => {
        element.classList.remove("reveal", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
}

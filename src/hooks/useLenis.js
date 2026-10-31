import { useEffect, useRef } from "react";
import Lenis from "lenis";

/*
  Smooth, weighted scrolling (the same library nerochain.io uses).
  Skipped for reduced motion. Anchor links glide to their section and
  account for the fixed header.
*/
export default function useLenis() {
  const lenis = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({
      // A light lerp keeps the glide but answers the wheel at once; a long
      // fixed duration felt like the page was catching up.
      lerp: 0.13,
      smoothWheel: true,
      autoRaf: true,
      // Section scroll-margin-top already clears the fixed header.
      anchors: { offset: 0 },
    });
    lenis.current = instance;
    window.__lenis = instance;
    return () => {
      instance.destroy();
      lenis.current = null;
      delete window.__lenis;
    };
  }, []);

  return lenis;
}

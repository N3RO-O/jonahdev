import { useEffect, useState } from "react";

/*
  0 → 1 progress of an element moving through the viewport, where 0 is the
  moment its top reaches the top of the viewport and 1 is the moment its
  bottom reaches the bottom. Used for pinned, scroll-driven sections.
*/
export default function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const value = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      setProgress((previous) => (Math.abs(previous - value) > 0.0005 ? value : previous));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

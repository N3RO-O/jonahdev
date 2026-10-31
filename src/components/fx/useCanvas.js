import { useEffect, useRef } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Runs a canvas drawing loop that is sized to its element at the device
  pixel ratio (capped at 2), pauses while the canvas is off screen or the
  tab is hidden, and draws a single still frame for reduced motion.
  `draw(context, width, height, time, state)` gets CSS-pixel dimensions.
*/
export default function useCanvas(draw, { animate = true } = {}) {
  const ref = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    const still = !animate || prefersReducedMotion();
    const state = {};
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    const start = performance.now();

    const render = (now) => {
      frame = 0;
      if (!width || !height) return;
      drawRef.current(context, width, height, (now - start) / 1000, state);
      if (!still && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      state.resized = true;
      schedule();
    };

    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    viewObserver.observe(canvas);
    const onVisibility = () => !document.hidden && schedule();
    document.addEventListener("visibilitychange", onVisibility);
    canvas.__nudge = schedule;

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [animate]);

  return ref;
}

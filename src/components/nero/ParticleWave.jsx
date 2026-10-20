import { useEffect, useRef } from "react";

/*
  A field of fine dots rippling like a surface, with a few larger "nodes"
  riding the waves — the hero motif from the reference, redrawn on canvas
  so it stays light (no video). Red marks the nodes that matter.
  Pauses off-screen; draws a single still frame for reduced motion.
*/
const COLS = 150;
const ROWS = 26;
const NODES = [
  { u: 0.12, v: 0.55, r: 5, red: false, speed: 0.021 },
  { u: 0.27, v: 0.3, r: 3, red: false, speed: 0.034 },
  { u: 0.36, v: 0.7, r: 4, red: false, speed: 0.027 },
  { u: 0.48, v: 0.42, r: 13, red: true, speed: 0.012 },
  { u: 0.53, v: 0.6, r: 8, red: false, speed: 0.018 },
  { u: 0.64, v: 0.78, r: 6, red: true, speed: 0.024 },
  { u: 0.76, v: 0.36, r: 4, red: false, speed: 0.031 },
  { u: 0.9, v: 0.62, r: 3, red: false, speed: 0.04 },
];

export default function ParticleWave({ className = "" }) {
  const canvas = useRef(null);

  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const pointer = { x: 0.5, active: false };
    const styles = getComputedStyle(element);
    const ink = styles.getPropertyValue("--ink").trim() || "#0a0a0a";
    const red = styles.getPropertyValue("--red").trim() || "#d81111";

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = element.clientWidth;
      height = element.clientHeight;
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    // Height of the surface at (u, v) in 0..1 space, time t in seconds.
    const surface = (u, v, t) =>
      Math.sin(u * 9 + t * 0.9 + v * 2.2) * 0.42 +
      Math.sin(u * 4.3 - t * 0.6 + v * 5.1) * 0.33 +
      Math.cos(u * 15 + v * 3 - t * 1.3) * 0.12 +
      (pointer.active ? Math.exp(-((u - pointer.x) ** 2) * 60) * 0.35 : 0);

    const project = (u, v, t) => {
      const depth = 0.55 + v * 0.45; // rows further back are smaller/fainter
      const x = u * width;
      const y = height * (0.5 + (v - 0.5) * 0.62) - surface(u, v, t) * height * 0.22 * depth;
      return { x, y, depth };
    };

    const draw = (time) => {
      const t = time / 1000;
      context.clearRect(0, 0, width, height);
      context.fillStyle = ink;
      for (let r = 0; r < ROWS; r += 1) {
        const v = r / (ROWS - 1);
        for (let c = 0; c < COLS; c += 1) {
          const u = c / (COLS - 1);
          const { x, y, depth } = project(u, v, t);
          // Fade the field out towards the left and right edges.
          const edge = Math.min(1, Math.min(u, 1 - u) * 6);
          context.globalAlpha = (0.18 + depth * 0.55) * edge;
          const size = 0.6 + depth * 0.9;
          context.fillRect(x, y, size, size);
        }
      }
      context.globalAlpha = 1;
      for (const node of NODES) {
        const u = (node.u + t * node.speed) % 1;
        const { x, y, depth } = project(u, node.v, t);
        const edge = Math.min(1, Math.min(u, 1 - u) * 8);
        context.globalAlpha = edge;
        context.fillStyle = node.red ? red : ink;
        context.beginPath();
        context.arc(x, y - node.r * 0.4, node.r * (0.7 + depth * 0.5), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const loop = (time) => {
      draw(time);
      if (visible && !reduce) frame = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reduce) frame = requestAnimationFrame(loop);
    });
    observer.observe(element);
    const onResize = () => {
      resize();
      draw(performance.now());
    };
    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.active = event.clientY > rect.top - 80 && event.clientY < rect.bottom + 80;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvas} className={`particle-wave ${className}`} aria-hidden="true" />;
}

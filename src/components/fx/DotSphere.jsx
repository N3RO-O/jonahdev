import { useEffect, useRef } from "react";
import useCanvas from "./useCanvas";

const CELL = 9;

/*
  Hero backdrop: a faint dot grid with a slowly turning, halftone-shaded
  sphere made of square pixels. The sphere leans toward the pointer
  immediately (no easing lag) and the grid lights up around it.
*/
export default function DotSphere({ className = "" }) {
  const pointer = useRef({ x: 0.5, y: 0.5, active: false });

  const ref = useCanvas((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const { x: px, y: py, active } = pointer.current;
    // On narrow screens the sphere moves to the top corner, clear of the headline.
    const narrow = w < 760;
    const radius = narrow ? w * 0.34 : Math.min(h * 0.42, w * 0.3);
    const cx = w * (narrow ? 0.8 : w > 900 ? 0.62 : 0.55) + (active ? (px - 0.5) * 24 : 0);
    const cy = h * (narrow ? 0.2 : 0.46) + (active ? (py - 0.5) * 18 : 0);
    const tiltX = active ? (py - 0.5) * 0.7 : 0.15;
    const spin = t * 0.22 + (active ? (px - 0.5) * 1.2 : 0);
    const lx = Math.cos(t * 0.15) * 0.6 - 0.4;
    const ly = -0.55;
    const lz = 0.65;

    // Background grid, brighter near the pointer.
    const pointerX = px * w;
    const pointerY = py * h;
    for (let y = CELL; y < h; y += CELL * 3) {
      for (let x = CELL; x < w; x += CELL * 3) {
        const d = active ? Math.hypot(x - pointerX, y - pointerY) : 9999;
        const glow = d < 180 ? 1 - d / 180 : 0;
        ctx.fillStyle = `rgba(242,242,238,${0.12 + glow * 0.5})`;
        const s = 1.6 + glow * 1.4;
        ctx.fillRect(x, y, s, s);
      }
    }

    // Sphere cells.
    const sinT = Math.sin(tiltX);
    const cosT = Math.cos(tiltX);
    for (let gy = -radius; gy <= radius; gy += CELL) {
      for (let gx = -radius; gx <= radius; gx += CELL) {
        const nx = gx / radius;
        const ny = gy / radius;
        const rr = nx * nx + ny * ny;
        if (rr > 1) continue;
        const nz = Math.sqrt(1 - rr);
        // Undo the tilt to find the point on the turning globe.
        const y2 = ny * cosT - nz * sinT;
        const z2 = ny * sinT + nz * cosT;
        const lon = Math.atan2(nx, z2) + spin;
        const lat = Math.asin(Math.max(-1, Math.min(1, y2)));
        const bands = 0.55 + 0.45 * Math.sin(lon * 5 + Math.sin(lat * 3) * 1.4) * Math.cos(lat * 2.2);
        const light = Math.max(0, nx * lx + ny * ly + nz * lz);
        const value = Math.min(1, light * 0.85 + 0.08) * (0.35 + 0.65 * bands);
        if (value < 0.06) continue;
        const size = CELL * Math.min(0.95, value * 1.05);
        const shade = Math.round(120 + value * 122);
        ctx.fillStyle = `rgb(${shade},${shade},${shade - 4})`;
        ctx.fillRect(cx + gx - size / 2, cy + gy - size / 2, size, size);
      }
    }
  });

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas.parentElement;
    const move = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer.current = {
        x: (event.clientX - box.left) / box.width,
        y: (event.clientY - box.top) / box.height,
        active: true,
      };
      canvas.__nudge?.();
    };
    const leave = () => {
      pointer.current = { ...pointer.current, active: false };
      canvas.__nudge?.();
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [ref]);

  return <canvas ref={ref} className={`dot-sphere ${className}`} aria-hidden="true" />;
}

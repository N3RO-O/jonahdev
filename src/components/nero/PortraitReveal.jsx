import { useEffect, useRef } from "react";

/*
  Halftone portrait that clears where you hover.

  The sharp photo sits underneath. On top, a canvas paints a grayscale,
  dot-screened copy cut into small cells. Moving the pointer over it lifts
  the cells near the pointer: each one bursts into a particle that drifts
  away and fades, revealing the clear photo. Cells heal back a moment
  after the pointer leaves. With reduced motion the cells simply fade,
  with no particles.
*/
const CELL = 6; // CSS pixels per cell
const RADIUS = 78; // reveal radius around the pointer
const HEAL_DELAY = 450; // ms before a cleared cell starts to return
const HEAL_SPEED = 1.6; // alpha per second while healing

export default function PortraitReveal({ src, alt, focusX = 0.5, focusY = 0.18 }) {
  const wrap = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const host = wrap.current;
    const element = canvas.current;
    const context = element.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const image = new Image();
    image.decoding = "async";
    image.src = src;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let columns = 0;
    let rows = 0;
    let screen = null; // offscreen halftone layer
    let shade = null; // per-cell average gray, used to colour particles
    let cover = null; // 1 = halftone visible, 0 = cleared
    let touched = null; // last time each cell was hit
    const active = new Set(); // cells that are not fully covered
    let particles = [];
    let frame = 0;
    let last = 0;
    const pointer = { x: -1e4, y: -1e4, inside: false };

    // object-fit: cover crop, matching the CSS object-position.
    const coverRect = () => {
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      return { x: (width - w) * focusX, y: (height - h) * focusY, w, h };
    };

    const build = () => {
      if (!image.naturalWidth) return;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Halftone layer: soft grayscale photo + a light dot screen.
      screen = document.createElement("canvas");
      screen.width = element.width;
      screen.height = element.height;
      const s = screen.getContext("2d");
      s.setTransform(ratio, 0, 0, ratio, 0, 0);
      const r = coverRect();
      s.filter = "grayscale(1) contrast(0.92) brightness(0.92) blur(0.6px)";
      s.drawImage(image, r.x, r.y, r.w, r.h);
      s.filter = "none";
      s.globalCompositeOperation = "screen";
      s.fillStyle = "rgba(255, 255, 255, 0.55)";
      for (let y = 2.5; y < height; y += 5) {
        for (let x = 2.5; x < width; x += 5) {
          s.beginPath();
          s.arc(x, y, 1.05, 0, Math.PI * 2);
          s.fill();
        }
      }
      s.globalCompositeOperation = "source-over";

      columns = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      cover = new Float32Array(columns * rows).fill(1);
      touched = new Float64Array(columns * rows);
      active.clear();
      particles = [];

      // Average gray per cell from a tiny copy of the layer.
      const probe = document.createElement("canvas");
      probe.width = columns;
      probe.height = rows;
      const p = probe.getContext("2d");
      p.drawImage(screen, 0, 0, columns, rows);
      const data = p.getImageData(0, 0, columns, rows).data;
      shade = new Uint8Array(columns * rows);
      for (let i = 0; i < shade.length; i += 1) shade[i] = data[i * 4];

      draw();
    };

    const draw = () => {
      if (!screen) return;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      context.drawImage(screen, 0, 0, width, height);
      // Punch the cleared cells out of the halftone layer.
      context.globalCompositeOperation = "destination-out";
      for (const index of active) {
        const hole = 1 - cover[index];
        if (hole <= 0) continue;
        context.globalAlpha = hole;
        const x = (index % columns) * CELL;
        const y = Math.floor(index / columns) * CELL;
        context.fillRect(x, y, CELL, CELL);
      }
      context.globalCompositeOperation = "source-over";
      for (const particle of particles) {
        const size = CELL * 0.75 * particle.life;
        context.globalAlpha = Math.max(0, particle.life) * 0.9;
        context.fillStyle = `rgb(${particle.gray}, ${particle.gray}, ${particle.gray})`;
        context.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
      }
      context.globalAlpha = 1;
    };

    const clearAround = (now) => {
      if (!pointer.inside || !cover) return;
      const minC = Math.max(0, Math.floor((pointer.x - RADIUS) / CELL));
      const maxC = Math.min(columns - 1, Math.floor((pointer.x + RADIUS) / CELL));
      const minR = Math.max(0, Math.floor((pointer.y - RADIUS) / CELL));
      const maxR = Math.min(rows - 1, Math.floor((pointer.y + RADIUS) / CELL));
      for (let r = minR; r <= maxR; r += 1) {
        for (let c = minC; c <= maxC; c += 1) {
          const cx = c * CELL + CELL / 2;
          const cy = r * CELL + CELL / 2;
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const distance = Math.hypot(dx, dy);
          // Ragged edge: cells near the rim clear with some randomness.
          const edge = RADIUS * (0.78 + Math.random() * 0.22);
          if (distance > edge) continue;
          const index = r * columns + c;
          touched[index] = now;
          if (cover[index] > 0.5 && !reduce) {
            const push = 0.6 + Math.random() * 1.4;
            const unit = distance || 1;
            particles.push({
              x: cx,
              y: cy,
              vx: (dx / unit) * push * 60 + (Math.random() - 0.5) * 40,
              vy: (dy / unit) * push * 60 + (Math.random() - 0.5) * 40 - 20,
              life: 1,
              decay: 1.2 + Math.random() * 1.3,
              gray: shade[index],
            });
          }
          cover[index] = 0;
          active.add(index);
        }
      }
      if (particles.length > 2400) particles = particles.slice(-2400);
    };

    const step = (now) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      clearAround(now);
      for (const index of active) {
        if (now - touched[index] < HEAL_DELAY) continue;
        cover[index] = Math.min(1, cover[index] + dt * HEAL_SPEED);
        if (cover[index] >= 1) active.delete(index);
      }
      for (const particle of particles) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.life -= particle.decay * dt;
      }
      particles = particles.filter((particle) => particle.life > 0);
      draw();
      if (active.size || particles.length || pointer.inside) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
        last = 0;
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const move = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = true;
      wake();
    };
    const leave = () => {
      pointer.inside = false;
      wake();
    };

    image.onload = build;
    if (image.complete) build();
    const observer = new ResizeObserver(() => build());
    observer.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerdown", move);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointercancel", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerdown", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointercancel", leave);
    };
  }, [src, focusX, focusY]);

  return (
    <div className="portrait-reveal" ref={wrap}>
      <img src={src} alt={alt} width="1000" height="1000" loading="lazy" />
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}

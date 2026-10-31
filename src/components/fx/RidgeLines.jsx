import useCanvas from "./useCanvas";

// Cheap smooth noise from layered sines, stable for a given seed.
const wave = (x, seed, t) =>
  Math.sin(x * 1.7 + seed * 3.1 + t * 0.6) * 0.5 +
  Math.sin(x * 3.3 - seed * 1.3 + t * 0.9) * 0.3 +
  Math.sin(x * 7.1 + seed * 5.7 - t * 0.4) * 0.2;

/*
  Stacked ridge lines (the "pulsar" plot) that drift slowly. Each line
  masks the ones behind it, so the peaks read as a landscape.
*/
export default function RidgeLines({ className = "", lines = 46 }) {
  const ref = useCanvas((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const gap = h / (lines + 6);
    const steps = Math.max(60, Math.round(w / 9));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(242,242,238,0.75)";
    ctx.fillStyle = "#050505";
    for (let i = 0; i < lines; i++) {
      const base = gap * (i + 5);
      const ridge = new Path2D();
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        const center = Math.exp(-Math.pow((u - 0.5) / 0.17, 2));
        const amp = gap * (0.6 + center * 7.5);
        const y = base - Math.abs(wave(u * 6, i, t)) * amp * (0.25 + center);
        if (s === 0) ridge.moveTo(0, y);
        else ridge.lineTo(u * w, y);
      }
      const mask = new Path2D(ridge);
      mask.lineTo(w, h);
      mask.lineTo(0, h);
      mask.closePath();
      ctx.fill(mask);
      ctx.stroke(ridge);
    }
  });
  return <canvas ref={ref} className={`ridge-lines ${className}`} aria-hidden="true" />;
}

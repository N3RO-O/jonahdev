// Nero pixel "N" — the same 5 x 7 grid as public/assets/brand/nero-mark.svg.
const GRID = ["X...X", "X...X", "XX..X", "X.X.X", "X..XX", "X...X", "X...X"];
const CELL = 9.5;
const OX = 50 - 2.5 * CELL;
const OY = 50 - 3.5 * CELL;

const PATH = GRID.flatMap((row, r) => {
  const runs = [];
  for (let c = 0; c < row.length; ) {
    if (row[c] !== "X") {
      c += 1;
      continue;
    }
    const start = c;
    while (row[c] === "X") c += 1;
    runs.push(
      `M${OX + start * CELL} ${OY + r * CELL}h${(c - start) * CELL}v${CELL}h${-(c - start) * CELL}z`,
    );
  }
  return runs;
}).join("");

export default function NeroMark({
  size = 36,
  tile = "var(--red)",
  glyph = "#fff",
  radius = 14,
  title,
  ...props
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {tile && <rect width="100" height="100" rx={radius} fill={tile} />}
      <path d={PATH} fill={glyph} />
    </svg>
  );
}

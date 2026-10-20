// Small pixel-art icons drawn on an 11 x 11 grid, in the spirit of the
// reference's monochrome line icons. "R" cells take the accent colour.
const ICONS = {
  code: [
    "...........",
    "...X...X...",
    "..X.....X..",
    ".X...R...X.",
    "X...R.....X",
    "X...R.....X",
    "X..R......X",
    ".X.R.....X.",
    "..X.....X..",
    "...X...X...",
    "...........",
  ],
  data: [
    "..XXXXXXX..",
    ".X.......X.",
    ".XXXXXXXXX.",
    ".X.......X.",
    ".X..RRR..X.",
    ".XXXXXXXXX.",
    ".X.......X.",
    ".X..RRR..X.",
    ".XXXXXXXXX.",
    ".X.......X.",
    "..XXXXXXX..",
  ],
  check: [
    "....XXX....",
    "..XX...XX..",
    ".X.......X.",
    ".X......RX.",
    "X......R..X",
    "X.R...R...X",
    "X..R.R....X",
    ".X..R....X.",
    ".X.......X.",
    "..XX...XX..",
    "....XXX....",
  ],
  camera: [
    "...........",
    "...XXX.....",
    "XXXX.XXXXXX",
    "X.........X",
    "X...XXX...X",
    "X..X.R.X..X",
    "X..XRRRX..X",
    "X..X.R.X..X",
    "X...XXX...X",
    "XXXXXXXXXXX",
    "...........",
  ],
  ear: [
    "...........",
    "...XXXXX...",
    "..X.....X..",
    ".X..RRR..X.",
    ".X.R...R.X.",
    ".X.....R.X.",
    "..X...R..X.",
    "...X..R.X..",
    "....X..X...",
    ".....XX....",
    "...........",
  ],
  build: [
    "...........",
    ".XXXXXXXXX.",
    ".X...X...X.",
    ".XXXXXXXXX.",
    ".X.X...X.X.",
    ".XXXXXXXXX.",
    ".X...X...X.",
    ".XXXXXXXXX.",
    ".X.RRRRR.X.",
    ".XXXXXXXXX.",
    "...........",
  ],
  spark: [
    ".....X.....",
    ".....X.....",
    "..X..X..X..",
    "...X.R.X...",
    "....RRR....",
    "XXXRRRRRXXX",
    "....RRR....",
    "...X.R.X...",
    "..X..X..X..",
    ".....X.....",
    ".....X.....",
  ],
  note: [
    ".XXXXXXX...",
    ".X.....XX..",
    ".X.....X.X.",
    ".X.....XXX.",
    ".X.RRRRR.X.",
    ".X.......X.",
    ".X.RRRRR.X.",
    ".X.......X.",
    ".X.RRR...X.",
    ".X.......X.",
    ".XXXXXXXXX.",
  ],
};

export default function PixelIcon({ name, size = 56, ink = "currentColor", accent = "var(--red)" }) {
  const rows = ICONS[name] || ICONS.spark;
  const cells = [];
  rows.forEach((row, y) =>
    [...row].forEach((cell, x) => {
      if (cell === ".") return;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1.02"
          height="1.02"
          fill={cell === "R" ? accent : ink}
        />,
      );
    }),
  );
  return (
    <svg
      className="pixel-icon"
      viewBox="0 0 11 11"
      width={size}
      height={size}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {cells}
    </svg>
  );
}

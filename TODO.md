# TODO

- [x] Diagnose mobile responsiveness issue (root cause: Education degree card grid forced a 360px min column -> horizontal overflow)
- [x] Fix `src/components/Education.jsx` grid: `minmax(360px,1fr)` -> `minmax(0,1fr)`, 320px -> 300px, responsive padding
- [x] Run `npm run build` to ensure no regressions (passed)


# TODO

- [x] Diagnose mobile responsiveness issue (root cause: global horizontal overflow zooming the page out -> black right gutter; plus Education 360px min column)
- [x] Fix Education grid `minmax(360px,1fr)` -> `minmax(0,1fr)`, 320px -> 300px, responsive padding
- [x] Harden navbar: added px padding + max-w + min-w-0/truncate on logo, shrink-0 on right cluster
- [x] Global overflow guard: `html/body/#root/main` `overflow-x:hidden; width:100%; max-width:100%` + `img/video/svg/canvas { max-width:100%; height:auto }` so mockups scale down
- [x] Projects: `min-w-0` on grid cards so they can shrink; section-container capped at 72rem
- [x] Run `npm run build` (passed)


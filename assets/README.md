# NAT.EXE Light + Dark Decorative Asset Pack

A reusable, transparent SVG kit based on the *fantasy-game / lavender / sakura / pixel-art* visual direction of the portfolio mockups. This is an asset package, not a recreation of the complete HTML page.

## Files
- `svg/light/` — light lavender version
- `svg/dark/` — night-mode version
- `svg/shared/` — assets that work in both modes
- `css/theme-tokens.css` — two palettes and starter styling
- `previews/` — previews of both themes
- `reference/` — screenshots supplied as visual references (not individual extractable artworks)

Each theme includes: `sakura-branch-left/right`, `mountains-wide/left/right`, `pixel-cloud-1/2`, `pagoda`, `sparkles-wide`, `ornate-corner`, `ornate-frame`, `section-divider`, `quest-badge`, `pixel-grass-footer`, `moon-or-sun`.

All SVGs have transparent backgrounds and editable vector elements. Most are suitable as CSS `background-image` decorations. Keep decorative images `aria-hidden` and text/content in HTML. Do not put text inside the images.

## Sample HTML
```html
<section class="nat-page" data-theme="dark">
  <img class="nat-decoration" src="svg/dark/sakura-branch-left.svg" alt="" style="width:360px;left:-50px;top:0">
  <img class="nat-decoration" src="svg/dark/mountains-wide.svg" alt="" style="width:100%;left:0;bottom:0">
  <div class="nat-panel" style="position:relative;margin:100px auto;padding:24px;max-width:700px">Your content here</div>
</section>
```

Choose assets by theme: `svg/${theme}/filename.svg`. Use a persistent outer document theme and have decorative CSS switch paths when the theme changes. The footer grass is the same pixel-art style in both themes intentionally.

Tip: crop-proof decorative assets are best applied with `<img>` positioned outside central content columns rather than under body text. Use 0.1–0.4 opacity for landscape layers if needed.

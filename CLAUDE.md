# Project rules

## Icons
- Only Font Awesome Free 7.3.1. Source: local folder `fontawesome-free-7.3.1-web` → `svgs-full/<style>/*.svg` (640×640 fixed-width canvas, same sizing as FA 7 default).
- Regular is the default style (content icons, e.g. skill cards).
- Solid is approved for UI controls Free Regular lacks: menu (bars), close (xmark), arrows, chevrons, download, expand, zoom (magnifying-glass-plus/minus).
- No Lucide, no hand-drawn icons, no other libraries, no Brands style unless the user approves.
- Inline the SVG: `viewBox="0 0 640 640"`, path `fill="currentColor"`, `focusable="false"`, `aria-hidden="true"` on the icon or its wrapper. Comment above each icon: `<!-- Font Awesome Free 7.3.1, <Style>: <name> -->`. Keep the CC BY 4.0 attribution comment once per page (in `<head>`) and once in main.js.

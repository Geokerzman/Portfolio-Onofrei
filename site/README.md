# Boris Onofrei — Portfolio

Static portfolio (EN/DE): home page, one page per case study, legal pages. No build step is required to run it; there is no backend, and nothing is loaded from third-party servers.

## Structure

```
site/
├── index.html                  Home page (sections + CV overlay)
├── work/{marp,konform,onset}.html   Case studies: contents with active section, reading progress, next case
├── impressum.html              Legal notice (§ 5 DDG), DE + EN
├── datenschutz.html            Privacy policy (GDPR), DE + EN
├── favicon.svg
├── README.md
└── assets/
    ├── css/site.css            Redesign 11/2026: tokens, nav, footer, all home sections, motion states (every page)
    ├── css/pages.css           Re-skin of the case and legal pages in the new style (after main.css + tailwind.css)
    ├── css/main.css            Previous styles — still used by case and legal pages and the lightbox
    ├── css/tailwind.css        Compiled Tailwind utilities used by case and legal pages (generated, see below)
    ├── js/tailwind.config.js   Tailwind theme (colours, type scale, spacing)
    ├── js/main.js              EN/DE copy, language, menu, CV overlay, case-page contents; fires `langchange`
    ├── js/motion.js            Home-page motion: starfield hero, case entrances, pinned "What I do" with CSS-3D scenes,
    │                           lit About paragraph, fact tiles, document stack, contact bars, smooth scroll
    ├── js/vendor/              GSAP 3.13 + ScrollTrigger (GreenSock standard licence, free), Lenis 1.3.23 (MIT)
    ├── fonts/                  Satoshi (ITF Free Font License, see Satoshi-License-FFL.txt)
    ├── docs/                   CV PDFs (EN, DE) — linked as downloads
    └── images/
        ├── hero/  about/  meta/        Portrait, OG image, touch icon
        └── work/{konform,onset,marp}/
            ├── card-cover.webp         Card on the page
            ├── case-cover.webp         Cover inside the case-study overlay
            ├── screens/                Product screens
            └── design-system/          Design-system plates
```

Case-study text lives in `work/*.html`; card and UI copy in the `COPY` object in `assets/js/main.js` (`en`, `de`). The language travels between pages as `?lang=de` / `?lang=en`; nothing is stored in the browser.

## Motion

The home page is complete without JavaScript; `motion.js` only adds movement on top.

- **Dot field (all sizes):** the band between the hero and "Law taught me order" (`.field`, canvas). Squares light up under the pointer and fade in a trail; click and hold sends out waves. On touch screens cells twinkle on their own and a tap sends a wave. Decorative, `aria-hidden`; the hint text is `field.hint` in `main.js`.
- **Rails (all sizes):** three section dividers (`[data-rail]`): cases → "What I do" (right to left), "What I bring" → About (left to right), Experience → Contact (right to left). One blue cube rolls along the line with the scroll and draws it behind itself; scrolling back rolls it back.
- **Desktop (≥ 900 px):** smooth scroll (Lenis), the hero holds for one screen while the stars assemble into an interface, each case un-tilts into place as it scrolls in (cases stay in normal flow, one per screen), "What I do" pins and steps through eight scenes, the About paragraph lights up word by word, the document stack fans open.
- **Phones and tablets below 900 px:** native scroll, no ScrollTrigger pins. "What I do" is held with CSS `position: sticky` (blue text panel on top, scene below, as on DeepBook's mobile page) when every step's text fits the panel; on very small screens it falls back to a list of blue cards. Case covers un-tilt, the About paragraph lights up and the document stack fans open with the scroll; the hero assembles by itself after a second.
- **Reduced motion:** everything is shown in its final state; the hero draws the assembled interface once.

The text-splitting effects re-run after an EN/DE switch (`langchange` event from `main.js`). Crossing the 900 px breakpoint reloads the page so the right scroll model is built.

Menu links scroll with `motion.js`, re-measure on arrival and highlight the section in view (`aria-current`). Do not add `scroll-behavior: smooth` for the home page: ScrollTrigger needs instant programmatic scrolls.

**Cache busting.** Stylesheets and scripts are linked with `?v=YYYYMMDDx` (currently `20261106a`) on all six pages. Change it on every page whenever a CSS or JS file changes, or returning visitors keep the old files.

**Deploy health check.** The server checks `/assets/images/hero/portrait.webp` and `/assets/fonts/Satoshi-Regular.woff2` after every release (see `deploy/server_deploy.py` in the repository). Neither is used by the redesigned home page, but both must stay in `site/`.

## Run locally

Any static server, from inside `site/`:

```
npx serve .        # or: python3 -m http.server 8000
```

Opening `index.html` directly from disk also works, but font preloading and PDF downloads behave best over HTTP.

To try it on a phone in the same Wi-Fi: `python3 -m http.server 8000 --bind 0.0.0.0` in `site/`, then open `http://<the Mac's IP>:8000` on the phone (`ipconfig getifaddr en0` prints the IP).

## Before going live

1. **Legal.** Impressum and Datenschutz are filled in for Hetzner Webhosting (7-day Apache logs, anonymised IPs). Conclude the AVV in the Hetzner account. If a USt-IdNr. or W-IdNr. is issued later, add it to the Impressum; never publish the Steuernummer.
2. **Tailwind.** `assets/css/tailwind.css` is compiled and served locally, no CDN. After adding new utility classes, recompile with Tailwind CSS v3: a `tailwind.config.js` with `module.exports = { content: ['./*.html', './work/*.html'], theme: { … } }` (theme from `assets/js/tailwind.config.js`), then `npx tailwindcss@3 -i input.css -o assets/css/tailwind.css --minify` with `input.css` containing `@tailwind base; @tailwind components; @tailwind utilities;`. Keep the `tailwind.css` link after `main.css`.
3. **Fonts.** One family, Satoshi (static Regular for body text, variable cut for weights 600–900, `.woff2`), self-hosted, free for commercial use under the ITF Free Font License. Keep the licence file next to the fonts.
4. **Domain.** `og:url`, `og:image` and the case-page canonical links point to `https://borisonofrei.design/`. Change them if the site lives elsewhere.
5. **Hosting.** Netlify, Vercel, Cloudflare Pages or GitHub Pages — deploy the `site/` folder as-is. Enable gzip/brotli and long cache headers for `/assets/*`.

## Images

All images are WebP (quality 90, photos 86), max 2400 px wide — enough for 2× displays at the widest layout. Originals are kept outside this folder in the design project. Total image weight went from 57 MB to about 11 MB.

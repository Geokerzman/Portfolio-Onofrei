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
    ├── css/main.css            Custom styles (font, components, case and legal pages)
    ├── css/tailwind.css        Compiled Tailwind utilities (generated, see below)
    ├── js/tailwind.config.js   Tailwind theme (colours, type scale, spacing)
    ├── js/main.js              EN/DE copy, language, menu, filters, CV overlay, case-page contents
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

## Run locally

Any static server, from inside `site/`:

```
npx serve .        # or: python3 -m http.server 8000
```

Opening `index.html` directly from disk also works, but font preloading and PDF downloads behave best over HTTP.

## Before going live

1. **Legal.** Impressum and Datenschutz are filled in for Hetzner Webhosting (7-day Apache logs, anonymised IPs). Conclude the AVV in the Hetzner account. If a USt-IdNr. or W-IdNr. is issued later, add it to the Impressum; never publish the Steuernummer.
2. **Tailwind.** `assets/css/tailwind.css` is compiled and served locally, no CDN. After adding new utility classes, recompile with Tailwind CSS v3: a `tailwind.config.js` with `module.exports = { content: ['./*.html', './work/*.html'], theme: { … } }` (theme from `assets/js/tailwind.config.js`), then `npx tailwindcss@3 -i input.css -o assets/css/tailwind.css --minify` with `input.css` containing `@tailwind base; @tailwind components; @tailwind utilities;`. Keep the `tailwind.css` link after `main.css`.
3. **Fonts.** One family, Satoshi (static Regular for body text, variable cut for weights 600–900, `.woff2`), self-hosted, free for commercial use under the ITF Free Font License. Keep the licence file next to the fonts.
4. **Domain.** `og:url`, `og:image` and the case-page canonical links point to `https://borisonofrei.design/`. Change them if the site lives elsewhere.
5. **Hosting.** Netlify, Vercel, Cloudflare Pages or GitHub Pages — deploy the `site/` folder as-is. Enable gzip/brotli and long cache headers for `/assets/*`.

## Images

All images are WebP (quality 90, photos 86), max 2400 px wide — enough for 2× displays at the widest layout. Originals are kept outside this folder in the design project. Total image weight went from 57 MB to about 11 MB.

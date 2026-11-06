/* ==========================================================
   Boris Onofrei — portfolio motion layer (home page)
   Loaded after main.js (copy, language, menu) and the vendor
   libraries (GSAP 3 + ScrollTrigger, Lenis). Everything here is
   decoration: without it the page is complete and readable.
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeIO = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const div = cls => { const d = document.createElement('div'); if (cls) d.className = cls; return d; };

  const root = document.documentElement;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_GSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const WIDE = window.matchMedia('(min-width: 900px)');
  const MOTION = !REDUCED && HAS_GSAP;                    // scroll-linked effects at any width
  const FULL = MOTION && WIDE.matches;                    // desktop: pinning + smooth scroll
  const MOBILE = MOTION && !WIDE.matches;                 // phones/tablets: sticky story, native scroll

  root.classList.add('motion-ready');
  if (REDUCED) root.classList.add('reveal-all');
  if (MOTION) gsap.registerPlugin(ScrollTrigger);
  if (FULL) root.classList.add('motion');
  if (MOBILE) { root.classList.add('motion-m'); ScrollTrigger.config({ ignoreMobileResize: true }); }

  /* crossing the breakpoint changes the whole scroll model: rebuild cleanly */
  const onWide = () => { if (!REDUCED && HAS_GSAP) window.location.reload(); };
  if (WIDE.addEventListener) WIDE.addEventListener('change', onWide);

  /* ---------------------------------------------------------
     Text splitting (re-run after every language change)
     --------------------------------------------------------- */
  function wrapWords(el, cls, withIndex, start) {
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    el.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    let i = start || 0;
    text.split(' ').forEach((word, k) => {
      if (k) vis.appendChild(document.createTextNode(' '));
      const w = document.createElement('span'); w.className = cls;
      if (withIndex) {
        const wi = document.createElement('span'); wi.className = 'wi'; wi.style.setProperty('--i', i);
        wi.textContent = word; w.appendChild(wi);
      } else { w.textContent = word; }
      i++;
      vis.appendChild(w);
    });
    el.append(sr, vis);
    return i;
  }

  function splitHeadings() {
    const groups = new Map();
    $$('[data-split]').forEach(el => {
      const g = el.parentElement;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(el);
    });
    groups.forEach(list => { let n = 0; list.forEach(el => { n = wrapWords(el, 'w', true, n); }); });
  }

  let litWords = [];
  function splitParagraph() {
    const p = $('[data-words]'); if (!p) return;
    if (MOTION) { wrapWords(p, 'w', false, 0); litWords = $$('.w', p); }
  }

  function splitRolls() {
    $$('[data-roll]').forEach(el => {
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      el.classList.add('roll');
      el.textContent = '';
      const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
      const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
      let i = 0;
      text.split(' ').forEach((word, k) => {
        if (k) vis.appendChild(document.createTextNode(' '));
        const cw = document.createElement('span'); cw.className = 'cw';
        Array.from(word).forEach(ch => {
          const c = document.createElement('span'); c.className = 'c';
          const ci = document.createElement('span'); ci.className = 'ci'; ci.style.setProperty('--i', i++);
          ci.textContent = ch; c.appendChild(ci); cw.appendChild(c);
        });
        vis.appendChild(cw);
      });
      el.append(sr, vis);
    });
  }

  function splitAll() { splitHeadings(); splitParagraph(); splitRolls(); }
  if (!REDUCED) splitAll();

  /* ---------------------------------------------------------
     Reveal on enter (IntersectionObserver)
     --------------------------------------------------------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('is-in');
      if (el.hasAttribute('data-fact')) { const r = $('[data-roll]', el); if (r) r.classList.add('is-in'); }
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: .01 }) : null;

  if (io && !REDUCED) {
    $$('[data-reveal], [data-split], [data-fact]').forEach(el => io.observe(el));
    if (!FULL) $$('.case__frame').forEach(el => io.observe(el));
  } else {
    $$('[data-reveal], [data-split], [data-fact], .case__frame, [data-roll]').forEach(el => el.classList.add('is-in'));
  }

  /* ---------------------------------------------------------
     Smooth scroll + in-page anchors
     --------------------------------------------------------- */
  let lenis = null;
  if (FULL && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: .11, wheelMultiplier: .95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function targetY(el) {
    if (el.id === 'hero' || el.id === 'main') return 0;
    return Math.max(0, el.getBoundingClientRect().top + window.pageYOffset);
  }
  /* after the jump, re-measure: if anything above moved (fonts, images,
     a pin refresh), land exactly on the section anyway */
  function settleOn(el) {
    const y = targetY(el);
    if (Math.abs(y - window.pageYOffset) <= 2) return;
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo({ top: y, behavior: 'auto' });
  }
  let pendingFix = null, jumpId = 0;
  function goTo(el, instant) {
    if (FULL) ScrollTrigger.update();
    const y = targetY(el);
    const id = ++jumpId;
    if (pendingFix) { window.removeEventListener('scrollend', pendingFix); pendingFix = null; }
    if (lenis) {
      /* lock: trackpad momentum must not cancel a menu jump half-way */
      lenis.scrollTo(y, {
        duration: instant ? 0 : 1.2, immediate: !!instant, easing: easeIO, force: true, lock: true,
        onComplete: () => { if (id === jumpId) settleOn(el); }
      });
    } else {
      const smooth = !instant && !REDUCED && Math.abs(y - window.pageYOffset) > 2;
      window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
      /* one correction only, for this jump, and only right after it */
      if (smooth && 'onscrollend' in window) {
        const t0 = Date.now();
        pendingFix = () => {
          window.removeEventListener('scrollend', pendingFix); pendingFix = null;
          if (Date.now() - t0 < 3000) settleOn(el);
        };
        window.addEventListener('scrollend', pendingFix);
      }
    }
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const id = decodeURIComponent(a.getAttribute('href').slice(1));
    const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    goTo(el);
    try { history.replaceState(null, '', window.location.pathname + window.location.search + '#' + id); } catch (err) { /* file:// */ }
  });

  /* ---------------------------------------------------------
     HERO — starfield that assembles into an interface
     --------------------------------------------------------- */
  function buildHero() {
    const hero = $('#hero'); if (!hero) return null;
    const canvas = $('.hero__canvas', hero), content = $('.hero__content', hero);
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, frame = { x: 0, y: 0, w: 0, h: 0 }, stars = [], parts = [];
    const state = { p: REDUCED ? 1 : 0, target: REDUCED ? 1 : 0, visible: true, auto: !FULL && !REDUCED, t0: performance.now() };
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, sx: 0, sy: 0 };
    const C = {
      line: [255, 255, 255, .55], soft: [255, 255, 255, .24], tile: [255, 255, 255, .36],
      white: [255, 255, 255, .95], dim: [255, 255, 255, .42], blue: [30, 110, 243, 1]
    };

    function targets() {
      const fw = frame.w, fh = frame.h, out = [];
      const add = (x, y, c) => out.push({ x: frame.x + x, y: frame.y + y, c });
      const outline = (rx, ry, rw, rh, c, sp = 7) => {
        const x = rx * fw, y = ry * fh, w = rw * fw, h = rh * fh;
        for (let i = 0; i <= w; i += sp) { add(x + i, y, c); add(x + i, y + h, c); }
        for (let j = sp; j < h; j += sp) { add(x, y + j, c); add(x + w, y + j, c); }
      };
      const hline = (rx, ry, rw, c, sp = 9) => { const x = rx * fw, y = ry * fh, w = rw * fw; for (let i = 0; i <= w; i += sp) add(x + i, y, c); };
      const vline = (rx, ry, rh, c, sp = 9) => { const x = rx * fw, y = ry * fh, h = rh * fh; for (let j = 0; j <= h; j += sp) add(x, y + j, c); };
      const fill = (rx, ry, rw, rh, c, sp = 6) => {
        const x = rx * fw, y = ry * fh, w = rw * fw, h = rh * fh;
        for (let j = 0; j <= h; j += sp) for (let i = 0; i <= w; i += sp) add(x + i, y + j, typeof c === 'function' ? c(i / (w || 1), j / (h || 1)) : c);
      };
      outline(0, 0, 1, 1, C.line, 7);
      hline(0, .1, 1, C.soft);
      [.03, .05, .07].forEach(x => fill(x, .04, .006, .018, C.dim, 4));
      vline(.2, .1, .9, C.soft);
      for (let i = 0; i < 6; i++) fill(.035, .18 + i * .085, i === 1 ? .12 : .1 - (i % 3) * .02, .022, i === 1 ? C.blue : C.dim, 5);
      fill(.25, .16, .2, .04, C.white, 5);
      fill(.25, .225, .13, .022, C.dim, 5);
      fill(.83, .155, .12, .05, C.blue, 5);
      [.25, .49, .73].forEach((x, k) => {
        outline(x, .3, .22, .17, C.tile, 8);
        fill(x + .02, .335, .07, .02, C.dim, 5);
        fill(x + .02, .385, k === 2 ? .1 : .12, .045, k === 2 ? C.blue : C.white, 5);
      });
      const hs = [.35, .5, .42, .6, .55, .72, .64, .8, .7, .88, .82, 1];
      const n = hs.length, x0 = .25, cw = .7, base = .9, span = .3;
      hs.forEach((v, i) => {
        const bw = cw / n - .022, bx = x0 + i * (cw / n) + .011, bh = v * span;
        fill(bx, base - bh, bw, bh, (u, t) => [30, 110, 243, .3 + .7 * (1 - t)], 6);
      });
      hline(.25, .925, .7, C.soft, 8);
      return out;
    }

    function layout() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const zoneTop = 14 + 52 + 30;
      const zoneBot = content.offsetTop - 28;
      const zoneH = Math.max(110, zoneBot - zoneTop);
      /* the frame keeps its earlier size and place above the copy (~720 px on desktop) */
      let fw = W >= 900 ? Math.min(720, W * .5) : W - 40, fh = fw * .56;
      if (fh > zoneH) { fh = zoneH; fw = fh / .56; }
      if (fw > W - 40) { fw = W - 40; fh = fw * .56; }
      frame = { w: fw, h: fh, x: (W - fw) / 2, y: zoneTop + Math.max(0, (zoneH - fh) / 2) };
      const nStars = Math.round((W * H) / 2300);
      stars = Array.from({ length: nStars }, () => ({
        x: Math.random() * W, y: Math.random() * H, z: Math.random(),
        tw: Math.random() * Math.PI * 2, big: Math.random() < .07
      }));
      parts = targets().map(t => ({
        sx: Math.random() * W, sy: Math.random() * H, tx: t.x, ty: t.y, c: t.c,
        a0: .14 + Math.random() * .4, ph: Math.random() * Math.PI * 2, sp: .25 + Math.random() * .6,
        amp: 6 + Math.random() * 22, z: .3 + Math.random() * .7,
        d: clamp((t.x - frame.x) / frame.w) * .3 + Math.random() * .14, ox: 0, oy: 0
      }));
    }

    function draw(now) {
      const t = (now - state.t0) / 1000;
      if (state.auto) state.target = clamp((t - .9) / 2.8);
      state.p += (state.target - state.p) * (REDUCED ? 1 : .12);
      mouse.sx += (mouse.nx - mouse.sx) * .05;
      mouse.sy += (mouse.ny - mouse.sy) * .05;
      const P = state.p;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const x = s.x - mouse.sx * 30 * s.z;
        const y = s.y - mouse.sy * 20 * s.z - P * 80 * s.z;
        const tw = REDUCED ? 1 : .55 + .45 * Math.sin(t * (.5 + s.z * 1.2) + s.tw);
        const a = (.14 + .55 * s.z) * tw * (1 - P * .4);
        const r = (s.big ? 1.9 : 1) * (.7 + s.z * .6);
        ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
        ctx.fillRect(x, y, r, r);
      }

      const R = 120;
      for (let i = 0; i < parts.length; i++) {
        const q = parts[i];
        const k = easeIO(clamp((P - q.d) / .56));
        const fl = REDUCED ? 0 : 1;
        const cx = q.sx + Math.sin(t * q.sp + q.ph) * q.amp * fl - mouse.sx * 24 * q.z;
        const cy = q.sy + Math.cos(t * q.sp * .8 + q.ph) * q.amp * fl - mouse.sy * 16 * q.z;
        let x = lerp(cx, q.tx, k), y = lerp(cy, q.ty, k);
        const dx = x - mouse.x, dy = y - mouse.y, dist = Math.hypot(dx, dy) || 1;
        const push = dist < R ? (1 - dist / R) * 26 : 0;
        q.ox += ((dx / dist) * push - q.ox) * .14;
        q.oy += ((dy / dist) * push - q.oy) * .14;
        x += q.ox; y += q.oy;
        const c = q.c;
        ctx.fillStyle = 'rgba(' + Math.round(lerp(255, c[0], k)) + ',' + Math.round(lerp(255, c[1], k)) + ',' +
          Math.round(lerp(255, c[2], k)) + ',' + lerp(q.a0, c[3], k).toFixed(3) + ')';
        const sz = lerp(1.6, 2.4, k);
        ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
      }
    }

    let raf = 0;
    function loop(now) { raf = 0; if (!state.visible || document.hidden) return; draw(now); raf = requestAnimationFrame(loop); }
    function kick() { if (!raf && !REDUCED) raf = requestAnimationFrame(loop); }

    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.nx = (mouse.x / W - .5) * 2; mouse.ny = (mouse.y / H - .5) * 2;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; mouse.nx = mouse.ny = 0; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => es.forEach(e => { state.visible = e.isIntersecting; if (state.visible) kick(); })).observe(hero);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });

    let rT = 0;
    window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { layout(); if (REDUCED) draw(performance.now()); }, 120); });

    const ready = () => { layout(); hero.classList.add('is-ready'); if (REDUCED) draw(performance.now()); else kick(); };
    layout();
    if (document.fonts && document.fonts.ready) {
      let done = false;
      const go = () => { if (!done) { done = true; ready(); } };
      document.fonts.ready.then(go);
      setTimeout(go, 700);
    } else ready();
    if (REDUCED) draw(performance.now()); else kick();

    return state;
  }
  const heroState = buildHero();

  /* ---------------------------------------------------------
     ISO helpers (CSS 3D boxes, same projection as the CSS)
     --------------------------------------------------------- */
  const RX = 57 * Math.PI / 180, CX = Math.cos(RX), SX = Math.sin(RX), R2 = Math.SQRT2;
  const project = (x, y, z) => [(x - y) / R2, ((x + y) / R2) * CX - z * SX];

  function makeBox(o) {
    const b = div('box ' + (o.cls || 'b-white'));
    b.style.width = o.w + 'px'; b.style.height = o.d + 'px';
    const top = div('f top'); top.style.width = o.w + 'px'; top.style.height = o.d + 'px';
    top.style.transform = 'translateZ(' + o.h + 'px)';
    if (o.label) top.textContent = o.label;
    const front = div('f front'); front.style.width = o.w + 'px'; front.style.height = o.h + 'px';
    front.style.transform = 'translate3d(0,' + o.d + 'px,' + o.h + 'px) rotateX(-90deg)';
    const right = div('f right'); right.style.width = o.d + 'px'; right.style.height = o.h + 'px';
    right.style.transform = 'translate3d(' + o.w + 'px,0,' + o.h + 'px) rotateZ(90deg) rotateX(-90deg)';
    b.append(right, front, top);
    return b;
  }

  function makeScene(stage, ext0, pad) {
    const iso = div('iso');
    stage.appendChild(iso);
    let ext = ext0;
    const fit = next => {
      if (next) ext = next;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const x of [ext.x0, ext.x1]) for (const y of [ext.y0, ext.y1]) for (const z of [ext.z0, ext.z1]) {
        const p = project(x, y, z);
        minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]);
      }
      const r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const s = Math.min((r.width * pad) / (maxX - minX), (r.height * pad) / (maxY - minY), 1.6);
      iso.style.setProperty('--s', s.toFixed(4));
      iso.style.setProperty('--tx', (-(minX + maxX) / 2 * s).toFixed(1) + 'px');
      iso.style.setProperty('--ty', (-(minY + maxY) / 2 * s).toFixed(1) + 'px');
    };
    return { iso, fit };
  }
  const fitters = [];
  window.addEventListener('resize', () => fitters.forEach(f => f()));

  /* bounding volume of a scene's boxes, with headroom for the idle motion */
  const extentOf = items => items.reduce((e, it) => {
    const o = it.o, z = o.z || 0;
    return {
      x0: Math.min(e.x0, o.x), x1: Math.max(e.x1, o.x + o.w),
      y0: Math.min(e.y0, o.y), y1: Math.max(e.y1, o.y + o.d),
      z0: Math.min(e.z0, z), z1: Math.max(e.z1, z + o.h + 26)
    };
  }, { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity, z0: Infinity, z1: -Infinity });

  /* a placed box: wrapper carries the position, inner box can grow / spin */
  function place(parent, o) {
    const wrap = div('grp');
    const box = makeBox(o);
    wrap.appendChild(box);
    parent.appendChild(wrap);
    const pos = { x: o.x || 0, y: o.y || 0, z: o.z || 0 };
    gsap.set(wrap, { x: pos.x, y: pos.y, z: pos.z });
    return { wrap, box, pos, o, faces: $$('.f', box) };
  }
  const setGrow = (it, v) => { it.box.style.transform = 'scale3d(1,1,' + Math.max(.001, v) + ')'; };

  /* ---------------------------------------------------------
     WHAT I DO — eight iso scenes, one per capability
     --------------------------------------------------------- */
  const SCENES = [
    /* 0 · Enterprise and B2B — stacked platform layers, roles on top */
    g => {
      const L = [
        { x: -110, y: -110, w: 220, d: 220, h: 18, z: 0, cls: 'b-grey' },
        { x: -110, y: -110, w: 220, d: 220, h: 18, z: 48, cls: 'b-white lines' },
        { x: -110, y: -110, w: 220, d: 220, h: 18, z: 96, cls: 'b-blue' },
        { x: -80, y: -80, w: 64, d: 46, h: 12, z: 114, cls: 'b-white' },
        { x: 4, y: -80, w: 64, d: 46, h: 12, z: 114, cls: 'b-white' },
        { x: -80, y: 0, w: 148, d: 46, h: 12, z: 114, cls: 'b-ink' }
      ].map(o => place(g, o));
      return { items: L, idle: tl => tl.to(L.slice(2).map(i => i.wrap), { z: '+=10', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }) };
    },
    /* 1 · Accessibility — a button inside its focus ring, a Tab key */
    g => {
      const base = place(g, { x: -125, y: -125, w: 250, d: 250, h: 14, cls: 'b-white' });
      const btn = place(g, { x: -70, y: -30, w: 150, d: 66, h: 20, z: 14, cls: 'b-blue', label: 'Button' });
      const ring = place(g, { x: -84, y: -44, w: 178, d: 94, h: 30, z: 12, cls: 'b-ghost' });
      const key = place(g, { x: -100, y: 64, w: 58, d: 52, h: 24, z: 14, cls: 'b-ink', label: 'Tab' });
      return { items: [base, key, btn, ring], idle: tl => tl.to(ring.box, { scale: 1.05, duration: .9, ease: 'sine.inOut', yoyo: true, repeat: -1 }) };
    },
    /* 2 · Design systems — token blocks snap onto a grid */
    g => {
      const base = place(g, { x: -125, y: -125, w: 250, d: 250, h: 14, cls: 'b-white' });
      const cells = [];
      const cls = ['b-white studs', 'b-grey studs', 'b-white studs', 'b-grey studs', 'b-ink', 'b-white studs', 'b-white studs', 'b-grey studs', 'b-blue studs'];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        const k = r * 3 + c;
        cells.push(place(g, { x: -111 + c * 76, y: -111 + r * 76, w: 68, d: 68, h: k === 8 ? 30 : 22, z: 14, cls: cls[k] }));
      }
      const blue = cells[8];
      return { items: [base].concat(cells), idle: tl => tl.to(blue.wrap, { z: 30, duration: .7, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: .6 }) };
    },
    /* 3 · UX and research — a user flow: nodes and connectors */
    g => {
      const base = place(g, { x: -140, y: -110, w: 280, d: 220, h: 14, cls: 'b-white' });
      const n = [
        { x: -110, y: -80, cls: 'b-ink' }, { x: 20, y: -80, cls: 'b-white' },
        { x: 20, y: 40, cls: 'b-white' }, { x: 80, y: 40, cls: 'b-blue' }
      ].map(o => place(g, { x: o.x, y: o.y, w: 44, d: 44, h: 26, z: 14, cls: o.cls }));
      const links = [
        { x: -66, y: -61, w: 86, d: 6 }, { x: 39, y: -36, w: 6, d: 76 }, { x: 64, y: 59, w: 16, d: 6 }
      ].map(o => place(g, { x: o.x, y: o.y, w: o.w, d: o.d, h: 4, z: 14, cls: 'b-ink', stretch: o.w > o.d ? 'x' : 'y' }));
      return { items: [base].concat(n, links), idle: tl => tl.to(n[3].wrap, { z: 24, duration: .8, ease: 'sine.inOut', yoyo: true, repeat: -1 }) };
    },
    /* 4 · E-commerce — product card, price, add to cart */
    g => {
      const card = place(g, { x: -80, y: -130, w: 160, d: 260, h: 16, cls: 'b-white' });
      const img = place(g, { x: -64, y: -114, w: 128, d: 104, h: 14, z: 16, cls: 'b-grey' });
      const t1 = place(g, { x: -64, y: 2, w: 100, d: 12, h: 4, z: 16, cls: 'b-ink' });
      const t2 = place(g, { x: -64, y: 22, w: 64, d: 10, h: 4, z: 16, cls: 'b-grey' });
      const cta = place(g, { x: -64, y: 62, w: 128, d: 40, h: 14, z: 16, cls: 'b-blue', label: 'Add to cart' });
      const box = place(g, { x: 104, y: 40, w: 52, d: 52, h: 52, z: 0, cls: 'b-blue' });
      return { items: [card, img, t1, t2, cta, box], idle: tl => tl.to(box.wrap, { z: 26, duration: .65, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: .5 }) };
    },
    /* 5 · Tools and front-end — design layer over code layer */
    g => {
      const code = place(g, { x: -130, y: -40, w: 210, d: 170, h: 14, cls: 'b-ink' });
      const lines = [[0, 70], [1, 110], [2, 54], [3, 130], [4, 86], [5, 64]].map(([i, w]) =>
        place(g, { x: -114 + (i % 2) * 14, y: -24 + i * 24, w, d: 8, h: 3, z: 14, cls: i === 3 ? 'b-blue' : 'b-white', stretch: 'x' }));
      const design = place(g, { x: -50, y: -140, w: 200, d: 150, h: 14, z: 64, cls: 'b-white' });
      const comp = [
        place(g, { x: -34, y: -124, w: 90, d: 30, h: 10, z: 78, cls: 'b-blue' }),
        place(g, { x: -34, y: -84, w: 168, d: 18, h: 8, z: 78, cls: 'b-grey' }),
        place(g, { x: -34, y: -56, w: 120, d: 18, h: 8, z: 78, cls: 'b-grey' })
      ];
      return { items: [code].concat(lines, [design], comp), idle: tl => tl.to([design.wrap].concat(comp.map(c => c.wrap)), { z: '+=12', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }) };
    },
    /* 6 · AI-assisted design — a proposal card and a spinning core */
    g => {
      const base = place(g, { x: -125, y: -125, w: 250, d: 250, h: 14, cls: 'b-white' });
      const card = place(g, { x: -105, y: 0, w: 170, d: 96, h: 14, z: 14, cls: 'b-white lines' });
      const chip = place(g, { x: -91, y: 66, w: 60, d: 18, h: 8, z: 28, cls: 'b-blue' });
      const core = place(g, { x: 30, y: -80, w: 56, d: 56, h: 56, z: 70, cls: 'b-blue' });
      const sat = [[-30, -110], [100, -100], [40, -10]].map(([x, y]) => place(g, { x, y, w: 18, d: 18, h: 18, z: 96, cls: 'b-white' }));
      return {
        items: [base, card, chip, core].concat(sat),
        idle: tl => {
          tl.to(core.box, { rotation: 360, duration: 8, ease: 'none', repeat: -1 }, 0);
          tl.to(sat.map(s => s.wrap), { z: '+=16', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: .3 }, 0);
        }
      };
    },
    /* 7 · Measurement — bars grow, the last one blue */
    g => {
      const base = place(g, { x: -140, y: -100, w: 280, d: 200, h: 14, cls: 'b-white' });
      const hs = [46, 80, 62, 112, 156];
      const bars = hs.map((h, i) => place(g, { x: -120 + i * 50, y: -18, w: 36, d: 36, h, z: 14, cls: i === 4 ? 'b-blue' : (i % 2 ? 'b-grey' : 'b-white'), grow: true }));
      return { items: [base].concat(bars), idle: tl => tl.to({ v: 1 }, { v: .82, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1, onUpdate() { setGrow(bars[4], this.targets()[0].v); } }) };
    }
  ];

  function enterScene(sc) {
    if (sc.tl) sc.tl.kill();
    if (sc.idleTl) sc.idleTl.kill();
    sc.g.style.visibility = 'visible';
    const tl = gsap.timeline();
    sc.items.forEach((it, i) => {
      const at = i * .055;
      gsap.set(it.faces, { opacity: 0 });
      tl.to(it.faces, { opacity: 1, duration: .25, ease: 'none' }, at);
      if (it.o.grow) {
        const pr = { v: 0 };
        setGrow(it, 0);
        tl.to(pr, { v: 1, duration: .8, ease: 'power3.out', onUpdate: () => setGrow(it, pr.v) }, at + .1);
      } else if (it.o.stretch) {
        gsap.set(it.box, it.o.stretch === 'x' ? { scaleX: 0, transformOrigin: '0% 50%' } : { scaleY: 0, transformOrigin: '50% 0%' });
        tl.to(it.box, { scaleX: 1, scaleY: 1, duration: .6, ease: 'power3.out' }, at + .15);
      } else {
        tl.fromTo(it.wrap, { z: it.pos.z + 220 }, { z: it.pos.z, duration: .75, ease: 'power3.out' }, at);
      }
    });
    tl.add(() => { sc.idleTl = gsap.timeline(); sc.idle(sc.idleTl); });
    sc.tl = tl;
  }
  function leaveScene(sc) {
    if (sc.tl) sc.tl.kill();
    if (sc.idleTl) sc.idleTl.kill();
    const faces = sc.items.reduce((a, it) => a.concat(it.faces), []);
    sc.tl = gsap.timeline()
      .to(sc.items.map(it => it.wrap), { z: '-=30', duration: .3, ease: 'power2.in' }, 0)
      .to(faces, { opacity: 0, duration: .22, ease: 'none' }, 0)
      .add(() => {
        sc.g.style.visibility = 'hidden';
        sc.items.forEach(it => { gsap.set(it.wrap, { x: it.pos.x, y: it.pos.y, z: it.pos.z }); gsap.set(it.box, { rotation: 0, scale: 1 }); if (it.o.grow) setGrow(it, 1); });
      });
  }

  /* phones: DeepBook keeps the story sticky — blue text panel on top, scene
     below. Use it only if every step's text fits; otherwise keep the list. */
  function capsStickyFits() {
    const sec = $('#capabilities'), box = $('.caps__steps', sec);
    if (!box) return false;
    const room = box.clientHeight;
    return $$('.cap', sec).every(c => {
      let h = 0;
      Array.from(c.children).forEach(ch => { h += ch.offsetHeight + parseFloat(getComputedStyle(ch).marginTop || 0); });
      return h <= room;
    });
  }
  function setupCapsSticky() {
    const sec = $('#capabilities'); if (!sec || !MOBILE) return false;
    sec.style.setProperty('--caps-n', $$('.cap', sec).length);
    root.classList.add('caps-sticky');
    for (const f of [.4, .34, .28]) {
      sec.style.setProperty('--stage', f);
      if (capsStickyFits()) return true;
    }
    root.classList.remove('caps-sticky');
    return false;
  }
  let STICKY = setupCapsSticky();

  function buildCaps() {
    const stage = $('[data-iso="caps"]'); if (!stage || !(FULL || STICKY)) return null;
    const { iso, fit } = makeScene(stage, { x0: -150, x1: 150, y0: -150, y1: 150, z0: 0, z1: 170 }, .84);
    const scenes = SCENES.map(build => {
      const g = div('grp'); g.style.visibility = 'hidden'; iso.appendChild(g);
      const def = build(g);
      return { g, items: def.items, idle: def.idle, ext: extentOf(def.items), tl: null, idleTl: null };
    });
    fitters.push(() => fit());
    let cur = -1;
    return {
      show(i) {
        if (i === cur) return;
        const first = cur === -1;
        if (!first) leaveScene(scenes[cur]);
        cur = i;
        fit(scenes[i].ext);
        setTimeout(() => { if (cur === i) enterScene(scenes[i]); }, first ? 0 : 160);
      },
      refit: () => fit()
    };
  }

  /* ---------------------------------------------------------
     EXPERIENCE — stack of documents that fans open
     --------------------------------------------------------- */
  function buildDocs() {
    const stage = $('[data-iso="docs"]'); if (!stage || !HAS_GSAP) return null;
    const W = 200, D = 260, H = 8;
    const { iso, fit } = makeScene(stage, { x0: -W / 2 - 40, x1: W / 2 + 40, y0: -D / 2 - 20, y1: D / 2 + 20, z0: 0, z1: 4 * 56 + H }, .92);
    const defs = [
      { cls: 'b-grey' }, { cls: 'b-white lines' }, { cls: 'b-white lines' }, { cls: 'b-blue lines' }
    ];
    const docs = defs.map((o, i) => place(iso, { x: -W / 2, y: -D / 2, w: W, d: D, h: H, z: i * (H + 2), cls: o.cls }));
    const tabs = docs.map((d, i) => place(iso, { x: -W / 2 + 20 + i * 34, y: -D / 2 - 14, w: 28, d: 14, h: H, z: i * (H + 2), cls: i === 3 ? 'b-blue' : 'b-ink' }));
    fitters.push(fit); fit();
    const open = p => docs.forEach((d, i) => {
      const z = i * lerp(H + 2, 56, p);
      gsap.set(d.wrap, { z, x: d.pos.x + i * 14 * p, y: d.pos.y - i * 10 * p });
      gsap.set(tabs[i].wrap, { z, x: tabs[i].pos.x + i * 14 * p, y: tabs[i].pos.y - i * 10 * p });
    });
    open(MOTION ? 0 : 1);
    return { open };
  }

  /* ---------------------------------------------------------
     CONTACT — blue bars on both edges
     --------------------------------------------------------- */
  function buildBars() {
    const sec = $('#contact'), canvas = $('.contact__bars');
    if (!sec || !canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, cols = [], visible = false, raf = 0;
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const step = W < 700 ? 14 : 12;
      cols = [];
      for (let x = step / 2; x < W; x += step) {
        const u = x / W, edge = Math.abs(u - .5) * 2;                 // 0 centre → 1 edge
        const env = Math.pow(clamp((edge - .28) / .72), 1.25);
        if (env <= .02) continue;
        cols.push({ x, env, seed: Math.random() * 10, w: Math.random() < .25 ? 3 : 2, top: Math.random() < .5 });
      }
    };
    const draw = now => {
      const t = REDUCED ? 0 : now / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      for (const c of cols) {
        const v = .55 + .45 * Math.sin(t * .7 + c.seed) * Math.sin(t * .31 + c.seed * 2);
        const h = H * (.12 + .78 * c.env * v);
        const y0 = c.top ? 0 : H - h;
        const g = ctx.createLinearGradient(0, y0, 0, y0 + h);
        const a = .25 + .7 * c.env;
        if (c.top) { g.addColorStop(0, 'rgba(30,110,243,' + a + ')'); g.addColorStop(1, 'rgba(30,110,243,0)'); }
        else { g.addColorStop(0, 'rgba(30,110,243,0)'); g.addColorStop(1, 'rgba(30,110,243,' + a + ')'); }
        ctx.fillStyle = g;
        ctx.fillRect(c.x, y0, c.w, h);
      }
    };
    const loop = now => { raf = 0; if (!visible || document.hidden) return; draw(now); raf = requestAnimationFrame(loop); };
    size();
    window.addEventListener('resize', () => { size(); if (REDUCED) draw(0); });
    if (REDUCED) { draw(0); return; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); })).observe(sec);
    }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(loop); });
  }
  buildBars();

  /* ---------------------------------------------------------
     FIELD — dot grid under the hero. Squares light up under the
     pointer and fade in a trail; click and hold sends out waves.
     Touch screens: a gentle twinkle, and a tap sends a wave.
     --------------------------------------------------------- */
  function buildField() {
    const sec = $('.field'), canvas = $('.field__canvas', sec || document), cursor = $('.field__cursor', sec || document);
    if (!sec || !canvas) return;
    const ctx = canvas.getContext('2d');
    const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const IN = REDUCED ? 1 : .32, OUT = REDUCED ? 1 : .075;
    let W = 0, H = 0, dpr = 1, S = 72, cols = 0, rows = 0, ox = 0, oy = 0, cells = [];
    let visible = false, raf = 0, lastCell = -1, rings = [], holding = false, holdT = 0, twinkleT = 0;
    const pos = { x: -999, y: -999, cx: 0, cy: 0, inside: false };

    function size() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = sec.clientWidth; H = sec.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      S = W >= 900 ? 72 : 48;
      cols = Math.max(1, Math.floor(W / S)); rows = Math.max(1, Math.floor(H / S));
      ox = (W - cols * S) / 2; oy = (H - rows * S) / 2;
      cells = Array.from({ length: cols * rows }, () => ({ e: 0, until: 0 }));
      lastCell = -1;
      draw(performance.now());
    }
    const cellAt = (x, y) => {
      const c = Math.floor((x - ox) / S), r = Math.floor((y - oy) / S);
      return c >= 0 && c < cols && r >= 0 && r < rows ? r * cols + c : -1;
    };
    const light = (i, now, hold) => { if (i >= 0 && cells[i]) cells[i].until = Math.max(cells[i].until, now + hold); };
    /* every cell on the way from the last one, so fast moves leave no gaps */
    function trail(from, to, now) {
      if (to < 0) return;
      if (from < 0) { light(to, now, 170); return; }
      let x0 = from % cols, y0 = (from / cols) | 0;
      const x1 = to % cols, y1 = (to / cols) | 0;
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
      let err = dx + dy, k = 0;
      for (;;) {
        light(y0 * cols + x0, now, 110 + k * 12);
        if ((x0 === x1 && y0 === y1) || ++k > 64) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x0 += sx; }
        if (e2 <= dx) { err += dx; y0 += sy; }
      }
    }
    const ring = (x, y, now) => ({ x, y, t0: now, v: W >= 900 ? .95 : .6, max: Math.hypot(W, H) + S });

    function square(x, y, s, r) {
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, s, s, r); ctx.fill(); }
      else ctx.fillRect(x, y, s, s);
    }
    function draw(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      rings = rings.filter(r => (now - r.t0) * r.v < r.max);
      let busy = rings.length > 0;
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const x = ox + (i % cols) * S + S / 2, y = oy + ((i / cols) | 0) * S + S / 2;
        for (let k = 0; k < rings.length; k++) {
          const r = rings[k], rad = (now - r.t0) * r.v;
          if (Math.abs(Math.hypot(x - r.x, y - r.y) - rad) < S * .5) c.until = Math.max(c.until, now + 80);
        }
        const on = now < c.until;
        c.e += ((on ? 1 : 0) - c.e) * (on ? IN : OUT);
        if (c.e < .003) c.e = 0;
        if (c.e > 0 || on) busy = true;
        if (c.e > 0) {
          const s = S * .47 * c.e;
          ctx.fillStyle = 'rgba(30,110,243,' + Math.min(.95, c.e * 1.3).toFixed(3) + ')';
          square(x - s / 2, y - s / 2, s, Math.min(6, s / 4));
        }
        ctx.fillStyle = c.e > .4 ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.36)';
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }
      return busy;
    }

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      if (holding && now - holdT > 320) { rings.push(ring(pos.x, pos.y, now)); holdT = now; }
      if (!FINE && !REDUCED && now > twinkleT) {
        light(Math.floor(Math.random() * cells.length), now, 260);
        twinkleT = now + 220 + Math.random() * 420;
      }
      if (cursor && FINE && pos.inside) {
        pos.cx += (pos.x - pos.cx) * .4; pos.cy += (pos.y - pos.cy) * .4;
        cursor.style.transform = 'translate3d(' + pos.cx.toFixed(1) + 'px,' + pos.cy.toFixed(1) + 'px,0)';
      }
      const busy = draw(now);
      if (busy || holding || pos.inside || (!FINE && !REDUCED)) raf = requestAnimationFrame(loop);
    }
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(loop); };
    const local = e => { const r = sec.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

    sec.addEventListener('pointermove', e => {
      const [x, y] = local(e);
      pos.x = x; pos.y = y;
      if (e.pointerType === 'touch') return;          /* a finger here is usually scrolling the page */
      if (!pos.inside) { pos.inside = true; pos.cx = x; pos.cy = y; sec.classList.add('is-hover'); }
      const i = cellAt(x, y);
      if (i !== lastCell) { trail(lastCell, i, performance.now()); lastCell = i; }
      kick();
    }, { passive: true });
    sec.addEventListener('pointerleave', () => {
      pos.inside = false; lastCell = -1; holding = false;
      sec.classList.remove('is-hover', 'is-down');
    });
    sec.addEventListener('pointerdown', e => {
      if (REDUCED) return;
      const [x, y] = local(e), now = performance.now();
      pos.x = x; pos.y = y;
      rings.push(ring(x, y, now));
      if (e.pointerType !== 'touch') { holding = true; holdT = now; sec.classList.add('is-down'); }
      kick();
    });
    const release = () => { holding = false; sec.classList.remove('is-down'); };
    sec.addEventListener('pointerup', release);
    sec.addEventListener('pointercancel', release);
    window.addEventListener('blur', release);

    let rT = 0;
    window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(size, 150); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible) kick(); })).observe(sec);
    } else { visible = true; }
    document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
    size();
  }
  buildField();

  /* ---------------------------------------------------------
     Scroll choreography
     --------------------------------------------------------- */
  const caps = buildCaps();
  const docs = buildDocs();

  /* "What I do" steps: shared by the desktop pin and the phone sticky */
  const steps = $$('.cap'), pager = $$('.caps__pager span'), nSteps = steps.length;
  let curStep = -1;
  const setStep = i => {
    if (i === curStep) return;
    steps.forEach((s, k) => { s.classList.toggle('is-on', k === i); s.classList.toggle('is-before', k < i); });
    pager.forEach((p, k) => { p.classList.toggle('is-on', k === i); p.classList.toggle('is-done', k < i); });
    if (caps) caps.show(i);
    curStep = i;
  };
  const stepFrom = self => setStep(Math.min(nSteps - 1, Math.floor(self.progress * nSteps * .9999)));

  if (FULL) {
    /* 1 · hero holds while the stars assemble */
    ScrollTrigger.create({
      trigger: '#hero', start: 'top top', end: '+=100%', pin: true, pinSpacing: true,
      onUpdate: self => { if (heroState) heroState.target = self.progress; }
    });

    /* 2 · each case: frame corners, text, and the shot un-tilting into place */
    $$('.case').forEach(c => {
      const shot = $('.case__shot', c);
      const text = $$('.case__text > *', c);
      const corners = $$('.pc', c);
      const tl = gsap.timeline({ scrollTrigger: { trigger: c, start: 'top 90%', end: 'top 32%', scrub: .6 } });
      tl.fromTo(shot, { rotateX: 22, rotateY: -16, rotateZ: 2, y: 140, scale: .84 }, { rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, scale: 1, ease: 'power2.out', duration: 1 }, 0)
        .fromTo(text, { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: .07, duration: .5, ease: 'power2.out' }, .1)
        .fromTo(corners, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: .4, stagger: .05 }, 0);
      gsap.to(shot, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: c, start: 'center center', end: 'bottom top', scrub: true } });
    });

    /* 3 · what I do: pinned, one step per ~60% of a screen */
    ScrollTrigger.create({
      trigger: '#capabilities', start: 'top top', end: () => '+=' + Math.round(nSteps * window.innerHeight * .62),
      pin: '.caps__pin', anticipatePin: 1,
      onUpdate: stepFrom,
      onRefresh: () => caps && caps.refit()
    });
    setStep(0);
  }

  if (MOBILE) {
    /* 2 · cases: the cover un-tilts as it scrolls in (text fades in on its own) */
    $$('.case').forEach(c => {
      const shot = $('.case__shot', c);
      gsap.fromTo(shot, { rotateX: 16, rotateY: -10, y: 50, scale: .9 }, {
        rotateX: 0, rotateY: 0, y: 0, scale: 1, ease: 'power2.out',
        scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 35%', scrub: .5 }
      });
    });

    /* 3 · what I do: CSS sticky panel, steps follow the scroll */
    if (STICKY) {
      ScrollTrigger.create({
        trigger: '#capabilities', start: 'top top', end: 'bottom bottom',
        onUpdate: stepFrom,
        onRefresh: () => caps && caps.refit()
      });
      setStep(0);
    }
  }

  if (MOTION) {
    /* 4 · about: words light up as the paragraph passes */
    const para = $('[data-words]');
    if (para) {
      ScrollTrigger.create({
        trigger: para, start: FULL ? 'top 78%' : 'top 85%', end: FULL ? 'bottom 52%' : 'bottom 60%', scrub: true,
        onUpdate: self => {
          const k = Math.round(self.progress * litWords.length);
          for (let i = 0; i < litWords.length; i++) litWords[i].classList.toggle('is-lit', i < k);
        }
      });
    }

    /* 5 · experience: the document stack fans open */
    if (docs) {
      ScrollTrigger.create({
        trigger: '.exp__art', start: 'top 85%', end: 'bottom 35%', scrub: .6,
        onUpdate: self => docs.open(easeIO(self.progress))
      });
    }

    /* 6 · rails: the cube rolls along the line and draws it; scroll back, it rolls back */
    $$('[data-rail]').forEach(rail => {
      const st = { p: 0 }, dir = rail.getAttribute('data-rail') === 'rtl' ? -1 : 1, half = 6;
      const apply = () => {
        const deg = st.p * 720 * dir;                                   /* two full turns end to end */
        const a = (Math.abs(deg) % 90) * Math.PI / 180;                 /* a square pivoting on its edge rises */
        rail.style.setProperty('--p', st.p.toFixed(4));
        rail.style.setProperty('--r', deg.toFixed(2));
        rail.style.setProperty('--lift', (half * (Math.cos(a) + Math.sin(a)) - half).toFixed(2));
      };
      apply();
      gsap.to(st, { p: 1, ease: 'none', onUpdate: apply, scrollTrigger: { trigger: rail, start: 'top 92%', end: 'top 28%', scrub: .6 } });
    });

    /* keep every trigger (and so every menu jump) measured against the real
       layout: fonts arriving late or the page growing re-measure once */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    let lastH = 0, roT = 0;
    ScrollTrigger.addEventListener('refresh', () => { lastH = document.body.scrollHeight; });
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        clearTimeout(roT);
        roT = setTimeout(() => { if (Math.abs(document.body.scrollHeight - lastH) > 2) ScrollTrigger.refresh(); }, 250);
      }).observe(document.body);
    }

    /* phones: re-check the sticky story after fonts arrive or the phone rotates */
    if (MOBILE) {
      const recheck = () => {
        const was = STICKY;
        if (was && !capsStickyFits()) STICKY = setupCapsSticky();
        if (was !== STICKY) ScrollTrigger.refresh();
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(recheck);
      let rT = 0;
      window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(recheck, 200); });
    }
  }

  /* ---------------------------------------------------------
     Menu: highlight the section in view
     --------------------------------------------------------- */
  (function () {
    const owner = { work: 'work', capabilities: 'capabilities', skills: 'capabilities', about: 'about', experience: 'experience', contact: 'contact' };
    const secs = Object.keys(owner).map(id => document.getElementById(id)).filter(Boolean);
    const links = $$('.nav__links a[href^="#"], .nav__panel a[href^="#"]');
    let current = null, ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * .4;
      let id = null;
      secs.forEach(s => { if (s.getBoundingClientRect().top <= line) id = owner[s.id]; });
      if (id === current) return;
      current = id;
      links.forEach(a => {
        if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ---------------------------------------------------------
     Language change → re-split text, re-measure
     --------------------------------------------------------- */
  document.addEventListener('langchange', () => {
    if (REDUCED) return;
    splitAll();
    $$('[data-split], [data-roll]').forEach(el => {
      const host = el.hasAttribute('data-roll') ? el.closest('[data-fact]') : el;
      if (host && host.classList.contains('is-in')) el.classList.add('is-in');
    });
    if (STICKY && !capsStickyFits()) STICKY = setupCapsSticky();
    if (MOTION) ScrollTrigger.refresh();
  });

  /* ---------------------------------------------------------
     After load: measure, then honour a #hash from another page
     --------------------------------------------------------- */
  window.addEventListener('load', () => {
    fitters.forEach(f => f());
    if (!MOTION) return;
    ScrollTrigger.refresh();
    const id = window.location.hash.slice(1);
    const el = id && document.getElementById(decodeURIComponent(id));
    if (el) requestAnimationFrame(() => goTo(el, true));
  });
})();

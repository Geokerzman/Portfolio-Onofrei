/* Boris Onofrei — portfolio: copy (EN/DE), language, navigation, CV overlay, case-study pages. */
(function () {
  'use strict';

  /* ---------- COPY — all visible text, keyed by language ---------- */
  var COPY = {
    "en": {
      "a11y": {
        "skip": "Skip to content",
        "menu": "Menu",
        "language": "Language",
        "closeImage": "Close image",
        "imageDialog": "Screen at full size",
        "zoomHint": "Click to zoom · ← → to browse · Esc to close",
        "openImage": "Open full size",
        "prevImage": "Previous image",
        "nextImage": "Next image",
        "zoomIn": "Zoom in",
        "zoomOut": "Zoom out",
        "contentsNav": "Case study contents",
        "close": "Close"
      },
      "nav": {
        "work": "Work",
        "about": "About",
        "contact": "Contact",
        "cv": "CV (PDF)",
        "cvHref": "assets/docs/Boris_Onofrei_CV_ProductDesigner_EN.pdf",
        "experience": "Experience"
      },
      "hero": {
        "tag1": "Branding",
        "tag2": "UX/UI design",
        "tag3": "Web development",
        "eyebrow": "Design Portfolio",
        "h1": "Boris Onofrei",
        "sub_dim": "I make complex B2B software ",
        "sub_strong": "clear, consistent and compliant.",
        "cta1": "See selected work",
        "cta2": "About me"
      },
      "work": {
        "label": "Selected work",
        "heading": "Law taught me order. Design put it to work.",
        "heading_dim": "Law taught me order.",
        "heading_strong": "Design put it to work.",
        "sub": "Three projects, from a consumer-facing product to internal enterprise tooling.",
        "readCta": "Read case study",
        "cases": [
          {
            "label": "02 / Case study",
            "title": "Konform — WCAG audit platform",
            "context": "Desktop web · Enterprise SaaS · AI triage",
            "outcome": "Accessibility scanners report symptoms page by page. Konform reports causes - and turns a 3,187-row backlog into 142 decisions. One row is one fix: every contrast failure traced to the same ghost button is a single change, not ninety-four. What used to be a sprint of spreadsheet work is now an afternoon of triage.",
            "tags": [
              "WCAG 2.1 AA",
              "Design system",
              "Enterprise UX"
            ],
            "csHeadDim": "Konform",
            "csHeadStrong": "WCAG audit platform"
          },
          {
            "label": "03 / Case study",
            "title": "Onset — On-call incident app",
            "context": "Mobile · DevOps · Offline-first",
            "outcome": "Acknowledging an incident has to be one action and never an accident. That contradiction shaped the whole product: readable in the dark, operable with a thumb, honest when the network drops.",
            "tags": [
              "Mobile UX",
              "AI in the loop",
              "Design system"
            ],
            "csHeadDim": "Onset",
            "csHeadStrong": "On-call incident app"
          },
          {
            "label": "01 / Case study",
            "title": "Marp — B2B revenue analytics",
            "context": "Responsive · B2B SaaS · Device handoff",
            "outcome": "A setup assistant that proposes metrics, segments and a first dashboard — then makes every one of them easy to reject. Configuration you edit is faster than configuration you write, and safer than configuration you inherit.",
            "tags": [
              "Responsive UX",
              "AI in the loop",
              "Design system"
            ],
            "csHeadDim": "Marp",
            "csHeadStrong": "B2B revenue analytics"
          }
        ]
      },
      "caps": {
        "label": "Capabilities",
        "heading": "What I do",
        "heading_dim": "My profile.",
        "heading_strong": "What I do:",
        "filterGroup": "Filter capabilities",
        "alsoPrefix": "Also:",
        "filters": {
          "all": "All",
          "enterprise": "Enterprise",
          "ecommerce": "E-commerce",
          "systems": "Design systems"
        },
        "items": [
          {
            "index": "01",
            "name": "Enterprise and B2B",
            "lead": "I design internal tools people are required to use, where a bad flow is paid for in support tickets rather than lost sign-ups.",
            "core": "SAP Fiori Design Guidelines · Role-based access control · Complex approval workflows · Legacy modernisation",
            "also": "ERP and internal-tool UX · Admin dashboards · Multi-tenant architecture"
          },
          {
            "index": "02",
            "name": "Accessibility",
            "lead": "Since June 2025 the European Accessibility Act has made this a legal requirement in the EU, not a nice-to-have. I audit existing products and build components that ship accessible by default.",
            "core": "WCAG 2.1 / 2.2 AA · European Accessibility Act and BFSG · Accessibility audits",
            "also": "Keyboard navigation · Focus management · Screen-reader-ready semantics"
          },
          {
            "index": "03",
            "name": "Design systems",
            "lead": "I build the shared vocabulary between design and engineering, and the governance that stops it drifting apart six months later.",
            "core": "Design tokens · Component libraries · Design system documentation · UI governance",
            "also": "Figma variables and auto layout · Atomic design · Design-to-code handoff"
          },
          {
            "index": "04",
            "name": "UX and research",
            "lead": "I work to ISO 9241-110 and validate decisions with real users before they reach production.",
            "core": "Usability testing · User interviews · Heuristic evaluation · Information architecture · ISO 9241-110",
            "also": "Journey mapping · Card sorting · A/B testing · Interaction design"
          },
          {
            "index": "05",
            "name": "E-commerce",
            "lead": "Conversion work on marketplaces, where the platform writes half the brief and the result is measured in sales.",
            "core": "Amazon A+ Content and Brand Story · Product-detail and checkout flows · Conversion-oriented redesign",
            "also": ""
          },
          {
            "index": "06",
            "name": "Tools and front-end",
            "lead": "I hand over work engineers can build from, and I can read and adjust the front-end myself.",
            "core": "Figma · Framer · HTML · CSS · Tailwind CSS",
            "also": "Adobe Creative Cloud · React component structure · Git basics"
          },
          {
            "index": "07",
            "name": "AI-assisted design",
            "lead": "I prototype with AI tools daily, and I know where the EU AI Act draws the line on transparency.",
            "core": "Prompt-driven prototyping · Claude Code · Claude Design · Figma Make · EU AI Act transparency requirements",
            "also": "Gemini · Midjourney · Lovable"
          },
          {
            "index": "08",
            "name": "Measurement and ways of working",
            "lead": "I work in a small cross-functional team and defend decisions in critique, then check them against the numbers.",
            "core": "Agile / Scrum · Stakeholder management · Design critique · Workshop facilitation",
            "also": "Google Analytics 4 · Matomo · Hotjar · Maze · Optimizely"
          }
        ]
      },
      "about": {
        "label": "About me:",
        "heading": "Hi, I'm Boris Onofrei",
        "heading_dim": "Hi, I'm",
        "heading_strong": "Boris Onofrei",
        "p1": "I came to design from law, and the habit stayed: I think in structure. Three years in-house at a German company — first design system built from zero, UX for an internal SAP rollout, e-commerce flows redesigned for +22% engagement — plus B2B SaaS work for freelance clients in the EU and the US. Research to shipped interface, accessible to WCAG 2.1 AA, never a pile of screens.",
        "portraitAlt": "Boris Onofrei, product designer, black-and-white portrait",
        "facts": [
          {
            "term": "Based in",
            "value": "Germany",
            "value2": "European Union"
          },
          {
            "term": "Experience",
            "value": "3+ YEARS IN-HOUSE IN GERMANY",
            "value2": "Plus freelance work in the EU and US"
          },
          {
            "term": "Languages",
            "value": "English C1 / German B1",
            "value2": "Ukrainian / Russian"
          },
          {
            "term": "Focus",
            "value": "Product design / E‑commerce / Enterprise B2B",
            "value2": "Design systems"
          }
        ]
      },
      "contact": {
        "label": "Contact",
        "heading_dim": "Interested?",
        "heading": "Get in touch:",
        "body": "Happy to walk through any of these projects in detail, or to talk about design systems, enterprise UX and accessibility in general.",
        "email": "boris.onofrei.design@gmail.com",
        "linkedin": "LinkedIn",
        "cv": "CV (PDF)"
      },
      "footer": {
        "copyright": "© 2026 Boris Onofrei · Freiburg, Germany",
        "imprint": "Legal notice",
        "privacy": "Privacy"
      },
      "exp": {
        "heading_dim": "My path.",
        "heading_strong": "Experience:",
        "cv": "Download CV (PDF)",
        "alt": "Lebenslauf auf Deutsch (PDF)",
        "altHref": "assets/docs/Boris_Onofrei_Lebenslauf_Produktdesigner_DE.pdf",
        "altLang": "de",
        "items": {
          "horl": {
            "date": "09/2023 – now",
            "role": "Product Designer, UX/UI & Web",
            "org": "Horl 1993 GmbH, Freiburg · promoted to mid-level in 01/2025",
            "points": [
              "Built Horl's first product design system from 0 to 1: tokens, component library and usage guidelines in Figma, adopted across web and mobile.",
              "Led the redesign of priority e-commerce flows, delivered to WCAG 2.1 AA: +22% user engagement.",
              "Owned UX flows and interface logic for the internal SAP rollout, following SAP Fiori Design Guidelines.",
              "Led Amazon brand creative across listings, A+ Content and Brand Story: +17% sales on priority SKUs."
            ]
          },
          "freelance": {
            "date": "2023 – now",
            "role": "Freelance Product Designer",
            "org": "Remote · Envisia, Dekozauber and B2B clients under NDA",
            "points": [
              "Envisia, a multi-tenant contract-management SaaS in production: end-to-end UX for assignment workflows, admin dashboards and role-based access.",
              "Rebuilt employee onboarding as a guided wizard, from 45 to 14 minutes, with fewer data-entry errors.",
              "Took concepts to working prototypes in days with Claude Code, Lovable and Figma Make."
            ]
          },
          "intern": {
            "date": "01 – 09/2023",
            "role": "Design Intern",
            "org": "Eurobrands Group, Cologne",
            "points": [
              "User surveys and competitive analysis for landing pages and paid campaigns; creative for Meta campaigns; CRM usability for internal teams."
            ]
          },
          "edu": {
            "date": "2021",
            "role": "LL.B., Economic and Civil Law",
            "org": "National University “Odesa Law Academy”, Ukraine",
            "points": []
          }
        }
      },
      "case": {
        "back": "All work",
        "contents": "Contents",
        "sections": "sections",
        "next": "Next case study",
        "overview": "Overview"
      },
      "legal": {
        "imprint": "Legal notice",
        "privacy": "Privacy policy",
        "imprintTitle": "Legal notice · Boris Onofrei",
        "privacyTitle": "Privacy policy · Boris Onofrei",
        "updated": "Last updated: October 2026"
      }
    },
    "de": {
      "a11y": {
        "skip": "Zum Inhalt springen",
        "menu": "Menü",
        "language": "Sprache",
        "closeImage": "Bild schließen",
        "imageDialog": "Screen in voller Größe",
        "zoomHint": "Klicken zum Zoomen · ← → zum Blättern · Esc zum Schließen",
        "openImage": "In voller Größe öffnen",
        "prevImage": "Vorheriges Bild",
        "nextImage": "Nächstes Bild",
        "zoomIn": "Vergrößern",
        "zoomOut": "Verkleinern",
        "contentsNav": "Inhalt der Case Study",
        "close": "Schließen"
      },
      "nav": {
        "work": "Arbeiten",
        "about": "Über mich",
        "contact": "Kontakt",
        "cv": "Lebenslauf (PDF)",
        "cvHref": "assets/docs/Boris_Onofrei_Lebenslauf_Produktdesigner_DE.pdf",
        "experience": "Erfahrung"
      },
      "hero": {
        "tag1": "Branding",
        "tag2": "UX/UI-Design",
        "tag3": "Webentwicklung",
        "eyebrow": "Design-Portfolio",
        "h1": "Boris Onofrei",
        "sub_dim": "Ich mache komplexe B2B-Software ",
        "sub_strong": "klar, konsistent und konform.",
        "cta1": "Ausgewählte Arbeiten",
        "cta2": "Über mich"
      },
      "work": {
        "label": "Ausgewählte Arbeiten",
        "heading": "Jura lehrte mich Ordnung. Design setzt sie ein.",
        "heading_dim": "Jura lehrte mich Ordnung.",
        "heading_strong": "Design setzt sie ein.",
        "sub": "Drei Projekte — von einem Endkundenprodukt bis zu internen Enterprise-Tools.",
        "readCta": "Case Study lesen",
        "cases": [
          {
            "label": "02 / Case study",
            "title": "Konform — WCAG-Audit-Plattform",
            "context": "Desktop-Web · Enterprise-SaaS · KI-Triage",
            "outcome": "Barrierefreiheits-Scanner melden Symptome Seite für Seite. Konform meldet Ursachen — und macht aus einem Backlog mit 3.187 Zeilen 142 Entscheidungen. Eine Zeile ist ein Fix: Jeder Kontrastfehler, der auf denselben Ghost-Button zurückgeht, ist eine einzige Änderung statt vierundneunzig. Aus einem Sprint voller Tabellenarbeit wird ein Nachmittag Triage.",
            "tags": [
              "WCAG 2.1 AA",
              "Designsystem",
              "Enterprise-UX"
            ],
            "csHeadDim": "Konform",
            "csHeadStrong": "WCAG audit platform"
          },
          {
            "label": "03 / Case study",
            "title": "Onset — On-call incident app",
            "context": "Mobile · DevOps · Offline-first",
            "outcome": "Acknowledging an incident has to be one action and never an accident. That contradiction shaped the whole product: readable in the dark, operable with a thumb, honest when the network drops.",
            "tags": [
              "Mobile UX",
              "AI in the loop",
              "Design system"
            ],
            "csHeadDim": "Onset",
            "csHeadStrong": "On-call incident app"
          },
          {
            "label": "01 / Case study",
            "title": "Marp — B2B revenue analytics",
            "context": "Responsive · B2B SaaS · Device handoff",
            "outcome": "A setup assistant that proposes metrics, segments and a first dashboard — then makes every one of them easy to reject. Configuration you edit is faster than configuration you write, and safer than configuration you inherit.",
            "tags": [
              "Responsive UX",
              "AI in the loop",
              "Design system"
            ],
            "csHeadDim": "Marp",
            "csHeadStrong": "B2B revenue analytics"
          }
        ]
      },
      "caps": {
        "label": "Fähigkeiten",
        "heading": "Was ich mache",
        "heading_dim": "Mein Profil.",
        "heading_strong": "Was ich mache:",
        "filterGroup": "Fähigkeiten filtern",
        "alsoPrefix": "Außerdem:",
        "filters": {
          "all": "Alle",
          "enterprise": "Enterprise",
          "ecommerce": "E-Commerce",
          "systems": "Designsysteme"
        },
        "items": [
          {
            "index": "01",
            "name": "Enterprise und B2B",
            "lead": "Ich gestalte interne Tools, die Menschen benutzen müssen — ein schlechter Flow wird hier in Support-Tickets bezahlt, nicht in verlorenen Anmeldungen.",
            "core": "SAP Fiori Design Guidelines · Rollenbasierte Zugriffskontrolle · Komplexe Freigabe-Workflows · Modernisierung von Legacy-Systemen",
            "also": "ERP- und Internal-Tool-UX · Admin-Dashboards · Multi-Tenant-Architektur"
          },
          {
            "index": "02",
            "name": "Barrierefreiheit",
            "lead": "Seit Juni 2025 ist Barrierefreiheit durch den European Accessibility Act in der EU gesetzliche Pflicht, kein Nice-to-have. Ich prüfe bestehende Produkte und baue Komponenten, die von Anfang an barrierefrei sind.",
            "core": "WCAG 2.1 / 2.2 AA · European Accessibility Act und BFSG · Accessibility-Audits",
            "also": "Tastaturnavigation · Fokus-Management · Screenreader-taugliche Semantik"
          },
          {
            "index": "03",
            "name": "Designsysteme",
            "lead": "Ich baue das gemeinsame Vokabular von Design und Entwicklung — und die Governance, die verhindert, dass es sechs Monate später auseinanderläuft.",
            "core": "Design Tokens · Komponentenbibliotheken · Design-System-Dokumentation · UI-Governance",
            "also": "Figma Variables und Auto Layout · Atomic Design · Design-to-Code-Handoff"
          },
          {
            "index": "04",
            "name": "UX und Research",
            "lead": "Ich arbeite nach ISO 9241-110 und validiere Entscheidungen mit echten Nutzern, bevor sie in Produktion gehen.",
            "core": "Usability-Tests · Nutzerinterviews · Heuristische Evaluation · Informationsarchitektur · ISO 9241-110",
            "also": "Journey Mapping · Card Sorting · A/B-Tests · Interaktionsdesign"
          },
          {
            "index": "05",
            "name": "E-Commerce",
            "lead": "Conversion-Arbeit auf Marktplätzen, wo die Plattform die Hälfte des Briefings schreibt und das Ergebnis in Umsatz gemessen wird.",
            "core": "Amazon A+ Content und Brand Story · Produktdetail- und Checkout-Flows · Conversion-orientiertes Redesign",
            "also": ""
          },
          {
            "index": "06",
            "name": "Tools und Frontend",
            "lead": "Ich übergebe Entwürfe, nach denen Entwickler direkt bauen können — und kann das Frontend selbst lesen und anpassen.",
            "core": "Figma · Framer · HTML · CSS · Tailwind CSS",
            "also": "Adobe Creative Cloud · React-Komponentenstruktur · Git-Grundlagen"
          },
          {
            "index": "07",
            "name": "KI-gestütztes Design",
            "lead": "Ich baue täglich Prototypen mit KI-Tools und weiß, wo die EU-KI-Verordnung bei Transparenz die Grenze zieht.",
            "core": "Prompt-basiertes Prototyping · Claude Code · Claude Design · Figma Make · Transparenzanforderungen der EU-KI-Verordnung",
            "also": "Gemini · Midjourney · Lovable"
          },
          {
            "index": "08",
            "name": "Messung und Arbeitsweise",
            "lead": "Ich arbeite in einem kleinen bereichsübergreifenden Team, vertrete Entscheidungen in Design-Critiques und prüfe sie anschließend an den Zahlen.",
            "core": "Agile / Scrum · Stakeholder-Management · Design-Kritik · Workshop-Moderation",
            "also": "Google Analytics 4 · Matomo · Hotjar · Maze · Optimizely"
          }
        ]
      },
      "about": {
        "label": "Über mich:",
        "heading": "Hallo, ich bin Boris Onofrei",
        "heading_dim": "Hallo, ich bin",
        "heading_strong": "Boris Onofrei",
        "p1": "Ich kam über das Jura-Studium zum Design, und die Gewohnheit blieb: Ich denke in Strukturen. Drei Jahre in-house in einem deutschen Unternehmen — erstes Designsystem von null aufgebaut, UX für einen internen SAP-Rollout, E-Commerce-Flows mit +22 % Engagement überarbeitet — dazu B2B-SaaS-Projekte für Freelance-Kunden in der EU und den USA. Von der Recherche bis zum ausgelieferten Interface, barrierefrei nach WCAG 2.1 AA, nie ein Stapel Screens.",
        "portraitAlt": "Boris Onofrei, Produktdesigner, Schwarz-Weiß-Porträt",
        "facts": [
          {
            "term": "Standort",
            "value": "Deutschland",
            "value2": "Europäische Union"
          },
          {
            "term": "Erfahrung",
            "value": "3+ Jahre in-house in Deutschland",
            "value2": "Dazu freiberuflich in der EU und den USA"
          },
          {
            "term": "Sprachen",
            "value": "Englisch C1 / Deutsch B1",
            "value2": "Ukrainisch / Russisch"
          },
          {
            "term": "Schwerpunkt",
            "value": "Produktdesign / E‑Commerce / Enterprise B2B",
            "value2": "Designsysteme"
          }
        ]
      },
      "contact": {
        "label": "Kontakt",
        "heading_dim": "Interessiert?",
        "heading": "Kontakt aufnehmen:",
        "body": "Gerne gehe ich eines der Projekte im Detail durch oder spreche allgemein über Designsysteme, Enterprise-UX und Barrierefreiheit.",
        "email": "boris.onofrei.design@gmail.com",
        "linkedin": "LinkedIn",
        "cv": "Lebenslauf (PDF)"
      },
      "footer": {
        "copyright": "© 2026 Boris Onofrei · Freiburg, Deutschland",
        "imprint": "Impressum",
        "privacy": "Datenschutz"
      },
      "exp": {
        "heading_dim": "Mein Werdegang.",
        "heading_strong": "Erfahrung:",
        "cv": "Lebenslauf herunterladen (PDF)",
        "alt": "CV in English (PDF)",
        "altHref": "assets/docs/Boris_Onofrei_CV_ProductDesigner_EN.pdf",
        "altLang": "en",
        "items": {
          "horl": {
            "date": "09/2023 – heute",
            "role": "Product Designer, UX/UI & Web",
            "org": "Horl 1993 GmbH, Freiburg · Beförderung auf Mid-Level 01/2025",
            "points": [
              "Erstes Produktdesignsystem von Horl von 0 auf 1 aufgebaut: Design-Tokens, Komponentenbibliothek und Nutzungsrichtlinien in Figma, übernommen in Web und Mobile.",
              "Leitung des Redesigns priorisierter E-Commerce-Flows, barrierefrei nach WCAG 2.1 AA: +22 % Nutzerinteraktion.",
              "Verantwortung für UX-Flows und Interface-Logik der internen SAP-Einführung nach SAP Fiori Design Guidelines.",
              "Leitung des Amazon-Markencreatives mit Listings, A+ Content und Brand Story: +17 % Umsatz bei priorisierten SKUs."
            ]
          },
          "freelance": {
            "date": "2023 – heute",
            "role": "Freiberuflicher Product Designer",
            "org": "Remote · Envisia, Dekozauber und B2B-Kunden unter NDA",
            "points": [
              "Envisia, ein Multi-Tenant-SaaS für Vertragsmanagement im Produktivbetrieb: End-to-End-UX für Zuweisungs-Workflows, Admin-Dashboards und rollenbasierten Zugriff.",
              "Mitarbeiter-Onboarding als geführten Wizard neu gestaltet: von 45 auf 14 Minuten, mit weniger Eingabefehlern.",
              "Vom Konzept zum funktionsfähigen Prototyp in Tagen, mit Claude Code, Lovable und Figma Make."
            ]
          },
          "intern": {
            "date": "01 – 09/2023",
            "role": "Design-Praktikant",
            "org": "Eurobrands Group, Köln",
            "points": [
              "Nutzerbefragungen und Wettbewerbsanalyse für Landingpages und bezahlte Kampagnen; Creatives für Meta-Kampagnen; CRM-Usability für interne Teams."
            ]
          },
          "edu": {
            "date": "2021",
            "role": "LL.B., Wirtschafts- und Zivilrecht",
            "org": "National University „Odesa Law Academy“, Ukraine",
            "points": []
          }
        }
      },
      "case": {
        "back": "Alle Arbeiten",
        "contents": "Inhalt",
        "sections": "Abschnitte",
        "next": "Nächste Case Study",
        "overview": "Überblick"
      },
      "legal": {
        "imprint": "Impressum",
        "privacy": "Datenschutz­erklärung",
        "imprintTitle": "Impressum · Boris Onofrei",
        "privacyTitle": "Datenschutzerklärung · Boris Onofrei",
        "updated": "Stand: Oktober 2026"
      }
    }
  };

  /* ---------- helpers ---------- */
  function lookup(dict, path) {
    return path.split('.').reduce(function (acc, key) {
      return (acc && acc[key] !== undefined) ? acc[key] : undefined;
    }, dict);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* Wraps the marked phrase in the --signal plate without touching the copy. */
  function renderWithPlate(el, text, phrase) {
    var i = phrase ? text.indexOf(phrase) : -1;
    if (i === -1) { el.textContent = text; return; }
    el.innerHTML =
      escapeHtml(text.slice(0, i)) +
      '<span class="plate">' + escapeHtml(phrase) + '</span>' +
      escapeHtml(text.slice(i + phrase.length));
  }

  /* ---------- language: ?lang= in the address, else the browser language. Nothing is stored. ---------- */
  var ROOT = document.body.getAttribute('data-root') || './';
  var requested = null;
  try { requested = new URLSearchParams(window.location.search).get('lang'); } catch (e) { requested = null; }
  var lang = (requested === 'de' || requested === 'en')
    ? requested
    : ((navigator.language || 'en').toLowerCase().indexOf('de') === 0 ? 'de' : 'en');

  /* links to the other pages carry the language along */
  document.querySelectorAll('[data-page-link]').forEach(function (el) {
    el.setAttribute('data-base-href', el.getAttribute('href'));
  });
  function withLang(href) {
    var hash = '';
    var i = href.indexOf('#');
    if (i > -1) { hash = href.slice(i); href = href.slice(0, i); }
    href = href.replace(/[?&]lang=(en|de)\b/, '');
    return href + (href.indexOf('?') > -1 ? '&' : '?') + 'lang=' + lang + hash;
  }

  /* one <li> per entry: strings split on " · ", arrays used as they are */
  function renderList(el, value) {
    var items = (Array.isArray(value) ? value : String(value).split(' · ')).filter(Boolean);
    el.innerHTML = items.map(function (t) { return '<li>' + escapeHtml(t) + '</li>'; }).join('');
  }

  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-lang]'));

  function applyLanguage(next) {
    lang = next;
    var dict = COPY[lang];

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = lookup(dict, el.getAttribute('data-i18n'));
      if (typeof value !== 'string') { return; }
      var plateKey = el.getAttribute('data-i18n-plate');
      if (plateKey) {
        renderWithPlate(el, value, lookup(dict, plateKey));
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var value = lookup(dict, el.getAttribute('data-i18n-aria'));
      if (typeof value === 'string') { el.setAttribute('aria-label', value); }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var value = lookup(dict, el.getAttribute('data-i18n-alt'));
      if (typeof value === 'string') { el.setAttribute('alt', value); }
    });

    document.querySelectorAll('[data-i18n-href]').forEach(function (el) {
      var href = lookup(dict, el.getAttribute('data-i18n-href'));
      if (typeof href === 'string') { el.setAttribute('href', ROOT + href); }
    });

    buttons.forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('text-ink', active);
      btn.classList.toggle('font-medium', active);
      btn.classList.toggle('text-graphite', !active);
    });

    document.querySelectorAll('[data-cv-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-cv-lang') !== lang;
    });

    document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
      var value = lookup(dict, el.getAttribute('data-i18n-list'));
      if (value !== undefined) { renderList(el, value); }
    });

    document.querySelectorAll('[data-i18n-lang]').forEach(function (el) {
      var value = lookup(dict, el.getAttribute('data-i18n-lang'));
      if (typeof value === 'string') { el.setAttribute('lang', value); }
    });

    document.querySelectorAll('[data-lang-only]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-only') !== lang;
    });

    document.querySelectorAll('[data-page-link]').forEach(function (el) {
      el.setAttribute('href', withLang(el.getAttribute('data-base-href')));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState(null, '', url.toString());
      } catch (e) { /* opened from disk: the page still works */ }
    });
  });

  /* ---------- Capabilities filter ---------- */
  (function () {
    var pills = Array.prototype.slice.call(document.querySelectorAll('[data-caps-filter]'));
    var rows  = Array.prototype.slice.call(document.querySelectorAll('[data-caps-filters]'));
    if (!pills.length || !rows.length) { return; }

    function apply(key) {
      pills.forEach(function (p) {
        p.setAttribute('aria-pressed', p.getAttribute('data-caps-filter') === key ? 'true' : 'false');
      });
      rows.forEach(function (row) {
        var tags = (row.getAttribute('data-caps-filters') || '').split(/\s+/);
        var match = key === 'all' || tags.indexOf(key) > -1;
        row.classList.toggle('is-dim', !match);
        if (match) { row.setAttribute('tabindex', '0'); }
        else { row.removeAttribute('tabindex'); row.blur(); }
      });
    }

    pills.forEach(function (p) {
      p.addEventListener('click', function () { apply(p.getAttribute('data-caps-filter')); });
    });
  }());

  /* ---------- Mobile menu (plain panel, no drawer) ---------- */
  var menuButton = document.getElementById('menu-button');
  var menuPanel  = document.getElementById('menu-panel');

  function setMenu(open) {
    menuPanel.hidden = !open;
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  menuButton.addEventListener('click', function () { setMenu(menuPanel.hidden); });

  menuPanel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menuPanel.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', function (event) {
    if (event.matches) { setMenu(false); }
  });

  /* ---------- Work cards open their case-study page; the whole card is clickable ---------- */
  document.querySelectorAll('.work-card').forEach(function (card) {
    var link = card.querySelector('.work-card__link');
    if (!link) { return; }
    card.addEventListener('click', function (event) {
      if (event.target.closest('a')) { return; }
      if (event.metaKey || event.ctrlKey) { window.open(link.href, '_blank', 'noopener'); return; }
      window.location.href = link.href;
    });
  });

  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function trapFocus(event, panel) {
    if (event.key !== 'Tab') { return; }
    var items = Array.prototype.slice.call(panel.querySelectorAll(FOCUSABLE))
      .filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) { event.preventDefault(); return; }
    var first = items[0];
    var last  = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  /* ---------- Case-study pages: reading progress and contents ---------- */
  (function () {
    var article = document.getElementById('case-body');
    if (!article) { return; }

    var bar = document.getElementById('read-progress-bar');
    var HEAD = 64;
    var ticking = false;
    function progress() {
      ticking = false;
      if (!bar) { return; }
      var r = article.getBoundingClientRect();
      var total = r.height - (window.innerHeight - HEAD);
      var p = total > 0 ? (HEAD - r.top) / total : 1;
      bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, p)) + ')';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(progress); }
    }, { passive: true });
    window.addEventListener('resize', progress);
    progress();

    var links   = Array.prototype.slice.call(document.querySelectorAll('[data-toc]'));
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-toc-target]'));
    var deskNav = document.querySelector('.case-aside > .case-toc');

    function mark(id) {
      links.forEach(function (a) {
        var on = a.getAttribute('data-toc') === id;
        a.classList.toggle('is-active', on);
        if (on) { a.setAttribute('aria-current', 'location'); } else { a.removeAttribute('aria-current'); }
        /* keep the active entry visible when the contents list itself scrolls */
        if (on && deskNav && deskNav.contains(a) && deskNav.scrollHeight > deskNav.clientHeight) {
          var top = a.offsetTop - deskNav.offsetTop;
          if (top < deskNav.scrollTop || top + a.offsetHeight > deskNav.scrollTop + deskNav.clientHeight) {
            deskNav.scrollTop = top - deskNav.clientHeight / 2;
          }
        }
      });
    }

    if (targets.length) {
      mark(targets[0].id);
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) { if (entry.isIntersecting) { mark(entry.target.id); } });
        }, { rootMargin: '-30% 0px -65% 0px' });
        targets.forEach(function (t) { io.observe(t); });
      }
    }

    var details = document.querySelector('.case-toc-m');
    if (details) {
      details.addEventListener('click', function (event) {
        if (event.target.closest('a')) { details.open = false; }
      });
    }
  }());

  /* ---------- Case-study screenshots: open any screen full size (click or tap) ---------- */
  (function () {
    var host = document.getElementById('case-body');
    if (!host) { return; }

    function icon(paths, size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + paths + '</svg>';
    }
    var ICON = {
      expand:  icon('<path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="m21 3-7 7"></path><path d="m3 21 7-7"></path>', 16),
      zoomIn:  icon('<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path><path d="M11 8v6"></path><path d="M8 11h6"></path>', 20),
      zoomOut: icon('<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path><path d="M8 11h6"></path>', 20),
      close:   icon('<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>', 20),
      prev:    icon('<path d="m15 18-6-6 6-6"></path>', 22),
      next:    icon('<path d="m9 18 6-6-6-6"></path>', 22)
    };

    /* every screenshot gets a full-size button (keyboard); the image itself is clickable too */
    var items = [];
    Array.prototype.forEach.call(host.querySelectorAll('.cs-fig'), function (fig, f) {
      var cap = fig.querySelector('figcaption');
      if (cap && !cap.id) { cap.id = 'fig-cap-' + (f + 1); }
      Array.prototype.forEach.call(fig.querySelectorAll('img'), function (img) {
        var i = items.length;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cs-zoom';
        btn.setAttribute('aria-haspopup', 'dialog');
        btn.setAttribute('aria-label', 'Open full size');
        btn.setAttribute('data-i18n-aria', 'a11y.openImage');
        if (cap) { btn.setAttribute('aria-describedby', cap.id); }
        btn.innerHTML = '<span>' + ICON.expand + '</span>';
        img.parentElement.classList.add('cs-zoombox');
        img.parentElement.appendChild(btn);
        img.classList.add('is-zoomable');
        items.push({ img: img, btn: btn, caption: cap ? cap.textContent.replace(/\s+/g, ' ').trim() : '' });
        img.addEventListener('click', function () { open(i); });
        btn.addEventListener('click', function () { open(i); });
      });
    });
    if (!items.length) { return; }

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    var narrow  = window.matchMedia('(max-width: 767px)');
    var layer, stage, frame, pic, countEl, capEl, hintEl, liveEl, bottom, zoomBtn, closeBtn, prevBtn, nextBtn;
    var index = 0, level = 0, widths = [0], token = 0;
    var isOpen = false, opening = false, opener = null, closeTimer = null, closingThumb = null;
    var inertEls = [], drag = null, moved = false, swipe = null;

    function t(key) { return lookup(COPY[lang], 'a11y.' + key) || ''; }
    function two(n) { return (n < 10 ? '0' : '') + n; }
    function clamp01(v) { return Math.max(0, Math.min(1, v)); }
    function onScreen(r) { return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight; }
    function nextLevel() { return level < widths.length - 1 ? level + 1 : 0; }

    function build() {
      layer = document.createElement('div');
      layer.className = 'lb';
      layer.hidden = true;
      layer.setAttribute('role', 'dialog');
      layer.setAttribute('aria-modal', 'true');
      layer.innerHTML =
        '<div class="lb__bg"></div>' +
        '<div class="lb__stage"><div class="lb__frame"><img class="lb__img" alt="" draggable="false"></div></div>' +
        '<div class="lb__top lb__chrome"><p class="lb__count" aria-hidden="true"></p><div class="lb__tools">' +
          '<button type="button" class="lb__btn" data-lb="zoom"></button>' +
          '<button type="button" class="lb__btn" data-lb="close">' + ICON.close + '</button>' +
        '</div></div>' +
        '<button type="button" class="lb__btn lb__nav lb__nav--prev lb__chrome" data-lb="prev">' + ICON.prev + '</button>' +
        '<button type="button" class="lb__btn lb__nav lb__nav--next lb__chrome" data-lb="next">' + ICON.next + '</button>' +
        '<div class="lb__bottom lb__chrome"><p class="lb__cap"></p><p class="lb__hint" aria-hidden="true"></p></div>' +
        '<p class="cs-sr" aria-live="polite"></p>';
      document.body.appendChild(layer);
      stage    = layer.querySelector('.lb__stage');
      frame    = layer.querySelector('.lb__frame');
      pic      = layer.querySelector('.lb__img');
      countEl  = layer.querySelector('.lb__count');
      capEl    = layer.querySelector('.lb__cap');
      hintEl   = layer.querySelector('.lb__hint');
      liveEl   = layer.querySelector('.cs-sr');
      bottom   = layer.querySelector('.lb__bottom');
      zoomBtn  = layer.querySelector('[data-lb="zoom"]');
      closeBtn = layer.querySelector('[data-lb="close"]');
      prevBtn  = layer.querySelector('[data-lb="prev"]');
      nextBtn  = layer.querySelector('[data-lb="next"]');

      /* buttons act; the screen zooms; anywhere else closes */
      layer.addEventListener('click', function (event) {
        var b = event.target.closest('[data-lb]');
        if (b) {
          var a = b.getAttribute('data-lb');
          if (a === 'close') { close(); }
          else if (a === 'prev') { go(-1); }
          else if (a === 'next') { go(1); }
          else { zoomTo(nextLevel()); }
          return;
        }
        if (moved) { moved = false; return; }
        if (event.target === pic) { zoomTo(nextLevel(), event.clientX, event.clientY); return; }
        close();
      });

      /* mouse: drag to pan a zoomed screen */
      pic.addEventListener('pointerdown', function (event) {
        moved = false;
        if (event.pointerType !== 'mouse' || event.button !== 0) { return; }
        event.preventDefault();
        if (!level) { return; }
        drag = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
        pic.setPointerCapture(event.pointerId);
      });
      pic.addEventListener('pointermove', function (event) {
        if (!drag) { return; }
        var dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!moved && Math.abs(dx) + Math.abs(dy) < 5) { return; }
        moved = true;
        layer.classList.add('is-dragging');
        stage.scrollLeft = drag.left - dx;
        stage.scrollTop = drag.top - dy;
      });
      function endDrag() { drag = null; layer.classList.remove('is-dragging'); }
      pic.addEventListener('pointerup', endDrag);
      pic.addEventListener('pointercancel', endDrag);

      /* touch: swipe sideways to browse while the screen is fitted */
      stage.addEventListener('touchstart', function (event) {
        var p = event.touches[0];
        swipe = (!level && event.touches.length === 1) ? { x: p.clientX, y: p.clientY, at: Date.now() } : null;
      }, { passive: true });
      stage.addEventListener('touchend', function (event) {
        if (!swipe) { return; }
        var p = event.changedTouches[0], dx = p.clientX - swipe.x, dy = p.clientY - swipe.y;
        var quick = Date.now() - swipe.at < 700;
        swipe = null;
        if (quick && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) { go(dx < 0 ? 1 : -1); }
      }, { passive: true });
    }

    /* fitted width plus zoom steps at 2x and 3.5x - capped at the file's own pixels unless that is under 2x */
    function size() {
      var nw = pic.naturalWidth, nh = pic.naturalHeight;
      if (!nw) { return; }
      var small = narrow.matches;
      var padX = small ? 12 : 88;
      var padT = small ? 56 : 64;
      var padB = Math.max(bottom.offsetHeight, small ? 68 : 56);
      frame.style.padding = padT + 'px ' + padX + 'px ' + padB + 'px';
      var plate = parseFloat(window.getComputedStyle(pic).paddingLeft) || 0;
      var aw = stage.clientWidth - 2 * padX - 2 * plate;
      var ah = stage.clientHeight - padT - padB - 2 * plate;
      var fit = Math.max(120, Math.min(aw / nw, ah / nh, 1) * nw);
      var cap = Math.max(nw, fit * 2);
      widths = [];
      [1, 2, 3.5].forEach(function (m) {
        var w = Math.min(fit * m, cap);
        if (!widths.length || w > widths[widths.length - 1] * 1.25) { widths.push(w); }
      });
      level = Math.min(level, widths.length - 1);
      pic.style.width = Math.round(widths[level]) + 'px';
      var max = level === widths.length - 1;
      layer.classList.toggle('is-zoomed', level > 0);
      layer.classList.toggle('is-max', max);
      zoomBtn.innerHTML = max ? ICON.zoomOut : ICON.zoomIn;
      zoomBtn.setAttribute('aria-label', t(max ? 'zoomOut' : 'zoomIn'));
    }

    /* zooming keeps the point under the cursor (or the centre of the view) where it was */
    function zoomTo(n, x, y) {
      if (n === level || !pic.complete || !pic.naturalWidth) { return; }
      var view = stage.getBoundingClientRect();
      var ax = x === undefined ? view.left + stage.clientWidth / 2 : x;
      var ay = y === undefined ? view.top + stage.clientHeight / 2 : y;
      var r = pic.getBoundingClientRect();
      var rx = clamp01((ax - r.left) / r.width), ry = clamp01((ay - r.top) / r.height);
      level = n;
      size();
      if (!level) { stage.scrollLeft = 0; stage.scrollTop = 0; return; }
      r = pic.getBoundingClientRect();
      stage.scrollLeft += r.left + rx * r.width - ax;
      stage.scrollTop += r.top + ry * r.height - ay;
    }

    function go(step) {
      var n = index + step;
      if (n < 0 || n >= items.length) { return; }
      index = n;
      render(step);
    }

    function render(dir) {
      var item = items[index];
      var src = item.img.currentSrc || item.img.src;
      var mine = ++token, done = false;
      var focused = document.activeElement;
      countEl.textContent = two(index + 1) + ' / ' + two(items.length);
      capEl.textContent = item.caption;
      liveEl.textContent = (index + 1) + ' / ' + items.length + (item.caption ? '. ' + item.caption : '');
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === items.length - 1;
      if ((focused === prevBtn || focused === nextBtn) && focused.disabled) {
        var other = focused === prevBtn ? nextBtn : prevBtn;
        (other.disabled ? closeBtn : other).focus();
      }
      pic.alt = item.img.alt || '';
      pic.style.transition = 'none';
      pic.style.opacity = '0';
      pic.style.transform = dir ? 'translateX(' + (dir * 24) + 'px)' : 'translateY(8px)';

      function ready() {
        if (done || mine !== token || !isOpen) { return; }
        done = true;
        pic.onload = null;
        level = 0;
        size();
        stage.scrollLeft = 0;
        stage.scrollTop = 0;
        if (opening) { opening = false; if (flipFrom(item.img)) { return; } }
        void pic.offsetWidth;
        pic.style.transition = '';
        pic.style.opacity = '';
        pic.style.transform = '';
      }
      if (pic.getAttribute('src') === src && pic.complete && pic.naturalWidth) { ready(); }
      else {
        pic.onload = ready;
        pic.src = src;
        if (pic.decode) { pic.decode().then(ready, function () {}); }
      }
      [index - 1, index + 1].forEach(function (n) {
        if (items[n]) { (new Image()).src = items[n].img.currentSrc || items[n].img.src; }
      });
    }

    /* the screen grows out of its place in the article, and returns to it */
    function flipTransform(r) {
      var f = frame.getBoundingClientRect();
      var cs = window.getComputedStyle(frame);
      var plate = parseFloat(window.getComputedStyle(pic).paddingLeft) || 0;
      var s = r.width / Math.max(1, pic.offsetWidth - 2 * plate);
      var x = r.left - (f.left + parseFloat(cs.paddingLeft)) - s * plate;
      var y = r.top - (f.top + parseFloat(cs.paddingTop)) - s * plate;
      return 'translate(' + x + 'px, ' + y + 'px) scale(' + s + ')';
    }
    function flipFrom(thumb) {
      var r = thumb.getBoundingClientRect();
      if (reduced.matches || !onScreen(r)) { return false; }
      pic.style.transform = flipTransform(r);
      pic.style.opacity = '1';
      thumb.style.visibility = 'hidden';
      void pic.offsetWidth;
      pic.style.transition = '';
      pic.style.transform = '';
      window.setTimeout(function () { if (closingThumb !== thumb) { thumb.style.visibility = ''; } }, 320);
      return true;
    }

    function lock() {
      var gap = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      if (gap > 0) { document.body.style.paddingRight = gap + 'px'; }
      inertEls = Array.prototype.filter.call(document.body.children, function (el) {
        return el !== layer && el.tagName !== 'SCRIPT' && !el.inert;
      });
      inertEls.forEach(function (el) { el.inert = true; });
    }
    function unlock() {
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
      inertEls.forEach(function (el) { el.inert = false; });
      inertEls = [];
    }

    function onKey(event) {
      var k = event.key;
      if (k === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); return; }
      if (k === 'Tab') { trapFocus(event, layer); return; }
      if (event.altKey || event.ctrlKey || event.metaKey) { return; }
      if (k === '+' || k === '=') { event.preventDefault(); zoomTo(Math.min(level + 1, widths.length - 1)); return; }
      if (k === '-' || k === '_') { event.preventDefault(); zoomTo(Math.max(level - 1, 0)); return; }
      if (k === '0') { event.preventDefault(); zoomTo(0); return; }
      var dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[k];
      if (!dir) { return; }
      event.preventDefault();
      if (level) { stage.scrollLeft += dir[0] * 120; stage.scrollTop += dir[1] * 120; }
      else if (dir[0]) { go(dir[0]); }
    }

    function open(i) {
      if (isOpen) { return; }
      if (!layer) { build(); }
      if (closeTimer) { settle(); }
      isOpen = true;
      opening = true;
      opener = items[i].btn;
      index = i;
      level = 0;
      layer.setAttribute('aria-label', t('imageDialog'));
      closeBtn.setAttribute('aria-label', t('closeImage'));
      prevBtn.setAttribute('aria-label', t('prevImage'));
      nextBtn.setAttribute('aria-label', t('nextImage'));
      hintEl.textContent = t('zoomHint');
      lock();
      layer.hidden = false;
      void layer.offsetWidth;
      layer.classList.add('is-open');
      render(0);
      closeBtn.focus({ preventScroll: true });
      document.addEventListener('keydown', onKey, true);
      window.addEventListener('resize', size);
    }

    function close() {
      if (!isOpen) { return; }
      isOpen = false;
      opening = false;
      token++;
      drag = null;
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', size);
      var thumb = items[index].img;
      var r = thumb.getBoundingClientRect();
      var flip = !reduced.matches && !level && pic.complete && pic.naturalWidth > 0 && onScreen(r);
      layer.classList.remove('is-open');
      pic.style.transition = '';
      if (flip) {
        pic.style.opacity = '1';
        pic.style.transform = flipTransform(r);
        thumb.style.visibility = 'hidden';
        closingThumb = thumb;
      } else {
        pic.style.opacity = '0';
      }
      closeTimer = window.setTimeout(settle, reduced.matches ? 0 : 300);
    }

    function settle() {
      if (closeTimer) { window.clearTimeout(closeTimer); closeTimer = null; }
      layer.hidden = true;
      layer.classList.remove('is-zoomed', 'is-max', 'is-dragging');
      if (closingThumb) { closingThumb.style.visibility = ''; closingThumb = null; }
      pic.style.transition = 'none';
      pic.style.transform = '';
      pic.style.opacity = '0';
      unlock();
      if (opener) { opener.focus({ preventScroll: true }); opener = null; }
    }
  }());

  /* ---------- CV overlay (nav trigger, language-matched content) ---------- */
  var cvOverlay     = document.getElementById('cv-overlay');
  if (cvOverlay) (function () {
  var cvPanel       = cvOverlay.querySelector('[role="dialog"]');
  var cvClose       = document.getElementById('cv-close');
  var cvLastFocused = null;
  var cvOpen        = false;
  var cvHideTimer   = null;
  var cvHead        = document.getElementById('cv-head');
  var cvScroll      = document.getElementById('cv-scroll');

  cvScroll.addEventListener('scroll', function () {
    cvHead.classList.toggle('is-condensed', cvScroll.scrollTop > 16);
  });

  function onCvKeydown(event) {
    if (event.key === 'Escape') { event.preventDefault(); closeCv(); return; }
    trapFocus(event, cvPanel);
  }

  function openCv(trigger) {
    if (cvOpen) { return; }
    if (cvHideTimer) { window.clearTimeout(cvHideTimer); cvHideTimer = null; }
    cvOpen = true;
    cvLastFocused = trigger || null;
    cvOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { cvOverlay.classList.add('is-open'); });
    cvClose.focus();
    cvScroll.scrollTop = 0;
    cvHead.classList.remove('is-condensed');
    document.addEventListener('keydown', onCvKeydown);
  }

  function closeCv() {
    if (!cvOpen) { return; }
    cvOpen = false;
    cvOverlay.classList.remove('is-open');
    document.removeEventListener('keydown', onCvKeydown);
    document.body.style.overflow = '';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    cvHideTimer = window.setTimeout(function () { cvOverlay.hidden = true; cvHideTimer = null; }, reduced ? 0 : 180);
    if (cvLastFocused) { cvLastFocused.focus(); cvLastFocused = null; }
  }

  document.querySelectorAll('[data-cv-open]').forEach(function (el) {
    el.addEventListener('click', function () {
      setMenu(false);
      openCv(el);
    });
  });

  cvOverlay.querySelectorAll('[data-cv-close]').forEach(function (el) {
    el.addEventListener('click', closeCv);
  });
  }());

  applyLanguage(lang);
})();


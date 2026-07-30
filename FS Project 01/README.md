# Chapters — Reading, Unbound

A responsive frontend interface for a simple reading-tracker web app, built for **DecodeLabs' Full Stack Internship — Project 1: The Responsive Layout**.


## What this is

Chapters is a mock personal reading tracker — a shelf of books, a "currently reading" progress ring, monthly stats, and a yearly reading goal. It's built entirely with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no dependencies — to demonstrate core responsive-design fundamentals.

## Features

- **Mobile-first responsive layout** with breakpoints at 768px (tablet) and 1024px (desktop)
- **Semantic HTML5 landmarks** (`header`, `nav`, `main`, `article`, `aside`, `footer`) for accessibility and SEO
- **CSS Grid** for macro page structure, **Flexbox** for micro components (nav bar, filter tabs)
- **Fluid typography** using `clamp()` — no extra breakpoints needed for headline scaling
- **Interactive shelf filter** (All / Reading / Finished / Want to read) — pure JS, no page reload
- **Animated SVG progress ring** showing pages-read progress on the current book
- **Mobile hamburger nav** with `aria-expanded` state
- **Accessibility**: skip-to-content link, visible focus states, `aria-pressed`/`aria-expanded` wiring, `prefers-reduced-motion` support

## File structure

```
chapters/
├── index.html   → page structure & content
├── style.css    → all styling, design tokens, responsive rules
├── script.js    → nav toggle, shelf filter, progress ring logic
└── README.md    → this file
```

## Design system

| Token | Value | Use |
|---|---|---|
| Mocha Mousse | `#A5936F` | Primary / stability |
| Ethereal Blue | `#A0D4E0` | Accent / trust |
| Moonlit Grey | `#F2F0EA` | Background / refinement |
| Ink | `#2E2A24` | Text |

**Typography:** Montserrat (headlines) + Open Sans (body) — max 2 font families, per the brief's constraint.

## Running it locally

No build step required — it's static HTML/CSS/JS.

1. Download all files into one folder, keeping them together.
2. Open `index.html` directly in a browser, **or**, for auto-reload while editing:
   - Open the folder in VS Code
   - Install the **Live Server** extension
   - Right-click `index.html` → **Open with Live Server**


## Roadmap / things a real version would need next

- Wire up "Add a book" to an actual form + local storage or backend
- Replace static book data with a dynamic array rendered via JS
- Add a dark mode toggle
- Hook stats up to real reading data instead of hardcoded numbers

---
Built as part of the DecodeLabs Internship Program, Batch 2026.

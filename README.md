# Innovations Section

A standalone, production-ready "Innovations" component for a portfolio site.

## Files
- `innovations.html` — semantic markup (header, section, article per innovation, footer, modal)
- `innovations.css` — full styling: glassmorphism cards, animated neon timeline, glow accents, responsive layout
- `innovations.js` — scroll-reveal, animated counter, ambient particles, "View details" modal
- `assets/` — drop your real product renders here using the exact filenames below

## Required asset filenames
Place these in `assets/` (any image format works, just keep the name or update the `src` in `innovations.html`):

```
assets/exhaustive-duster.png
assets/hydrofit-cap.png
assets/hece.png
assets/ai-locket.png
assets/airvolt.png
assets/wifi-extender.png
assets/smart-projector.png
```

If an image is missing, the card automatically shows a dashed "IMG" placeholder instead of breaking the layout — so you can drop images in one at a time.

## Customizing
- **Accent colors**: edit the `--c1` through `--c7` variables at the top of `innovations.css`.
- **Copy**: edit text directly inside each `<article class="row">` block in `innovations.html`.
- **Modal content**: edit the `DETAILS` object at the top of `innovations.js` (title, description, category/status/focus tags).
- **Badge text**: change `Patent-Oriented Innovations` in the `<header class="hero">` badge.
- **Patent tags**: each card has a `<span class="patent-tag">Research Concept</span>` — change to "Patent Filed" only where accurate.

## Embedding into an existing portfolio page
1. Copy the whole `Innovations/` folder into your project.
2. Link the stylesheet in your page `<head>`: `<link rel="stylesheet" href="Innovations/innovations.css">`
3. Paste the contents of `<main class="wrap">...</main>` (and the modal `<div>` after it) into your page body.
4. Add `<script src="Innovations/innovations.js"></script>` before `</body>`.
5. Make sure the Google Fonts `<link>` tags from `innovations.html` are also in your page `<head>` (or self-host Outfit/Inter if you prefer no external requests).

## Accessibility notes already built in
- Real heading hierarchy (`h1` hero title, `h2` per innovation).
- `alt` text on every image; decorative icons marked `aria-hidden="true"`.
- Keyboard-operable cards (`tabindex`) and modal (focus moves to close button on open, returns on close, `Esc` closes it).
- Respects `prefers-reduced-motion` — animations and particle effects are skipped for users who request reduced motion.

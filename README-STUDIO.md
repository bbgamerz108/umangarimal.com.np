# R. Umanga — Studio Edition

This edition is based on the supplied **aaaa-main.zip**, not the discarded multicolor redesign.

## Design and behavior

- Full-screen photographic opening, cinematic title reveal, local typography and a restrained dark / ivory / champagne-gold palette.
- Horizontal photographic archive with category filters. Vertical wheel input over the album moves the photographs; input outside it scrolls the page. The album releases scrolling at its ends. Buttons, keyboard navigation and horizontal touch scrolling are also available.
- Accessible full-screen photo viewer with previous/next, Escape dismissal and focus restoration.
- A lightweight, unbranded 3D camera isolated to its own section. Scroll drives a complete rotation and flip; mouse dragging does not control it.
- Automatically moving creative journey. It pauses on hover, has a pause/resume button, and stops for reduced-motion preferences.
- Keyboard-accessible before/after color comparison and an accessible mobile menu.
- Existing photography, cinematography, equipment, creative projects, about and contact content retained.

## Camera performance changes

The original whole-page camera path, pointer parallax, live shadow passes, postprocessing, sparkles and floating 3D photo layers are no longer rendered. The camera is loaded near its section, uses a fixed viewing camera and section-relative scroll progress, and renders on demand. Device pixel ratio is capped at 1.25.

Browser checks measured **28 draw calls per frame** and **zero additional draw calls while idle and off screen**. Motion resumed on scrolling and stopped after settling. These checks used a software-rendered Chromium browser, not your physical PC; device frame rates will vary.

## Run and build

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Production build: `npm run build`.
Type check: `npm run typecheck`.

This retains the original React / TanStack Start / Vercel project structure. It is not a standalone HTML file. Install the dependencies rather than opening a source file directly in a browser.

## Edit content

- `src/lib/content.ts`: photographs, titles, categories, equipment and contact details.
- `public/photos/`: the existing photo assets.
- `src/components/portfolio/Portfolio.tsx`: sections and introduction.
- `src/styles.css`: visual design and responsive behavior.
- `src/components/scene/`: camera model and scroll/render lifecycle.

The film section links to the existing Instagram account because no playable film file was supplied.

## Reusable logo

`public/brand/` includes gold, ivory and dark versions of the R. UMANGA wordmark and RU monogram. These are transparent SVGs with outlined glyphs, so they do not depend on an installed font. They can be scaled for a website, watermark or print layout. The logo is a design asset; it is not a registered trademark.

## Verification

Production build and TypeScript checks pass. The browser interaction report and desktop/mobile screenshots are in `review/`.

Verified: no horizontal page overflow at tested widths; album wheel routing and edge release; category filters; viewer navigation and focus restoration; camera rendering, demand updates and idle behavior; automatic journey and pause; keyboard color comparison; mobile menu; reduced-motion behavior; all page images loading; no uncaught application errors.

The original Grok branding script could not be reached from the test environment. It remains in the project. The two reference websites were inaccessible during this session, so the opening and album interpret your requested direction and interactions rather than being verified pixel-identical copies.

No deployment was made.

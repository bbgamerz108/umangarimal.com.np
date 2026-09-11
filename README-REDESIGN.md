# R. Umanga — visual portfolio

A rebuild of the supplied React / TanStack Start project.

## What's included

- Editorial opening with an oversized wordmark, three framed photographs and a personal introduction.
- Four independently scroll-filled words: MOTION, COMPOSITION, COLOR, STORY.
- Horizontal photobook with mixed frames, occasional tape and keyboard-accessible image dialogs. Wheel input over the album moves photos; outside it moves the page. At the album ends, normal page scrolling resumes. Touch users swipe horizontally.
- Scroll-only camera rotation on three axes. The pinned motion spans 460 pixels on desktop and 360 pixels on mobile. Wheel hardware varies, so this cannot correspond to an exact number of wheel gestures on every device.
- Transparent 3D canvas over a blue gradient, section-limited mounting and lazy loading.
- About, equipment, creative disciplines and existing contact links retained.
- Responsive layouts, reduced-motion handling, focus styles, bundled display font and SVG wordmark.

## Project commands

Use Node.js 22.12 or newer. Install with `npm ci`. Development: `npm run dev`. Production: `npm run build`. Type checks: `npm run typecheck`.

The app retains its original TanStack Start / Vercel configuration; it is not a single HTML file and must be built through its scripts.

## Edit your content

Photo files: `public/photos/`. Photo titles, paths and contact details: `src/lib/content.ts`.
Main layout and introduction: `src/components/portfolio/Portfolio.tsx`.
Design: `src/styles.css`.
Reusable transparent wordmark: `public/brand/wordmark.svg`.

The supplied images and contact information were retained, not independently verified. The wordmark is a design asset; no trademark registration or clearance is implied.

## Verification and limits

Production build and TypeScript checks completed successfully. Browser visual and interaction testing was not performed in this session. Reference URLs could not be accessed, so this is an interpretation of the described direction and interactions, not a verified pixel-identical reproduction. No deployment was made.

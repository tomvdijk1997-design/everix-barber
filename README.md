# Everix Barber – website

One-page site for Everix Barber (Kevin Everix), Vinkeveen & De Ronde Venen.
React + Vite + Motion, Dutch/English, booking via WhatsApp.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

`dist/` is plain static files: host it for free on Netlify, Vercel or Cloudflare Pages
(build command `npm run build`, output folder `dist`).

## Before going live

| What | Where |
| --- | --- |
| Real reviews, then set `isPlaceholder = false` | `src/i18n.tsx` → `reviews.items`, `src/components/Reviews.tsx` |
| Gallery photos (WebP, ~1200px) in `public/gallery/` | `src/components/Gallery.tsx` → `photos` |
| Portrait of Kevin | `src/components/About.tsx` |

All texts (NL + EN) live in `src/i18n.tsx`; prices, days and service area in `src/config.ts`.

## Brand

- Colours: graphite `#1c1e21` / `#2a2d31`, gold gradient `#e6c88a → #c9a25a → #a47a38`
- Fonts: Cormorant Garamond (headings), Montserrat (body), self-hosted via Fontsource
- Logo: `src/components/Logo.tsx` (React) and `public/logo.svg` (standalone vector)

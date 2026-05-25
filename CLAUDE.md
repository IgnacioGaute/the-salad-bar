# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run Next.js linter
```

> Note: `next.config.mjs` disables ESLint and TypeScript error checking during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`). Lint errors won't block a build. Images are also set to `unoptimized: true`, so use plain `<img>` tags — the Next.js `<Image>` component provides no benefit here.

## Architecture

This is a **single-page marketing website** for The Salad Bar restaurant (Salta, Argentina). There is no routing — the entire site lives in `app/page.tsx`.

### Page structure (`app/page.tsx`)
A single long client component (`"use client"`) with all sections rendered inline in order:
- Hero (full-screen video background sourced from external Supabase URL — not `public/`)
- Filosofia, Historia/Propuesta Gastronómica, Cafetería/Easy Nights (alternating 2-col grid sections)
- Experiencia Culinaria (Embla carousel with modal detail panel)
- Franquicias (`<FranquiciaCard>` — scroll-reveal animated card that opens a modal with `<ContactForm>`)
- Contact (`<MainContactForm>`)
- Footer

`CarouselCell` (auto-cycling image crossfader) is defined inline at the top of `page.tsx`, not extracted to `components/`.

There is a dead block of `formData` / `handleSubmit` state in `page.tsx` that posts to `/api/contact` but is not rendered in the JSX — it's unused and can be removed.

### Carousel modal logic
`selectedCarouselItem` (0–3) controls which modal layout renders:
- Index 0 (THE SEASONS) and 2 (NUESTRA HISTORIA): horizontal photo strip on top + text below
- Index 1 (SE PARTE DE NUESTRO EQUIPO) and 3 (MOMENTOS): side-by-side layout with photo on the right
- Index 1 additionally mounts `<JoinTeamForm>` at the bottom of the text panel

### Components (`components/`)
Custom components outside shadcn:
- `franquicia-card.tsx` — scroll-progress-driven reveal animation (manual `getBoundingClientRect` + scroll listener) + franchise inquiry modal containing `<ContactForm>`
- `contact-form.tsx` — franchise inquiry form (multi-field), posts to `/api/contact`
- `main-contact.tsx` — general contact form, posts to `/api/contact-main`
- `join-team-form.tsx` — job application form, rendered inside the carousel modal for the "SE PARTE DE NUESTRO EQUIPO" slide
- `hero-button.tsx` — standalone button used in the hero

`components/ui/` contains generated shadcn/ui components (new-york style). Add new shadcn components with `pnpm dlx shadcn@latest add <component>`.

### API routes (`app/api/`)
Both routes use the **Resend** SDK to send emails. The `RESEND_API_KEY` environment variable must be set (see `.env`).
- `POST /api/contact` — receives franchise form data, sends a detailed HTML email
- `POST /api/contact-main` — receives general contact data (nombre, email, telefono, comentario), sends a shorter HTML email

### Layout extras (`app/layout.tsx`)
- Loads Google Fonts `Eczar` (`--font-eczar`) and `Mulish` (`--font-mulish`) via the Next.js font system and applies them as CSS variables on `<html>`
- Renders a fixed WhatsApp floating button (`wa.me/5493872521137`) site-wide in `<body>`

### Styling
- **Tailwind CSS v4** via `@import "tailwindcss"` in `app/globals.css`
- **Color palette** defined as CSS variables in `:root` — use the named vars rather than hardcoded hex:
  - `--salad-navy` (#1a3a52), `--salad-navy-light` (#2c4f6b) — primary text/navy
  - `--salad-sand-lightest` (#f5f3ef), `--salad-sand-light` (#e8e4dd), `--salad-sand-medium` (#ddd5ca) — section backgrounds
  - `--salad-aqua` (#7fcdcd) — accent/highlight color
- **Two font systems coexist** — be careful not to confuse them:
  - `--font-glacial` and `--font-muli` are loaded via `@font-face` in `globals.css` from `public/fonts/`
  - `--font-mulish` and `--font-eczar` are loaded via Next.js Google Fonts in `layout.tsx`
  - `--font-times` — Times New Roman (system font), for certain bold headings

### Image naming conventions (`public/`)
- `pg-*.jpeg` — gastronomy / food photos (used in the Historia/Propuesta section)
- `cf-*.jpeg` — cafeteria photos (used in the Cafetería/Easy Nights section)
- `ts-*.jpeg` — The Seasons carousel modal images
- `nh-*.jpeg` — Nuestra Historia carousel modal images

### Utilities
- `lib/utils.ts` — exports `cn()` (clsx + tailwind-merge) for conditional class merging
- `@vercel/analytics` is included as a dependency but `<Analytics />` is not yet mounted in layout

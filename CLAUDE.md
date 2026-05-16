# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run Next.js linter
```

> Note: `next.config.mjs` disables ESLint and TypeScript error checking during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`). Lint errors won't block a build.

## Architecture

This is a **single-page marketing website** for The Salad Bar restaurant (Salta, Argentina). There is no routing — the entire site lives in `app/page.tsx`.

### Page structure (`app/page.tsx`)
A single long client component (`"use client"`) with all sections rendered inline in order:
- Hero (full-screen image + logo)
- Filosofia, Historia/Propuesta Gastronómica, Cafetería/Easy Nights (alternating 2-col grid sections)
- Experiencia Culinaria (Embla carousel with modal detail panel)
- Franquicias (`<FranquiciaCard>` — scroll-reveal animated card that opens a modal with `<ContactForm>`)
- Contact (`<MainContactForm>`)
- Footer

### Components (`components/`)
Custom components outside shadcn:
- `franquicia-card.tsx` — scroll-progress-driven reveal animation + franchise inquiry modal containing `<ContactForm>`
- `contact-form.tsx` — franchise inquiry form (multi-field), posts to `/api/contact`
- `main-contact.tsx` — general contact form, posts to `/api/contact-main`
- `join-team-form.tsx` — job application form, rendered inside the carousel modal for the "SE PARTE DE NUESTRO EQUIPO" slide
- `hero-button.tsx` — standalone button used in the hero

`components/ui/` contains generated shadcn/ui components (new-york style). Add new shadcn components with `pnpm dlx shadcn@latest add <component>`.

### API routes (`app/api/`)
Both routes use the **Resend** SDK to send emails. The `RESEND_API_KEY` environment variable must be set (see `.env`).
- `POST /api/contact` — receives franchise form data, sends a detailed HTML email
- `POST /api/contact-main` — receives general contact data (nombre, email, telefono, comentario), sends a shorter HTML email

### Styling
- **Tailwind CSS v4** via `@import "tailwindcss"` in `app/globals.css`
- **Color palette** defined as CSS variables in `:root` — use the named vars rather than hardcoded hex:
  - `--salad-navy` (#1a3a52), `--salad-navy-light` (#2c4f6b) — primary text/navy
  - `--salad-sand-lightest` (#f5f3ef), `--salad-sand-light` (#e8e4dd), `--salad-sand-medium` (#ddd5ca) — section backgrounds
  - `--salad-aqua` (#7fcdcd) — accent/highlight color
- **Fonts** — three font families in use:
  - `--font-glacial` ("Glacial Indifference") — loaded from `public/fonts/`, for body copy
  - `--font-muli` ("Muli"/Mulish) — loaded from both `public/fonts/` (local) and Google Fonts (`--font-mulish`), for headings
  - `--font-times` — Times New Roman (system font), for certain bold headings
  - Google Fonts `Eczar` (`--font-eczar`) also available via Next.js font system

### Utilities
- `lib/utils.ts` — exports `cn()` (clsx + tailwind-merge) for conditional class merging
- `@vercel/analytics` is included (add `<Analytics />` in layout if needed)

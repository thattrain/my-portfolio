# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

No test suite is configured.

## Environment Variables

Copy and populate `.env` in the project root for the contact form to function:

```env
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

These are consumed via `import.meta.env` in `src/sections/Contact.jsx`.

## Architecture

Single-page React 19 app built with Vite. No routing — the page is one long scroll of sections.

**Entry point:** `src/main.jsx` → `src/App.jsx` renders all sections in order.

**Section layout** (`src/sections/`): Each file is a full-width page section. Order in `App.jsx` matches the visual page order: `Hero → ShowcaseSection → LogoShowcase → FeatureCards → Experience → TechStack → Testimonials → Contact → Footer`.

**3D rendering** (`src/components/models/`): Three.js scenes are encapsulated in React Three Fiber `<Canvas>` components. Two experiences exist:
- `hero_models/HeroExperience.jsx` — animated room scene with particles and lighting
- `contact/ContactExperience.jsx` — rotating computer model

GLB model files live in `public/models/`. `useMediaQuery` (react-responsive) controls responsive 3D behavior (scale, zoom) within these components.

**Content/data** (`src/constants/index.js`): All static site content (nav links, experience cards, testimonials, tech stack, social links, etc.) is centralized here. Update this file to change portfolio content.

**Animation:** GSAP via `@gsap/react` (`useGSAP` hook). Scroll-triggered reveals are applied directly in section components.

**Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`). Custom utility classes and CSS variables are defined in `src/index.css`.

**Reusable UI components** (`src/components/`): `Button`, `GlowCard`, `TitleHeader`, `AnimatedCounter`, `ExpContent`, `NavBar`.

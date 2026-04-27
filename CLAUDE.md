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

## Architecture

React 19 app built with Vite. Uses React Router v7 (declarative mode) for page routing.

**Routing:** Three routes: `/` (homepage scroll), `/blog` (post list), `/blog/:slug` (post reader). SPA fallback required on production server (all paths → `index.html`). `BrowserRouter` wraps the app in `src/main.jsx`.

**Entry point:** `src/main.jsx` → `src/App.jsx` defines routes and renders `NavBar` + `ScrollToTop` above all pages.

**Homepage** (`src/pages/HomePage.jsx`): Single-page scroll of sections. Order matches visual page order: `Hero → ShowcaseSection → LogoShowcase → FeatureCards → Experience → TechStack → Footer`.

**Blog** (`src/pages/BlogListPage.jsx`, `src/pages/BlogPostPage.jsx`): Markdown posts in `src/content/blog/*.md` with YAML frontmatter. A custom Vite plugin (`src/plugins/vite-plugin-blog-markdown.js`) transforms `.md` files to JS modules at build time using gray-matter + unified/remark/rehype + Shiki for syntax highlighting. Blog utilities in `src/utils/blog.js`.

**Section layout** (`src/sections/`): Each file is a full-width page section.

**3D rendering** (`src/components/models/`): Three.js scenes are encapsulated in React Three Fiber `<Canvas>` components. The hero experience lives in `hero_models/HeroExperience.jsx` — animated room scene with particles and lighting.

GLB model files live in `public/models/`. `useMediaQuery` (react-responsive) controls responsive 3D behavior (scale, zoom) within these components.

**Content/data** (`src/constants/index.js`): All static site content (nav links, experience cards, testimonials, tech stack, social links, etc.) is centralized here. Update this file to change portfolio content.

**Animation:** GSAP via `@gsap/react` (`useGSAP` hook). Scroll-triggered reveals are applied directly in section components.

**Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin — no `tailwind.config.js`). Custom utility classes and CSS variables are defined in `src/index.css`.

**Reusable UI components** (`src/components/`): `Button`, `GlowCard`, `TitleHeader`, `AnimatedCounter`, `ExpContent`, `NavBar`, `BlogCard`, `MarkdownRenderer`.

Pale Blue Dot — Static Website Prototype

What I built
- A small static website prototype for Pale Blue Dot with pages: Home (`index.html`), Journal (`journal.html`), Blog (`blog.html`), a sample bilingual article (`article.html`), Staff (`staff.html`), and About (`about.html`).
- Simple local comment support on blog posts using localStorage (comments are not stored on a server).
- A lightweight responsive layout and a blue color palette using the provided hex values.

Pale Blue Dot — Next.js prototype

This repository contains a Next.js + TypeScript + TailwindCSS prototype for the Pale Blue Dot journal. It includes a custom canvas-based hero animation, editorial pages (Journal, Blog, Staff, About, Submissions), and Sanity schemas to prepare for integrating a CMS.

Quick status
- Core Next app scaffolded (pages, layout, header/footer, hero animation)
- Tailwind + consolidated `styles/globals.css` (single global stylesheet)
- Sanity schemas under `studio/schemas` (Issue, Article, Author, BlogPost, Staff, Page, BlockContent)

Run locally (macOS / zsh)
1. Install dependencies

```bash
cd /Users/amritapal/Desktop/pbd-website/Pale-Blue-Dot
npm install
```

2. Run the development server

```bash
npm run dev
# open http://localhost:3000
```

3. Build for production

```bash
npm run build
npm run start
```

Notes about styles and the hero
- The project uses a single consolidated stylesheet at `styles/globals.css`. `_app.tsx` imports that file. If you previously had a separate `styles.css`, it has been removed to avoid conflicts.
- The hero animation is implemented in `components/Hero.tsx` using a Canvas. It respects reduced-motion (placeholder hook) and uses a three-shade blue scheme tuned for the pale-blue site background.

Sanity Studio
- Schemas are present under `studio/schemas`. To run a Sanity Studio you will still need to create a Sanity project and scaffold a studio app (not included by default). The schemas are ready to be copied into a Studio's `schemas` folder.

Cleaning up and safe edits
- I consolidated styles to `styles/globals.css`. To avoid breaking things:
	- Do not recreate `styles.css`. Keep `_app.tsx` importing `styles/globals.css` only.
	- If you revert any changes, use Git to review diffs (`git status`, `git diff`) and revert selectively.

Troubleshooting
- If you make style edits that don’t show up:
	- Confirm the dev server is running and you opened `http://localhost:3000`.
	- Clear your browser cache or open a private window.
	- Confirm `_app.tsx` imports `styles/globals.css`.

Next recommended steps
1. Start the dev server and review the hero animation and header/footer colors.
2. Add font loading for `Cormorant Garamond` and `EB Garamond` (I can add Google Fonts or a local font pipeline).
3. Scaffold a Sanity Studio and connect the front end via GROQ for dynamic content.

If you'd like, I can run the dev server now and tune spacing, typography, and the hero animation while you look at it in your browser.

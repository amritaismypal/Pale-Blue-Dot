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

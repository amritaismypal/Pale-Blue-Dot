Pale Blue Dot — Static Website Prototype

What I built
- A small static website prototype for Pale Blue Dot with pages: Home (`index.html`), Journal (`journal.html`), Blog (`blog.html`), a sample bilingual article (`article.html`), Staff (`staff.html`), and About (`about.html`).
- Simple local comment support on blog posts using localStorage (comments are not stored on a server).
- A lightweight responsive layout and a blue color palette using the provided hex values.

Files added
- `index.html`, `journal.html`, `blog.html`, `article.html`, `staff.html`, `about.html` — pages
- `styles.css` — styling and responsive layout
- `scripts.js` — small JS for nav, year, blog modal, and comments
- `assets/` — directory for images (contains README)

How to run
1. Open `index.html` in a browser. No server required. For improved behavior (and to avoid some browser restrictions), serve the folder with a static file server, for example:

```bash
# from project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Notes & next steps
- This is a static prototype. To publish or add dynamic features (real comments, CMS, submissions), you can integrate with a CMS (Netlify CMS, Contentful), or build a small backend (Node/Python) and a database.
- Accessibility, translations workflow, and editorial workflows should be planned before going live. I kept the journal articles non-commentable and the blog commentable as requested.

If you'd like, I can:
- Convert this into a simple static site generator (Eleventy) or a Next.js app for easier content management.
- Add forms for submissions and an email integration.
# Pale-Blue-Dot
Website for Jay's Interdisciplinary Journal: Pale Blue Dot

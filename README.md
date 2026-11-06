# Pale Blue Dot

Pale Blue Dot is an interdisciplinary student journal built with Next.js Pages Router, TypeScript, Tailwind CSS, and Sanity. Sanity is the content database and media host; editions contain articles, and articles cannot be published without an edition.

## Run the website

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add the Sanity project ID, dataset, and API version. The public site can still be previewed without a Sanity project; CMS-backed pages will show their empty states.
3. Start the website with `npm run dev`, then open `http://localhost:3000`.
4. Run `npm run build` to create a production build and `npm start` to serve it locally.
5. Run `npm run lint` for ESLint checks.

## Set up Sanity Studio

1. Create a Sanity project in the Sanity management console and choose a dataset (usually `production`).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` in `.env.local`. The same variables configure the Studio and website.
3. Start the local Studio with `npm run studio`; open the URL printed by the CLI.
4. Deploy the hosted Studio with `npm run studio:deploy` (the Sanity CLI may ask you to sign in and choose a Studio hostname).
5. In Sanity project settings, add the production website origin to **API → CORS origins**. Add local development as `http://localhost:3000` too, with credentials enabled only if you later use authenticated previews.

The Next.js website can be deployed to Vercel by importing the GitHub repository and setting the three `NEXT_PUBLIC_SANITY_*` environment variables in the Vercel project settings. Deploy after the variables are set. Sanity-backed pages use Incremental Static Regeneration and revalidate every 60 seconds.

## Editor's guide

### Publish an Edition and its PDF

1. Sign in to the Pale Blue Dot Studio.
2. In the left navigation, choose **Edition** and click **Create**.
3. Enter the edition title, create its slug, set an edition number and publication date, and add a short description.
4. Upload a cover image and enter alternative text for it.
5. In **Edition PDF**, upload the final PDF. The field accepts PDF files.
6. Choose **Publish**. If it should appear in the homepage's “Now Available” feature, check **Show as Now Available**. If no edition is featured, the newest edition is selected automatically.

### Add an Article to an Edition

1. In the left navigation, choose **Article** and click **Create**.
2. Enter the title and create the slug.
3. In **Edition**, select the Edition that contains this article. This field is required.
4. Add one or more authors (create author records first if needed), the publication date, abstract, and language.
5. Add the article body using headings, lists, links, quotes, and images. Add alternative text to each image.
6. Optionally add a disclaimer, bibliography entries, an article PDF, or the translation relationship.
7. Choose **Publish**. The article will appear on its Edition page and receive a URL under `/journal/{edition-slug}/{article-slug}`.

### Add or update a Staff member

1. In the left navigation, choose **Staff member** and click **Create**, or open an existing profile.
2. Enter the person's name, slug, role, bio, optional fun fact, and display order.
3. Upload their photo and enter alternative text. If a photo is missing, the site shows initials; a local fallback can be added at `public/images/staff/{slug}.jpg`.
4. Choose **Publish**.

### Open or close submissions

1. In the left navigation, open the pinned **Site settings** singleton.
2. Check **Submissions open** to show the guidelines and submission form link, or uncheck it to show the closed message and latest edition link.
3. When open, set **Submission form URL** and edit the guidelines. Set the contact email and homepage mission paragraph here too.
4. Choose **Publish**. The homepage button and `/submit` page both use this setting.

### Seed staff profiles

To import the two provided staff profiles, run `npx sanity dataset import studio/seed/staff.ndjson production` after configuring the project and dataset. To use another dataset, replace `production` with its name. The import creates Rocio Tejerina and Azeeza Evelyna with the supplied biographies and fun facts.

## Content and routes

- `/` — homepage, featured Edition, latest blog posts, and submission call to action
- `/journal` — all Editions
- `/journal/{edition}` — Edition details, PDF, and article list
- `/journal/{edition}/{article}` — long-form article, contents list, bibliography, and related articles
- `/blog` and `/blog/{post}` — blog index and post
- `/submit`, `/staff`, `/about` — submissions, staff directory, and about page

Blog comments from the early HTML prototype were browser-local only and are not included. **TODO:** If the editors want shared discussion, decide on a server-backed comment model. There is no server-backed comment feature today.

## Configuration notes

- Copy `.env.example` to `.env.local`; never commit real project credentials.
- Uploaded image and PDF assets are delivered by Sanity's CDN.
- Static staff photo fallbacks belong under `public/images/staff/` and should use the staff slug as the filename.
- Site settings and the About page are singletons pinned at the top of Studio navigation.

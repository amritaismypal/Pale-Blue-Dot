Local Postgres for Pale Blue Dot

This folder contains a docker-compose setup to run a local PostgreSQL instance pre-populated with an `articles` table and a sample row for testing. If you do not (or do not want to) run Docker Desktop locally, the repository also supports using a managed Postgres (Supabase, Railway, Render, etc.) or a locally-installed Postgres (Homebrew) and Prisma migrations for developer → production workflows.

Quick start (no Docker required)

1. Create a Postgres instance:
	- Managed (recommended for production/testing): create a database on Supabase, Railway, Render, or any managed provider. Copy the connection string.
	- Local (developer): install Postgres via Homebrew: `brew install postgresql`, then start it with `brew services start postgresql` and create a database and user.

2. Create a `.env` file in the project root (copy the example):

```bash
cp .env.example .env
# edit .env and set DATABASE_URL to your DB connection string
```

3. Install project dev dependencies (Prisma) and generate the client:

```bash
npm install
npm run prisma:generate
```

4. Run Prisma migrations and seed the DB (this will create the `articles` table and insert a test row):

```bash
npm run db:migrate
npm run db:seed
```

5. Connect with your preferred client using the connection details from your `.env`.

If you prefer Docker locally, you can still use the docker-compose setup in this folder. Run `npm run db:up` to start the container and `npm run db:down` to stop it.

Notes

- The SQL init file used by the docker image is `db/init/01_create_articles.sql`. It creates the `articles` table and inserts a sample row. When using Prisma migrations, the schema is driven by `prisma/schema.prisma` and the seed script is at `prisma/seed.ts`.
- For production, use a managed Postgres provider and set the `DATABASE_URL` environment variable on your hosting platform. You can run Prisma migrations from CI or locally to deploy schema changes.
- Admin UI / workflow recommendation: for content administration and editorial updates, I recommend using Sanity (already included as a dependency) as the editorial CMS and keep the canonical content there; then sync or read from the Postgres database for the journal-specific data if needed. If you prefer Postgres as the CMS backend, we can add a lightweight admin UI (e.g., Next.js pages using Prisma + NextAuth for admin auth) so admins can edit articles in production directly.

# Rao Social Blade — Project Export

This ZIP contains the source of the latest deployed website, including the screenshot-matched crossing text carousel, royal-blue logo presentation and embedded campaign images.

## Start here (Mac / Windows / Linux)

Requirements: Node.js 22.13 or newer and pnpm 11.25.0.

1. Extract this ZIP and open the `raosocialblade-project` folder in VS Code.
2. Open its terminal and install dependencies:

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
```

3. Make a copy of `.dev.vars.example` named `.dev.vars` in the project root. Its sample owner email is for the included local test identity.
4. Build once and initialize the local enquiry database:

```sh
pnpm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_redundant_taskmaster.sql
```

Run the SQL command once for a new local database. It creates the tables; it does not contain live enquiry records.

5. Start development:

```sh
pnpm run dev
```

Open `http://localhost:5173`. Use the URL printed in the terminal if it differs.

6. To view the owner inbox locally, open this URL in your browser:

`http://localhost:5173/signin-with-chatgpt?return_to=/inquiries`

The portable development server supplies the `seedy@sites.test` test identity. Its email matches `.dev.vars.example`. This local sign-in simulation is disabled in production.

## What is included

- Homepage, responsive layouts, service dialogs, pricing selection, service finder and contact form.
- Owner enquiry inbox, server-side validation and database migration.
- All campaign images, original logo, embedded image data and self-hosted fonts.
- Dependency lockfile, build scripts, tests, and original framework README.
- Asset provenance and design notes in `DESIGN_ASSETS.md`.

The code uses React, TypeScript, Vinext / Vite, Cloudflare Workers and Cloudflare D1. The source is the project; install dependencies and run the commands above to generate build output.

## Main editing files

| Change | File |
| --- | --- |
| Homepage content and interaction | app/studio.tsx |
| Current visual design and tilted ribbons | app/reference.css |
| Shared styling and owner inbox styles | app/globals.css |
| Logo presentation | components/brand.tsx |
| Original images and fonts | public/ |
| Embedded campaign images | lib/site-images.json |
| Embedded original logo | lib/brand-image.json |
| Monthly plans | lib/marketing-plans.ts |
| Contact form validation | lib/lead-validation.ts |
| Form API | app/api/inquiries/route.ts |
| Database schema | db/schema.ts |
| Page title and metadata | app/layout.tsx |

Embedded images are data URLs containing the original image bytes. If you replace an original image, update its corresponding embedded data as well.

## Checks

```sh
pnpm exec tsc --noEmit --incremental false
pnpm run build
node --experimental-strip-types --test tests/lead-validation.test.mjs tests/worker-integration.test.mjs
```

The integration test uses a temporary local database and test identities. It does not submit to the deployed site. The latest source build passed before export; browser visual verification was unavailable in the creation environment.

## Hosting and access

The `.openai/hosting.json` file retains the existing Site identity for continuity. The existing private deployment is:

https://logical-india-studio.nishantsharma59059.chatgpt.site

Live enquiry storage needs the `DB` D1 binding and migrated schema. Production inbox access needs `OWNER_EMAIL` configured through the hosting platform and trusted server-injected ChatGPT identity headers. The existing Sites deployment supplies that sign-in infrastructure. Deployment to another platform requires equivalent server, database and trusted authentication configuration.

The metadata currently uses `noindex` because the site is private. Review it when you intentionally publish a public marketing site.

Secrets, live database records, dependency folders, build output, Git history and machine-specific runtime files are excluded from this export. Uploading or sharing this ZIP does not change the live site's access settings.

Source commit: b92d71540e8c286655e11905933740b9b23241ce

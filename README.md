# Rao Social Blade — Frontend Only

A standalone React + Vite website for digital marketing, website development and graphic design. Royal blue and white theme, 3D campaign images, responsive sections, service dialogs, pricing tabs and screenshot-matched crossing text ribbons are preserved.

## Run locally

Requires Node.js 22.13+ and pnpm 11.25.0.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm run dev
```

Open the address printed in the terminal. Stop with Ctrl+C.

## Build for hosting

```sh
pnpm run build
```

The `dist/` folder is the complete static website. Upload its **contents** (`index.html`, `assets/`, image files and `fonts/`) into your domain’s `public_html` folder. The build also supports a subfolder because entry point URLs are relative. Open the site through your hosting URL or `pnpm run preview`; browser module loading needs an HTTP server.

Only the contents of `dist/` are needed on static hosting. Server installation, database credentials and environment variables are not required.

## Contact flow

The project form validates a brief in the browser, then displays email and WhatsApp draft links. The visitor chooses an app and presses Send there. Preparing or opening a draft does not send a message or store an enquiry. Form details stay in page memory and disappear on reload. The site has no database, API endpoints, login or owner inbox.

Email destination: `info@raosocialblade.com`.
WhatsApp draft destination: `+91 8171833456`.

Change destinations in `src/lib/contact.ts`. The phone must be registered on WhatsApp for a visitor to use that channel. Direct email and both telephone contacts also remain available on the page.

## Edit the website

| Change | File |
| --- | --- |
| Page content and interactions | src/App.tsx |
| Visual theme, responsive layout and ribbons | src/styles/reference.css |
| Shared styling | src/styles/globals.css |
| Original logo presentation | src/components/Brand.tsx |
| Monthly prices and included services | src/lib/marketing-plans.ts |
| Draft creation and input validation | src/lib/contact.ts |
| Embedded campaign images | src/lib/site-images.json |
| Embedded logo | src/lib/brand-image.json |
| Original images and self-hosted fonts | public/ |
| Page title, metadata and favicon | index.html |

Embedded images contain the source image bytes and avoid separate image requests. Update the corresponding data URL if you replace a source image. Asset notes are in `DESIGN_ASSETS.md`.

The existing private Site identity is retained in `.openai/hosting.json`; the manifest declares static output and no database bindings. That file is used by Sites and is not needed on Hostinger.

The page currently includes `noindex, nofollow` to retain its private-preview setting. When launching your public marketing domain, change the robots meta tag in `index.html` to `index, follow` and rebuild.

## Checks

```sh
pnpm run build
pnpm test
```

Checks cover enquiry validation, correct URL encoding, optional fields, image data and static build output. Browser visual testing was unavailable in the creation environment.

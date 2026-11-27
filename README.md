# All Air International Travels & Tours

A responsive travel agency website for All Air’s Putalisadak, Kathmandu desk. Built with Vite, semantic HTML, CSS and vanilla JavaScript.

## Run locally

Install dependencies with `npm install`, then run `npm run dev` (port 5174). Run `npm test` for journey validation and `npm run build` for the production build. Vercel serves `dist/`.

## What works

- Responsive navigation and layouts for phones, tablets and desktop.
- Flight, holiday, stay and transfer journey planner with date validation.
- Destination and student actions that prefill the planner.
- Inline review and explicitly user-controlled WhatsApp handoff.
- Native expandable trip ideas, FAQs, booking guidance and privacy information.
- Self-hosted fonts, credited destination photos, canonical/social metadata, sitemap and robots configuration.
- Existing browser-local visual editor, settings and optional published journal support retained.

## Booking and payment status

**Live online booking, ticket issuance and payment are not implemented.** The owner confirmed there is no inventory provider or merchant account. The planner does not fabricate inventory, prices, successful payments, staff receipt or issued tickets. It prepares a request; the visitor chooses whether to send it on WhatsApp. See `docs/online-booking-setup.md` for the recommended provider/onboarding approach and transaction requirements.

## Local editor

`/admin.html` retains the existing local editing utility. Its development access check and records exist only in the browser. It is not secure server authentication, a shared CMS, a deployed publishing system or an operational booking inbox. Do not use it to store passenger documents or payment data. Preview edits do not deploy to Vercel. The homepage does not create customer records in this local store.

The visual editor and business settings remain available. Section controls match the redesigned sections. Optional journal content appears only when published local posts exist; no empty journal is rendered. Legacy merchandise and catalogue tooling remain in the local utility, while the customer homepage prioritizes travel services.

## Content and assets

Contact defaults follow the original production code: +977 9851425123, info@allairtravel.com, Star Mall, 3rd Floor, Putalisadak, Kathmandu. Agency staff should verify these and office hours before release. No unverified statistics, testimonials, registration claims, fare amounts or baggage guarantees are displayed.

Destination photo origins: `assets/CREDITS.md`, `assets/destinations/manifest.json`, and `/credits.html`. Original agency imagery is preserved. Asset provenance is stored in image metadata or adjacent JSON sidecars. Font licenses are under `assets/fonts/`.

`PRODUCT.md`, `DESIGN.md` and `.impeccable/surfaces/index-html.md` record the product and design decisions for future work.

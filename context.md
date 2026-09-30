# Homepage UI Revamp — Context

Sibling repos: this one (`goa-tours`, public frontend, Next 15) and `../goa-tours-cms` (admin/CMS, Next 16). Same MongoDB (shared `pages` and `siteSettings` collections). Both are independent git repos with their own GitHub remotes — this one is on branch `revamp`, the CMS one is on `master`. A copy of this file also lives at `../goa-tours-cms/context.md`.

## Goal

Revamp the frontend UI to match a design mockup (screenshots the user shared at the start of this work) — colors, spacing, component layouts. Reuse the existing CMS block schema where possible; new fields/block types are fine. **Animations are explicitly deferred to a later "Phase 2"** — everything built so far is static by design, not an oversight.

## Key decisions made along the way

- `/` on this frontend becomes the new content-rich homepage design itself (Goa content by default). The old Goa-vs-Kerala split-panel chooser (`app/page.tsx`) is being retired from that route — **not done yet**, see Outstanding.
- Destination switching (Goa ↔ Kerala) moves into a header "Destination ▾" dropdown instead of the old chooser screen.
- Header gets full dropdown nav (Pages ▾ / Destination ▾ / Help & Support ▾) plus a "Buy Packages" CTA, matching the mockup — **not done yet**. The existing scroll-based compact/hide-show + transparent/solid logic in `components/header.tsx` must be preserved exactly, not rewritten.
- User explicitly approved: modify CMS schema freely, discard old test data, invent dummy content to match the mockup (real content comes later when live).
- Execution style: stage-by-stage with check-ins (not one giant unsupervised pass).
- Both repos turned out to already have full git history + GitHub remotes (an earlier "not a git repository" environment flag was wrong/stale). A "Baseline before UI revamp" commit was added in each before this work started — see commit hashes below.

## Status

**Done (committed):**
1. **Theme tokens** (`app/globals.css`) — new palette: deep indigo/purple primary, teal accent, warm ivory background, plus bespoke `--navy`/`--navy-foreground` and `--highlight`/`--highlight-foreground` tokens added *alongside* (not replacing) the existing shadcn semantic tokens, so nothing else in the app shifted unexpectedly.
2. **CMS block schema** (in `../goa-tours-cms`) — 7 new block types added to the `Block` union: `tourPackages`, `destinationHighlight`, `features`, `enquireBanner`, `collections`, `offers`, `faq`. Existing `hero` and `testimonials` blocks were also extended with new fields (see table below). Full admin editor UI for every new/changed field.
3. **SiteSettingsDocument** extended (CMS side): `navGroups` (dropdown nav groups with children, replacing the dead/unused `primaryNav`), `buyPackagesLabel`/`buyPackagesHref`, `footerColumns`, `newsletterHeading`/`newsletterSubheading`.
4. **Homepage section components** — one per new block type, wired into `components/block-renderer.tsx`: `tour-packages-grid.tsx`, `destination-highlight.tsx`, `features-grid.tsx`, `enquire-banner.tsx`, `collections-grid.tsx`, `offers-grid.tsx`, `faq-accordion.tsx`. Empty blocks render `null` (existing convention).
5. **Hero rebuilt** (`hero.tsx`) — badge, location label, primary/secondary CTAs, promo ribbon banner below the hero, floating gallery-preview thumbnail. All new props are optional with sensible defaults so the old fallback-content call site in `app/[destination]/page.tsx` still works unchanged.
6. **Footer rebuilt from scratch** (`footer.tsx`) — was previously 100% hardcoded/static with zero CMS wiring. Now an async server component: newsletter strip + navy 4-column footer + socials, all sourced from `getSiteSettings()`.
7. **Testimonials rendering** wrapped in the dark navy section with a heading (`block-renderer.tsx`), matching the mockup. FAQ restyled to a flatter list with the first item open by default.
8. **`getSiteSettings()` added** (`lib/cms.ts`) — reads the shared `siteSettings` collection directly (same pattern as `getPublishedPageBySlug`). The CMS's own `getSiteSettings()` self-heals legacy documents missing new fields via `{...defaults, ...existing}` merge.
9. **Dummy content seeded** directly into MongoDB via `../goa-tours-cms/seed-dummy-content.mjs` (reusable — run with `node --env-file=.env seed-dummy-content.mjs` from `goa-tours-cms/`). Seeds a full Goa page (all 10 blocks) and `siteSettings` with mockup-matching copy (Dubai/Greece/Bali/Paris/Maldives content, picsum.photos placeholder images). **Kerala has not been seeded yet.**
10. Verified: both repos type-check clean (`npx tsc --noEmit`) and build clean (`npm run build`). Fetched the live rendered `/goa` page from the dev server and confirmed all seeded content appears with no error markers (HTML content-string check, not a pixel screenshot — Playwright isn't installed in either project).

**Known pre-existing issues, NOT introduced by this work (confirmed via `git stash` diff before touching anything):**
- `components/testimonials.tsx` — orphaned/unused component, imports a missing `embla-carousel` module (type error). Also `tour-packages.tsx`, `featured-destinations.tsx`, `DestinationsCarousel.tsx` are orphaned (only referenced from an old `app/about/page.tsx`). Candidates for deletion once confirmed unused — not yet removed.
- `app/api/email-preview/[template]/route.ts` — unrelated pre-existing type error (missing `enquiryId`/`submittedAt` props).

**Outstanding (not started):**
- **Header rebuild** (`components/header.tsx`): replace the flat `navLinks` list with `siteSettings.navGroups`-driven dropdowns (Pages / Destination / Help & Support), add the "Buy Packages" CTA, carry dropdowns into the mobile `Sheet` menu. Must NOT touch the existing scroll state machine (`compact`, `visible`, rAF scroll handler, `isHome`/`isPackageDetail` transparent-vs-solid matrix, lines ~19-105 of the current file).
- **Homepage routing**: make `app/page.tsx` render the same template as `/goa` (fetch Goa's CMS page, same fallback as today) instead of the `SplitLandingPage` framer-motion chooser. Archive rather than delete the old split-panel component (no strong git safety net beyond the baseline commit).
- **Kerala content** — seed or author via admin UI (currently only Goa has content).
- **Phase 2** (separate, later): animations/entrance motion on the new sections — explicitly out of scope until the user asks for it.

## New/changed CMS block fields (for reference — see `../goa-tours-cms/lib/types.ts` for the authoritative shapes, mirrored in `lib/cms-types.ts` here)

| Block type | Key fields added this round |
|---|---|
| `hero` | `badge`, `locationLabel`, `primaryCtaLabel/Href`, `secondaryCtaLabel/Href`, `ribbonText`, `ribbonCtaLabel/Href` |
| `testimonials` | `heading` |
| `tourPackages` (new) | `heading`, `moreHref`, `packages[]` (image, title, location, duration, price, badge, note) |
| `destinationHighlight` (new) | `bannerImage`, `bannerBadge`, `bannerEyebrow`, `bannerTitle`, `bannerTags[]`, `bannerPriceLabel`, `bannerNote`, `bannerCtaLabel/Href`, `moreHref`, `tiles[]` (image, name, subtitle, href) |
| `features` (new) | `heading`, `subheading`, primary/secondary CTA, `features[]` (icon, label) — icon strings resolve via `components/icon-map.ts` |
| `enquireBanner` (new) | `image`, `imageCaptionTitle/Subtitle`, `heading`, `body`, `ratingText`, `ctaLabel/Href`, `phones[]` |
| `collections` (new) | `heading`, `items[]` (image, name, description, rating, startingPrice, href) |
| `offers` (new) | `heading`, `subheading`, `offers[]` (image, badge, title, subtitle, ctaLabel/Href, validity) |
| `faq` (new) | `heading`, `subheading`, `items[]` (question, answer) |

`SiteSettingsDocument`: `navGroups[]` (label, href?, children: {label, href}[]), `buyPackagesLabel/Href`, `footerColumns[]` (heading, links: {label, href}[]), `newsletterHeading/Subheading`. (`primaryNav` field removed — it had zero frontend consumers.)

## Git reference points

- `goa-tours` baseline commit (before any revamp work): `fdf5e90`
- `goa-tours-cms` baseline commit (before any revamp work): `7f4e4c5`
- Everything after those commits on each repo's current branch is this revamp.

## Time estimate (original, still roughly accurate)

~9–13 working days total for the full Phase-1 scope (excludes animation). Breakdown is in the approved plan file the user saw at the start of this work (not persisted elsewhere — this file is the up-to-date source of truth now).

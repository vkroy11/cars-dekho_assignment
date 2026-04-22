@AGENTS.md

# Car Decision Assistant

Next.js app that turns ~40 curated Indian cars (2025/26) into a top-3–5 ranked
shortlist via a weighted scoring engine. All state is client-side (localStorage).

## Stack
- Next.js 16 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 + shadcn/ui
- Zustand with `persist` middleware
- No backend, no DB, no auth. Data in `data/cars.json`; images in `public/cars/`.

## Run
```
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```
Deploy: `vercel --prod` (no env vars required).

## File Layout
- `app/`               Route segments (landing, preferences, recommendations, compare, cars/[id], shortlist)
- `components/ui/`     shadcn-generated, do not hand-edit
- `components/`        App components (Navbar, CarCard, RecommendationCard, ComparisonTable rows, ShortlistCard, etc.)
- `lib/scoring.ts`     Pure: filterCars, rankCars, buildExplanation
- `lib/cars.ts`        Accessors over `data/cars.json`
- `lib/utils.ts`       cn, formatLakhs, formatPriceRange, ytSearchUrl
- `lib/constants.ts`   STAGES, STAGE_LABELS, FUEL_TYPES, default weights
- `data/cars.json`     ~40 cars, shape = `types/Car`
- `public/cars/`       One image per car (`<id>.jpg`); fallback is gradient + initials
- `store/`             Zustand, each persisted to its own localStorage key (`cda-prefs`, `cda-shortlist`)
- `types/index.ts`     Shared types

## Conventions
- Prices are in lakhs as `number` (`8.5` = ₹8.5L). `priceMin`/`priceMax` is the variant range.
- Weights are 1..5 integers from sliders; normalized by sum at scoring time.
- **Scored attributes** (weighted): `mileage`, `power`, `safety`, `brandTier`, `maintenanceCost`.
- **Filter-only attributes** (not scored): `priceMin/Max` (overlap), `type`, `fuelTypes`.
- `maintenanceCost` is inverted during normalization (lower = better).
- Car ids are slugs (`maruti-swift`) — used in URLs, shortlist keys, and image paths.
- Stages in order: `exploring → comparing → shortlisted → test_drive → final`. Advance via `useShortlistStore.advance(carId)`.
- Mark `"use client"` for files using stores / sliders / useEffect.
- YouTube helper: `lib/utils.ts#ytSearchUrl(name)`.

## Gotchas
- Zustand `persist` causes SSR hydration mismatches on first paint. Use `useHasHydrated()` from `store/useHasHydrated.ts` before reading store state in SSR-rendered components (e.g. Navbar badge).
- Normalization in `lib/scoring.ts` uses the **filtered** set's min/max, not the full set — re-run on every preference change.
- If filter returns 0 cars, `/recommendations` shows `<EmptyState>` with a "Back to questionnaire" CTA.
- Empty `fuelTypes` array in preferences means "any fuel" (not "no fuel").
- `data/cars.json` was generated from WebFetch during initial build (CarDekho + Wikipedia). Images were downloaded via `curl` into `public/cars/`. To refresh, re-run that data-collection flow.
- Next.js `<Image>` is used with local `/cars/<id>.jpg` paths — no `next.config` `remotePatterns` needed.

## Out of scope (do not add)
MongoDB, live scraping pipeline, real auth, charts, real test-drive booking. All explicitly cut for scope.

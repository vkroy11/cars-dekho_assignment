# Car Decision Assistant

Helps Indian car buyers move from **40 overwhelming options** to **3 clear, explainable picks**
tailored to their budget, body type, fuel preference, and personal priorities.

Built as a take-home for CarDekho. See `prd.md` for the original brief and `CLAUDE.md` for
architecture notes.

## What it does

1. **Questionnaire** – budget, body type, fuel type (multi-select), and five weight sliders
   (mileage, performance, safety, brand, maintenance).
2. **Weighted recommendation engine** – filters the catalogue by budget/type/fuel, normalizes
   each scored attribute across the filtered set, applies the user's weights, ranks top 5.
3. **Explainable picks** – each recommendation shows a plain-English explanation of which
   two priorities it actually wins on for that user.
4. **Side-by-side comparison** – 2–3 cars across price, mileage, power, safety, brand tier,
   maintenance, fuel options. Winner cell per row is highlighted.
5. **Shortlist decision tracker** – 5-stage kanban: Exploring → Comparing → Shortlisted →
   Test Drive → Final Decision. Advance a car through stages with one click.
6. **Car detail** – hero image, specs, variant list, honest pros/cons, one-click YouTube review link.

All state (preferences, shortlist stages, compare selection) persists in **localStorage**.
No backend, no auth.

## Data

`data/cars.json` holds ~40 popular 2025/26 Indian cars (SUV / Sedan / Hatchback).
Most flagship models have real CarDekho imagery downloaded locally to `public/cars/`.
Cars without a fetched image fall back to a gradient-and-initials tile.

Data was collected via CarDekho + Wikipedia during build. To refresh, re-run that flow.

## Stack

- **Next.js 16** App Router, **React 19**, **TypeScript strict**
- **Tailwind v4** + **shadcn/ui**
- **Zustand** with `persist` middleware for state

## Run

```bash
npm install
npm run dev
# → http://localhost:3000
```

Production:
```bash
npm run build
npm start
```

## Deploy

```bash
npx vercel --prod
```
No env vars required. `public/cars/` ships with the build.

## Project structure

```
app/                  Routes
├─ page.tsx           Landing
├─ preferences/       Questionnaire
├─ recommendations/   Scored, explainable picks
├─ compare/           Side-by-side with winners
├─ cars/[id]/         Detail page + YouTube link
└─ shortlist/         5-stage tracker
components/ui/        shadcn-generated, do not hand-edit
components/           App-specific: Navbar, CarCard, RecommendationCard, ShortlistCard, …
lib/scoring.ts        Pure: filterCars, rankCars, buildExplanation
lib/cars.ts           Accessors over data/cars.json
store/                Zustand stores (preferences, shortlist) + useHasHydrated hook
types/                Shared types (Car, Preferences, Stage, FuelType, …)
data/cars.json        ~40 cars
public/cars/          Local images
```

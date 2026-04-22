import type { Car, Preferences, ScoredCar, Weights } from "@/types";

const PHRASES: Record<keyof Weights, string> = {
  mileage: "strong fuel efficiency",
  performance: "excellent performance",
  safety: "a high safety rating",
  brand: "trusted brand value",
  maintenance: "low maintenance cost",
};

export function filterCars(cars: Car[], prefs: Preferences): Car[] {
  const { budgetMin, budgetMax, types, fuelTypes } = prefs;
  const typesList = types ?? [];
  const fuelsList = fuelTypes ?? [];
  return cars.filter((c) => {
    const overlapsBudget = c.priceMin <= budgetMax && c.priceMax >= budgetMin;
    const matchesType = typesList.length === 0 || typesList.includes(c.type);
    const matchesFuel =
      fuelsList.length === 0 || c.fuelTypes.some((f) => fuelsList.includes(f));
    return overlapsBudget && matchesType && matchesFuel;
  });
}

type Range = { min: number; max: number };

function rangeOf(values: number[]): Range {
  return { min: Math.min(...values), max: Math.max(...values) };
}

function norm(v: number, r: Range): number {
  if (r.max === r.min) return 1;
  return (v - r.min) / (r.max - r.min);
}

interface NormalizedCar extends Car {
  n: Record<keyof Weights, number>;
}

function normalizeSet(cars: Car[]): NormalizedCar[] {
  if (cars.length === 0) return [];
  const mileageR = rangeOf(cars.map((c) => c.mileage));
  const powerR = rangeOf(cars.map((c) => c.power));
  const safetyR = rangeOf(cars.map((c) => c.safety));
  const brandR = rangeOf(cars.map((c) => c.brandTier));
  const maintR = rangeOf(cars.map((c) => c.maintenanceCost));

  return cars.map((c) => ({
    ...c,
    n: {
      mileage: norm(c.mileage, mileageR),
      performance: norm(c.power, powerR),
      safety: norm(c.safety, safetyR),
      brand: norm(c.brandTier, brandR),
      maintenance: 1 - norm(c.maintenanceCost, maintR),
    },
  }));
}

function scoreOne(
  nc: NormalizedCar,
  weights: Weights,
): { score: number; contribs: Record<keyof Weights, number> } {
  const contribs: Record<keyof Weights, number> = {
    mileage: weights.mileage * nc.n.mileage,
    performance: weights.performance * nc.n.performance,
    safety: weights.safety * nc.n.safety,
    brand: weights.brand * nc.n.brand,
    maintenance: weights.maintenance * nc.n.maintenance,
  };
  const W =
    weights.mileage +
    weights.performance +
    weights.safety +
    weights.brand +
    weights.maintenance || 1;
  const score =
    (contribs.mileage +
      contribs.performance +
      contribs.safety +
      contribs.brand +
      contribs.maintenance) /
    W;
  return { score, contribs };
}

export function buildExplanation(
  contribs: Record<keyof Weights, number>,
): string {
  const entries = (Object.entries(contribs) as [keyof Weights, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return "Recommended as a balanced fit for your budget.";
  }
  if (entries.length === 1) {
    return `Recommended because it offers ${PHRASES[entries[0][0]]} within your budget.`;
  }
  return `Recommended because it offers ${PHRASES[entries[0][0]]} and ${PHRASES[entries[1][0]]} within your budget.`;
}

export function rankCars(
  cars: Car[],
  prefs: Preferences,
  topN = 5,
): ScoredCar[] {
  const filtered = filterCars(cars, prefs);
  const normalized = normalizeSet(filtered);
  const scored: ScoredCar[] = normalized.map((nc) => {
    const { score, contribs } = scoreOne(nc, prefs.weights);
    const explanation = buildExplanation(contribs);
    const { n: _n, ...rest } = nc;
    void _n;
    return { ...rest, score, contribs, explanation };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, topN);
}

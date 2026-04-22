import type { FuelType, Stage } from "@/types";

export const STAGES: Stage[] = [
  "exploring",
  "comparing",
  "shortlisted",
  "test_drive",
  "final",
];

export const STAGE_LABELS: Record<Stage, string> = {
  exploring: "Exploring",
  comparing: "Comparing",
  shortlisted: "Shortlisted",
  test_drive: "Test Drive",
  final: "Final Decision",
};

export const STAGE_ORDER: Record<Stage, number> = {
  exploring: 0,
  comparing: 1,
  shortlisted: 2,
  test_drive: 3,
  final: 4,
};

export function nextStage(stage: Stage): Stage | null {
  const idx = STAGE_ORDER[stage];
  if (idx >= STAGES.length - 1) return null;
  return STAGES[idx + 1];
}

export const FUEL_TYPES: FuelType[] = ["petrol", "diesel", "cng", "electric"];

export const FUEL_LABELS: Record<FuelType, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  cng: "CNG",
  electric: "Electric",
};

export const CAR_TYPES = ["SUV", "Sedan", "Hatchback"] as const;

export const DEFAULT_WEIGHTS = {
  mileage: 3,
  performance: 3,
  safety: 3,
  brand: 3,
  maintenance: 3,
};

export const BUDGET_MIN_LIMIT = 3;
export const BUDGET_MAX_LIMIT = 60;

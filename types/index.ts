export type CarType = "SUV" | "Sedan" | "Hatchback";

export type FuelType = "petrol" | "diesel" | "cng" | "electric";

export type Stage =
  | "exploring"
  | "comparing"
  | "shortlisted"
  | "test_drive"
  | "final";

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: CarType;
  priceMin: number;
  priceMax: number;
  mileage: number;
  rangeKm?: number;
  power: number;
  safety: number;
  brandTier: number;
  maintenanceCost: number;
  fuelTypes: FuelType[];
  variants: string[];
  pros: string[];
  cons: string[];
  image: string;
}

export interface Weights {
  mileage: number;
  performance: number;
  safety: number;
  brand: number;
  maintenance: number;
}

export interface Preferences {
  budgetMin: number;
  budgetMax: number;
  types: CarType[];
  fuelTypes: FuelType[];
  weights: Weights;
}

export interface ScoredCar extends Car {
  score: number;
  contribs: Record<keyof Weights, number>;
  explanation: string;
}

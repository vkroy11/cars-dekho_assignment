import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Car } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLakhs(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value >= 100) {
    return `₹${(value / 100).toFixed(2)} Cr`;
  }
  return `₹${value.toFixed(2)} L`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatLakhs(min);
  return `${formatLakhs(min)} – ${formatLakhs(max)}`;
}

export function ytSearchUrl(name: string): string {
  const q = encodeURIComponent(`${name} review`);
  return `https://www.youtube.com/results?search_query=${q}`;
}

const CARDEKHO_SLUG_OVERRIDES: Record<string, string> = {
  "toyota-hyryder": "toyota/urban-cruiser-hyryder",
};

export function cardekhoUrl(id: string): string {
  const override = CARDEKHO_SLUG_OVERRIDES[id];
  if (override) return `https://www.cardekho.com/${override}`;
  const idx = id.indexOf("-");
  if (idx < 0) return `https://www.cardekho.com/${id}`;
  const brand = id.slice(0, idx);
  const model = id.slice(idx + 1);
  return `https://www.cardekho.com/${brand}/${model}`;
}

export function isEV(car: Pick<Car, "fuelTypes">): boolean {
  return car.fuelTypes.length === 1 && car.fuelTypes[0] === "electric";
}

export function efficiencyLabel(car: Pick<Car, "fuelTypes" | "mileage" | "rangeKm">): string {
  if (isEV(car) && car.rangeKm) return `${car.rangeKm} km range`;
  return `${car.mileage} kmpl`;
}

export function efficiencyValue(car: Pick<Car, "fuelTypes" | "mileage" | "rangeKm">): string {
  if (isEV(car) && car.rangeKm) return `${car.rangeKm}`;
  return `${car.mileage}`;
}

export function efficiencyUnit(car: Pick<Car, "fuelTypes" | "rangeKm">): string {
  if (isEV(car) && car.rangeKm) return "km range";
  return "kmpl";
}

import carsData from "@/data/cars.json";
import type { Car } from "@/types";

export function getAllCars(): Car[] {
  return carsData as Car[];
}

export function getCarById(id: string): Car | undefined {
  return getAllCars().find((c) => c.id === id);
}

export function getCarsByIds(ids: string[]): Car[] {
  const all = getAllCars();
  return ids
    .map((id) => all.find((c) => c.id === id))
    .filter((c): c is Car => Boolean(c));
}

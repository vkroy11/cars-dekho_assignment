import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Car } from "@/types";

function initialsFor(car: Pick<Car, "brand" | "name">): string {
  const words = car.name.replace(car.brand, "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return car.brand.slice(0, 2).toUpperCase();
  const first = words[0]?.[0] ?? "";
  const second = words[1]?.[0] ?? words[0]?.[1] ?? "";
  return (first + second).toUpperCase();
}

function gradientFor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const hue = Math.abs(hash) % 360;
  return `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 40) % 360} 70% 40%))`;
}

export function CarImage({
  car,
  className,
  sizes = "(min-width: 1024px) 400px, 100vw",
  priority = false,
}: {
  car: Pick<Car, "id" | "brand" | "name" | "image">;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!car.image) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-3xl font-semibold text-white",
          className,
        )}
        style={{ backgroundImage: gradientFor(car.id) }}
      >
        <span className="drop-shadow-sm">{initialsFor(car)}</span>
      </div>
    );
  }
  return (
    <Image
      src={car.image}
      alt={car.name}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}

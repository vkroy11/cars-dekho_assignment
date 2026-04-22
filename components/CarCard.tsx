import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CarImage } from "@/components/CarImage";
import { FuelBadges } from "@/components/FuelBadges";
import { efficiencyLabel, formatPriceRange } from "@/lib/utils";
import type { Car } from "@/types";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[5/3] w-full bg-muted">
        <CarImage car={car} className="transition group-hover:scale-[1.02]" />
        <Badge className="absolute right-2 top-2" variant="secondary">
          {car.type}
        </Badge>
      </div>
      <div className="p-4">
        <div className="text-sm text-muted-foreground">{car.brand}</div>
        <div className="mt-0.5 line-clamp-1 font-semibold">{car.name}</div>
        <div className="mt-2 text-sm">{formatPriceRange(car.priceMin, car.priceMax)}</div>
        <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>{efficiencyLabel(car)} · {car.power} bhp · {car.safety}★</span>
          <FuelBadges fuelTypes={car.fuelTypes} />
        </div>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CarImage } from "@/components/CarImage";
import { FuelBadges } from "@/components/FuelBadges";
import { StageBadge } from "@/components/StageBadge";
import { useShortlistStore } from "@/store/useShortlistStore";
import { useHasHydrated } from "@/store/useHasHydrated";
import { efficiencyUnit, efficiencyValue, formatPriceRange } from "@/lib/utils";
import { toast } from "sonner";
import type { ScoredCar } from "@/types";

export function RecommendationCard({
  car,
  rank,
}: {
  car: ScoredCar;
  rank: number;
}) {
  const hydrated = useHasHydrated();
  const inCompare = useShortlistStore((s) => s.compareIds.includes(car.id));
  const stage = useShortlistStore((s) => s.entries[car.id]);
  const toggleCompare = useShortlistStore((s) => s.toggleCompare);
  const addToShortlist = useShortlistStore((s) => s.addToShortlist);

  const onAdd = () => {
    if (stage) {
      toast.info(`Already in shortlist (${stage.replace("_", " ")})`);
      return;
    }
    addToShortlist(car.id);
    toast.success(`${car.name} added to shortlist`);
  };

  const onToggleCompare = () => {
    const state = useShortlistStore.getState();
    if (!state.compareIds.includes(car.id) && state.compareIds.length >= 3) {
      toast.error("You can compare at most 3 cars at once");
      return;
    }
    toggleCompare(car.id);
  };

  const scorePercent = Math.round(car.score * 100);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="relative aspect-[5/3] w-full bg-muted">
        <CarImage car={car} priority={rank <= 3} />
        <span className="absolute left-2 top-2 inline-flex h-7 items-center rounded-full bg-background/90 px-2 text-xs font-semibold shadow-sm">
          #{rank}
        </span>
        {hydrated && stage && (
          <StageBadge stage={stage} className="absolute right-2 top-2" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link
          href={`/cars/${car.id}`}
          className="font-semibold hover:underline underline-offset-2"
        >
          {car.name}
        </Link>
        <div className="mt-0.5 text-sm text-muted-foreground">
          {car.brand} · {car.type} · {formatPriceRange(car.priceMin, car.priceMax)}
        </div>

        <p className="mt-3 text-sm">{car.explanation}</p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Match score</span>
            <span className="font-semibold text-foreground">{scorePercent}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${scorePercent}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded border bg-background/50 p-2">
            <div className="font-semibold">{efficiencyValue(car)}</div>
            <div className="text-muted-foreground">{efficiencyUnit(car)}</div>
          </div>
          <div className="rounded border bg-background/50 p-2">
            <div className="font-semibold">{car.power}</div>
            <div className="text-muted-foreground">bhp</div>
          </div>
          <div className="rounded border bg-background/50 p-2">
            <div className="font-semibold">{car.safety}★</div>
            <div className="text-muted-foreground">safety</div>
          </div>
        </div>

        <div className="mt-3">
          <FuelBadges fuelTypes={car.fuelTypes} />
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={hydrated && inCompare}
              onCheckedChange={onToggleCompare}
            />
            Compare
          </label>
          <Button size="sm" variant="secondary" onClick={onAdd}>
            {hydrated && stage ? "Shortlisted" : "Add to shortlist"}
          </Button>
        </div>
      </div>
    </div>
  );
}

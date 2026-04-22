"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarImage } from "@/components/CarImage";
import { nextStage, STAGE_LABELS } from "@/lib/constants";
import { useShortlistStore } from "@/store/useShortlistStore";
import { toast } from "sonner";
import { formatPriceRange } from "@/lib/utils";
import type { Car, Stage } from "@/types";

export function ShortlistCard({
  car,
  stage,
}: {
  car: Car;
  stage: Stage;
}) {
  const advance = useShortlistStore((s) => s.advance);
  const remove = useShortlistStore((s) => s.remove);

  const next = nextStage(stage);
  const onAdvance = () => {
    if (!next) return;
    advance(car.id);
    toast.success(`${car.name} → ${STAGE_LABELS[next]}`);
  };
  const onRemove = () => {
    remove(car.id);
    toast.message(`${car.name} removed from shortlist`);
  };

  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <Link href={`/cars/${car.id}`} className="block">
        <div className="relative aspect-[5/3] w-full overflow-hidden rounded-md bg-muted">
          <CarImage car={car} sizes="220px" />
        </div>
        <div className="mt-2 line-clamp-1 text-sm font-semibold">{car.name}</div>
        <div className="text-xs text-muted-foreground">
          {formatPriceRange(car.priceMin, car.priceMax)}
        </div>
      </Link>
      <div className="mt-3 flex items-center justify-between gap-2">
        {next ? (
          <Button size="sm" className="flex-1" onClick={onAdvance}>
            → {STAGE_LABELS[next]}
          </Button>
        ) : (
          <span className="flex-1 text-center text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Final pick ✓
          </span>
        )}
        <Button size="sm" variant="ghost" onClick={onRemove}>
          ✕
        </Button>
      </div>
    </div>
  );
}

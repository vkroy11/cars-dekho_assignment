"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { buttonVariants } from "@/components/ui/button";
import { CarImage } from "@/components/CarImage";
import { EmptyState } from "@/components/EmptyState";
import { FuelBadges } from "@/components/FuelBadges";
import { getCarsByIds } from "@/lib/cars";
import { efficiencyLabel, formatPriceRange, isEV } from "@/lib/utils";
import { FUEL_LABELS } from "@/lib/constants";
import type { Car, FuelType } from "@/types";

type Row = {
  label: string;
  values: (string | number)[];
  winnerIdx: number | null;
};

function buildRows(cars: Car[]): Row[] {
  const higherBetter = (vals: number[]) => {
    const max = Math.max(...vals);
    const winners = vals.filter((v) => v === max);
    if (winners.length === vals.length) return null;
    return vals.indexOf(max);
  };
  const lowerBetter = (vals: number[]) => {
    const min = Math.min(...vals);
    const losers = vals.filter((v) => v === min);
    if (losers.length === vals.length) return null;
    return vals.indexOf(min);
  };

  const priceMin = cars.map((c) => c.priceMin);
  const power = cars.map((c) => c.power);
  const safety = cars.map((c) => c.safety);
  const brandTier = cars.map((c) => c.brandTier);
  const maintenance = cars.map((c) => c.maintenanceCost);

  const allEV = cars.every((c) => isEV(c) && c.rangeKm);
  const allICE = cars.every((c) => !isEV(c));
  const efficiencyLabelRow = allEV ? "Range (km)" : "Mileage / Range";
  let efficiencyWinner: number | null = null;
  if (allEV) {
    efficiencyWinner = higherBetter(cars.map((c) => c.rangeKm ?? 0));
  } else if (allICE) {
    efficiencyWinner = higherBetter(cars.map((c) => c.mileage));
  }

  return [
    {
      label: "Ex-showroom price",
      values: cars.map((c) => formatPriceRange(c.priceMin, c.priceMax)),
      winnerIdx: lowerBetter(priceMin),
    },
    {
      label: efficiencyLabelRow,
      values: cars.map((c) => efficiencyLabel(c)),
      winnerIdx: efficiencyWinner,
    },
    {
      label: "Max power (bhp)",
      values: power,
      winnerIdx: higherBetter(power),
    },
    {
      label: "Safety (/5)",
      values: safety,
      winnerIdx: higherBetter(safety),
    },
    {
      label: "Brand tier (/5)",
      values: brandTier,
      winnerIdx: higherBetter(brandTier),
    },
    {
      label: "Maintenance (lower is cheaper)",
      values: maintenance,
      winnerIdx: lowerBetter(maintenance),
    },
    {
      label: "Fuel options",
      values: cars.map((c) =>
        c.fuelTypes.map((f: FuelType) => FUEL_LABELS[f]).join(", "),
      ),
      winnerIdx: null,
    },
  ];
}

function CompareContent() {
  const params = useSearchParams();
  const idsStr = params.get("ids") ?? "";
  const ids = idsStr.split(",").filter(Boolean);
  const cars = useMemo(() => getCarsByIds(ids), [idsStr]); // eslint-disable-line react-hooks/exhaustive-deps

  if (cars.length < 2) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <EmptyState
          title="Pick 2 or 3 cars to compare"
          body="Head to recommendations, check the 'Compare' box on 2–3 cars, then hit Compare."
          ctaLabel="Go to recommendations"
          ctaHref="/recommendations"
        />
      </div>
    );
  }

  const rows = buildRows(cars);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Side-by-side comparison
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Green cells highlight the winner per row. Ties show nothing.
          </p>
        </div>
        <Link
          href="/recommendations"
          className={buttonVariants({
            variant: "outline",
            className: "self-start",
          })}
        >
          Back to recommendations
        </Link>
      </div>

      <p className="mb-2 text-xs text-muted-foreground sm:hidden">
        Swipe the table horizontally to see all columns →
      </p>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-32 bg-muted/60 p-3 text-left text-xs font-semibold uppercase text-muted-foreground sm:w-48 sm:p-4">
                Feature
              </th>
              {cars.map((c) => (
                <th key={c.id} className="p-3 align-top sm:p-4">
                  <Link href={`/cars/${c.id}`} className="group block">
                    <div className="relative mx-auto aspect-[5/3] w-full max-w-[220px] overflow-hidden rounded-md border bg-muted">
                      <CarImage car={c} sizes="220px" />
                    </div>
                    <div className="mt-3 line-clamp-2 text-sm font-semibold group-hover:underline">
                      {c.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {c.brand} · {c.type}
                    </div>
                    <div className="mt-1">
                      <FuelBadges
                        fuelTypes={c.fuelTypes}
                        className="justify-center"
                      />
                    </div>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t">
                <th className="sticky left-0 z-10 bg-muted/20 p-3 text-left text-xs font-medium text-muted-foreground sm:p-4">
                  {r.label}
                </th>
                {r.values.map((v, idx) => (
                  <td
                    key={idx}
                    className={
                      "p-3 text-center text-sm sm:p-4 " +
                      (r.winnerIdx === idx
                        ? "bg-emerald-50 font-semibold dark:bg-emerald-950/30"
                        : "")
                    }
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{v}</span>
                      {r.winnerIdx === idx && (
                        <span className="inline-flex items-center rounded bg-emerald-600/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                          Winner
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CompareView() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10" />}>
      <CompareContent />
    </Suspense>
  );
}

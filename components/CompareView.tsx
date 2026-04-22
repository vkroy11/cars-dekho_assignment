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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Side-by-side comparison
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Green cells highlight the winner per row. Ties show nothing.
          </p>
        </div>
        <Link
          href="/recommendations"
          className={buttonVariants({ variant: "outline" })}
        >
          Back to recommendations
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-48 bg-muted/40 p-4 text-left text-xs font-semibold uppercase text-muted-foreground">
                Feature
              </th>
              {cars.map((c) => (
                <th key={c.id} className="p-4 align-top">
                  <Link href={`/cars/${c.id}`} className="group block">
                    <div className="relative mx-auto aspect-[5/3] w-full max-w-[220px] overflow-hidden rounded-md border bg-muted">
                      <CarImage car={c} sizes="220px" />
                    </div>
                    <div className="mt-3 text-sm font-semibold group-hover:underline">
                      {c.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {c.brand} · {c.type}
                    </div>
                    <div className="mt-1">
                      <FuelBadges fuelTypes={c.fuelTypes} className="justify-center" />
                    </div>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t">
                <th className="bg-muted/20 p-4 text-left text-xs font-medium text-muted-foreground">
                  {r.label}
                </th>
                {r.values.map((v, idx) => (
                  <td
                    key={idx}
                    className={
                      "p-4 text-center text-sm " +
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

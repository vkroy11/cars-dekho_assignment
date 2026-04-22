"use client";

import { useMemo } from "react";
import { EmptyState } from "@/components/EmptyState";
import { ShortlistCard } from "@/components/ShortlistCard";
import { STAGES, STAGE_LABELS } from "@/lib/constants";
import { getCarsByIds } from "@/lib/cars";
import { useShortlistStore } from "@/store/useShortlistStore";
import { useHasHydrated } from "@/store/useHasHydrated";
import type { Car, Stage } from "@/types";

export default function ShortlistPage() {
  const hydrated = useHasHydrated();
  const entries = useShortlistStore((s) => s.entries);

  const byStage = useMemo(() => {
    const ids = Object.keys(entries);
    const cars = getCarsByIds(ids);
    const byId = new Map(cars.map((c) => [c.id, c]));
    const grouped: Record<Stage, Car[]> = {
      exploring: [],
      comparing: [],
      shortlisted: [],
      test_drive: [],
      final: [],
    };
    for (const [id, stage] of Object.entries(entries)) {
      const car = byId.get(id);
      if (car) grouped[stage].push(car);
    }
    return grouped;
  }, [entries]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const total = Object.keys(entries).length;
  if (total === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          title="Your shortlist is empty"
          body="Add cars from the recommendations or detail pages to start tracking your buying journey."
          ctaLabel="See recommendations"
          ctaHref="/recommendations"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your shortlist</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag-free kanban. Advance a car with the button — it moves to the next
          stage automatically.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STAGES.map((s) => (
          <div key={s} className="flex flex-col rounded-xl border bg-background p-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">{STAGE_LABELS[s]}</h2>
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {byStage[s].length}
              </span>
            </div>
            <div className="flex min-h-[100px] flex-col gap-3">
              {byStage[s].length === 0 ? (
                <div className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
                  No cars here yet
                </div>
              ) : (
                byStage[s].map((car) => (
                  <ShortlistCard key={car.id} car={car} stage={s} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

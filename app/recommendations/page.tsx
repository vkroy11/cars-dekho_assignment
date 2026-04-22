"use client";

import { useMemo } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { RecommendationCard } from "@/components/RecommendationCard";
import { CompareBar } from "@/components/CompareBar";
import { EmptyState } from "@/components/EmptyState";
import { getAllCars } from "@/lib/cars";
import { rankCars } from "@/lib/scoring";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useHasHydrated } from "@/store/useHasHydrated";

export default function RecommendationsPage() {
  const hydrated = useHasHydrated();
  const preferences = usePreferencesStore((s) => s.preferences);
  const selectedTypes = preferences?.types ?? [];
  const selectedFuels = preferences?.fuelTypes ?? [];

  const scored = useMemo(() => {
    if (!preferences) return [];
    return rankCars(getAllCars(), preferences, 12);
  }, [preferences]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <EmptyState
          title="Set your preferences first"
          body="Fill out the 60-second questionnaire so we can rank the right cars for you."
          ctaLabel="Start questionnaire"
          ctaHref="/preferences"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your top matches
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ranked by your weighted priorities within ₹{preferences.budgetMin}–₹
            {preferences.budgetMax} L
            {selectedTypes.length > 0 && selectedTypes.length < 3
              ? ` · ${selectedTypes.join(", ")}`
              : ""}
            {selectedFuels.length > 0
              ? ` · ${selectedFuels.map((f) => f.toUpperCase()).join(", ")}`
              : ""}
            .
          </p>
        </div>
        <Link href="/preferences" className={buttonVariants({ variant: "outline" })}>
          Edit preferences
        </Link>
      </div>

      {scored.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            title="No cars match those filters"
            body="Try loosening the budget range, picking another body type, or clearing fuel-type filters."
            ctaLabel="Back to questionnaire"
            ctaHref="/preferences"
          />
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scored.map((car, i) => (
              <RecommendationCard key={car.id} car={car} rank={i + 1} />
            ))}
          </div>
          <CompareBar />
        </>
      )}
    </div>
  );
}

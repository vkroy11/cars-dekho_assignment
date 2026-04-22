"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  BUDGET_MAX_LIMIT,
  BUDGET_MIN_LIMIT,
  CAR_TYPES,
  DEFAULT_WEIGHTS,
  FUEL_LABELS,
  FUEL_TYPES,
} from "@/lib/constants";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useHasHydrated } from "@/store/useHasHydrated";
import { formatLakhs } from "@/lib/utils";
import type { CarType, FuelType, Preferences, Weights } from "@/types";

const WEIGHT_DESCRIPTIONS: Record<keyof Weights, string> = {
  mileage: "Fuel efficiency / running cost",
  performance: "Power and driving feel",
  safety: "Crash rating and driver aids",
  brand: "Brand trust and resale value",
  maintenance: "How cheap it is to own long-term",
};

export function PreferenceForm() {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const saved = usePreferencesStore((s) => s.preferences);
  const setPreferences = usePreferencesStore((s) => s.setPreferences);

  const [budget, setBudget] = useState<[number, number]>([6, 15]);
  const [types, setTypes] = useState<CarType[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);

  useEffect(() => {
    if (hydrated && saved) {
      setBudget([saved.budgetMin, saved.budgetMax]);
      setTypes(saved.types ?? []);
      setFuelTypes(saved.fuelTypes ?? []);
      setWeights(saved.weights);
    }
  }, [hydrated, saved]);

  const toggleFuel = (f: FuelType) => {
    setFuelTypes((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  const toggleType = (t: CarType) => {
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const toggleAllTypes = () => {
    if (types.length === CAR_TYPES.length) setTypes([]);
    else setTypes([...CAR_TYPES]);
  };

  const setWeight = (k: keyof Weights, v: number) => {
    setWeights((w) => ({ ...w, [k]: v }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [min, max] = budget;
    if (min >= max) {
      toast.error("Max budget must be greater than min budget");
      return;
    }
    const prefs: Preferences = {
      budgetMin: min,
      budgetMax: max,
      types,
      fuelTypes,
      weights,
    };
    setPreferences(prefs);
    toast.success("Preferences saved — ranking your matches");
    router.push("/recommendations");
  };

  const allTypesSelected = types.length === CAR_TYPES.length;

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold">Budget</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ex-showroom, in lakhs. Drag both handles to set a range.
        </p>
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-semibold">
              {formatLakhs(budget[0])}
            </span>
            <span className="text-xs text-muted-foreground">to</span>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-semibold">
              {formatLakhs(budget[1])}
            </span>
          </div>
          <Slider
            className="mt-4"
            min={BUDGET_MIN_LIMIT}
            max={BUDGET_MAX_LIMIT}
            step={0.5}
            value={budget}
            onValueChange={(v) => {
              const arr = Array.isArray(v) ? (v as number[]) : [v as number];
              if (arr.length >= 2) {
                setBudget([arr[0], arr[1]]);
              }
            }}
          />
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>₹{BUDGET_MIN_LIMIT}L</span>
            <span>₹{BUDGET_MAX_LIMIT}L</span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Body type</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick one or more. Leave blank to include all.
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <Checkbox
              checked={allTypesSelected}
              onCheckedChange={toggleAllTypes}
            />
            <span>All of the above</span>
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {CAR_TYPES.map((t) => (
            <label
              key={t}
              className="flex cursor-pointer items-center gap-2 rounded-md border bg-background p-3 text-sm transition hover:bg-accent"
            >
              <Checkbox
                checked={types.includes(t)}
                onCheckedChange={() => toggleType(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold">Fuel preference</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Leave blank to include all fuel types.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {FUEL_TYPES.map((f) => (
            <label
              key={f}
              className="flex cursor-pointer items-center gap-2 rounded-md border bg-background p-3 text-sm transition hover:bg-accent"
            >
              <Checkbox
                checked={fuelTypes.includes(f)}
                onCheckedChange={() => toggleFuel(f)}
              />
              <span>{FUEL_LABELS[f]}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold">What matters to you</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Rate each priority from 1 (don&apos;t care) to 5 (critical). We rank cars by
          your weighted totals.
        </p>
        <div className="mt-5 space-y-6">
          {(Object.keys(DEFAULT_WEIGHTS) as (keyof Weights)[]).map((k) => (
            <div key={k}>
              <div className="flex items-baseline justify-between">
                <div>
                  <Label htmlFor={`w-${k}`} className="capitalize">
                    {k}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {WEIGHT_DESCRIPTIONS[k]}
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums">
                  {weights[k]}
                </span>
              </div>
              <Slider
                id={`w-${k}`}
                className="mt-3"
                min={1}
                max={5}
                step={1}
                value={[weights[k]]}
                onValueChange={(v) => {
                  const next = Array.isArray(v) ? v[0] : v;
                  setWeight(k, next ?? 3);
                }}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-stretch sm:justify-end">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          See my top matches
        </Button>
      </div>
    </form>
  );
}

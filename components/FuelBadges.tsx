import { FUEL_LABELS } from "@/lib/constants";
import type { FuelType } from "@/types";
import { cn } from "@/lib/utils";

const COLOR: Record<FuelType, string> = {
  petrol: "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
  diesel: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  cng: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200",
  electric:
    "bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-200",
};

export function FuelBadges({
  fuelTypes,
  className,
}: {
  fuelTypes: FuelType[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {fuelTypes.map((f) => (
        <span
          key={f}
          className={cn(
            "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium",
            COLOR[f],
          )}
        >
          {FUEL_LABELS[f]}
        </span>
      ))}
    </div>
  );
}

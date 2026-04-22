import { STAGE_LABELS } from "@/lib/constants";
import type { Stage } from "@/types";
import { cn } from "@/lib/utils";

const COLOR: Record<Stage, string> = {
  exploring:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  comparing:
    "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200",
  shortlisted:
    "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
  test_drive:
    "bg-violet-100 text-violet-900 dark:bg-violet-950/60 dark:text-violet-200",
  final:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200",
};

export function StageBadge({ stage, className }: { stage: Stage; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        COLOR[stage],
        className,
      )}
    >
      {STAGE_LABELS[stage]}
    </span>
  );
}

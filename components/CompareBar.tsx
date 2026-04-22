"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useShortlistStore } from "@/store/useShortlistStore";
import { useHasHydrated } from "@/store/useHasHydrated";

export function CompareBar() {
  const router = useRouter();
  const hydrated = useHasHydrated();
  const compareIds = useShortlistStore((s) => s.compareIds);
  const clearCompare = useShortlistStore((s) => s.clearCompare);

  if (!hydrated || compareIds.length < 2) return null;

  const goCompare = () => {
    router.push(`/compare?ids=${compareIds.join(",")}`);
  };

  return (
    <div className="sticky bottom-4 z-30 mx-auto mt-8 flex w-full max-w-lg items-center justify-between rounded-full border bg-background/95 px-4 py-2 shadow-lg backdrop-blur">
      <span className="text-sm">
        <span className="font-semibold">{compareIds.length}</span> selected for comparison
      </span>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={clearCompare}>
          Clear
        </Button>
        <Button size="sm" onClick={goCompare}>
          Compare
        </Button>
      </div>
    </div>
  );
}

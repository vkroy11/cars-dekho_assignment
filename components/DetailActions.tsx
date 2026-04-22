"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StageBadge } from "@/components/StageBadge";
import { STAGES, STAGE_LABELS } from "@/lib/constants";
import { useShortlistStore } from "@/store/useShortlistStore";
import { useHasHydrated } from "@/store/useHasHydrated";
import { toast } from "sonner";
import type { Stage } from "@/types";

export function DetailActions({ carId, carName }: { carId: string; carName: string }) {
  const hydrated = useHasHydrated();
  const stage = useShortlistStore((s) => s.entries[carId]);
  const addToShortlist = useShortlistStore((s) => s.addToShortlist);
  const setStage = useShortlistStore((s) => s.setStage);
  const remove = useShortlistStore((s) => s.remove);
  const toggleCompare = useShortlistStore((s) => s.toggleCompare);
  const inCompare = useShortlistStore((s) => s.compareIds.includes(carId));

  const onAdd = () => {
    addToShortlist(carId);
    toast.success(`${carName} added to shortlist`);
  };

  const onStageChange = (s: Stage) => {
    setStage(carId, s);
    toast.success(`Moved to ${STAGE_LABELS[s]}`);
  };

  const onRemove = () => {
    remove(carId);
    toast.message(`${carName} removed from shortlist`);
  };

  const onCompare = () => {
    const state = useShortlistStore.getState();
    if (!state.compareIds.includes(carId) && state.compareIds.length >= 3) {
      toast.error("You can compare at most 3 cars at once");
      return;
    }
    toggleCompare(carId);
  };

  if (!hydrated) {
    return <div className="h-10 w-48 animate-pulse rounded bg-muted" />;
  }

  if (!stage) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button onClick={onAdd}>Add to shortlist</Button>
        <Button variant="outline" onClick={onCompare}>
          {inCompare ? "Remove from compare" : "Add to compare"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <StageBadge stage={stage} />
      <Select value={STAGE_LABELS[stage]} onValueChange={(v) => onStageChange(v as Stage)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STAGES.map((s) => (
            <SelectItem key={s} value={s}>
              {STAGE_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={onCompare}>
        {inCompare ? "Remove from compare" : "Add to compare"}
      </Button>
      <Button variant="ghost" onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}

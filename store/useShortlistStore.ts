"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { nextStage } from "@/lib/constants";
import type { Stage } from "@/types";

interface ShortlistState {
  entries: Record<string, Stage>;
  compareIds: string[];
  addToShortlist: (carId: string) => void;
  setStage: (carId: string, stage: Stage) => void;
  advance: (carId: string) => void;
  remove: (carId: string) => void;
  toggleCompare: (carId: string) => void;
  clearCompare: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      entries: {},
      compareIds: [],

      addToShortlist: (carId) => {
        const entries = { ...get().entries };
        if (!entries[carId]) entries[carId] = "exploring";
        set({ entries });
      },

      setStage: (carId, stage) => {
        set({ entries: { ...get().entries, [carId]: stage } });
      },

      advance: (carId) => {
        const current = get().entries[carId];
        if (!current) return;
        const next = nextStage(current);
        if (!next) return;
        set({ entries: { ...get().entries, [carId]: next } });
      },

      remove: (carId) => {
        const entries = { ...get().entries };
        delete entries[carId];
        const compareIds = get().compareIds.filter((id) => id !== carId);
        set({ entries, compareIds });
      },

      toggleCompare: (carId) => {
        const { compareIds } = get();
        if (compareIds.includes(carId)) {
          set({ compareIds: compareIds.filter((id) => id !== carId) });
          return;
        }
        if (compareIds.length >= 3) return;
        set({ compareIds: [...compareIds, carId] });
      },

      clearCompare: () => set({ compareIds: [] }),
    }),
    {
      name: "cda-shortlist",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

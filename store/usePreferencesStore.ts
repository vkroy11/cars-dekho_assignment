"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_WEIGHTS } from "@/lib/constants";
import type { Preferences } from "@/types";

interface PreferencesState {
  preferences: Preferences | null;
  setPreferences: (p: Preferences) => void;
  reset: () => void;
}

function normalizePreferences(input: Preferences): Preferences {
  return {
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
    types: Array.isArray(input.types) ? input.types : [],
    fuelTypes: Array.isArray(input.fuelTypes) ? input.fuelTypes : [],
    weights: {
      ...DEFAULT_WEIGHTS,
      ...(input.weights ?? {}),
    },
  };
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: null,
      setPreferences: (p) => set({ preferences: normalizePreferences(p) }),
      reset: () => set({ preferences: null }),
    }),
    {
      name: "cda-prefs",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<PreferencesState> | undefined;
        if (!state?.preferences) return currentState;
        return {
          ...currentState,
          ...state,
          preferences: normalizePreferences(state.preferences),
        };
      },
    },
  ),
);

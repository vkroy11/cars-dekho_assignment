import type { Metadata } from "next";
import { PreferenceForm } from "@/components/PreferenceForm";

export const metadata: Metadata = {
  title: "Tell us what you want",
  description:
    "Set your budget, body type, fuel preference, and what matters most — mileage, performance, safety, brand, maintenance. We rank 40 popular Indian cars against your priorities in 60 seconds.",
  alternates: { canonical: "/preferences" },
  openGraph: {
    title: "Tell us what you want · Car Decision Assistant",
    description:
      "Budget range, body types, fuel, and five priority sliders. Takes under a minute.",
    url: "/preferences",
  },
};

export default function PreferencesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tell us what you want
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Takes about 60 seconds. You can change anything and re-rank instantly.
        </p>
      </div>
      <PreferenceForm />
    </div>
  );
}

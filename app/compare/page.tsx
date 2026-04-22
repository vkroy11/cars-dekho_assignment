import type { Metadata } from "next";
import { CompareView } from "@/components/CompareView";

export const metadata: Metadata = {
  title: "Compare cars",
  description:
    "Side-by-side comparison across price, mileage/range, power, safety, brand tier, and maintenance. Winner highlighted per row.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare cars · Car Decision Assistant",
    description:
      "See trade-offs between 2–3 shortlisted cars at a glance — winner per row highlighted.",
    url: "/compare",
  },
};

export default function ComparePage() {
  return <CompareView />;
}

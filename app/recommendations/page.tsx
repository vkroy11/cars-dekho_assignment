import type { Metadata } from "next";
import { RecommendationsView } from "@/components/RecommendationsView";

export const metadata: Metadata = {
  title: "Your top matches",
  description:
    "Top-12 Indian car recommendations ranked by your weighted priorities — with plain-English reasoning for every pick.",
  alternates: { canonical: "/recommendations" },
  openGraph: {
    title: "Your top car matches · Car Decision Assistant",
    description:
      "Scored, explainable picks from 40 popular Indian cars (2025/26) tailored to your budget and priorities.",
    url: "/recommendations",
  },
};

export default function RecommendationsPage() {
  return <RecommendationsView />;
}

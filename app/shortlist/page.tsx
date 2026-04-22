import type { Metadata } from "next";
import { ShortlistView } from "@/components/ShortlistView";

export const metadata: Metadata = {
  title: "Your shortlist",
  description:
    "5-stage decision tracker — move each car from Exploring → Comparing → Shortlisted → Test drive → Final. Your progress stays on your device.",
  alternates: { canonical: "/shortlist" },
  openGraph: {
    title: "Your shortlist · Car Decision Assistant",
    description:
      "A 5-stage kanban to track every car from first interest to final pick.",
    url: "/shortlist",
  },
};

export default function ShortlistPage() {
  return <ShortlistView />;
}

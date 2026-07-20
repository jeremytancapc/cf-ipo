import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FinancialsContent } from "@/components/financials-content";

export const metadata: Metadata = {
  title: "The Numbers - CF Money | Capital C Corporation",
  description:
    "CF Money base-case projections to FY2031, comparable-company analysis, sensitivity scenarios and uses of proceeds.",
};

export default function FinancialsPage() {
  return (
    <main>
      <Nav />
      <FinancialsContent />
      <Footer />
    </main>
  );
}

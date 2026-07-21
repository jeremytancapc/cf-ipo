"use client";

import { SectionHeading } from "../section-heading";

type Tier = "platinum" | "blue" | "graphite" | "teal" | "sky";

interface Product {
  n: string;
  name: string;
  body: string;
  audience: string;
  tier: Tier;
  /** true = dark background card (white text). false = light background card (ink text). */
  dark: boolean;
  badgeBg: string;
  badgeText: string;
  bodyColor: string;
  audienceColor: string;
}


const products: Product[] = [
  {
    n: "01",
    name: "Personal Cash Advance",
    body: "Fast, unsecured cash for everyday individuals.",
    audience: "Consumers",
    tier: "platinum",
    dark: false,
    badgeBg: "bg-blue/10",
    badgeText: "text-blue",
    bodyColor: "text-ink-soft",
    audienceColor: "text-ink-soft/70",
  },
  {
    n: "02",
    name: "Business Cash Advance",
    body: "Working capital for SMEs and microbusinesses.",
    audience: "MSMEs",
    tier: "blue",
    dark: true,
    badgeBg: "bg-white/15",
    badgeText: "text-white",
    bodyColor: "text-white/80",
    audienceColor: "text-teal",
  },
  {
    n: "03",
    name: "Vehicle Financing",
    body: "Secured lending against motor vehicles.",
    audience: "Consumers · Secured",
    tier: "graphite",
    dark: true,
    badgeBg: "bg-white/10",
    badgeText: "text-teal",
    bodyColor: "text-white/70",
    audienceColor: "text-teal",
  },
  {
    n: "04",
    name: "Earned Wage Access",
    body: "Draw wages already earned, ahead of payday.",
    audience: "Employees",
    tier: "teal",
    dark: false,
    badgeBg: "bg-navy-deep/15",
    badgeText: "text-navy-deep",
    bodyColor: "text-navy-deep/75",
    audienceColor: "text-navy-deep/65",
  },
  {
    n: "05",
    name: "Buy Now Pay Later",
    body: "Split purchases for underserved consumers.",
    audience: "Consumers · Point of sale",
    tier: "sky",
    dark: true,
    badgeBg: "bg-white/15",
    badgeText: "text-white",
    bodyColor: "text-white/80",
    audienceColor: "text-white/60",
  },
];

/** Full credit spectrum as sticky stacked credit-card-style cards on mist. */
export function Products() {
  return (
    <section data-nav-theme="light" className="bg-mist px-5 py-28 md:px-10 md:py-44">
      <SectionHeading
        index="07"
        eyebrow="Product suite"
        tone="light"
        title={
          <>
            A full spectrum of credit, built for the{" "}
            <span className="accent-word accent-word--sky">underserved.</span>
          </>
        }
      />

      <div className="mt-16 md:mt-24">
        {products.map((p, i) => (
          <div
            key={p.n}
            className="sticky mb-6"
            style={{ top: `calc(6rem + ${i * 3.5}rem)` }}
          >
            <div
              className={`card-credit card-credit--${p.tier} grid gap-4 rounded-[2rem] px-7 py-9 md:grid-cols-12 md:items-center md:px-11 md:py-11 ${
                p.dark ? "text-white" : "text-ink"
              }`}
            >
              <span
                className={`eyebrow inline-flex h-10 w-10 items-center justify-center rounded-full text-[10px] md:col-span-1 ${p.badgeBg} ${p.badgeText}`}
              >
                {p.n}
              </span>
              <h3 className="display text-2xl md:col-span-5 md:text-4xl">{p.name}</h3>
              <p className={`text-[15px] leading-relaxed md:col-span-4 ${p.bodyColor}`}>
                {p.body}
              </p>
              {/* On desktop: right-aligned last column. On mobile: sits below body copy as its own row. */}
              <span className={`eyebrow text-[9px] md:col-span-2 md:text-right ${p.audienceColor}`}>
                {p.audience}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

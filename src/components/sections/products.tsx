"use client";

import { SectionHeading } from "../section-heading";

const products = [
  {
    n: "01",
    name: "Personal Cash Advance",
    body: "Fast, unsecured cash for everyday individuals.",
    audience: "Consumers",
  },
  {
    n: "02",
    name: "Business Cash Advance",
    body: "Working capital for SMEs and microbusinesses.",
    audience: "MSMEs",
  },
  {
    n: "03",
    name: "Vehicle Financing",
    body: "Secured lending against motor vehicles.",
    audience: "Consumers · Secured",
  },
  {
    n: "04",
    name: "Earned Wage Access",
    body: "Draw wages already earned, ahead of payday.",
    audience: "Employees",
  },
  {
    n: "05",
    name: "Buy Now Pay Later",
    body: "Split purchases for underserved consumers.",
    audience: "Consumers · Point of sale",
  },
];

/** Full credit spectrum as sticky stacked rounded cards on mist. */
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
              className={`grid gap-4 rounded-[2rem] px-7 py-9 md:grid-cols-12 md:items-center md:px-11 md:py-11 ${
                i % 2 === 0
                  ? "bg-white text-ink shadow-[0_20px_60px_rgba(14,27,44,0.08)]"
                  : "dark-section bg-blue text-white shadow-[0_20px_60px_rgba(45,83,132,0.35)]"
              }`}
            >
              <span
                className={`eyebrow inline-flex h-10 w-10 items-center justify-center rounded-full text-[10px] md:col-span-1 ${
                  i % 2 === 0 ? "bg-mist text-blue" : "bg-teal text-navy-deep"
                }`}
              >
                {p.n}
              </span>
              <h3 className="display text-2xl md:col-span-5 md:text-4xl">{p.name}</h3>
              <p
                className={`text-[15px] leading-relaxed md:col-span-4 ${
                  i % 2 === 0 ? "text-ink-soft" : "text-white/80"
                }`}
              >
                {p.body}
              </p>
              <span
                className={`eyebrow text-[9px] md:col-span-2 md:text-right ${
                  i % 2 === 0 ? "text-ink-soft/70" : "text-teal"
                }`}
              >
                {p.audience}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

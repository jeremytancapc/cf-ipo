"use client";

import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";

const advantages = [
  {
    n: "01",
    tag: "Data",
    title: "Proprietary, multi-market data",
    body: "Lending data across Singapore, the Philippines and Malaysia, plus alternative-data partnerships. Every interaction improves our models.",
  },
  {
    n: "02",
    tag: "Models",
    title: "Custom models that keep learning",
    body: "Trained on our specific segments, retrained on fresh performance data, better every quarter.",
  },
  {
    n: "03",
    tag: "Experience",
    title: "A first-in-SEA experience",
    body: "Text-to-loan, proactive offers, and a 24/7 AI relationship manager.",
  },
  {
    n: "04",
    tag: "Cost",
    title: "Operations at 1/10th the cost",
    body: "AI-driven operations make it profitable to serve segments others cannot touch.",
  },
];

/** Four compounding advantages as white cards on mist. */
export function Moat() {
  return (
    <section data-nav-theme="light" className="bg-mist px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-14 md:grid-cols-12">
        <SectionHeading
          index="03"
          eyebrow="The moat"
          tone="light"
          className="md:col-span-5"
          title={
            <>
              Four advantages that{" "}
              <span className="accent-word accent-word--sky">compound.</span>
            </>
          }
        />

        <Reveal stagger className="grid gap-5 md:col-span-6 md:col-start-7">
          {advantages.map((a, i) => (
            <div
              key={a.n}
              className={`group rounded-[2rem] bg-white px-7 py-9 shadow-[0_20px_60px_rgba(14,27,44,0.08)] transition-transform duration-500 hover:-translate-y-1 md:px-10 ${
                i % 2 === 1 ? "md:translate-x-8" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="eyebrow rounded-full bg-blue px-3 py-1.5 text-[9px] text-white">
                  {a.n}
                </span>
                <span className="eyebrow text-[9px] text-ink-soft/70">{a.tag}</span>
              </div>
              <h3 className="display mt-6 text-xl text-ink transition-colors duration-300 group-hover:text-blue md:text-2xl">
                {a.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.7] text-ink-soft">
                {a.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { Starfield } from "../starfield";
import { useStat } from "@/lib/use-table";

const steps = [
  {
    n: "01",
    title: "Signals",
    body: "Transaction patterns, cash-flow dips, life events, seasonality, analysed continuously.",
  },
  {
    n: "02",
    title: "AI engine",
    body: "Predicts a loan need 2-4 weeks before the customer realises it themselves.",
  },
  {
    n: "03",
    title: "Personalised offer",
    body: "A tailored amount, term and rate, delivered on the right channel at the right moment.",
  },
  {
    n: "04",
    title: "One-click acceptance",
    body: "The customer says yes. Funds arrive in minutes, not days.",
  },
];

/** Interlocking wireframe rings - the reference's feature-icon motif. */
function Rings({ index }: { index: number }) {
  const offset = (index % 3) * 8;
  return (
    <svg
      viewBox="0 0 96 72"
      className="h-14 w-auto"
      fill="none"
      aria-hidden
    >
      <circle
        cx={34 + offset}
        cy={30}
        r={24}
        stroke="var(--color-teal)"
        strokeWidth={1.5}
      />
      <circle
        cx={50 - offset / 2}
        cy={42}
        r={24}
        stroke="var(--color-sky)"
        strokeWidth={1.5}
      />
    </svg>
  );
}

/** Proactive lending flow on the starfield. */
export function HowItWorks() {
  const conversion = useStat("conversion_multiple");

  return (
    <section
      data-nav-theme="dark"
      className="dark-section space-section relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <Starfield density={0.45} />

      <div className="relative">
        <SectionHeading
          index="02"
          eyebrow="Proactive lending"
          tone="space"
          title={
            <>
              We offer credit <span className="accent-word">before</span> the
              customer asks.
            </>
          }
        />

        <Reveal
          stagger
          className="mt-16 grid gap-y-14 md:mt-24 md:grid-cols-4 md:gap-x-10"
        >
          {steps.map((s, i) => (
            <div key={s.n}>
              <Rings index={i} />
              <div className="eyebrow mt-7 text-[9.5px] text-teal">
                Step {s.n}
              </div>
              <h3 className="display mt-3 text-2xl text-white md:text-[1.7rem]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.75] text-white/65">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-20 flex flex-col gap-10 rounded-[2rem] border border-white/10 bg-white/5 px-7 py-10 backdrop-blur-sm md:mt-28 md:flex-row md:items-end md:justify-between md:px-12 md:py-14">
          <div>
            <div className="display flex items-baseline text-[clamp(4rem,10vw,8.5rem)] leading-none text-white">
              <Counter
                value={conversion?.value ?? 3}
                decimals={conversion?.decimals ?? 0}
                duration={1.2}
              />
              <span className="text-teal">×</span>
            </div>
            <p className="eyebrow mt-5 text-[10px] text-white/60">
              higher conversion vs. traditional marketing campaigns
            </p>
          </div>
          <p className="max-w-[40ch] leading-[1.75] text-white/70 md:text-right">
            Not a form waiting to be found, a relationship manager that reaches
            out first, powered by data no competitor holds.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { Starfield } from "../starfield";
import { DisbursementChart } from "../charts/disbursement-chart";
import { useTable } from "@/lib/use-table";

const headlineKeys = [
  "cumulative_disbursed",
  "loan_count",
  "avg_loan_size",
  "licensed_countries",
];

/** Traction: live disbursement chart + headline counters on the starfield. */
export function Proof() {
  const stats = useTable("stats");
  const headline = headlineKeys
    .map((k) => stats.find((s) => s.key === k))
    .filter((s) => s !== undefined);

  return (
    <section
      id="proof"
      data-nav-theme="dark"
      className="dark-section space-section relative overflow-hidden px-5 py-28 md:px-10 md:py-44"
    >
      <Starfield />

      <div className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Proof"
            tone="space"
            title={
              <>
                The model already <span className="accent-word">works.</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="eyebrow text-[10px] text-white/55">
              Annual loan disbursement · Individual lending · SGD
            </p>
          </Reveal>
        </div>

        <Reveal
          className="mt-14 rounded-[2rem] border border-white/10 bg-white/4 p-5 backdrop-blur-sm md:mt-20 md:p-9"
          y={60}
        >
          <DisbursementChart />
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-5 md:mt-20 md:grid-cols-4"
        >
          {headline.map((s) => (
            <div
              key={s.key}
              className="rounded-[1.75rem] border border-white/10 bg-white/4 px-6 py-8 backdrop-blur-sm"
            >
              <div className="display text-[clamp(1.9rem,3.6vw,3.2rem)] leading-none text-white">
                <Counter
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals}
                />
              </div>
              <p className="eyebrow mt-4 text-[9.5px] text-white/55">{s.label}</p>
              {s.note && (
                <p className="mt-2 text-[11.5px] font-semibold text-teal/85">
                  {s.note}
                </p>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

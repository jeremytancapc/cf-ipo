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

        <Reveal
          className="mt-14 rounded-[2rem] border border-white/10 bg-white/4 p-5 backdrop-blur-sm md:mt-20 md:p-9"
          y={60}
        >
          <DisbursementChart />
          <div className="mt-6 text-center">
            <p className="eyebrow text-[10px] text-white/55">
              CF Money&apos;s annual loan disbursement for individual lending, in SGD
            </p>
            <p className="mt-1.5 text-[10.5px] normal-case tracking-normal text-white/35">
              (F) denotes forecast
            </p>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-5 md:mt-20 md:grid-cols-4"
        >
          {headline.map((s) => (
            <div
              key={s.key}
              className="card-shine min-w-0 rounded-[1.75rem] border border-white/10 bg-white/4 px-4 py-6 backdrop-blur-sm md:px-6 md:py-8"
            >
              <div className="display whitespace-nowrap text-[clamp(1.15rem,6.4vw,2.1rem)] leading-none text-white md:text-[clamp(1.9rem,3.6vw,3.2rem)]">
                <Counter
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals}
                  duration={2.6}
                  ease="power1.out"
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

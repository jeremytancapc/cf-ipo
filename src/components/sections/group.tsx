"use client";

import { SectionHeading } from "../section-heading";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { useStat } from "@/lib/use-table";

const entities = [
  {
    region: "Singapore",
    label: "Unsecured lending",
    lines: ["MSME Lending", "Buy Now Pay Later", "Easy Wage Access"],
  },
  {
    region: "Singapore",
    label: "Secured lending",
    lines: ["Auto Financing"],
  },
  {
    region: "China",
    label: "Overseas arm",
    lines: [
      "Core Technology Team",
      "Customer Experience & Collections",
      "Advanced Credit Analytics & Risk",
    ],
  },
  {
    region: "Philippines",
    label: "Overseas arm",
    lines: ["Easy Wage Access", "Invoice Factoring", "Individual Lending"],
  },
  {
    region: "Malaysia",
    label: "Overseas arm",
    lines: ["Easy Wage Access", "Invoice Factoring", "Individual Lending"],
  },
];

/** Capital C group structure with CF Money spotlighted as the listing entity. */
export function Group() {
  const raised = useStat("capital_raised");

  return (
    <section
      id="group"
      data-nav-theme="dark"
      className="dark-section relative overflow-hidden bg-blue px-5 py-28 md:px-10 md:py-44"
    >
      {/* Giant outline watermark, like the reference's oversized letters */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-8 select-none text-[clamp(10rem,30vw,28rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.12)]"
      >
        CF
      </div>

      <div className="relative">
        <SectionHeading
          index="08"
          eyebrow="The group"
          tone="blue"
          title={
            <>
              One parent. One <span className="accent-word">listing</span> entity.
            </>
          }
        />

        <Reveal className="mt-16 md:mt-24">
          <div className="rounded-full border border-white/25 bg-white/8 px-7 py-5 backdrop-blur-sm md:px-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-xl font-bold text-white md:text-2xl">
                Capital C Corporation
              </span>
              <span className="eyebrow text-[9.5px] text-white/65">
                Group parent · Holding company · Singapore
              </span>
            </div>
          </div>
          {/* connector */}
          <div className="mx-auto h-10 w-px bg-white/30 md:h-14" />
        </Reveal>

        {/* CF Money spotlight */}
        <Reveal y={56}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy-deep px-7 py-14 shadow-[0_40px_100px_rgba(10,22,38,0.4)] md:px-12 md:py-18">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-10 select-none text-[clamp(7rem,18vw,16rem)] font-extrabold leading-none text-teal/10"
            >
              ★
            </div>
            <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <span className="eyebrow inline-block rounded-full bg-teal px-4 py-2 text-[9.5px] text-navy-deep">
                  ★ 2027 IPO listing entity
                </span>
                <h3 className="display mt-7 text-[clamp(2.4rem,5.5vw,4.5rem)] text-white">
                  CF Money<span className="text-teal">.</span>
                </h3>
                <p className="mt-4 max-w-[44ch] leading-[1.75] text-white/70">
                  Individual lending, Singapore, the group&apos;s flagship. The
                  AI-native lending engine heading to the SGX Catalist board.
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9 md:text-right">
                <div className="display text-4xl text-teal md:text-5xl">
                  <Counter
                    value={raised?.value ?? 100}
                    prefix={raised?.prefix ?? "~S$"}
                    suffix={raised?.suffix ?? "M"}
                  />
                </div>
                <p className="eyebrow mt-4 text-[9.5px] text-white/55">
                  cumulative hybrid / debt capital raised since 2017, backed by
                  family offices &amp; HNWIs
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Sister companies */}
        <Reveal stagger className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-5">
          {entities.map((e, i) => (
            <div
              key={`${e.region}-${i}`}
              className="rounded-[1.75rem] border border-white/15 bg-white/6 px-6 py-8 backdrop-blur-sm transition-colors duration-500 hover:bg-white/12"
            >
              <div className="eyebrow text-[9px] text-teal">{e.region}</div>
              <div className="mt-1.5 text-[11px] font-semibold text-white/55">
                {e.label}
              </div>
              <ul className="mt-6 space-y-2.5">
                {e.lines.map((line) => (
                  <li key={line} className="text-[13.5px] leading-snug text-white/80">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { SectionHeading } from "./section-heading";
import { Starfield } from "./starfield";
import { ProjectionsChart } from "./charts/projections-chart";
import { ComparablesScatter } from "./charts/comparables-scatter";
import { ProceedsDonut } from "./charts/proceeds-donut";
import { useTable } from "@/lib/use-table";

const snapshotKeys = [
  "avg_loan_size",
  "loan_count",
  "cumulative_disbursed",
  "loans_outstanding",
  "licensed_countries",
  "tam_2025",
];

function fmt(n: number | null, opts: { suffix?: string; decimals?: number } = {}) {
  if (n === null) return "-";
  return `${n.toLocaleString("en-SG", {
    minimumFractionDigits: opts.decimals ?? 0,
    maximumFractionDigits: opts.decimals ?? 2,
  })}${opts.suffix ?? ""}`;
}

export function FinancialsContent() {
  const stats = useTable("stats");
  const projections = useTable("projections");
  const comparables = useTable("comparables");
  const sensitivity = useTable("sensitivity");
  const roeScenarios = useTable("roe_scenarios");
  const ipoMcap = stats.find((s) => s.key === "ipo_mcap");

  const snapshot = snapshotKeys
    .map((k) => stats.find((s) => s.key === k))
    .filter((s) => s !== undefined);

  return (
    <div>
      {/* Header - blue field */}
      <section data-nav-theme="dark" className="bg-blue px-5 pb-24 pt-36 text-center md:px-10 md:pb-32 md:pt-44">
        <Reveal>
          <p className="eyebrow text-teal">CF Money · The data room</p>
          <h1 className="display mx-auto mt-7 max-w-[16ch] text-[length:var(--text-hero)] text-white">
            The numbers, <span className="accent-word">in full.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[46ch] leading-[1.75] text-white/80">
            Every figure on this page is served live from our data room &mdash; base-case
            projections, peer benchmarks, sensitivity scenarios and capital allocation.
          </p>
          <p className="eyebrow mx-auto mt-4 max-w-none whitespace-nowrap text-[10px] text-teal/70">
            Confidential · For Accredited Investors only
          </p>
        </Reveal>
      </section>

      {/* Portfolio snapshot */}
      <section data-nav-theme="light" className="bg-mist px-5 py-20 text-ink md:px-10 md:py-28">
        <SectionHeading
          index="A"
          eyebrow="Portfolio snapshot"
          tone="light"
          title={<>Unit economics today.</>}
        />
        <Reveal stagger className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3">
          {snapshot.map((s) => (
            <div
              key={s.key}
              className="card-shine card-shine--light rounded-[1.75rem] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(14,27,44,0.08)]"
            >
              <div className="display text-[clamp(1.7rem,3.4vw,3rem)] leading-none text-ink">
                <Counter
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals}
                />
              </div>
              <p className="eyebrow mt-4 text-[9.5px] text-ink-soft">{s.label}</p>
              {s.note && (
                <p className="mt-2 text-[11.5px] font-semibold text-blue">{s.note}</p>
              )}
            </div>
          ))}
        </Reveal>
      </section>

      {/* Projections */}
      <section data-nav-theme="light" className="bg-mist px-5 py-20 text-ink md:px-10 md:py-28">
        <SectionHeading
          index="B"
          eyebrow="Base case · Pre-money"
          tone="light"
          title={
            <>
              Projections to{" "}
              <span className="accent-word accent-word--sky">FY2031.</span>
            </>
          }
        />
        <Reveal className="mt-14 rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(14,27,44,0.08)] md:p-9">
          <ProjectionsChart />
        </Reveal>

        <Reveal className="mt-8 overflow-x-auto rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(14,27,44,0.08)] md:p-9">
          <table className="w-full min-w-[640px] border-collapse text-[13px] font-medium">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="eyebrow py-4 pr-4 font-bold text-ink-soft">S$M</th>
                {projections.map((p) => (
                  <th
                    key={p.fiscal_year}
                    className={`eyebrow py-4 pr-4 text-right ${
                      p.fiscal_year === 2027 ? "text-blue" : "text-ink-soft"
                    }`}
                  >
                    FY{String(p.fiscal_year).slice(2)}
                    {p.fiscal_year === 2027 ? " ★" : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-4 pr-4 text-ink">Revenue</td>
                {projections.map((p) => (
                  <td key={p.fiscal_year} className="py-4 pr-4 text-right text-ink">
                    {fmt(p.revenue_m, { decimals: 1 })}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line">
                <td className="py-4 pr-4 text-ink">Profit before tax</td>
                {projections.map((p) => (
                  <td key={p.fiscal_year} className="py-4 pr-4 text-right text-ink">
                    {fmt(p.pbt_m, { decimals: 1 })}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-line">
                <td className="py-4 pr-4 text-ink">Pro-forma adjusted</td>
                {projections.map((p) => (
                  <td key={p.fiscal_year} className="py-4 pr-4 text-right text-ink">
                    {fmt(p.pro_forma_m, { decimals: 1 })}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-ink-soft">PBT margin</td>
                {projections.map((p) => (
                  <td key={p.fiscal_year} className="py-4 pr-4 text-right text-ink-soft">
                    {p.revenue_m > 0
                      ? `${Math.round((p.pbt_m / p.revenue_m) * 100)}%`
                      : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-[11px] text-ink-soft/80">
            ★ Expected IPO year. FY2027 pro-forma excludes one-off IPO-related expenses.
          </p>
        </Reveal>
      </section>

      {/* Valuation / comparables - starfield section */}
      <section data-nav-theme="dark" className="dark-section space-section relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
        <Starfield />
        <div className="relative">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <SectionHeading
              index="C"
              eyebrow="Valuation · Mid-2025"
              tone="space"
              className="md:col-span-7"
              title={
                <>
                  Comped against listed peers,{" "}
                  <span className="accent-word">priced to re-rate.</span>
                </>
              }
            />
            <Reveal className="md:col-span-4 md:col-start-9 md:text-right">
              <div className="display text-5xl text-teal md:text-6xl">
                <Counter
                  value={ipoMcap?.value ?? 130}
                  prefix={ipoMcap?.prefix ?? "~S$"}
                  suffix={ipoMcap?.suffix ?? "M"}
                />
              </div>
              <p className="eyebrow mt-3 text-[9.5px] text-white/55">
                {ipoMcap?.note ?? "implied IPO market cap · 15× P/E on FY26-27 avg pre-tax income"}
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-16 rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_rgba(10,22,38,0.35)] md:p-9">
            <p className="eyebrow mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-ink-soft">
              <span>Market cap vs P/E &mdash; listed peers</span>
              <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: "#00acfc" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ filter: "drop-shadow(0 0 4px rgba(0,172,252,0.55))", flexShrink: 0 }}>
                  <path d="M5,0 L10,5 L5,10 L0,5 Z" fill="#00acfc" />
                </svg>
                CF Money target
              </span>
            </p>
            <ComparablesScatter />
            <p className="mt-4 text-[11px] leading-relaxed text-ink-soft">
              CF&apos;s 15× target sits mid-range on P/E at a fraction of peer market caps, with meaningful re-rating room as scale catches up to valuation.
              <br className="hidden md:block" />
              Peers listed on SGX / Bursa Malaysia operating as non-bank financial institutions (RM millions).
            </p>
          </Reveal>

          <Reveal className="mt-8 overflow-x-auto rounded-[2rem] border border-white/10 bg-white/4 p-5 backdrop-blur-sm md:p-9">
            <table className="w-full min-w-[760px] border-collapse text-[13px] font-medium">
              <thead>
                <tr className="border-b border-(--color-line-dark) text-left">
                  {["Company", "Ctry", "Mkt cap ($M)", "Rev", "Net profit", "EV/EBITDA", "P/E", "P/B"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={`eyebrow py-4 pr-4 font-bold text-white/55 ${
                          i > 1 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {comparables.map((c) => (
                  <tr
                    key={c.company}
                    className={`border-b border-(--color-line-dark) ${
                      c.is_target ? "bg-teal/10 text-teal" : "text-white/90"
                    }`}
                  >
                    <td className="py-3.5 pr-4">{c.company}</td>
                    <td className="py-3.5 pr-4 text-white/55">{c.country}</td>
                    <td className="py-3.5 pr-4 text-right">{fmt(c.mkt_cap_m, { decimals: 1 })}</td>
                    <td className="py-3.5 pr-4 text-right">{fmt(c.revenue_m, { decimals: 1 })}</td>
                    <td className="py-3.5 pr-4 text-right">{fmt(c.net_profit_m, { decimals: 1 })}</td>
                    <td className="py-3.5 pr-4 text-right">{fmt(c.ev_ebitda)}</td>
                    <td className="py-3.5 pr-4 text-right">{fmt(c.pe)}</td>
                    <td className="py-3.5 pr-4 text-right">{fmt(c.pb)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* Sensitivity */}
      <section data-nav-theme="light" className="bg-mist px-5 py-20 text-ink md:px-10 md:py-28">
        <SectionHeading
          index="D"
          eyebrow="Sensitivity analysis"
          tone="light"
          title={
            <>
              Upside under{" "}
              <span className="accent-word accent-word--sky">conservative</span>{" "}
              exits.
            </>
          }
        />

        <Reveal className="mt-14 overflow-x-auto rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(14,27,44,0.08)] md:p-9">
          <table className="w-full min-w-[640px] border-collapse text-[13px] font-medium">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="eyebrow py-4 pr-4 font-bold text-ink-soft">S$M unless stated</th>
                {sensitivity.map((s) => (
                  <th
                    key={s.fiscal_year}
                    className={`eyebrow py-4 pr-4 text-right ${
                      s.fiscal_year === 2027 ? "text-blue" : "text-ink-soft"
                    }`}
                  >
                    FY{String(s.fiscal_year).slice(2)}
                    {s.fiscal_year === 2027 ? " · IPO" : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Revenue", (s) => fmt(s.revenue_m)],
                  ["PBT", (s) => fmt(s.pbt_m, { decimals: 1 })],
                  ["PBT margin", (s) => `${s.pbt_margin_pct}%`],
                  ["Valuation @ 10× P/E", (s) => fmt(s.valuation_10x)],
                  ["Valuation @ 15× P/E", (s) => fmt(s.valuation_15x)],
                ] as [string, (s: (typeof sensitivity)[number]) => string][]
              ).map(([label, render]) => (
                <tr key={label} className="border-b border-line last:border-0">
                  <td className="py-4 pr-4 text-ink">{label}</td>
                  {sensitivity.map((s) => (
                    <td key={s.fiscal_year} className="py-4 pr-4 text-right text-ink">
                      {render(s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-[11px] text-ink-soft/80">
            Valuation range on P/E multiple in IPO year, RHB mandate guide.
          </p>
        </Reveal>

        <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-2">
          {roeScenarios.map((r) => (
            <div
              key={r.scenario}
              className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(14,27,44,0.08)]"
            >
                <span className="eyebrow inline-block rounded-full bg-blue px-3.5 py-1.5 text-[9.5px] text-white">
                Scenario {r.scenario}
              </span>
              <p className="mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-ink-soft">
                {r.label}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="display text-4xl text-ink">{r.roe_15x_pct}%</div>
                  <p className="eyebrow mt-2 text-[9px] text-ink-soft">
                    p.a. ROE @ 15× exit
                  </p>
                </div>
                <div>
                  <div className="display text-4xl text-blue">{r.with_div_15x_pct}%</div>
                  <p className="eyebrow mt-2 text-[9px] text-ink-soft">
                    p.a. incl. 8% fixed dividend
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[12px] font-semibold text-ink-soft">
                At 10× exit: {r.roe_10x_pct}% p.a. ({r.with_div_10x_pct}% incl. dividend)
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Uses of proceeds */}
      <section data-nav-theme="light" className="bg-mist px-5 py-20 pb-32 text-ink md:px-10 md:py-28 md:pb-44">
        <SectionHeading
          index="E"
          eyebrow="Capital allocation"
          tone="light"
          title={
            <>
              Where the proceeds{" "}
              <span className="accent-word accent-word--sky">go.</span>
            </>
          }
        />
        <Reveal className="mt-14">
          <ProceedsDonut />
        </Reveal>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTable } from "@/lib/use-table";

const series = [
  { key: "revenue_m", label: "Revenue" },
  { key: "pbt_m", label: "Profit before tax" },
  { key: "pro_forma_m", label: "Pro-forma adjusted" },
] as const;

type SeriesKey = (typeof series)[number]["key"];

/** FY2024–2031 projections with a series toggle. Rendered on white. */
export function ProjectionsChart() {
  const data = useTable("projections");
  const [active, setActive] = useState<SeriesKey>("revenue_m");
  const activeLabel = series.find((s) => s.key === active)!.label;

  const rows = data.map((d) => ({
    ...d,
    label: `FY${String(d.fiscal_year).slice(2)}`,
  }));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {series.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActive(s.key)}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-[12.5px] font-bold transition-colors duration-300 ${
              active === s.key
                ? "bg-blue text-white"
                : "bg-mist text-ink-soft hover:text-blue"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-8 h-[320px] w-full md:h-[400px]">
        <ResponsiveContainer>
          <ComposedChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: -14 }} barCategoryGap="32%">
            <XAxis
              dataKey="label"
              stroke="#d9e4ed"
              tick={{ fill: "#4a6076" }}
              tickLine={false}
              axisLine={{ stroke: "#d9e4ed" }}
            />
            <YAxis
              stroke="#d9e4ed"
              tick={{ fill: "#4a6076" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}M`}
              width={52}
            />
            <Tooltip
              cursor={{ fill: "rgba(45,83,132,0.06)" }}
              content={({ payload, label }) => {
                const value = payload?.[0]?.value;
                if (value === undefined) return null;
                return (
                  <div className="rounded-2xl border border-line bg-white px-4 py-3 text-[12px] font-semibold leading-relaxed">
                    <div className="text-ink-soft">{label}</div>
                    <div className="text-ink">
                      {activeLabel} · S${value}M
                    </div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey={active}
              fill="#2d5384"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey={active}
              stroke="#00acfc"
              strokeWidth={2}
              dot={{ r: 3.5, fill: "#00acfc", strokeWidth: 0 }}
              isAnimationActive
              animationDuration={1100}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

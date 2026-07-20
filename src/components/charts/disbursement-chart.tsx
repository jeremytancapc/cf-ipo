"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTable } from "@/lib/use-table";

/** Annual loan disbursement (SGD M), live from the DB. Rendered on dark. */
export function DisbursementChart() {
  const data = useTable("disbursements");
  const latestYear = data[data.length - 1]?.year;

  return (
    <div className="h-[320px] w-full md:h-[420px]">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: -14 }} barCategoryGap="26%">
          <XAxis
            dataKey="year"
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: "rgba(255,255,255,0.6)" }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.14)" }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: "rgba(255,255,255,0.6)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}M`}
            width={52}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.06)" }}
            contentStyle={{
              background: "#0e1b2c",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 16,
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "#ffffff",
            }}
            formatter={(value) => [`S$${value}M`, "Disbursed"]}
            labelStyle={{ color: "rgba(255,255,255,0.6)" }}
          />
          <Bar
            dataKey="amount_m"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {data.map((d) => (
              <Cell
                key={d.year}
                fill={d.year === latestYear ? "#06dec0" : "rgba(0,172,252,0.55)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

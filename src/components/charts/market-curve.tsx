"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTable } from "@/lib/use-table";

/** Singapore alternative-lending market size curve (S$B). Rendered on white. */
export function MarketCurve() {
  const data = useTable("market_size");

  return (
    <div className="h-[280px] w-full md:h-[360px]">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="tamFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00acfc" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#00acfc" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="year"
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
            tickFormatter={(v: number) => `${v}B`}
            width={48}
          />
          <Tooltip
            cursor={{ stroke: "#2d5384", strokeOpacity: 0.3 }}
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #d9e4ed",
              borderRadius: 16,
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "#101d2c",
            }}
            formatter={(value) => [`S$${value}B`, "Market size"]}
            labelStyle={{ color: "#4a6076" }}
          />
          <Area
            type="monotone"
            dataKey="value_b"
            stroke="#2d5384"
            strokeWidth={2.5}
            fill="url(#tamFill)"
            dot={{ r: 3.5, fill: "#2d5384", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#2d5384", stroke: "#06dec0", strokeWidth: 3 }}
            isAnimationActive
            animationDuration={1600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

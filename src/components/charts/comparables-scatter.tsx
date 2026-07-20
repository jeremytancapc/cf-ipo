"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTable } from "@/lib/use-table";
import type { Comparable } from "@/lib/types";

type Point = { x: number; y: number; name: string; isTarget: boolean };

function toPoint(c: Comparable): Point | null {
  if (c.pe === null) return null;
  return { x: c.pe, y: c.mkt_cap_m, name: c.company, isTarget: c.is_target };
}

/** Market cap vs P/E scatter, CF Money target highlighted. Rendered on white. */
export function ComparablesScatter() {
  const comparables = useTable("comparables");
  const points = comparables.map(toPoint).filter((p): p is Point => p !== null);
  const peers = points.filter((p) => !p.isTarget);
  const target = points.filter((p) => p.isTarget);

  return (
    <div className="h-[320px] w-full md:h-[400px]">
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 12, right: 16, bottom: 4, left: -6 }}>
          <CartesianGrid stroke="#d9e4ed" strokeDasharray="2 6" />
          <XAxis
            type="number"
            dataKey="x"
            name="P/E"
            stroke="#d9e4ed"
            tick={{ fill: "#4a6076" }}
            tickLine={false}
            axisLine={{ stroke: "#d9e4ed" }}
            label={{
              value: "P/E",
              position: "insideBottomRight",
              offset: -2,
              style: { fill: "#4a6076", fontFamily: "var(--font-sans)", fontSize: 10 },
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Mkt cap"
            stroke="#d9e4ed"
            tick={{ fill: "#4a6076" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}B`}
            width={56}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3", stroke: "#2d5384" }}
            content={({ payload }) => {
              const p = payload?.[0]?.payload as Point | undefined;
              if (!p) return null;
              return (
                <div className="rounded-2xl border border-line bg-white px-4 py-3 text-[12px] font-semibold leading-relaxed">
                  <div className={p.isTarget ? "text-blue" : "text-ink"}>{p.name}</div>
                  <div className="text-ink-soft">
                    P/E {p.x}× · Mkt cap ${p.y.toLocaleString()}M
                  </div>
                </div>
              );
            }}
          />
          <Scatter data={peers} fill="#2d5384" fillOpacity={0.5} isAnimationActive />
          <Scatter data={target} fill="#00acfc" shape="diamond" isAnimationActive />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

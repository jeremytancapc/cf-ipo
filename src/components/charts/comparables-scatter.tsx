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

// Compact display labels; tooltip always shows the full company name.
const SHORT_NAMES: Record<string, string> = {
  "Sing Investments & Finance": "Sing Inv. & Finance",
  "AEON Credit Services M": "AEON Credit",
  "Valuemax Group": "Valuemax",
  "MoneyMax Financial": "MoneyMax",
  "Well Chip Group": "Well Chip",
  "Evergreen Max Cash": "Evergreen",
};

type ShapeProps = {
  cx?: number;
  cy?: number;
  // Recharts stores the original axis data values in `node`, not in `x`/`y`
  // (those are overwritten with pixel bounding-box coordinates).
  node?: { x?: number; y?: number; z?: unknown };
  name?: string;
  [key: string]: unknown;
};

function PeerDot({ cx = 0, cy = 0, node, name = "" }: ShapeProps) {
  const displayName = SHORT_NAMES[name] ?? name;
  const pe = (node?.x as number | undefined) ?? 0;

  // Left-cluster (low PE): place label above the dot so it never crowds the Y-axis tick labels.
  // Right-cluster (high PE): place label to the left to avoid right-edge clipping.
  // All others: place label to the right.
  const isLeftCluster = pe < 8;
  const nearRight = pe >= 22;

  const tx = isLeftCluster ? cx : nearRight ? cx - 10 : cx + 10;
  const ty = isLeftCluster ? cy - 12 : cy;
  const anchor = isLeftCluster ? "middle" : nearRight ? "end" : "start";
  const baseline = isLeftCluster ? "auto" : "middle";

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5.5}
        fill="#2d5384"
        fillOpacity={0.65}
        stroke="white"
        strokeWidth={1.5}
      />
      <text
        x={tx}
        y={ty}
        textAnchor={anchor}
        dominantBaseline={baseline}
        fill="#4a6076"
        fontSize={10}
        fontFamily="var(--font-sans)"
        fontWeight={600}
        pointerEvents="none"
      >
        {displayName}
      </text>
    </g>
  );
}

function TargetDot({ cx = 0, cy = 0 }: ShapeProps) {
  const half = 9;
  const d = `M${cx},${cy - half} L${cx + half},${cy} L${cx},${cy + half} L${cx - half},${cy} Z`;

  return (
    <g>
      {/* Two staggered pulsing rings */}
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="none"
        stroke="#00acfc"
        strokeWidth={1.5}
        className="comps-target-ring"
      />
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="none"
        stroke="#00acfc"
        strokeWidth={1.5}
        className="comps-target-ring comps-target-ring--delayed"
      />
      {/* Glowing diamond */}
      <path
        d={d}
        fill="#00acfc"
        style={{ filter: "drop-shadow(0 0 6px rgba(0,172,252,0.6))" }}
      />
      {/* Always-visible label to the right of the diamond */}
      <text
        x={cx + half + 8}
        y={cy}
        textAnchor="start"
        dominantBaseline="middle"
        fill="#00acfc"
        fontSize={11}
        fontFamily="var(--font-sans)"
        fontWeight={700}
        letterSpacing={0.3}
        pointerEvents="none"
      >
        CF Money
      </text>
    </g>
  );
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
        <ScatterChart margin={{ top: 24, right: 16, bottom: 4, left: -6 }}>
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
                <div className="rounded-2xl border border-line bg-white px-4 py-3 text-[12px] font-semibold leading-relaxed shadow-md">
                  <div className={p.isTarget ? "text-blue" : "text-ink"}>{p.name}</div>
                  <div className="text-ink-soft">
                    P/E {p.x}× · Mkt cap ${p.y.toLocaleString()}M
                  </div>
                </div>
              );
            }}
          />
          <Scatter
            data={peers}
            isAnimationActive
            animationDuration={800}
            shape={(props) => <PeerDot {...(props as unknown as ShapeProps)} />}
          />
          <Scatter
            data={target}
            isAnimationActive
            animationDuration={800}
            shape={(props) => <TargetDot {...(props as unknown as ShapeProps)} />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

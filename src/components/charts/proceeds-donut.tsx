"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import { useTable } from "@/lib/use-table";

const palette = ["#2d5384", "#06dec0", "#00acfc"];

const RADIAN = Math.PI / 180;

/** Percentage label centered inside each donut segment. */
function renderSegmentLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx);
  const cy = Number(props.cy);
  const midAngle = Number(props.midAngle);
  const innerRadius = Number(props.innerRadius);
  const outerRadius = Number(props.outerRadius);
  const r = (innerRadius + outerRadius) / 2;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={700}
      fontFamily="var(--font-sans)"
      pointerEvents="none"
    >
      {props.value}%
    </text>
  );
}

/** Uses-of-proceeds allocation, live from the DB. Rendered on mist/white. */
export function ProceedsDonut() {
  const proceeds = useTable("proceeds");

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="h-[280px] w-full md:h-[340px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={proceeds}
              dataKey="percentage"
              nameKey="category"
              innerRadius="58%"
              outerRadius="88%"
              paddingAngle={2}
              stroke="#eef4f9"
              strokeWidth={3}
              label={renderSegmentLabel}
              labelLine={false}
              isAnimationActive
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {proceeds.map((p, i) => (
                <Cell key={p.category} fill={palette[i % palette.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #d9e4ed",
                borderRadius: 16,
                fontFamily: "var(--font-sans)",
                fontSize: 12,
              }}
              formatter={(value, name) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-8">
        {proceeds.map((p, i) => (
          <div key={p.category} className="flex gap-5">
            <span
              className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
              style={{ background: palette[i % palette.length] }}
            />
            <div>
              <div className="flex items-baseline gap-3">
                <span className="display text-2xl text-ink">{p.percentage}%</span>
                <span className="eyebrow text-[10px] text-blue">{p.category}</span>
              </div>
              <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.7] text-ink-soft">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useTable } from "@/lib/use-table";

/** Annual loan disbursement (SGD M), live from the DB. Rendered on dark. */
export function DisbursementChart() {
  const data = useTable("disbursements");

  // Desktop has room for the full year; mobile stays abbreviated to avoid crowding.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const rows = data.map((d) => ({
    ...d,
    label: isDesktop
      ? `${d.year}${d.is_forecast ? " (F)" : ""}`
      : `\u2019${String(d.year).slice(2)}${d.is_forecast ? "F" : ""}`,
  }));

  return (
    <div className="h-[320px] w-full md:h-[420px]">
      <ResponsiveContainer>
        <BarChart data={rows} margin={{ top: 22, right: 0, bottom: 0, left: 0 }} barCategoryGap="26%">
          <CartesianGrid
            horizontal
            vertical={false}
            stroke="rgba(255,255,255,0.07)"
            strokeDasharray="3 8"
          />
          <XAxis
            dataKey="label"
            interval={0}
            stroke="rgba(255,255,255,0.3)"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "rgba(255,255,255,0.14)" }}
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
            formatter={(value, _name, item) => [
              `S$${value}M${item?.payload?.is_forecast ? " (Forecast)" : ""}`,
              "Disbursed",
            ]}
            labelFormatter={(_label, payload) => payload?.[0]?.payload?.year ?? _label}
            labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            itemStyle={{ color: "#ffffff" }}
          />
          <Bar
            dataKey="amount_m"
            radius={[6, 6, 0, 0]}
            isAnimationActive
            animationDuration={1400}
            animationEasing="ease-out"
          >
            {rows.map((d) => (
              <Cell
                key={d.year}
                fill={
                  d.is_forecast
                    ? "rgba(6,222,192,0.3)"
                    : "rgba(0,172,252,0.55)"
                }
                stroke={d.is_forecast ? "#06dec0" : "none"}
                strokeWidth={d.is_forecast ? 1.5 : 0}
                strokeDasharray={d.is_forecast ? "4 3" : undefined}
              />
            ))}
            <LabelList
              dataKey="amount_m"
              position="top"
              offset={8}
              formatter={(v) => `$${v}M`}
              style={{
                fill: "rgba(255,255,255,0.85)",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
                pointerEvents: "none",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

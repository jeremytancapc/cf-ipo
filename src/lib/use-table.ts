"use client";

import useSWR from "swr";
import { getSupabase, isSupabaseConfigured } from "./supabase";
import {
  fallbackComparables,
  fallbackDisbursements,
  fallbackMarketSize,
  fallbackProceeds,
  fallbackProjections,
  fallbackRoeScenarios,
  fallbackSensitivity,
  fallbackStats,
} from "./fallback-data";
import type {
  Comparable,
  Disbursement,
  MarketSize,
  Proceed,
  Projection,
  RoeScenario,
  Sensitivity,
  Stat,
} from "./types";

type TableConfig = {
  stats: { row: Stat; order: "ord" };
  disbursements: { row: Disbursement; order: "year" };
  market_size: { row: MarketSize; order: "year" };
  projections: { row: Projection; order: "fiscal_year" };
  comparables: { row: Comparable; order: "ord" };
  proceeds: { row: Proceed; order: "ord" };
  sensitivity: { row: Sensitivity; order: "fiscal_year" };
  roe_scenarios: { row: RoeScenario; order: "ord" };
};

const orderColumns: { [K in keyof TableConfig]: TableConfig[K]["order"] } = {
  stats: "ord",
  disbursements: "year",
  market_size: "year",
  projections: "fiscal_year",
  comparables: "ord",
  proceeds: "ord",
  sensitivity: "fiscal_year",
  roe_scenarios: "ord",
};

const fallbacks: { [K in keyof TableConfig]: TableConfig[K]["row"][] } = {
  stats: fallbackStats,
  disbursements: fallbackDisbursements,
  market_size: fallbackMarketSize,
  projections: fallbackProjections,
  comparables: fallbackComparables,
  proceeds: fallbackProceeds,
  sensitivity: fallbackSensitivity,
  roe_scenarios: fallbackRoeScenarios,
};

async function fetchTable<K extends keyof TableConfig>(
  table: K
): Promise<TableConfig[K]["row"][]> {
  const supabase = getSupabase();
  if (!supabase) return fallbacks[table];
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(orderColumns[table], { ascending: true });
  if (error || !data || data.length === 0) return fallbacks[table];
  return data as TableConfig[K]["row"][];
}

/**
 * Live table data: fetches from Supabase on every mount/revisit so DB edits
 * show up without redeploying. Falls back to seed values instantly while
 * loading (or permanently when Supabase isn't configured).
 */
export function useTable<K extends keyof TableConfig>(table: K) {
  const { data } = useSWR(
    isSupabaseConfigured ? `table:${table}` : null,
    () => fetchTable(table),
    { revalidateOnFocus: false }
  );
  return data ?? fallbacks[table];
}

/** Convenience lookup for single stats by key, with formatted rendering data. */
export function useStat(key: string): Stat | undefined {
  const stats = useTable("stats");
  return stats.find((s) => s.key === key);
}

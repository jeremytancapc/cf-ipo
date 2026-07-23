export type Stat = {
  key: string;
  label: string;
  value: number;
  prefix: string | null;
  suffix: string | null;
  decimals: number;
  note: string | null;
  ord: number;
};

export type Disbursement = {
  year: number;
  amount_m: number;
  is_forecast: boolean;
};

export type MarketSize = {
  year: number;
  value_b: number;
};

export type Projection = {
  fiscal_year: number;
  revenue_m: number;
  pbt_m: number;
  pro_forma_m: number;
};

export type Comparable = {
  company: string;
  country: string;
  mkt_cap_m: number;
  revenue_m: number | null;
  net_profit_m: number | null;
  ev_ebitda: number | null;
  pe: number | null;
  pb: number | null;
  is_target: boolean;
  ord: number;
};

export type Proceed = {
  category: string;
  percentage: number;
  description: string;
  ord: number;
};

export type Sensitivity = {
  fiscal_year: number;
  revenue_m: number;
  pbt_m: number;
  pbt_margin_pct: number;
  valuation_10x: number;
  valuation_15x: number;
};

export type RoeScenario = {
  scenario: string;
  label: string;
  roe_10x_pct: number;
  roe_15x_pct: number;
  with_div_10x_pct: number;
  with_div_15x_pct: number;
  ord: number;
};

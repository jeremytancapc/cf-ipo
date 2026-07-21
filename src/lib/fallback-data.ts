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

/**
 * Mirror of supabase/seed.sql. Used when Supabase env vars are absent
 * (local dev before the project is wired up) so the site still renders.
 */

export const fallbackStats: Stat[] = [
  { key: "avg_loan_size", label: "Average loan size", value: 3350, prefix: "S$", suffix: "", decimals: 0, note: null, ord: 1 },
  { key: "loan_count", label: "Loans disbursed", value: 107030, prefix: "", suffix: "+", decimals: 0, note: null, ord: 2 },
  { key: "cumulative_disbursed", label: "Cumulative disbursed", value: 421, prefix: "S$", suffix: "M+", decimals: 0, note: null, ord: 3 },
  { key: "loans_outstanding", label: "Loans outstanding", value: 24, prefix: "S$", suffix: "M+", decimals: 0, note: null, ord: 4 },
  { key: "licensed_countries", label: "Officially licensed markets", value: 3, prefix: "", suffix: "", decimals: 0, note: "Singapore · Philippines · Malaysia", ord: 5 },
  { key: "tam_2025", label: "Singapore TAM, 2025", value: 2.8, prefix: "S$", suffix: "B+", decimals: 1, note: null, ord: 6 },
  { key: "tam_2031", label: "Alternative lending opportunity by 2031", value: 4.5, prefix: "S$", suffix: "B", decimals: 1, note: null, ord: 7 },
  { key: "market_captured", label: "Of TAM disbursed to date", value: 2.5, prefix: "", suffix: "%", decimals: 1, note: "Enormous remaining runway", ord: 8 },
  { key: "sector_cagr", label: "SG alt-lending CAGR 2024-2028", value: 16.9, prefix: "", suffix: "%", decimals: 1, note: null, ord: 9 },
  { key: "conversion_multiple", label: "Higher conversion vs traditional campaigns", value: 3, prefix: "", suffix: "×", decimals: 0, note: null, ord: 10 },
  { key: "capital_raised", label: "Cumulative hybrid / debt capital raised since 2017", value: 100, prefix: "~S$", suffix: "M", decimals: 0, note: null, ord: 11 },
  { key: "ipo_mcap", label: "Implied IPO market cap", value: 130, prefix: "~S$", suffix: "M", decimals: 0, note: "15× P/E on FY26-27 avg pre-tax income", ord: 12 },
  { key: "profit_margin_low", label: "Sustained profit margin, lower bound", value: 50, prefix: "", suffix: "%", decimals: 0, note: null, ord: 13 },
  { key: "profit_margin_high", label: "Sustained profit margin, upper bound", value: 60, prefix: "", suffix: "%", decimals: 0, note: null, ord: 14 },
];

export const fallbackDisbursements: Disbursement[] = [
  { year: 2016, amount_m: 16 },
  { year: 2017, amount_m: 28 },
  { year: 2018, amount_m: 20 },
  { year: 2019, amount_m: 30 },
  { year: 2020, amount_m: 25 },
  { year: 2021, amount_m: 46 },
  { year: 2022, amount_m: 58 },
  { year: 2023, amount_m: 62 },
  { year: 2024, amount_m: 66 },
  { year: 2025, amount_m: 70 },
];

export const fallbackMarketSize: MarketSize[] = [
  { year: 2017, value_b: 1.2 },
  { year: 2019, value_b: 1.55 },
  { year: 2021, value_b: 1.95 },
  { year: 2023, value_b: 2.35 },
  { year: 2025, value_b: 2.8 },
  { year: 2027, value_b: 3.35 },
  { year: 2029, value_b: 3.9 },
  { year: 2031, value_b: 4.5 },
];

export const fallbackProjections: Projection[] = [
  { fiscal_year: 2024, revenue_m: 13.8, pbt_m: 7.6, pro_forma_m: 7.6 },
  { fiscal_year: 2025, revenue_m: 15.7, pbt_m: 9.0, pro_forma_m: 9.0 },
  { fiscal_year: 2026, revenue_m: 16.1, pbt_m: 8.8, pro_forma_m: 8.8 },
  { fiscal_year: 2027, revenue_m: 24.3, pbt_m: 7.5, pro_forma_m: 10.3 },
  { fiscal_year: 2028, revenue_m: 30.4, pbt_m: 13.5, pro_forma_m: 13.5 },
  { fiscal_year: 2029, revenue_m: 38.0, pbt_m: 17.8, pro_forma_m: 17.8 },
  { fiscal_year: 2030, revenue_m: 47.5, pbt_m: 23.3, pro_forma_m: 23.3 },
  { fiscal_year: 2031, revenue_m: 59.4, pbt_m: 30.2, pro_forma_m: 30.2 },
];

export const fallbackComparables: Comparable[] = [
  { company: "Aspial Corp", country: "SG", mkt_cap_m: 434.6, revenue_m: 2320.8, net_profit_m: 48.3, ev_ebitda: 15.71, pe: 24.58, pb: 0.48, is_target: false, ord: 1 },
  { company: "Valuemax Group", country: "SG", mkt_cap_m: 1629, revenue_m: 1560.7, net_profit_m: 283.4, ev_ebitda: 10.82, pe: 5.38, pb: 0.89, is_target: false, ord: 2 },
  { company: "MoneyMax Financial", country: "SG", mkt_cap_m: 645.7, revenue_m: 1036.8, net_profit_m: 130.8, ev_ebitda: 31.4, pe: 5.09, pb: 1.06, is_target: false, ord: 3 },
  { company: "Sing Investments & Finance", country: "SG", mkt_cap_m: 870.9, revenue_m: 540.8, net_profit_m: 124.3, ev_ebitda: null, pe: 7.22, pb: 0.57, is_target: false, ord: 4 },
  { company: "AEON Credit Services M", country: "MY", mkt_cap_m: 3043.3, revenue_m: 2457.3, net_profit_m: 370.6, ev_ebitda: 12.84, pe: 8.21, pb: 1.07, is_target: false, ord: 5 },
  { company: "RCE Capital", country: "MY", mkt_cap_m: 1937.8, revenue_m: 321.3, net_profit_m: 118.0, ev_ebitda: 12.58, pe: 16.39, pb: 2.35, is_target: false, ord: 6 },
  { company: "Well Chip Group", country: "MY", mkt_cap_m: 666, revenue_m: 222.1, net_profit_m: 50.0, ev_ebitda: 9.18, pe: 11.44, pb: 1.36, is_target: false, ord: 7 },
  { company: "Pappajack", country: "MY", mkt_cap_m: 729.8, revenue_m: 118, net_profit_m: 24.0, ev_ebitda: 20.04, pe: 30.35, pb: 2.78, is_target: false, ord: 8 },
  { company: "Evergreen Max Cash", country: "MY", mkt_cap_m: 345.6, revenue_m: 122.3, net_profit_m: 23.3, ev_ebitda: 12.52, pe: 14.83, pb: 1.46, is_target: false, ord: 9 },
  { company: "CF Money (target)", country: "SG", mkt_cap_m: 130, revenue_m: null, net_profit_m: null, ev_ebitda: null, pe: 15, pb: null, is_target: true, ord: 10 },
];

export const fallbackProceeds: Proceed[] = [
  { category: "Loan Book Origination", percentage: 50, description: "Directly funds new loan originations across consumer and business lending, expanding disbursement capacity in Singapore and overseas markets.", ord: 1 },
  { category: "Technology & AI Advancement", percentage: 35, description: "Scales our AI-powered credit engine, mobile platforms and centralised infrastructure to support hypergrowth without proportional headcount.", ord: 2 },
  { category: "Corporate Development", percentage: 15, description: "Funds strategic expansion, M&A and partnerships supporting our regional roadmap into the Philippines, Malaysia and beyond.", ord: 3 },
];

export const fallbackSensitivity: Sensitivity[] = [
  { fiscal_year: 2024, revenue_m: 14, pbt_m: 7.5, pbt_margin_pct: 54, valuation_10x: 75, valuation_15x: 113 },
  { fiscal_year: 2025, revenue_m: 17, pbt_m: 9, pbt_margin_pct: 53, valuation_10x: 90, valuation_15x: 135 },
  { fiscal_year: 2026, revenue_m: 23, pbt_m: 12, pbt_margin_pct: 52, valuation_10x: 120, valuation_15x: 180 },
  { fiscal_year: 2027, revenue_m: 30, pbt_m: 15, pbt_margin_pct: 50, valuation_10x: 150, valuation_15x: 225 },
];

export const fallbackRoeScenarios: RoeScenario[] = [
  {
    scenario: "A",
    label: "Entry at S$75M valuation, 2-year horizon (end 2025 to end 2027)",
    roe_10x_pct: 50,
    roe_15x_pct: 100,
    with_div_10x_pct: 58,
    with_div_15x_pct: 108,
    ord: 1,
  },
  {
    scenario: "B",
    label: "Entry at S$75M valuation, 3-year horizon using FY2027 exit financials conservatively",
    roe_10x_pct: 33,
    roe_15x_pct: 67,
    with_div_10x_pct: 41,
    with_div_15x_pct: 75,
    ord: 2,
  },
];

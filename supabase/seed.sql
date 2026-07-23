-- CF Money IPO mini-site · Supabase schema + seed
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → paste → Run).
-- After that, edit values in Table Editor and the live site updates on next page load.

-- ----- Schema -----

create table if not exists public.stats (
  key text primary key,
  label text not null,
  value numeric not null,
  prefix text default '',
  suffix text default '',
  decimals int default 0,
  note text,
  ord int default 0
);

create table if not exists public.disbursements (
  year int primary key,
  amount_m numeric not null,
  is_forecast boolean not null default false
);

-- Safe to re-run on an existing table that predates the is_forecast column.
alter table public.disbursements
  add column if not exists is_forecast boolean not null default false;

create table if not exists public.market_size (
  year int primary key,
  value_b numeric not null
);

create table if not exists public.projections (
  fiscal_year int primary key,
  revenue_m numeric not null,
  pbt_m numeric not null,
  pro_forma_m numeric not null
);

create table if not exists public.comparables (
  company text primary key,
  country text not null,
  mkt_cap_m numeric not null,
  revenue_m numeric,
  net_profit_m numeric,
  ev_ebitda numeric,
  pe numeric,
  pb numeric,
  is_target boolean default false,
  ord int default 0
);

create table if not exists public.proceeds (
  category text primary key,
  percentage numeric not null,
  description text not null,
  ord int default 0
);

create table if not exists public.sensitivity (
  fiscal_year int primary key,
  revenue_m numeric not null,
  pbt_m numeric not null,
  pbt_margin_pct numeric not null,
  valuation_10x numeric not null,
  valuation_15x numeric not null
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  organization text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.roe_scenarios (
  scenario text primary key,
  label text not null,
  roe_10x_pct numeric not null,
  roe_15x_pct numeric not null,
  with_div_10x_pct numeric not null,
  with_div_15x_pct numeric not null,
  ord int default 0
);

-- ----- Row Level Security: public read-only -----

alter table public.stats enable row level security;
alter table public.disbursements enable row level security;
alter table public.market_size enable row level security;
alter table public.projections enable row level security;
alter table public.comparables enable row level security;
alter table public.proceeds enable row level security;
alter table public.sensitivity enable row level security;
alter table public.roe_scenarios enable row level security;

drop policy if exists "public read" on public.stats;
create policy "public read" on public.stats for select using (true);
drop policy if exists "public read" on public.disbursements;
create policy "public read" on public.disbursements for select using (true);
drop policy if exists "public read" on public.market_size;
create policy "public read" on public.market_size for select using (true);
drop policy if exists "public read" on public.projections;
create policy "public read" on public.projections for select using (true);
drop policy if exists "public read" on public.comparables;
create policy "public read" on public.comparables for select using (true);
drop policy if exists "public read" on public.proceeds;
create policy "public read" on public.proceeds for select using (true);
drop policy if exists "public read" on public.sensitivity;
create policy "public read" on public.sensitivity for select using (true);
drop policy if exists "public read" on public.roe_scenarios;
create policy "public read" on public.roe_scenarios for select using (true);

-- Contact requests: anonymous visitors may submit, but never read.
alter table public.contact_requests enable row level security;
drop policy if exists "public insert" on public.contact_requests;
create policy "public insert" on public.contact_requests for insert with check (true);

-- ----- Seed data (from the pre-IPO deck) -----

insert into public.stats (key, label, value, prefix, suffix, decimals, note, ord) values
  ('avg_loan_size', 'Average loan size', 3350, 'S$', '', 0, null, 1),
  ('loan_count', 'Loans disbursed', 107030, '', '+', 0, null, 2),
  ('cumulative_disbursed', 'Cumulative disbursed', 421, 'S$', 'M+', 0, null, 3),
  ('loans_outstanding', 'Loans outstanding', 24, 'S$', 'M+', 0, null, 4),
  ('licensed_countries', 'Officially licensed markets', 3, '', '', 0, 'Singapore · Philippines · Malaysia', 5),
  ('tam_2025', 'Singapore TAM, 2025', 2.8, 'S$', 'B+', 1, null, 6),
  ('tam_2031', 'Alternative lending opportunity by 2031', 4.5, 'S$', 'B', 1, null, 7),
  ('market_captured', 'Of TAM disbursed to date', 2.5, '', '%', 1, 'Enormous remaining runway', 8),
  ('sector_cagr', 'SG alt-lending CAGR 2024-2028', 16.9, '', '%', 1, null, 9),
  ('conversion_multiple', 'Higher conversion vs traditional campaigns', 3, '', '×', 0, null, 10),
  ('capital_raised', 'Cumulative hybrid / debt capital raised since 2017', 100, '~S$', 'M', 0, null, 11),
  ('ipo_mcap', 'Implied IPO market cap', 130, '~S$', 'M', 0, '15× P/E on FY26-27 avg pre-tax income', 12),
  ('profit_margin_low', 'Sustained profit margin, lower bound', 50, '', '%', 0, null, 13),
  ('profit_margin_high', 'Sustained profit margin, upper bound', 60, '', '%', 0, null, 14)
on conflict (key) do update set
  label = excluded.label, value = excluded.value, prefix = excluded.prefix,
  suffix = excluded.suffix, decimals = excluded.decimals, note = excluded.note, ord = excluded.ord;

insert into public.disbursements (year, amount_m, is_forecast) values
  (2017, 16, false), (2018, 25, false), (2019, 28, false), (2020, 20, false),
  (2021, 30, false), (2022, 46, false), (2023, 58, false), (2024, 66, false),
  (2025, 62, false), (2026, 70, true)
on conflict (year) do update set
  amount_m = excluded.amount_m, is_forecast = excluded.is_forecast;

insert into public.market_size (year, value_b) values
  (2017, 1.2), (2019, 1.55), (2021, 1.95), (2023, 2.35),
  (2025, 2.8), (2027, 3.35), (2029, 3.9), (2031, 4.5)
on conflict (year) do update set value_b = excluded.value_b;

insert into public.projections (fiscal_year, revenue_m, pbt_m, pro_forma_m) values
  (2024, 13.8, 7.6, 7.6),
  (2025, 15.7, 9.0, 9.0),
  (2026, 16.1, 8.8, 8.8),
  (2027, 24.3, 7.5, 10.3),
  (2028, 30.4, 13.5, 13.5),
  (2029, 38.0, 17.8, 17.8),
  (2030, 47.5, 23.3, 23.3),
  (2031, 59.4, 30.2, 30.2)
on conflict (fiscal_year) do update set
  revenue_m = excluded.revenue_m, pbt_m = excluded.pbt_m, pro_forma_m = excluded.pro_forma_m;

insert into public.comparables (company, country, mkt_cap_m, revenue_m, net_profit_m, ev_ebitda, pe, pb, is_target, ord) values
  ('Aspial Corp', 'SG', 434.6, 2320.8, 48.3, 15.71, 24.58, 0.48, false, 1),
  ('Valuemax Group', 'SG', 1629, 1560.7, 283.4, 10.82, 5.38, 0.89, false, 2),
  ('MoneyMax Financial', 'SG', 645.7, 1036.8, 130.8, 31.4, 5.09, 1.06, false, 3),
  ('Sing Investments & Finance', 'SG', 870.9, 540.8, 124.3, null, 7.22, 0.57, false, 4),
  ('AEON Credit Services M', 'MY', 3043.3, 2457.3, 370.6, 12.84, 8.21, 1.07, false, 5),
  ('RCE Capital', 'MY', 1937.8, 321.3, 118.0, 12.58, 16.39, 2.35, false, 6),
  ('Well Chip Group', 'MY', 666, 222.1, 50.0, 9.18, 11.44, 1.36, false, 7),
  ('Pappajack', 'MY', 729.8, 118, 24.0, 20.04, 30.35, 2.78, false, 8),
  ('Evergreen Max Cash', 'MY', 345.6, 122.3, 23.3, 12.52, 14.83, 1.46, false, 9),
  ('CF Money (target)', 'SG', 130, null, null, null, 15, null, true, 10)
on conflict (company) do update set
  country = excluded.country, mkt_cap_m = excluded.mkt_cap_m, revenue_m = excluded.revenue_m,
  net_profit_m = excluded.net_profit_m, ev_ebitda = excluded.ev_ebitda, pe = excluded.pe,
  pb = excluded.pb, is_target = excluded.is_target, ord = excluded.ord;

insert into public.proceeds (category, percentage, description, ord) values
  ('Loan Book Origination', 50, 'Directly funds new loan originations across consumer and business lending, expanding disbursement capacity in Singapore and overseas markets.', 1),
  ('Technology & AI Advancement', 35, 'Scales our AI-powered credit engine, mobile platforms and centralised infrastructure to support hypergrowth without proportional headcount.', 2),
  ('Corporate Development', 15, 'Funds strategic expansion, M&A and partnerships supporting our regional roadmap into the Philippines, Malaysia and beyond.', 3)
on conflict (category) do update set
  percentage = excluded.percentage, description = excluded.description, ord = excluded.ord;

insert into public.sensitivity (fiscal_year, revenue_m, pbt_m, pbt_margin_pct, valuation_10x, valuation_15x) values
  (2024, 14, 7.5, 54, 75, 113),
  (2025, 17, 9, 53, 90, 135),
  (2026, 23, 12, 52, 120, 180),
  (2027, 30, 15, 50, 150, 225)
on conflict (fiscal_year) do update set
  revenue_m = excluded.revenue_m, pbt_m = excluded.pbt_m, pbt_margin_pct = excluded.pbt_margin_pct,
  valuation_10x = excluded.valuation_10x, valuation_15x = excluded.valuation_15x;

insert into public.roe_scenarios (scenario, label, roe_10x_pct, roe_15x_pct, with_div_10x_pct, with_div_15x_pct, ord) values
  ('A', 'Entry at S$75M valuation, 2-year horizon (end 2025 to end 2027)', 50, 100, 58, 108, 1),
  ('B', 'Entry at S$75M valuation, 3-year horizon using FY2027 exit financials conservatively', 33, 67, 41, 75, 2)
on conflict (scenario) do update set
  label = excluded.label, roe_10x_pct = excluded.roe_10x_pct, roe_15x_pct = excluded.roe_15x_pct,
  with_div_10x_pct = excluded.with_div_10x_pct, with_div_15x_pct = excluded.with_div_15x_pct, ord = excluded.ord;

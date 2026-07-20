# CF Money — Pre-IPO Mini-Site

A scroll-driven presentation site for CF Money's 2027 SGX Catalist listing, under Capital C Corporation branding. Built with Next.js (App Router), Tailwind CSS v4, GSAP + Lenis for scroll effects, Recharts for charts, and Supabase as the live data source.

## Pages

- `/` — the story: AI-native positioning, proactive lending, moat, traction, market, products, group structure, roadmap
- `/financials` — the deep dive: projections to FY2031, comparables, sensitivity analysis, uses of proceeds

## Run locally

```bash
npm install
npm run dev
```

The site works out of the box with built-in fallback data (mirroring the deck). Charts go live once Supabase is connected.

## Connect Supabase (live-editable charts)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase **SQL Editor**, paste and run the whole of [`supabase/seed.sql`](supabase/seed.sql). This creates all tables with public read-only access (RLS) and seeds every figure from the deck.
3. Copy your project URL and anon key from **Project Settings → API** into `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

4. Restart `npm run dev`.

From then on, edit any value in the Supabase **Table Editor** (it works like a spreadsheet) and the live site reflects it on the next page load — no redeploy needed.

### Tables

| Table | Drives |
| --- | --- |
| `stats` | All headline counters (TAM, loans disbursed, IPO market cap, …) |
| `disbursements` | Annual loan disbursement bar chart |
| `market_size` | Market opportunity curve |
| `projections` | FY2024–2031 revenue / PBT chart + table |
| `comparables` | Peer table + market-cap-vs-P/E scatter |
| `sensitivity` | Sensitivity table + valuation ranges |
| `roe_scenarios` | ROE scenario cards |
| `proceeds` | Uses-of-proceeds donut |
| `contact_requests` | Contact-form submissions (insert-only for visitors) |

## Deploy to Vercel

```bash
npx vercel
```

Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in the Vercel project settings (Production + Preview), then deploy. Because chart data is fetched client-side on each visit, DB edits appear on the live site without republishing.

## Notes

- The accredited-investor disclaimer splash shows once per browser (stored in `localStorage` under `cf-money-ai-ack`).
- Animations respect `prefers-reduced-motion`; mobile gets a reduced but complete experience.
- Typography: Manrope (variable, via Google Fonts) across display, body and labels.
- The contact section submits to Supabase (`contact_requests`); without Supabase configured it falls back to directing visitors to ipo@capc.com.sg.

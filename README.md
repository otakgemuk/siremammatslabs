# Sire Mammat's Lab

Deep-dive comparison research for prop firms, trading tools, charting platforms, brokers, and strategies.

**Live:** [siremammatslab.com](https://siremammatslab.com)  
**GitHub:** [otakgemuk/siremammats-lab](https://github.com/otakgemuk/siremammats-lab)

---

## Stack

- **Frontend:** Next.js 15 + React 19 (App Router, SSR)
- **CMS:** Sanity (hosted Studio at `studio.siremammatslab.com`)
- **Styling:** Tailwind CSS v4 + DM Sans/EB Garamond/DM Mono
- **Deployment:** Vercel (auto-deploy on commit)
- **Hosting:** Vercel + Sanity CDN

---

## Project Structure

```
siremammats-lab/
├── app/
│   ├── layout.tsx                 # Root layout, nav, footer
│   ├── page.tsx                   # Homepage (all comparisons)
│   ├── comparisons/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic comparison page
│   ├── lib/
│   │   └── sanity.ts             # Sanity client + GROQ queries
│   ├── globals.css               # Tailwind + component classes
├── sanity/
│   ├── schemas/
│   │   ├── propFirm.ts           # Prop firm documents
│   │   ├── plan.ts               # Individual trading plans
│   │   ├── comparison.ts         # Comparison articles
│   │   └── index.ts
│   └── sanity.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── vercel.json
├── .env.example
└── README.md
```

---

## Key Schemas

### `propFirm`
Represents a prop trading firm.

**Fields:**
- `name` (string) — Firm name
- `ticker` (string) — e.g., "TPT", "FFN"
- `logo` (image)
- `website` (url)
- `affiliateCode` (string) — e.g., "MOT"
- `description` (text)
- `plans` (reference array) — References to Plan documents

### `plan`
Individual trading plan offered by a firm (e.g., "Test 50K", "Steady 50K").

**Fields:**
- `name`, `firm` (required)
- `accountSize`, `basePrice`, `promoPriceAndCode`
- `activationFee`, `profitTarget`, `maxDrawdown`
- `drawdownType` (enum: EOD-trailing, intraday-trailing, static)
- `dailyLossLimit`, `consistencyEval`, `consistencyFunded`
- `minTradingDays`, `maxContracts`
- `payoutBuffer`, `payoutSpeed`
- `fundedSplit`, `resetCost`
- `pathToLive` (text)
- `keyHighlights` (array of strings)

### `comparison`
Comparison articles (e.g., "50K Showdown: TPT vs FFN vs TradeDay").

**Fields:**
- `title`, `slug` (required)
- `category` (enum: prop-firms, charting-tools, brokers, scanners, strategies)
- `excerpt`, `publishedAt`
- `hero` (image), `eyebrow` (string)
- `plansCompared` (reference array)
- `heroStats` (array: label + value pairs)
- `content` (array of flexible sections: text, table, cards, fit-guide, verdict)
- `verdict` (object: heading, paragraphs array, ranking array)
- `disclaimers`, `seoKeywords`

---

## Setup & Deployment

### 1. **Clone & Install**
```bash
git clone https://github.com/otakgemuk/siremammats-lab.git
cd siremammats-lab
npm install
```

### 2. **Sanity Project**
Create a new Sanity project or use existing:
```bash
npm run sanity:dev
```

Get your `projectId` and `dataset` from Sanity dashboard.

### 3. **Environment Variables**
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token  # For ISR
```

### 4. **Local Dev**
```bash
npm run dev
# Next.js at http://localhost:3000
# Sanity Studio at http://localhost:3000/studio
```

### 5. **Deploy to Vercel**
```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add SANITY_API_TOKEN
vercel deploy
```

Or push to GitHub and connect to Vercel for auto-deploy.

---

## Seeding the 50K Showdown

### 1. Create Firms (PropFirm documents)
In Sanity Studio, create:
- **Take Profit Trader** (ticker: TPT)
- **Funded Futures Network** (ticker: FFN)
- **TradeDay** (ticker: TRADEDAY)

### 2. Create Plans (Plan documents)
For each firm, create plan documents:
- TPT: "Test 50K"
- FFN: "Steady 50K"
- TradeDay: "Quick Pay 50K"

Fill in all fields (pricing, targets, drawdowns, consistency, etc.).

### 3. Create Comparison (Comparison document)
- **Title:** "The 50K Showdown — TPT vs FFN vs TradeDay"
- **Category:** prop-firms
- **Plans Compared:** Reference all 3 plans above
- **Content:** Build sections (hero, cards, table, verdict, etc.)
- **Verdict:** Ranking and final analysis

### 4. Publish
Click "Publish" in Sanity Studio. ISR will regenerate the page on Vercel within 60 seconds.

---

## GROQ Queries

Key queries live in `app/lib/sanity.ts`:

- `COMPARISONS_QUERY` — All comparisons (homepage feed)
- `COMPARISON_BY_SLUG` — Single comparison with full plan data
- `PLANS_BY_ACCOUNT_SIZE` — Filter plans by account size
- `FIRMS_QUERY` — All firms

Add more as needed.

---

## Styling

**Colors:**
- Dark: `#0D0D0D`
- Navy: `#1A2540`
- Gold: `#C9920A`
- Light: `#FAF9F5`
- Midgray: `#B0AEA5`

**Fonts:**
- Display: Bebas Neue
- Body: DM Sans
- Mono: DM Mono

All available via `tailwind.config.ts` color and font classes.

---

## Content Strategy

**Current:** Prop firm comparisons (50K, 100K, etc.)  
**Planned:** Charting tools, brokers, scanners, strategy deep-dives

Each comparison is a **standalone document** with:
- Side-by-side plan specs (cards)
- Comparison matrix (table)
- Verdict with ranked picks
- Affiliate codes & disclaimers

---

## Analytics & SEO

- **Meta tags:** Auto-generated from Comparison excerpt
- **OG images:** Hero image from comparison
- **Sitemap:** Auto-generated by Next.js
- **Keywords:** Stored in `seoKeywords` field

Use [siremammatslab.com/sitemap.xml](https://siremammatslab.com/sitemap.xml) for search engines.

---

## Support

Questions? Issues?
- Check existing GitHub issues
- Open a new issue with details
- Contact via [siremammat.com](https://siremammat.com)

---

**© 2026 Sire Mammat. All rights reserved.**

*Futures trading involves substantial risk. Always confirm plan details directly with firms before purchasing. This Lab is educational research, not financial advice.*

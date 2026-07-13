# Sire Mammat's Lab — Quick Start (5 min)

## What You Have

A **full-stack Next.js + Sanity comparison research platform** with:
- ✅ Next.js 15 (App Router, SSR, ISR)
- ✅ Sanity CMS with 3 schemas (PropFirm, Plan, Comparison)
- ✅ Tailwind v4 + brand colors & fonts
- ✅ Homepage + dynamic comparison pages
- ✅ All code ready to ship

---

## Instant Steps

### 1. Claim Sanity Project
```bash
# Go to https://sanity.io/manage
# Create new project → get your PROJECT_ID & API token
```

### 2. Create `.env.local`
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
```

### 3. Run Locally
```bash
npm install
npm run dev
# http://localhost:3000 → Homepage
# http://localhost:3000/studio → Sanity Studio
```

### 4. Add Your First Comparison
In Sanity Studio:
1. Create 3 Prop Firms (TPT, FFN, TradeDay)
2. Create 3 Plans (Test 50K, Steady 50K, Quick Pay 50K)
3. Create 1 Comparison (reference all 3 plans)
4. Publish

### 5. Deploy to Vercel
```bash
vercel link
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add NEXT_PUBLIC_SANITY_DATASET
vercel env add SANITY_API_TOKEN
vercel deploy --prod
```

---

## File Guide

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, nav, footer |
| `app/page.tsx` | Homepage (comparison grid) |
| `app/comparisons/[slug]/page.tsx` | Dynamic comparison pages |
| `app/lib/sanity.ts` | Sanity client + GROQ queries |
| `sanity/schemas/*.ts` | Content schemas |
| `tailwind.config.ts` | Colors, fonts, spacing |
| `README.md` | Full documentation |
| `SETUP.md` | Detailed deployment guide |

---

## Schema Quick Reference

### PropFirm
```
name: string (required)
ticker: string (e.g., "TPT")
logo: image
website: url
affiliateCode: string (e.g., "MOT")
description: text
plans: references to Plan[]
```

### Plan
```
name: string (required)
firm: reference to PropFirm (required)
accountSize: number (e.g., 50000)
basePrice: number
promoPriceAndCode: { promoPrice, code, description }
profitTarget: number
maxDrawdown: number
drawdownType: enum (EOD-trailing | intraday-trailing | static)
consistencyEval: { percentage, maxDailyProfit }
minTradingDays: number
maxContracts: { minis, micros }
payoutBuffer: number
payoutSpeed: string
fundedSplit: { trader%, firm%, note }
resetCost: number
keyHighlights: string[]
... (+ 5 more fields)
```

### Comparison
```
title: string (required)
slug: slug (auto from title)
category: enum (prop-firms | charting-tools | brokers...)
excerpt: text (meta description)
publishedAt: datetime
eyebrow: string (e.g., "Sire Mammat · July 2026")
plansCompared: references to Plan[] (required, min 2)
heroStats: { label, value }[]
content: flexible sections (text, cards, table, verdict)
verdict: { heading, paragraphs[], ranking[] }
disclaimers: text
seoKeywords: string[]
```

---

## Style Tokens

**Colors:**
- `dark` `navy` `gold` `light` `midgray` `lightgray` `red` `green`

**Fonts:**
- Display: `font-display` (Bebas Neue)
- Body: `font-sans` (DM Sans)
- Mono: `font-mono` (DM Mono)

**Component Classes:**
- `.card` — Navy box with gold border
- `.section` — Max-width container with padding
- `.btn-primary`, `.btn-secondary` — Buttons
- `.table-wrapper` — Responsive table
- `.stat-value`, `.stat-label` — Hero stats

---

## Common Tasks

### Add a New Comparison
1. Sanity Studio → **Comparisons** → **New**
2. Fill: title, category, plans, excerpt
3. Build content sections
4. Add verdict
5. Publish → auto-deploy on Vercel

### Add a New Firm
1. Sanity Studio → **Prop Firms** → **New**
2. Fill: name, ticker, logo, website, affiliate code
3. Publish

### Add a New Plan
1. Sanity Studio → **Trading Plans** → **New**
2. Link to Firm
3. Fill all fields (pricing, targets, rules, etc.)
4. Publish

### Query Plans Programmatically
Edit `app/lib/sanity.ts` to add GROQ queries. Examples:
```typescript
// Filter by account size
export const PLANS_50K = `*[_type == "plan" && accountSize == 50000]`

// Filter by category
export const PROPS_ONLY = `*[_type == "comparison" && category == "prop-firms"]`

// Sort by price
export const CHEAPEST_PLANS = `*[_type == "plan"] | order(basePrice asc)`
```

---

## Deployment Checklist

- [ ] Sanity project created
- [ ] `.env.local` configured with PROJECT_ID & token
- [ ] `npm install` & `npm run dev` works locally
- [ ] Sanity Studio loads at `/studio`
- [ ] At least 1 Comparison published
- [ ] GitHub repo created & pushed
- [ ] Vercel project linked
- [ ] Env vars added to Vercel
- [ ] `vercel deploy --prod` successful
- [ ] Homepage shows comparison cards
- [ ] Comparison page renders correctly
- [ ] Custom domain added (optional)

---

## Next: Add More Comparisons

**Charting Tools:**
- ATAS vs Quantower vs TC2000

**Brokers:**
- AMP vs TradeStation vs Rithmic

**Scanners:**
- Trade Ideas vs Finviz vs Stockstotrade

**Strategies:**
- H1/H2 breakouts (Al Brooks) vs Range Trading vs Momentum

---

**Ready to launch? Follow `SETUP.md` for step-by-step guide.**

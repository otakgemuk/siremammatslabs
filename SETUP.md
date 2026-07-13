# Sire Mammat's Lab — Complete Setup Guide

Follow these steps to get the Lab live on your domain with Sanity CMS integrated.

---

## Phase 1: GitHub & Local Setup (5 min)

### 1.1 Create GitHub Repository
```bash
# Initialize GitHub repo
git init
git add .
git commit -m "Initial commit: Sire Mammat's Lab scaffold"
git branch -M main
git remote add origin https://github.com/otakgemuk/siremammats-lab.git
git push -u origin main
```

### 1.2 Install Dependencies Locally
```bash
npm install
# Also install Sanity CLI globally (optional but recommended)
npm install -g @sanity/cli
```

---

## Phase 2: Sanity Setup (10 min)

### 2.1 Create Sanity Project
```bash
# Option A: Use existing Sanity project
# Visit https://sanity.io/manage and create new project
# OR run:
sanity new siremammats-lab-cms

# Choose:
# - Use TypeScript: YES
# - Project name: siremammats-lab-cms
# - Dataset: production
# - Plugins: Keep defaults
```

### 2.2 Get Project Credentials
From Sanity dashboard (`https://sanity.io/manage`):
1. Find your project
2. Click **Settings** → **API**
3. Copy:
   - **Project ID** (e.g., `abc123xyz`)
   - **Dataset** (default: `production`)
   - Create an **API Token** (Editor role) → copy this too

### 2.3 Configure Local .env.local
```bash
# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
EOF
```

### 2.4 Test Local Setup
```bash
npm run dev
# Visit http://localhost:3000
# Visit http://localhost:3000/studio (Sanity Studio)
```

---

## Phase 3: Vercel Deployment (10 min)

### 3.1 Connect to Vercel
```bash
npm install -g vercel
vercel login
vercel link
```

### 3.2 Add Environment Variables to Vercel
```bash
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Paste: your_project_id_here

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Paste: production

vercel env add SANITY_API_TOKEN
# Paste: your_api_token_here
```

### 3.3 Deploy to Vercel
```bash
vercel deploy --prod
```

Your site is now live at `siremammatslab.vercel.app` (or your custom domain).

### 3.4 (Optional) Add Custom Domain
In Vercel dashboard:
1. Project → **Settings** → **Domains**
2. Add `siremammatslab.com`
3. Update DNS at your registrar with Vercel's nameservers

---

## Phase 4: Seed Initial Content (20 min)

### 4.1 Access Sanity Studio
Visit `https://siremammatslab.vercel.app/studio`

### 4.2 Create Prop Firms
In Studio, go to **Prop Firms** tab:

**Firm 1: Take Profit Trader**
- Name: `Take Profit Trader`
- Ticker: `TPT`
- Website: `https://takeprofttrader.com`
- Affiliate Code: `MOT`
- Description: `Short description`

**Firm 2: Funded Futures Network**
- Name: `Funded Futures Network`
- Ticker: `FFN`
- Website: `https://ffn.com`
- Affiliate Code: `MOT`

**Firm 3: TradeDay**
- Name: `TradeDay`
- Ticker: `TRADEDAY`
- Website: `https://tradeday.io`
- Affiliate Code: `DGT`

**Publish** each.

### 4.3 Create Trading Plans
Go to **Trading Plans** tab. Create 3 plans:

**Plan 1: Test 50K (TPT)**
- Name: `Test 50K`
- Firm: `Take Profit Trader` (link)
- Account Size: `50000`
- Pricing Model: `monthly`
- Base Price: `170`
- Promo Price & Code:
  - Promo Price: `102`
  - Code: `NOFEE40`
  - Description: `Lifetime, waives activation`
- Activation Fee: `130`
- Profit Target: `3000`
- Max Drawdown: `2000`
- Drawdown Type: `EOD-trailing`
- Daily Loss Limit: `None`
- Consistency (Eval): `50%` max `$1500/day`
- Consistency (Funded): Not required
- Min Trading Days: `5`
- Max Contracts: `6 minis, 60 micros`
- Payout Buffer: `52000`
- Payout Speed: `~1 hour, uncapped`
- Funded Split: `90/10 live`
- Reset Cost: `649`
- Path to Live: `PRO+ live execution`
- Key Highlights:
  - `Biggest size (6 minis / 60 micros)`
  - `Uncapped ~1-hour payouts`
  - `NOFEE40 waives $130 activation`

**Plan 2: Steady 50K (FFN)**
- Name: `Steady 50K`
- Firm: `Funded Futures Network`
- Account Size: `50000`
- Pricing Model: `one-time`
- Base Price: `229`
- Promo Price & Code:
  - Promo Price: `115`
  - Code: `50% + BOGO`
  - Description: `Instant BOGO = 2 accounts`
- Activation Fee: `0`
- Profit Target: `3000`
- Max Drawdown: `2000`
- Drawdown Type: `EOD-trailing`
- Daily Loss Limit: `None`
- Consistency (Eval): `52%` max `$1560/day`
- Consistency (Funded): Not required
- Min Trading Days: `2`
- Max Contracts: `4 minis`
- Payout Buffer: `52000`
- Payout Speed: `Same-day`
- Funded Split: `90/10 live after $5k paid`
- Reset Cost: `180`
- Path to Live: `Live Funded Pro after $5k`
- Key Highlights:
  - `Cheapest: $57.50/account w/ BOGO`
  - `Fastest pass: 2-day minimum`
  - `One-time fee, no subscriptions`
  - `Cleanest funded rules (static DD)`

**Plan 3: Quick Pay 50K (TradeDay)**
- Name: `Quick Pay 50K`
- Firm: `TradeDay`
- Account Size: `50000`
- Pricing Model: `variable`
- Base Price: `150` (avg between $125 IDD / $175 EOD)
- Promo Price & Code:
  - Promo Price: `75`
  - Code: `DGT 50%`
- Activation Fee: `0`
- Profit Target: `3000`
- Max Drawdown: `2000`
- Drawdown Type: `intraday-trailing` (pick one)
- Daily Loss Limit: `None`
- Consistency (Eval): `30%` max `$900/day`
- Consistency (Funded): Not required
- Min Trading Days: `5`
- Max Contracts: `5 minis, 50 micros`
- Payout Buffer: `0` (NO buffer, day-one payouts)
- Payout Speed: `Next business day`
- Funded Split: `50/50 under $4k → 80/20 → 90/10`
- Reset Cost: `60`
- Path to Live: `Funded Live 90/10`
- Key Highlights:
  - `NO payout buffer — withdraw from day 1`
  - `$250 minimum withdrawal`
  - `50/50 split under $4k (toll to tier up)`
  - `Fastest cash out in the field`

**Publish** each plan.

### 4.4 Create Comparison Article
Go to **Comparisons** tab. Create:

**Title:** `The 50K Showdown — TPT vs FFN vs TradeDay`
- Slug: `50k-showdown` (auto)
- Category: `prop-firms`
- Published Date: Today
- Excerpt: `Same account size. Three different rulebooks. We line up each firm's 50K flagship — targets, drawdowns, consistency math, buffers, and payout mechanics.`
- Eyebrow: `Sire Mammat · Futures Prop Firm Intel · July 2026`
- Hero Stats:
  - Label: `Account Size`, Value: `$50K`
  - Label: `Drawdown (All 3)`, Value: `$2,000`
  - Label: `Daily Loss Limits`, Value: `ZERO`
  - Label: `Top Live Split (All 3)`, Value: `90/10`
- Plans Compared: Select all 3 (TPT, FFN, TradeDay)
- Content Sections: (build from your HTML template — cards, table, fit-guide, verdict)
- Disclaimers: Add risk warning
- SEO Keywords: `prop firms, 50k account, futures trading, trading evaluation`

**Publish.**

---

## Phase 5: Connect GitHub to Vercel Auto-Deploy (5 min)

### 5.1 Link Git
1. In Vercel dashboard, go to project
2. **Settings** → **Git**
3. Connect GitHub repo

### 5.2 Enable Auto-Deploy
- Production branch: `main`
- Any push to `main` = auto-deploy to production

---

## Phase 6: Test & Verify (5 min)

### 6.1 Test Homepage
Visit `https://siremammatslab.vercel.app`  
You should see:
- Sticky nav with "SIRE MAMMAT'S LAB"
- Hero section
- Grid showing the 50K Showdown comparison

### 6.2 Test Comparison Page
Click the comparison card.  
You should see:
- Full hero with stats
- Plan cards
- Comparison table (if built)
- Verdict section
- Disclaimers

### 6.3 Test Sanity Studio
Visit `https://siremammatslab.vercel.app/studio`  
You should see:
- Sanity Studio interface
- **Comparisons**, **Prop Firms**, **Trading Plans** tabs
- Your published content

### 6.4 Check ISR / Cache Invalidation
Edit a firm name in Sanity Studio and publish.  
The page should regenerate within 60 seconds.

---

## Phase 7: Content & Scale (Ongoing)

### Add New Comparisons
1. Create new Firms & Plans in Sanity
2. Create new Comparison document
3. Reference plans
4. Publish
5. Auto-deploy on Vercel

### Categories to Add
- Charting Tools (ATAS, Quantower, etc.)
- Brokers (AMP, TradeStation, etc.)
- Scanners & Tools
- Strategy Deep-Dives

---

## Troubleshooting

### Studio not loading at `/studio`
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set in `.env.local`
- Run `npm run dev` and check logs for errors

### Comparison page shows 404
- Ensure `slug.current` is published in Sanity
- Check GROQ query in `app/lib/sanity.ts`

### ISR not regenerating
- Verify `SANITY_API_TOKEN` is set
- Check Vercel build logs

### Images not loading
- Verify Sanity project allows CDN in **Settings** → **API**
- Check image URL format with `urlFor()` helper

---

## Next Steps

1. ✅ Deploy lab to production
2. ✅ Add 50K comparison content
3. 🔄 Build charting tools comparison
4. 🔄 Add broker & scanner comparisons
5. 📊 Set up analytics (Google Analytics, Vercel Analytics)
6. 🚀 Promote on X, Discord, newsletter

---

**Questions?** Check the README.md for schema details or reach out.

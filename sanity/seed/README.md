# Sanity Seed — The 50K Showdown

7 documents: 3 propFirm, 3 plan, 1 comparison (`50k-showdown`).

## Import (run locally — Sanity API is unreachable from the Claude sandbox)

```bash
cd sanity
npx sanity dataset import seed/50k-showdown.ndjson production
```

Logged-in Sanity CLI session required (`npx sanity login`), or set `SANITY_AUTH_TOKEN`.
Project: 6hyvhmum · Dataset: production. Re-running is safe: stable `_id`s mean
documents are updated in place (add `--replace` to force overwrite).

After import, the Vercel site picks the content up on the next build/ISR pass —
trigger a redeploy if the homepage still shows the empty state.

## ⚠ VERIFY-before-publish checklist

Every unknown is flagged `VERIFY` in the documents rather than guessed:

- **TradeDay Quick Pay 50K**: current price/promo, min trading days, contract
  limits, funded split, eval consistency, exact payout timing
- **TPT Test 50K**: minimum trading days
- **FFN Steady 50K**: funded profit split, activation fee
- Confirm FFN's 50%-off + BOGO promo is still live before publishing the
  effective-cost claims

Convention: `payoutBuffer` = dollars **above starting balance** required before
withdrawal (FFN: 2000 → account at $52,000; TradeDay: 0 = no buffer).

Verified specs sourced from the July 2026 three-way comparison project
(all three plans: $3,000 target / $2,000 drawdown / no DLL / no funded consistency).

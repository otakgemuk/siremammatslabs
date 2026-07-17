# Missing-data report

Generated: 2026-07-17

The v1.0 dataset contains 39 firms. Missing values are intentional where the current official public source was unavailable, dynamic, contradictory, or required an authenticated dashboard. No missing value should be interpreted as permission or a zero rule.

Total flagged gaps: 439

## Highest-volume gaps

- Firms.trustpilot_rating: 39 firms
- Firms.discord_or_community: 39 firms
- Firms.founded_year: 38 firms
- Firms.maximum_allocation: 36 firms
- Firms.supported_data_feeds: 32 firms
- Evaluation Accounts.pricing_usd: 32 firms
- Firms.supported_platforms: 30 firms
- Firms.country: 28 firms
- Evaluation Accounts.minimum_trading_days: 27 firms
- Evaluation Accounts.max_contracts: 27 firms
- Evaluation Accounts.profit_target_usd: 26 firms
- Evaluation Accounts.account_size_usd: 23 firms
- Evaluation Accounts.consistency_rule: 22 firms
- Evaluation Accounts.drawdown_model: 19 firms
- Funded Accounts.program_record: 18 firms
- Funded Accounts.profit_split_trader_pct: 3 firms

## Publication blockers

- Trustpilot ratings, review counts, and rating URLs were not captured; these are third-party and date-sensitive.
- Discount code MOT is marked unverified because it came from internal MightyOx workspace context, not an official checkout confirmation.
- The5ers Futures max-loss percentage is an official-source conflict: 4% on the current product page versus 3% in another official article.
- Earn2Trade GAU50 minimum trading days is an official-source conflict: product page says no minimum while a purchase page showed 10 days.
- Numerous firms expose current numbers only after program selection or login; those rows are marked partial rather than guessed.

## Next research pass

1. Capture each firm's current plan matrix, terms, and payout policy with screenshots/PDF snapshots where pages are dynamic.
2. Reconcile all official conflicts against the account agreement and checkout timestamp.
3. Add current Trustpilot rating/review count with separate third-party source rows.
4. Expand restrictions for news, overnight, weekend, hedging, copy-trading, trade copiers, algorithms, micros, commissions, and payout methods per program.

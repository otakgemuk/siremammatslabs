# Validation report

Generated: 2026-07-17

## Structural checks

- Expected firms: 39; captured: 39; status: PASS
- Requested sheets: 15; generated: 15; status: PASS
- Duplicate normalized firm names: 0; status: PASS
- Source-linked rows: 328/426; status: REVIEW because Firms/Change Log/Sources use different source fields
- Rule/data rows with dedicated source_url: 285/285; status: PASS
- Last verified date populated on core rows: PASS

## Row counts

- Firms: 39
- Evaluation Accounts: 103
- Funded Accounts: 56
- Drawdown Rules: 11
- Payout Rules: 11
- Scaling Rules: 9
- Consistency Rules: 12
- Fees: 11
- Platforms: 9
- Restrictions: 25
- Discount Codes: 3
- Contract Limits: 10
- Account Sizes: 25
- Change Log: 4
- Sources: 98

## Data-status counts

- verified: 245
- partial: 65
- unverified: 6
- conflict: 5

## Rule-quality checks

- Rule/data rows with blank source_url: 0; status: PASS
- Official conflicts intentionally preserved: 5; status: REVIEW
- Formula-error scan: workbook has no formulas by design; artifact-tool scan saved to formula_error_scan.ndjson.
- Visual render pass: all 15 sheets rendered to previews/; inspect representative previews before publication.

## QA notes

- `verified` means the row is supported by the captured official source, not that the firm will keep the rule unchanged.
- `partial` means some fields are official but the current program matrix is incomplete.
- `unverified` means only an official homepage or insufficient public source was captured.
- `conflict` means official sources disagree or use materially different program definitions.
- Consumer-facing comparisons should filter by program_name and last_verified, never use a firm-level default when program rows exist.

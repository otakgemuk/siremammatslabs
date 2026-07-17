-- MightyOx Prop Firm Intelligence Database v1.0

-- SQL-ready PostgreSQL-compatible DDL; values are loaded from the synchronized CSV exports.

CREATE SCHEMA IF NOT EXISTS mightyox_pid;

SET search_path TO mightyox_pid;

CREATE TABLE firms (
  firm_id TEXT,
  firm_name TEXT,
  official_website TEXT,
  country TEXT,
  founded_year NUMERIC,
  trustpilot_rating NUMERIC,
  discord_or_community TEXT,
  supported_platforms TEXT,
  supported_data_feeds TEXT,
  maximum_allocation TEXT,
  official_futures_available BOOLEAN,
  last_verified TEXT,
  data_status TEXT,
  source_ids TEXT,
  notes TEXT
);

CREATE TABLE evaluation_accounts (
  evaluation_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  account_size_usd NUMERIC,
  pricing_usd NUMERIC,
  pricing_model TEXT,
  profit_target_usd NUMERIC,
  drawdown_model TEXT,
  max_drawdown_usd NUMERIC,
  daily_loss_limit_usd NUMERIC,
  end_of_day_drawdown_usd NUMERIC,
  static_drawdown_usd NUMERIC,
  max_contracts NUMERIC,
  max_micros NUMERIC,
  minimum_trading_days NUMERIC,
  consistency_rule TEXT,
  activation_fee_usd NUMERIC,
  reset_fee_usd NUMERIC,
  monthly_fee_usd NUMERIC,
  time_limit TEXT,
  platforms TEXT,
  data_feeds TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE funded_accounts (
  funded_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  account_size_usd NUMERIC,
  funded_account_type TEXT,
  starting_balance_model TEXT,
  drawdown_model TEXT,
  max_drawdown_usd NUMERIC,
  daily_loss_limit_usd NUMERIC,
  max_contracts NUMERIC,
  max_micros NUMERIC,
  profit_split_trader_pct NUMERIC,
  first_payout_requirements TEXT,
  payout_frequency TEXT,
  withdrawal_cap_usd NUMERIC,
  activation_fee_usd NUMERIC,
  maximum_allocation TEXT,
  live_transition TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE drawdown_rules (
  drawdown_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  stage TEXT,
  program_name TEXT,
  drawdown_model TEXT,
  basis TEXT,
  amount_or_pct TEXT,
  update_timing TEXT,
  locks_at_initial_balance BOOLEAN,
  breach_condition TEXT,
  official_rule_summary TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE payout_rules (
  payout_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  stage TEXT,
  first_payout_requirements TEXT,
  minimum_trading_days NUMERIC,
  winning_day_definition TEXT,
  min_payout_usd TEXT,
  payout_frequency TEXT,
  payout_cap TEXT,
  profit_split TEXT,
  payout_methods TEXT,
  processing_time TEXT,
  payout_buffer TEXT,
  max_payouts_per_account NUMERIC,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE scaling_rules (
  scaling_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  stage TEXT,
  trigger TEXT,
  scaling_method TEXT,
  max_allocation TEXT,
  details TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE consistency_rules (
  consistency_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  stage TEXT,
  rule_type TEXT,
  threshold TEXT,
  applies_to TEXT,
  calculation TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE fees (
  fee_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  fee_type TEXT,
  amount_usd TEXT,
  currency TEXT,
  billing_frequency TEXT,
  stage TEXT,
  official_rule TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE platforms (
  platform_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  platform TEXT,
  data_feed TEXT,
  account_stages TEXT,
  supported TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE restrictions (
  restriction_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  stage TEXT,
  restriction_type TEXT,
  policy TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE discount_codes (
  discount_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  code TEXT,
  discount_value TEXT,
  status TEXT,
  source_type TEXT,
  source_ids TEXT,
  source_url TEXT,
  last_verified TEXT,
  expiry TEXT,
  notes TEXT
);

CREATE TABLE contract_limits (
  contract_limit_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  account_size_usd TEXT,
  mini_contracts TEXT,
  micro_contracts TEXT,
  product_scope TEXT,
  scaling_rule TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE account_sizes (
  account_size_id TEXT,
  firm_id TEXT,
  firm_name TEXT,
  program_name TEXT,
  stage TEXT,
  account_size_usd NUMERIC,
  profit_target_usd NUMERIC,
  max_drawdown_usd NUMERIC,
  max_contracts NUMERIC,
  current_status TEXT,
  last_verified TEXT,
  source_ids TEXT,
  source_url TEXT,
  data_status TEXT,
  notes TEXT
);

CREATE TABLE change_log (
  change_id TEXT,
  change_date TEXT,
  version TEXT,
  firm_id TEXT,
  change_type TEXT,
  field_or_area TEXT,
  previous_value TEXT,
  new_value TEXT,
  source_ids TEXT,
  source_url TEXT,
  change_summary TEXT,
  reviewer TEXT,
  notes TEXT
);

CREATE TABLE sources (
  source_id TEXT,
  firm_id TEXT,
  title TEXT,
  url TEXT,
  source_type TEXT,
  last_checked TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_firms_name ON firms(firm_name);

CREATE INDEX IF NOT EXISTS idx_evaluation_accounts_firm_id ON evaluation_accounts(firm_id);

CREATE INDEX IF NOT EXISTS idx_funded_accounts_firm_id ON funded_accounts(firm_id);

CREATE INDEX IF NOT EXISTS idx_sources_firm_id ON sources(firm_id);

# Prop Firm Intelligence Database v1.0

This directory is the versioned, source-audited PID snapshot used to seed the
Sire Mammat Lab's prop-firm research model.

- `dataset.json` is the canonical snapshot: 39 firms across 15 normalized
  sheets, with source IDs, official URLs, verification dates, and explicit
  `data_status` values.
- `schema.sql` is a PostgreSQL-compatible relational shape for loading the
  same sheets into a database.
- `data-dictionary.json` documents the normalized fields.
- `validation-report.md` and `missing-data-report.md` record quality checks and
  intentional gaps.

The snapshot is deliberately separate from the hand-authored comparison
seeds. It can be reviewed, loaded into a database, or converted into Sanity
documents without overwriting editorial comparison content.

## Generate Sanity documents

From the repository root:

```bash
node scripts/import-pid.mjs
```

The default command writes a generated NDJSON file under
`data/pid/v1.0/generated/`, which is ignored by Git. It includes all firms and
numeric evaluation-account rows whose status is `verified`, `partial`, or
`conflict`. Unverified evaluation rows require an explicit opt-in:

```bash
node scripts/import-pid.mjs --include-unverified
```

The generated documents use stable `propFirm-<firm_id>` IDs and
`pid-plan-<evaluation_id>` IDs. They carry PID provenance fields so a later
refresh can be re-run safely with `createOrReplace` without changing the
existing editorial seeds.

To write the generated documents to Sanity, provide the existing project token
and opt in explicitly:

```bash
SANITY_AUTH_TOKEN=... node scripts/import-pid.mjs --commit
```

The importer never deletes documents and does not modify comparison documents.
Review the generated NDJSON and the validation report before publishing
consumer-facing prices or rules.

## Generated-ID migration

The initial import used stable legacy IDs so the first load could be repeated.
To move those records to Sanity-generated IDs, first regenerate the NDJSON and
run the migration in dry-run mode:

```bash
npm run pid:generate
SANITY_AUTH_TOKEN=... npm run pid:migrate-ids
```

Review `data/pid/v1.0/generated/id-migration-report.json`. The script stops if
it finds duplicate `pidId` values or references from documents outside the PID
set. Only run the destructive cutover after the dry run is clean:

```bash
SANITY_AUTH_TOKEN=... npm run pid:migrate-ids -- --commit --delete-legacy
```

The migration creates firms before plans, rewrites PID-owned references, keeps
`pidId` as the source identity, verifies the post-migration counts, and removes
only the legacy PID IDs.

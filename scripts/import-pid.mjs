import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const args = new Set(process.argv.slice(2))
const valueFor = (name) => {
  const index = process.argv.indexOf(name)
  return index === -1 ? null : process.argv[index + 1] ?? null
}

const datasetPath = resolve(valueFor('--dataset') || 'data/pid/v1.0/dataset.json')
const outputPath = resolve(valueFor('--output') || 'data/pid/v1.0/generated/pid-sanity.ndjson')
const includeUnverified = args.has('--include-unverified')
const shouldCommit = args.has('--commit')
const allowedStatuses = new Set(['verified', 'partial', 'conflict'])

const source = JSON.parse(readFileSync(datasetPath, 'utf8'))
const sheets = source.sheets || {}
const firms = sheets.Firms || []
const evaluations = sheets['Evaluation Accounts'] || []

const compact = (value) => {
  if (Array.isArray(value)) return value.map(compact).filter((item) => item !== undefined)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key, compact(item)])
      .filter(([, item]) => item !== undefined && item !== null && item !== ''),
  )
}

const numberOrUndefined = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value.trim())) return Number(value)
  return undefined
}

const urlOrUndefined = (value) => {
  if (!value || typeof value !== 'string') return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

const slugFor = (value) => String(value || '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const accountLabel = (value) => {
  const number = numberOrUndefined(value)
  return number ? `$${number / 1000}K` : String(value || 'size unspecified')
}

const drawdownTypeFor = (value) => {
  const text = String(value || '').toLowerCase()
  if (text.includes('intraday')) return 'intraday-trailing'
  if (text.includes('eod') || text.includes('end-of-day')) return 'EOD-trailing'
  if (text.includes('static')) return 'static'
  if (text.includes('daily')) return 'daily-loss-limit'
  return undefined
}

const pricingModelFor = (value) => {
  const text = String(value || '').toLowerCase()
  if (text.includes('monthly') || text.includes('subscription')) return 'monthly'
  if (text.includes('one-time') || text.includes('one time')) return 'one-time'
  return value ? 'variable' : undefined
}

const consistencyFor = (value) => {
  const match = String(value || '').match(/(\d+(?:\.\d+)?)\s*%/)
  return match ? { percentage: Number(match[1]) } : undefined
}

const provenanceFor = (row, idField) => compact({
  pidId: row[idField],
  lastVerified: row.last_verified,
  dataStatus: row.data_status,
  sourceIds: row.source_ids,
  sourceUrl: urlOrUndefined(row.source_url),
})

const notesFor = (row, idField) => [
  `PID record: ${row[idField]}`,
  `Data status: ${row.data_status || 'unknown'}`,
  row.notes,
].filter(Boolean).join(' · ')

const firmDocuments = firms.map((row) => compact({
  _id: `propFirm-${row.firm_id}`,
  _type: 'propFirm',
  name: row.firm_name,
  slug: { _type: 'slug', current: slugFor(row.firm_id) },
  website: urlOrUndefined(row.official_website),
  description: row.notes || undefined,
  country: row.country,
  supportedPlatforms: row.supported_platforms,
  supportedDataFeeds: row.supported_data_feeds,
  maximumAllocation: row.maximum_allocation,
  ...provenanceFor(row, 'firm_id'),
}))

const planDocuments = evaluations
  .filter((row) => Number.isFinite(numberOrUndefined(row.account_size_usd)))
  .filter((row) => includeUnverified || allowedStatuses.has(row.data_status))
  .map((row) => {
    const accountSize = numberOrUndefined(row.account_size_usd)
    const maxContracts = compact({
      minis: numberOrUndefined(row.max_contracts),
      micros: numberOrUndefined(row.max_micros),
    })
    const fundedTraderShare = numberOrUndefined(row.profit_split_trader_pct)

    return compact({
      _id: `pid-plan-${row.evaluation_id}`,
      _type: 'plan',
      name: `${row.program_name} · ${accountLabel(accountSize)}`,
      firm: { _type: 'reference', _ref: `propFirm-${row.firm_id}` },
      accountSize,
      programName: row.program_name,
      pricingModel: pricingModelFor(row.pricing_model),
      basePrice: numberOrUndefined(row.pricing_usd),
      activationFee: numberOrUndefined(row.activation_fee_usd),
      profitTarget: numberOrUndefined(row.profit_target_usd),
      maxDrawdown: numberOrUndefined(row.max_drawdown_usd),
      drawdownType: drawdownTypeFor(row.drawdown_model),
      dailyLossLimit: row.daily_loss_limit_usd === 0
        ? '$0'
        : row.daily_loss_limit_usd,
      consistencyEval: consistencyFor(row.consistency_rule),
      minTradingDays: numberOrUndefined(row.minimum_trading_days),
      maxContracts: Object.keys(maxContracts).length ? maxContracts : undefined,
      fundedSplit: fundedTraderShare === undefined
        ? undefined
        : { trader: fundedTraderShare, firm: 100 - fundedTraderShare },
      notes: notesFor(row, 'evaluation_id'),
      ...provenanceFor(row, 'evaluation_id'),
    })
  })

const documents = [...firmDocuments, ...planDocuments]
mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`, 'utf8')

if (shouldCommit) {
  const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN
  if (!token) throw new Error('SANITY_AUTH_TOKEN is required with --commit')
  const { createClient } = await import('@sanity/client')

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6hyvhmum',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })

  for (let index = 0; index < documents.length; index += 100) {
    const batch = documents.slice(index, index + 100)
    let transaction = client.transaction()
    for (const document of batch) transaction = transaction.createOrReplace(document)
    const result = await transaction.commit({ visibility: 'sync' })
    console.log(`Committed ${result.results.length} PID documents (${result.transactionId})`)
  }
}

console.log(JSON.stringify({
  dataset: datasetPath,
  output: outputPath,
  firms: firmDocuments.length,
  plans: planDocuments.length,
  includedStatuses: includeUnverified ? [...allowedStatuses, 'unverified'] : [...allowedStatuses],
  committed: shouldCommit,
}, null, 2))

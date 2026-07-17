import { createClient } from '@sanity/client'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const token = process.env.SANITY_AUTH_TOKEN
if (!token) { console.error('SANITY_AUTH_TOKEN missing'); process.exit(1) }

const client = createClient({
  projectId: '6hyvhmum',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const seedDir = 'sanity/seed'
const files = readdirSync(seedDir).filter((f) => f.endsWith('.ndjson'))

for (const file of files) {
  const docs = readFileSync(join(seedDir, file), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l))

  if (docs.length === 0) { console.log(`  (skipped ${file}: empty)`); continue }

  console.log(`Importing ${docs.length} documents from ${file} ...`)
  let tx = client.transaction()
  for (const doc of docs) tx = tx.createOrReplace(doc)
  const res = await tx.commit()
  console.log(`  ✓ committed transaction ${res.transactionId} (${res.results.length} docs)`)
  for (const r of res.results) console.log(`    - ${r.id}: ${r.operation}`)
}
// Clean up retired (dot-ID) documents — dot IDs are private in Sanity and were a naming mistake
try {
  const retired = JSON.parse(readFileSync(join(seedDir, 'retired-ids.json'), 'utf8'))
  let tx = client.transaction()
  for (const id of retired) tx = tx.delete(id)
  const res = await tx.commit()
  console.log(`Retired ${retired.length} dot-ID documents (tx ${res.transactionId})`)
} catch (e) { console.log('Retire step skipped:', e.message) }

console.log('Seed import complete.')

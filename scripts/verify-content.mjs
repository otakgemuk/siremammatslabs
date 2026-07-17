// Closed-loop diagnostic: import seeds, read back authed + public, record everything.
import { createClient } from '@sanity/client'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const token = process.env.SANITY_AUTH_TOKEN
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6hyvhmum'
const base = { projectId, dataset: 'production', apiVersion: '2024-01-01', useCdn: false }
const authed = createClient({ ...base, token })
const publicC = createClient(base)
const out = { checkedAt: new Date().toISOString(), hasToken: !!token }

try {
  // Who does this token think it is?
  out.identity = await authed.request({ uri: '/users/me' })
} catch (e) { out.identityError = String(e.message || e) }

try {
  // Which datasets exist on this project?
  out.datasets = await authed.request({ uri: `/projects/${projectId}/datasets` })
} catch (e) { out.datasetsError = String(e.message || e) }

try {
  const files = readdirSync('sanity/seed').filter((f) => f.endsWith('.ndjson'))
  out.imports = []
  for (const f of files) {
    const docs = readFileSync(join('sanity/seed', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
    let tx = authed.transaction()
    for (const d of docs) tx = tx.createOrReplace(d)
    const res = await tx.commit({ visibility: 'sync' })
    out.imports.push({ file: f, transactionId: res.transactionId, results: res.results.map((r) => `${r.id}:${r.operation}`) })
  }
} catch (e) { out.importError = String(e.message || e) }

out.authedCount = await authed.fetch('count(*[_type in ["comparison","plan","propFirm"]])').catch((e) => String(e))
out.publicCount = await publicC.fetch('count(*[_type in ["comparison","plan","propFirm"]])').catch((e) => String(e))
out.comparisonSlugs = await publicC.fetch('*[_type=="comparison"].slug.current').catch((e) => String(e))

writeFileSync('CONTENT_STATUS.json', JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))

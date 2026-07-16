// Queries Sanity EXACTLY as the public site does: no token, useCdn false.
import { createClient } from '@sanity/client'
import { writeFileSync } from 'node:fs'

const client = createClient({ projectId: '30x3sh80', dataset: 'production', apiVersion: '2024-01-01', useCdn: false })
const out = { checkedAt: new Date().toISOString() }
try {
  out.comparisons = await client.fetch(`*[_type == "comparison"]{ "slug": slug.current, title }`)
  out.counts = await client.fetch(`{ "comparison": count(*[_type=="comparison"]), "plan": count(*[_type=="plan"]), "propFirm": count(*[_type=="propFirm"]) }`)
  out.publicReadable = true
} catch (e) {
  out.publicReadable = false
  out.error = String(e.message || e)
}
writeFileSync('CONTENT_STATUS.json', JSON.stringify(out, null, 2))
console.log(JSON.stringify(out, null, 2))

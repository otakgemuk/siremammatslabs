import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const args = new Set(process.argv.slice(2))
const shouldCommit = args.has('--commit')
const deleteLegacy = args.has('--delete-legacy')
const inputPath = resolve('data/pid/v1.0/generated/pid-sanity.ndjson')
const reportPath = resolve('data/pid/v1.0/generated/id-migration-report.json')

if (deleteLegacy && !shouldCommit) {
  throw new Error('--delete-legacy requires --commit')
}

const documents = readFileSync(inputPath, 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))

const types = ['propFirm', 'plan']
const legacyIds = new Set(documents.map((document) => document._id))
const keyFor = (document) => `${document._type}:${document.pidId}`
const stripSystemFields = (document) => {
  const result = { ...document }
  for (const field of ['_id', '_rev', '_createdAt', '_updatedAt']) delete result[field]
  return result
}

const replaceReferences = (value, idMap) => {
  if (Array.isArray(value)) return value.map((item) => replaceReferences(item, idMap))
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    key === '_ref' && idMap.has(item) ? idMap.get(item) : replaceReferences(item, idMap),
  ]))
}

const token = process.env.SANITY_AUTH_TOKEN
if (shouldCommit && !token) throw new Error('SANITY_AUTH_TOKEN is required with --commit')
const { createClient } = await import('@sanity/client')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6hyvhmum',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const existing = await client.fetch('*[_type in $types && defined(pidId)]', { types })
const existingByKey = new Map(existing.map((document) => [keyFor(document), document]))
const duplicateKeys = existing
  .map(keyFor)
  .filter((key, index, keys) => keys.indexOf(key) !== index)

const incomingReferences = []
for (const legacyId of legacyIds) {
  const refs = await client.fetch('*[references($legacyId)]{_id,_type}', { legacyId })
  for (const ref of refs) incomingReferences.push({ legacyId, ...ref })
}

const blockers = incomingReferences.filter((ref) => !legacyIds.has(ref._id))
const report = {
  mode: shouldCommit ? 'commit' : 'dry-run',
  deleteLegacy,
  sourceDocuments: documents.length,
  existingPidDocuments: existing.length,
  legacyDocumentsFound: existing.filter((document) => legacyIds.has(document._id)).length,
  existingGeneratedDocuments: existing.filter((document) => !legacyIds.has(document._id)).length,
  duplicatePidKeys: [...new Set(duplicateKeys)],
  incomingReferences: incomingReferences.length,
  expectedIncomingReferences: incomingReferences.length - blockers.length,
  blockers,
  comparisonCount: await client.fetch('count(*[_type == "comparison"])'),
}

mkdirSync(dirname(reportPath), { recursive: true })
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

if (report.duplicatePidKeys.length) throw new Error(`Duplicate pidId records found; see ${reportPath}`)
if (blockers.length) throw new Error(`Incoming references outside the PID set found; see ${reportPath}`)
if (!shouldCommit) {
  console.log(JSON.stringify(report, null, 2))
  process.exit(0)
}

const idMap = new Map()
const createOrReuse = async (document, existingDocument, override = {}) => {
  const merged = replaceReferences({
    ...stripSystemFields(existingDocument || {}),
    ...stripSystemFields(document),
    ...override,
  }, idMap)
  const legacyId = document._id
  if (existingDocument && !legacyIds.has(existingDocument._id)) {
    await client.createOrReplace({ _id: existingDocument._id, ...merged })
    return existingDocument._id
  }
  const created = await client.create(merged)
  return created._id
}

for (const document of documents.filter((item) => item._type === 'propFirm')) {
  const existingDocument = existingByKey.get(keyFor(document))
  const targetId = await createOrReuse(document, existingDocument)
  idMap.set(document._id, targetId)
}

for (const document of documents.filter((item) => item._type === 'plan')) {
  const existingDocument = existingByKey.get(keyFor(document))
  const firmId = idMap.get(document.firm?._ref)
  if (!firmId) throw new Error(`Missing migrated firm for ${document.pidId}`)
  const targetId = await createOrReuse(document, existingDocument, {
    firm: { _type: 'reference', _ref: firmId },
  })
  idMap.set(document._id, targetId)
}

// Patch any PID-owned references in the newly created firm documents after all
// target plan IDs are known.
for (const document of documents.filter((item) => item._type === 'propFirm')) {
  const targetId = idMap.get(document._id)
  const existingDocument = existingByKey.get(keyFor(document))
  const merged = replaceReferences({
    ...stripSystemFields(existingDocument || {}),
    ...stripSystemFields(document),
  }, idMap)
  await client.createOrReplace({ _id: targetId, ...merged })
}

const legacyToDelete = [...legacyIds].filter((id) => idMap.get(id) && idMap.get(id) !== id)
for (let index = 0; index < legacyToDelete.length; index += 100) {
  const batch = legacyToDelete.slice(index, index + 100)
  let transaction = client.transaction()
  for (const id of batch) transaction = transaction.delete(id)
  await transaction.commit({ visibility: 'sync' })
}

const remainingLegacy = await client.fetch('count(*[_id in $ids])', { ids: legacyToDelete })
const migrated = await client.fetch('*[_type in $types && defined(pidId)]{_id,_type,pidId,"firmRef":firm._ref}', { types })
const migratedFirmIds = new Set(migrated.filter((document) => document._type === 'propFirm').map((document) => document._id))
const missingFirmReferences = migrated.filter((document) => document._type === 'plan' && !migratedFirmIds.has(document.firmRef))
const completed = {
  ...report,
  migratedDocuments: idMap.size,
  deletedLegacyDocuments: legacyToDelete.length,
  remainingLegacy,
  missingFirmReferences: missingFirmReferences.map((document) => document.pidId),
}
writeFileSync(reportPath, `${JSON.stringify(completed, null, 2)}\n`, 'utf8')
console.log(JSON.stringify(completed, null, 2))

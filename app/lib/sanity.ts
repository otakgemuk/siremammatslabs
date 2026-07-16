import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // build-time freshness: SSG must not read a stale CDN cache
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ Queries
export const COMPARISONS_QUERY = `*[_type == "comparison"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  hero,
  "plansCount": count(plansCompared)
}`

export const COMPARISON_BY_SLUG = `*[_type == "comparison" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  eyebrow,
  hero,
  heroStats,
  plansCompared[] -> {
    _id,
    name,
    firm -> {
      _id,
      name,
      ticker,
      logo,
      website,
      affiliateCode
    },
    accountSize,
    basePrice,
    promoPriceAndCode,
    activationFee,
    profitTarget,
    maxDrawdown,
    drawdownType,
    dailyLossLimit,
    consistencyEval,
    consistencyFunded,
    minTradingDays,
    maxContracts,
    payoutBuffer,
    payoutSpeed,
    fundedSplit,
    resetCost,
    pathToLive,
    keyHighlights
  },
  content,
  verdict,
  disclaimers,
  seoKeywords
}`

export const PLANS_BY_ACCOUNT_SIZE = `*[_type == "plan" && accountSize == $accountSize] | order(firm->name) {
  _id,
  name,
  firm -> {
    name,
    ticker,
    logo
  },
  accountSize,
  basePrice,
  promoPriceAndCode,
  profitTarget,
  maxDrawdown,
  keyHighlights
}`

export const FIRMS_QUERY = `*[_type == "propFirm"] | order(name) {
  _id,
  name,
  slug,
  ticker,
  logo,
  website,
  affiliateCode,
  description,
  "planCount": count(plans)
}`

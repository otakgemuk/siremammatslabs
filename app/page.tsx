import { client, COMPARISONS_QUERY } from './lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from './lib/sanity'

interface Comparison {
  _id: string
  title: string
  slug: { current: string }
  category: string
  excerpt: string
  publishedAt: string
  hero?: any
  plansCount: number
}

const CATEGORY_LABELS: Record<string, string> = {
  'prop-firms': 'Prop Firms',
  tools: 'Trading Tools',
  platforms: 'Platforms',
  brokers: 'Brokers',
}

export default async function Home() {
  const comparisons: Comparison[] = await client.fetch(COMPARISONS_QUERY)
  const categories = Array.from(new Set(comparisons.map((c) => c.category)))

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="bg-navy border-b border-gold/25 px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="chip mx-auto mb-6">
            <span className="chip-dot pulse" />
            File: Comparisons&nbsp;·&nbsp;Status: Active
          </div>
          <h1 className="text-5xl md:text-7xl leading-[0.95] text-light mb-6">
            Prop Firms, Tools &amp; Platforms
            <br />
            <span className="text-gold">Put Under the Lens</span>
          </h1>
          <p className="text-base md:text-lg text-lightgray/85 max-w-2xl mx-auto leading-relaxed">
            Side-by-side breakdowns built from published specs, rules, and real
            all-in costs. No marketing fluff — just what the fine print
            actually says.
          </p>
        </div>
      </section>

      {/* ===== Specimen rail ===== */}
      <div className="rail" aria-label="Current research subjects">
        <div className="rail-track">
          <span>On the bench:</span>
          <span><b>FFN Steady</b> <em>· in review</em></span>
          <span><b>BluSky</b> <em>· in review</em></span>
          <span><b>Take Profit Trader</b> <em>· in review</em></span>
          <span><b>TradeDay</b> <em>· in review</em></span>
          <span><b>Apex</b> <em>· queued</em></span>
          <span><b>MyFundedFutures</b> <em>· queued</em></span>
        </div>
      </div>

      {/* ===== Body ===== */}
      {comparisons.length === 0 ? (
        <section className="section">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-display text-3xl md:text-4xl text-light mb-4">
              The Bench Is Being <span className="text-gold">Stocked</span>
            </div>
            <p className="text-lightgray/80 leading-relaxed mb-10">
              The first lab reports are in final review — a four-way prop firm
              breakdown covering evaluation costs, drawdown mechanics,
              consistency rules, and payout policies. Published reports will
              appear here the moment they clear the bench.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
              {['FFN Steady', 'BluSky', 'Take Profit Trader', 'TradeDay'].map(
                (name) => (
                  <div key={name} className="card !p-4">
                    <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold mb-2">
                      Report
                    </div>
                    <div className="font-display text-lg text-light leading-tight">
                      {name}
                    </div>
                    <div className="font-mono text-[10px] text-midgray mt-2">
                      in review
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="section">
          {categories.map((category) => {
            const categoryComparisons = comparisons.filter(
              (c) => c.category === category
            )
            return (
              <div key={category} className="mb-16 last:mb-0">
                <div className="flex items-baseline gap-4 mb-2">
                  <h2 className="text-3xl md:text-4xl text-light">
                    {CATEGORY_LABELS[category] ?? category.replace('-', ' ')}
                  </h2>
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-midgray">
                    {categoryComparisons.length}{' '}
                    {categoryComparisons.length === 1 ? 'report' : 'reports'}
                  </span>
                </div>
                <div className="bench-line mb-8" />

                <div className="grid md:grid-cols-2 gap-6">
                  {categoryComparisons.map((comparison) => (
                    <Link
                      key={comparison._id}
                      href={`/comparisons/${comparison.slug.current}`}
                      className="block group"
                    >
                      <article className="card h-full">
                        {comparison.hero && (
                          <div className="relative w-full h-40 mb-5 -mx-6 -mt-6 rounded-t-lg overflow-hidden border-b border-gold/20">
                            <Image
                              src={urlFor(comparison.hero)
                                .width(600)
                                .height(300)
                                .url()}
                              alt={comparison.title}
                              fill
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h3 className="text-xl text-light group-hover:text-gold transition-colors mb-2">
                          {comparison.title}
                        </h3>
                        <p className="text-lightgray/75 text-sm leading-relaxed mb-5">
                          {comparison.excerpt}
                        </p>
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-midgray">
                            {new Date(
                              comparison.publishedAt
                            ).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="text-gold">
                            {comparison.plansCount} plans compared →
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ===== Roadmap ===== */}
      <section className="bg-navy border-t border-gold/25 px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
            Next On the Bench
          </div>
          <h2 className="text-2xl md:text-3xl text-light mb-3">
            Charting Tools · Brokers · Scanners · Strategy Deep-Dives
          </h2>
          <p className="text-midgray text-sm max-w-xl mx-auto">
            The Lab expands one rigorous report at a time. Every comparison is
            re-verified before publishing.
          </p>
        </div>
      </section>
    </>
  )
}

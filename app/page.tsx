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

export default async function Home() {
  const comparisons: Comparison[] = await client.fetch(COMPARISONS_QUERY)

  const categories = Array.from(new Set(comparisons.map((c) => c.category)))

  return (
    <>
      <section className="bg-navy border-b border-gold px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-sm tracking-widest text-gold uppercase mb-4">
            Research & Comparison
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-light mb-6 leading-tight">
            Prop Firms, Tools & Platforms
            <span className="text-gold"> Decoded</span>
          </h1>
          <p className="text-lg text-lightgray max-w-2xl mx-auto">
            Data-driven side-by-side breakdowns. No marketing fluff. Just the specs, rules, and real costs so you make informed decisions.
          </p>
        </div>
      </section>

      <div className="section">
        {categories.map((category) => {
          const categoryComparisons = comparisons.filter(
            (c) => c.category === category
          )
          return (
            <div key={category} className="mb-16">
              <h2 className="text-3xl mb-2 capitalize">
                {category.replace('-', ' ')}
              </h2>
              <div className="w-12 h-1 bg-gold mb-8"></div>

              <div className="grid md:grid-cols-2 gap-6">
                {categoryComparisons.map((comparison) => (
                  <Link
                    key={comparison._id}
                    href={`/comparisons/${comparison.slug.current}`}
                  >
                    <div className="card group cursor-pointer">
                      {comparison.hero && (
                        <div className="relative w-full h-40 mb-4 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
                          <Image
                            src={urlFor(comparison.hero)
                              .width(600)
                              .height(300)
                              .url()}
                            alt={comparison.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <h3 className="font-display text-xl text-light group-hover:text-gold transition-colors mb-2">
                        {comparison.title}
                      </h3>
                      <p className="text-lightgray text-sm mb-4">
                        {comparison.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-midgray">
                          {new Date(comparison.publishedAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                        <span className="font-mono text-xs text-gold">
                          {comparison.plansCount} plans →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <section className="bg-navy border-t border-gold px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl mb-4">Coming Soon</h2>
          <p className="text-lightgray">
            Charting tools, brokers, scanners, and strategy deep-dives coming to the Lab.
          </p>
        </div>
      </section>
    </>
  )
}

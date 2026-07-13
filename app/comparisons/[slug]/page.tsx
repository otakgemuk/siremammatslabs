import { client, COMPARISON_BY_SLUG, COMPARISONS_QUERY } from '@/app/lib/sanity'
import Image from 'next/image'
import { urlFor } from '@/app/lib/sanity'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const comparisons = await client.fetch(COMPARISONS_QUERY)
  return comparisons.map((comparison: any) => ({
    slug: comparison.slug.current,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const comparison = await client.fetch(COMPARISON_BY_SLUG, { slug })

  return {
    title: `${comparison.title} | Sire Mammat's Lab`,
    description: comparison.excerpt,
    openGraph: {
      title: comparison.title,
      description: comparison.excerpt,
      images: comparison.hero
        ? [
            {
              url: urlFor(comparison.hero).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const comparison = await client.fetch(COMPARISON_BY_SLUG, { slug })

  if (!comparison) {
    return <div>Comparison not found</div>
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy border-b-2 border-gold">
        {comparison.hero && (
          <div className="relative w-full h-80 md:h-96">
            <Image
              src={urlFor(comparison.hero).width(1400).height(600).url()}
              alt={comparison.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-dark/40"></div>
          </div>
        )}
        <div className="section py-12">
          {comparison.eyebrow && (
            <div className="font-mono text-xs tracking-widest text-gold uppercase mb-4">
              {comparison.eyebrow}
            </div>
          )}
          <h1 className="font-display text-5xl md:text-6xl text-light mb-6 leading-tight">
            {comparison.title}
          </h1>
          <p className="text-lg text-lightgray max-w-3xl">
            {comparison.excerpt}
          </p>

          {comparison.heroStats && comparison.heroStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {comparison.heroStats.map((stat: any, idx: number) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content Sections */}
      <div className="section">
        {comparison.content?.map((section: any, idx: number) => (
          <div key={idx} className="mb-20">
            {section.heading && (
              <>
                <h2 className="text-3xl mb-2">{section.heading}</h2>
                {section.subheading && (
                  <div className="font-mono text-sm tracking-widest text-gold uppercase mb-8">
                    {section.subheading}
                  </div>
                )}
                <div className="w-12 h-1 bg-gold mb-8"></div>
              </>
            )}

            {section.sectionType === 'text' && section.body && (
              <div className="prose prose-invert max-w-4xl">
                <p className="text-lightgray leading-relaxed text-base">
                  {section.body}
                </p>
              </div>
            )}

            {section.sectionType === 'cards' && comparison.plansCompared && (
              <div className="grid md:grid-cols-3 gap-6">
                {comparison.plansCompared.map((plan: any) => (
                  <div key={plan._id} className="card">
                    {plan.firm?.logo && (
                      <div className="relative w-full h-12 mb-4">
                        <Image
                          src={urlFor(plan.firm.logo).width(200).url()}
                          alt={plan.firm.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h3 className="font-display text-xl text-gold mb-1">
                      {plan.name}
                    </h3>
                    <p className="font-mono text-xs text-light uppercase mb-4">
                      {plan.firm?.name}
                    </p>
                    <div className="font-display text-2xl text-light mb-3">
                      ${plan.basePrice}
                      {plan.promoPriceAndCode?.promoPrice && (
                        <span className="text-sm font-mono text-midgray">
                          {' '}
                          (${plan.promoPriceAndCode.promoPrice} w/{' '}
                          {plan.promoPriceAndCode.code})
                        </span>
                      )}
                    </div>
                    {plan.keyHighlights && (
                      <ul className="space-y-2 text-sm text-lightgray">
                        {plan.keyHighlights.map((highlight: string, i: number) => (
                          <li key={i}>• {highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.sectionType === 'table' && section.tableData?.rows && (
              <div className="table-wrapper">
                <table className="w-full text-sm">
                  <tbody>
                    {section.tableData.rows.map((row: any, i: number) => (
                      <tr
                        key={i}
                        className="border-b border-gold/20 hover:bg-gold/5"
                      >
                        <th className="text-left px-4 py-3 font-mono text-xs text-midgray uppercase font-semibold bg-dark w-1/4">
                          {row.factor}
                        </th>
                        <td
                          className={`px-4 py-3 text-lightgray ${
                            row.highlight === 'gold'
                              ? 'text-gold'
                              : row.highlight === 'pos'
                              ? 'text-green'
                              : row.highlight === 'neg'
                              ? 'text-red'
                              : ''
                          }`}
                        >
                          {row.col1}
                        </td>
                        <td className="px-4 py-3 text-lightgray">{row.col2}</td>
                        <td className="px-4 py-3 text-lightgray">{row.col3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.sectionType === 'verdict' && comparison.verdict && (
              <div className="bg-navy border-2 border-gold rounded-lg p-8">
                <h3 className="font-display text-2xl text-gold mb-4">
                  {comparison.verdict.heading}
                </h3>
                <div className="space-y-4 mb-8">
                  {comparison.verdict.paragraphs?.map(
                    (para: string, i: number) => (
                      <p key={i} className="text-lightgray leading-relaxed">
                        {para}
                      </p>
                    )
                  )}
                </div>

                {comparison.verdict.ranking && (
                  <div className="space-y-3">
                    {comparison.verdict.ranking.map((pick: any, i: number) => (
                      <div
                        key={i}
                        className="border border-gold/50 rounded px-4 py-3 bg-dark/50"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-display text-xl text-gold font-bold">
                            {pick.rank}
                          </span>
                          <div>
                            <p className="font-mono text-sm text-gold font-semibold">
                              {pick.name}
                            </p>
                            <p className="text-sm text-lightgray mt-1">
                              {pick.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Disclaimers */}
      {comparison.disclaimers && (
        <section className="bg-navy border-t border-gold px-6 py-12">
          <div className="max-w-4xl mx-auto text-xs text-midgray leading-relaxed">
            {comparison.disclaimers}
          </div>
        </section>
      )}

      {/* Back Link */}
      <div className="section">
        <Link href="/" className="font-mono text-sm text-gold hover:text-gold/80">
          ← Back to all comparisons
        </Link>
      </div>
    </>
  )
}

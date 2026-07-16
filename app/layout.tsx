import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Sire Mammat's Lab — Prop Firm & Trading Tool Research",
  description:
    'Data-driven side-by-side breakdowns of prop firms, trading tools, and platforms. Specs, rules, and real costs — no marketing fluff.',
  openGraph: {
    title: "Sire Mammat's Lab",
    description:
      'Deep-dive comparisons of prop firms, trading tools, and platforms.',
    url: 'https://siremammatslab.com',
    type: 'website',
  },
}

function LabMark() {
  return (
    <svg viewBox="0 0 40 44" fill="none" className="h-9 w-auto" aria-hidden="true">
      {/* Flask */}
      <path
        d="M16 6h8M18 6v10L9 34c-1.2 2.6.7 5 3.4 5h15.2c2.7 0 4.6-2.4 3.4-5L22 16V6"
        stroke="#C9920A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Candlestick inside the flask */}
      <line x1="20" y1="22" x2="20" y2="25" stroke="#C9920A" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="17.8" y="25" width="4.4" height="7" rx="1" stroke="#C9920A" strokeWidth="1.6" />
      <line x1="20" y1="32" x2="20" y2="34.5" stroke="#C9920A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="sticky top-0 z-40 bg-navy/95 backdrop-blur border-b border-gold/25">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <LabMark />
              <div>
                <div className="font-display text-xl md:text-2xl tracking-[0.08em] text-light leading-none">
                  SIRE MAMMAT&rsquo;S <span className="text-gold">LAB</span>
                </div>
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase text-midgray mt-1">
                  Comparison Research Division
                </div>
              </div>
            </a>
            <div className="ml-auto hidden sm:flex items-center gap-2">
              <span className="chip">
                <span className="chip-dot pulse" />
                Bench Active
              </span>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-navy border-t border-gold/25 px-6 py-14 mt-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start gap-10">
              <div className="md:max-w-sm">
                <div className="font-display text-xl tracking-wide text-gold mb-3">
                  SIRE MAMMAT&rsquo;S LAB
                </div>
                <p className="text-midgray text-sm leading-relaxed">
                  Research-backed comparisons of prop firms, trading tools, and
                  platforms. Every figure is checked against the provider&rsquo;s
                  published terms at time of writing.
                </p>
              </div>
              <div className="md:ml-auto md:max-w-md">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-gold mb-3">
                  Read Before You Buy
                </div>
                <p className="text-midgray text-xs leading-relaxed">
                  Futures trading involves substantial risk of loss and is not
                  suitable for all investors. Funded accounts offered by prop
                  firms are simulated trading accounts. Some links may carry
                  affiliate codes — the Lab may earn a commission at no cost to
                  you. Always confirm pricing and rules directly with providers
                  before purchasing.
                </p>
              </div>
            </div>
            <div className="bench-line mt-10 mb-5" />
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-midgray text-center">
              © {new Date().getFullYear()} Sire Mammat · All rights reserved
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

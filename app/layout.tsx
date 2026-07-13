import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Sire Mammat's Lab",
  description: 'Prop Firm & Tools Comparison Research',
  openGraph: {
    title: "Sire Mammat's Lab",
    description: 'Deep-dive comparisons of prop firms, trading tools, and platforms.',
    url: 'https://siremammatslab.com',
    type: 'website',
  },
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
      <body className="bg-dark text-light font-sans">
        <nav className="sticky top-0 z-40 bg-navy border-b border-gold/20 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="font-display text-2xl font-bold text-gold">
              SIRE MAMMAT'S LAB
            </div>
            <div className="text-midgray text-sm font-mono">
              Comparison Research
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-navy border-t border-gold px-6 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="font-display text-xl text-gold mb-2">SIRE MAMMAT'S LAB</div>
            <p className="text-midgray text-sm max-w-2xl mx-auto">
              Research-backed comparisons of prop firms, trading tools, and platforms. 
              Always confirm directly with providers before purchasing. Trading involves substantial risk.
            </p>
            <div className="text-xs text-midgray mt-6">
              © {new Date().getFullYear()} Sire Mammat. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

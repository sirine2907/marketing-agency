import type { Metadata } from 'next'
import { Archivo_Black, Inter, IBM_Plex_Mono } from 'next/font/google'
import { siteDescription, siteName, siteUrl } from '../lib/site'
import './globals.css'

const display = Archivo_Black({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Cut Through The Noise`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  keywords: ['marketing agency', 'brand strategy', 'performance marketing', 'creative studio'],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${siteName} — Cut Through The Noise`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Cut Through The Noise`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Structured data so search engines read this as an organisation, not just a page.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Signal Studio',
  description: siteDescription,
  url: siteUrl,
  email: 'hello@signal.studio',
  telephone: '+44 20 7946 0812',
  areaServed: ['GB', 'PT', 'CA'],
  address: [
    { '@type': 'PostalAddress', streetAddress: '14 Bevis Marks', addressLocality: 'London', postalCode: 'EC3A 7BA', addressCountry: 'GB' },
    { '@type': 'PostalAddress', streetAddress: 'Rua da Prata 80', addressLocality: 'Lisbon', postalCode: '1100-420', addressCountry: 'PT' },
    { '@type': 'PostalAddress', streetAddress: '99 Spadina Ave', addressLocality: 'Toronto', postalCode: 'M5V 3P8', addressCountry: 'CA' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} bg-ink text-paper`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}

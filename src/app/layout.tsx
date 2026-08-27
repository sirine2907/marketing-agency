import type { Metadata } from 'next'
import { Archivo_Black, Inter, IBM_Plex_Mono } from 'next/font/google'
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
  title: 'SIGNAL® — Cut Through The Noise',
  description:
    'SIGNAL is a creative and performance marketing studio. We build brands that are impossible to scroll past, and campaigns that can be measured to the last cent.',
  keywords: ['marketing agency', 'brand strategy', 'performance marketing', 'creative studio'],
  openGraph: {
    title: 'SIGNAL® — Cut Through The Noise',
    description:
      'A creative and performance marketing studio building brands that are impossible to scroll past.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${mono.variable} bg-ink text-paper`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}

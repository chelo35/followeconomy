import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Follow Economy - Financial Intelligence Platform',
  description: 'Real-time cryptocurrency tracking, market analysis, trading tools, and economic insights with professional glassmorphism design',
  keywords: 'cryptocurrency, bitcoin, ethereum, trading, finance, market analysis, economic calendar, glassmorphism',
  openGraph: {
    title: 'Follow Economy - Financial Intelligence Platform',
    description: 'Real-time cryptocurrency tracking, market analysis, trading tools, and economic insights',
    url: 'https://www.followeconomy.com',
    siteName: 'Follow Economy',
    images: [
      {
        url: 'https://www.followeconomy.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Follow Economy - Financial Intelligence Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Follow Economy - Financial Intelligence Platform',
    description: 'Real-time cryptocurrency tracking, market analysis, trading tools, and economic insights',
    images: ['https://www.followeconomy.com/og-image.png'],
    creator: '@followeconomy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="relative min-h-screen">
            <Header />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
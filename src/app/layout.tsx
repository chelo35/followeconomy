import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Follow Economy - Financial Intelligence Platform',
  description: 'Real-time cryptocurrency tracking, market analysis, trading tools, and economic insights',
  keywords: 'cryptocurrency, bitcoin, ethereum, trading, finance, market analysis, economic calendar',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-dark-200 via-dark-100 to-dark-300 min-h-screen`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
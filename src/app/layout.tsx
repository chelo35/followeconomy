import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import TopHeader from '@/components/TopHeader';

export const metadata: Metadata = {
  title: 'FollowEconomy',
  description: 'Crypto-first global markets hub',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111214" />
      </head>
      <body className="light">
        {/* Tema bootstrap */}
        <Script id="fe-theme-loader" strategy="beforeInteractive">{`
          try {
            var saved = localStorage.getItem('fe-theme');
            document.body.className = (saved === 'dark' || saved === 'light') ? saved : 'light';
          } catch(e) { document.body.className = 'light'; }
        `}</Script>

        <TopHeader />

        {children}

        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.getRegistrations()
                .then(rs => { if (!rs.length) navigator.serviceWorker.register('/sw.js'); });
            });
          }
        `}} />
      </body>
    </html>
  );
}
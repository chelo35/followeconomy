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
      </body>
    </html>
  );
}
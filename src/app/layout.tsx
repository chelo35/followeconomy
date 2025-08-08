import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'followeconomy — Step 1',
  description: 'No text, header color block only',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="light">
        {/* Tema sınıfını boyamadan önce ayarla */}
        <Script id="fe-theme-loader" strategy="beforeInteractive">{`
          try {
            var saved = localStorage.getItem('fe-theme');
            if (saved === 'dark' || saved === 'light') {
              document.body.className = saved;
            } else {
              document.body.className = 'light';
            }
          } catch(e) { document.body.className = 'light'; }
        `}</Script>
        {children}
      </body>
    </html>
  );
}
'use client';
import TickerRow from '@/components/TickerRow';

const cryptoItems = [
  { label: 'BTC', value: '64,320', change: 1.85 },
  { label: 'ETH', value: '3,210', change: 0.92 },
  { label: 'SOL', value: '178.02', change: -0.23 },
  { label: 'BNB', value: '607.5', change: 0.44 },
  { label: 'XRP', value: '0.54', change: -1.12 },
  { label: 'DOGE', value: '0.124', change: 0.36 },
  { label: 'ADA', value: '0.42', change: 0.12 },
];

const globalItems = [
  { label: 'S&P 500', value: '5,592', change: 0.31 },
  { label: 'Nasdaq', value: '18,321', change: 0.48 },
  { label: 'Dow', value: '40,102', change: -0.05 },
  { label: 'DAX', value: '18,350', change: 0.22 },
  { label: 'FTSE 100', value: '8,140', change: -0.18 },
  { label: 'Nikkei 225', value: '40,210', change: 0.11 },
  { label: 'AAPL', value: '226.31', change: 0.72 },
  { label: 'MSFT', value: '457.02', change: -0.10 },
  { label: 'TSLA', value: '259.44', change: 1.62 },
  { label: 'Altın', value: '2,402', change: 0.28 },
  { label: 'Gümüş', value: '30.9', change: -0.55 },
  { label: 'Doğal Gaz', value: '2.18', change: 0.41 },
  { label: 'Petrol (Brent)', value: '84.7', change: -0.22 },
];

export default function Home() {
  return (
    <main className="container">
      {/* Crypto ticker */}
      <TickerRow items={cryptoItems} variant="crypto" speed={80} />

      {/* Global endeks + majör hisseler + emtia ticker */}
      <TickerRow items={globalItems} variant="global" speed={70} />

      {/* Altta ileride içerik gelecek */}
      <section className="spacer" aria-hidden="true" />
    </main>
  );
}
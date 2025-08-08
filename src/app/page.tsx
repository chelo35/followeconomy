'use client';
import TickerRow from '@/components/TickerRow';
import WidgetBar from '@/components/WidgetBar';
import TreemapHeatmap from '@/components/TreemapHeatmap';

const cryptoItems = [
  { label: 'BTC/USDT',  value: '64,320', change: 1.85 },
  { label: 'ETH/USDT',  value: '3,210',  change: 0.92 },
  { label: 'XRP/USDT',  value: '0.540',  change: -1.12 },
  { label: 'BNB/USDT',  value: '607.50', change: 0.44 },
  { label: 'SOL/USDT',  value: '178.02', change: -0.23 },
  { label: 'ADA/USDT',  value: '0.420',  change: 0.12 },
  { label: 'DOGE/USDT', value: '0.124',  change: 0.36 },
  { label: 'AVAX/USDT', value: '32.70',  change: 0.51 },
  { label: 'SUI/USDT',  value: '1.250',  change: -0.08 },
  { label: 'TRX/USDT',  value: '0.137',  change: 0.22 },
  { label: 'LTC/USDT',  value: '74.10',  change: -0.14 },
  { label: 'PENGU/USDT',value: '0.0021', change: 2.10 },
  { label: 'ENA/USDT',  value: '0.470',  change: 0.35 },
  { label: 'HBAR/USDT', value: '0.089',  change: -0.42 },
  { label: 'TON/USDT',  value: '7.34',   change: 0.18 },
  { label: 'AAVE/USDT', value: '98.40',  change: -0.31 },
];

const globalItems = [
  // Indices (US + JP + EU + HK)
  { label: 'S&P 500',    value: '5,592',  change: 0.31 },
  { label: 'Nasdaq 100', value: '18,321', change: 0.48 },
  { label: 'Dow Jones',  value: '40,102', change: -0.05 },
  { label: 'Nikkei 225', value: '40,210', change: 0.11 },
  { label: 'DAX',        value: '18,350', change: 0.22 },
  { label: 'FTSE 100',   value: '8,140',  change: -0.18 },
  { label: 'CAC 40',     value: '7,640',  change: 0.09 },
  { label: 'Hang Seng',  value: '17,820', change: -0.24 },
  // Majors (US)
  { label: 'AAPL', value: '226.31', change: 0.72 },
  { label: 'MSFT', value: '457.02', change: -0.10 },
  { label: 'AMZN', value: '204.55', change: 0.66 },
  { label: 'TSLA', value: '259.44', change: 1.62 },
  { label: 'NVDA', value: '126.70', change: -0.40 },
  // Metals / Energy (EN)
  { label: 'Gold',       value: '2,402', change: 0.28 },
  { label: 'Silver',     value: '30.90', change: -0.55 },
  { label: 'Natural Gas',value: '2.18',  change: 0.41 },
  { label: 'Brent Crude Oil', value: '84.70', change: -0.22 },
];

export default function Home() {
  return (
    <main className="container container--fluid">
      <WidgetBar />
      <TickerRow items={cryptoItems} variant="crypto" speed={60} />
      <TickerRow items={globalItems} variant="global" speed={54} />

      {/* Sol sütun */}
      <section className="below">
        <aside className="left-rail">
          {/* ikisi de cols={5} rows={8} → aynı boy */}
          <TreemapHeatmap title="Crypto Heatmap" endpoint="/api/mosaic/crypto" cols={5} rows={8} />
          <TreemapHeatmap title="US Indices & Majors" endpoint="/api/mosaic/stocks" cols={5} rows={8} />
        </aside>
        <div className="main-rail">{/* ileri içerik */}</div>
      </section>
    </main>
  );
}
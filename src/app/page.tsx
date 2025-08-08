// src/app/page.tsx
import WidgetBar from "@/components/WidgetBar";
import TickerRow from "@/components/TickerRow";
import NewsHub from "@/components/news/NewsHub";

const cryptoItems = [
  { label: 'BTC/USDT', value: '64,320', change: 1.85 },
  { label: 'ETH/USDT', value: '3,210', change: 0.92 },
  { label: 'XRP/USDT', value: '0.540', change: -1.12 },
  { label: 'BNB/USDT', value: '607.50', change: 0.44 },
  { label: 'SOL/USDT', value: '178.02', change: -0.23 },
  { label: 'ADA/USDT', value: '0.420', change: 0.12 },
  { label: 'DOGE/USDT', value: '0.124', change: 0.36 },
  { label: 'AVAX/USDT', value: '32.70', change: 0.51 },
];

const globalItems = [
  { label: 'S&P 500', value: '5,592', change: 0.31 },
  { label: 'Nasdaq 100', value: '18,321', change: 0.48 },
  { label: 'Dow Jones', value: '40,102', change: -0.05 },
  { label: 'Gold', value: '2,402', change: 0.28 },
  { label: 'Silver', value: '30.90', change: -0.55 },
  { label: 'Brent Oil', value: '84.70', change: -0.22 },
];

export default function Home() {
  return (
    <main className="container container--fluid">
      <section className="layer layer-widgets">
        <WidgetBar />
      </section>

      <section className="layer layer-tickers">
        <div className="ticker-stack">
          <TickerRow items={cryptoItems} variant="crypto" speed={60} />
          <TickerRow items={globalItems} variant="global" speed={54} />
        </div>
      </section>

      <section className="layer layer-news">
        <NewsHub />
      </section>
    </main>
  );
}
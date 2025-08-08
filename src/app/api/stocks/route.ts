import { NextResponse } from 'next/server';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

// Try Stooq (free). If it fails, fall back to mock.
const TICKERS = ['AAPL','MSFT','NVDA','GOOGL','AMZN','META','TSLA','BRK.B','JPM','V','MA'];

type StockItem = { symbol:string; price:number; changePct:number; mcapUsd:number };

function parseStooqCSV(csv: string): StockItem[] {
  const lines = csv.trim().split('\n').slice(1);
  return lines.map(l => {
    const [symbol, date, time, open, high, low, close, volume] = l.split(',');
    const sym = (symbol || '').replace('.US','').toUpperCase();
    const c = parseFloat(close);
    const o = parseFloat(open);
    const chg = isFinite(c) && isFinite(o) && o !== 0 ? ((c - o) / o) * 100 : 0;
    return { symbol: sym, price: c, changePct: chg, mcapUsd: 0 };
  });
}

export async function GET() {
  try {
    const url = `https://stooq.com/q/l/?s=${TICKERS.map(t=>t.toLowerCase()+'.us').join(',')}&f=sd2t2ohlcv&h&e=csv`;
    const r = await fetch(url, { next: { revalidate: 60 } });
    if (!r.ok) throw new Error(String(r.status));
    const csv = await r.text();
    const items = parseStooqCSV(csv);
    return NextResponse.json({ items, ts: Date.now() });
  } catch (e) {
    const items: StockItem[] = [
      { symbol:'AAPL', price:226.3, changePct:0.72, mcapUsd:3.5e12 },
      { symbol:'MSFT', price:457.0, changePct:-0.10, mcapUsd:3.7e12 },
      { symbol:'NVDA', price:126.7, changePct:-0.40, mcapUsd:3.1e12 },
      { symbol:'GOOGL',price:171.2, changePct:0.55, mcapUsd:2.1e12 },
      { symbol:'AMZN', price:204.6, changePct:0.66, mcapUsd:2.0e12 },
      { symbol:'META', price:522.0, changePct:0.85, mcapUsd:1.3e12 },
      { symbol:'TSLA', price:259.4, changePct:1.62, mcapUsd:8.2e11 },
      { symbol:'BRK.B',price:418.2, changePct:0.20, mcapUsd:0 },
      { symbol:'JPM',  price:206.3, changePct:-0.84, mcapUsd:0 },
      { symbol:'V',    price:278.0, changePct:0.66, mcapUsd:0 },
      { symbol:'MA',   price:448.4, changePct:0.60, mcapUsd:0 },
    ];
    return NextResponse.json({ items, ts: Date.now(), mock:true });
  }
}
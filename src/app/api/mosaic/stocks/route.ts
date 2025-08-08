import { NextResponse } from 'next/server';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

const TICKERS = [
  'AAPL','MSFT','NVDA','GOOGL','GOOG','AMZN','META','TSLA','BRK.B','JPM',
  'V','MA','UNH','LLY','XOM','CVX','WMT','HD','BAC','KO','PEP','AVGO','COST',
  'ADBE','NFLX','INTC','ORCL','AMD','CSCO','CRM','PFE','MRK','TMO','ABT','NKE',
  'DIS','MCD','CAT','GE','HON','QCOM','TXN','AMAT','BX','GS','MS','PYPL'
]; // ~50

// ~yaklaşık mcap (USD) — boşsa price change abs'ı kullanır
const WEIGHT_HINT: Record<string, number> = {
  AAPL: 3.5e12, MSFT: 3.7e12, NVDA: 3.1e12, GOOGL: 2.1e12, AMZN: 2.0e12,
  META: 1.3e12, TSLA: 8.2e11, 'BRK.B': 9.0e11, JPM: 5.0e11, V: 5.7e11, MA: 5.0e11,
  UNH: 4.7e11, LLY: 1.2e12, XOM: 4.4e11, CVX: 2.9e11, WMT: 5.0e11, HD: 3.0e11,
  BAC: 2.8e11, KO: 2.6e11, PEP: 2.2e11, AVGO: 7.0e11, COST: 3.6e11,
};

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i=0;i<arr.length;i+=size) out.push(arr.slice(i, i+size));
  return out;
}

function parse(csv: string) {
  const lines = csv.trim().split('\n').slice(1);
  return lines.map(l => {
    const [symbol, , , open, , , close] = l.split(',');
    const sym = (symbol || '').replace('.US','').toUpperCase();
    const c = parseFloat(close); const o = parseFloat(open);
    const chg = isFinite(c) && isFinite(o) && o !== 0 ? ((c - o) / o) * 100 : 0;
    return { symbol: sym, price: c, changePct: chg, mcapUsd: WEIGHT_HINT[sym] || undefined };
  });
}

export async function GET() {
  try {
    const chunks = chunk(TICKERS, 40); // URL limiti
    const results: any[] = [];
    for (const part of chunks) {
      const url = `https://stooq.com/q/l/?s=${part.map(t=>t.toLowerCase()+'.us').join(',')}&f=sd2t2ohlcv&h&e=csv`;
      const r = await fetch(url, { next: { revalidate: 60 } });
      if (!r.ok) throw new Error(String(r.status));
      results.push(...parse(await r.text()));
    }
    return NextResponse.json({ items: results, ts: Date.now() });
  } catch {
    // kısa mock
    const items = [
      { symbol:'AAPL', price:226.3, changePct:0.72, mcapUsd:3.5e12 },
      { symbol:'MSFT', price:457.0, changePct:-0.10, mcapUsd:3.7e12 },
      { symbol:'NVDA', price:126.7, changePct:-0.40, mcapUsd:3.1e12 },
      { symbol:'AMZN', price:204.6, changePct:0.66, mcapUsd:2.0e12 },
      { symbol:'META', price:522.0, changePct:0.85, mcapUsd:1.3e12 },
      { symbol:'TSLA', price:259.4, changePct:1.62, mcapUsd:8.2e11 },
    ];
    return NextResponse.json({ items, ts: Date.now(), mock:true });
  }
}
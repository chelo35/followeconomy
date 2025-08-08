import { NextResponse } from 'next/server';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

const MAJORS = [
  'AAPL','MSFT','NVDA','AMZN','GOOGL','GOOG','META','TSLA','BRK.B','AVGO',
  'JPM','V','MA','UNH','LLY','XOM','CVX','WMT','HD','KO','PEP','COST','ADBE','NFLX','ORCL','AMD','INTC','CSCO','CRM'
];
// Stooq endeks tahminleri – olmazsa mock düşer
const INDEX_CANDIDATES = [
  ['spx','ndx','dji'],    // set-1
  ['^spx','^ndx','^dji']  // set-2
];

function parseCSV(csv: string) {
  const lines = csv.trim().split('\n').slice(1);
  return lines.map(l => {
    const [symbol, , , open, , , close] = l.split(',');
    const sym = (symbol || '').replace('.US','').toUpperCase();
    const c = parseFloat(close); const o = parseFloat(open);
    const chg = isFinite(c) && isFinite(o) && o !== 0 ? ((c - o) / o) * 100 : 0;
    return { symbol: sym, price: c, changePct: chg };
  });
}

async function stooqFetch(symbols: string[]) {
  const url = `https://stooq.com/q/l/?s=${symbols.join(',')}&f=sd2t2ohlcv&h&e=csv`;
  const r = await fetch(url, { next: { revalidate: 60 } });
  if (!r.ok) throw new Error(String(r.status));
  return parseCSV(await r.text());
}

export async function GET() {
  try {
    // hisseler
    const stocks = await stooqFetch(MAJORS.map(s => s.toLowerCase() + '.us'));

    // endeksler – iki farklı formatı dene
    let indices: any[] = [];
    for (const cand of INDEX_CANDIDATES) {
      try {
        indices = await stooqFetch(cand);
        if (indices.length) break;
      } catch {}
    }
    // ağırlaştırma (sıralama için)
    const WEIGHT_HINT: Record<string, number> = {
      GSPC: 1e13, SPX: 1e13, NDX: 8e12, DJI: 7e12,
      AAPL: 3.5e12, MSFT: 3.7e12, NVDA: 3.1e12, AMZN: 2.0e12, META: 1.3e12
    };

    const normalize = (arr: any[]) =>
      arr.map((x) => ({
        symbol: x.symbol,
        price: x.price,
        changePct: x.changePct,
        mcapUsd: WEIGHT_HINT[x.symbol] || undefined
      }));

    const items = [...normalize(indices), ...normalize(stocks)];
    return NextResponse.json({ items, ts: Date.now() });
  } catch {
    const items = [
      // Endeksler
      { symbol:'S&P 500', price:5592, changePct:0.31, mcapUsd:1e13 },
      { symbol:'Nasdaq 100', price:18321, changePct:0.48, mcapUsd:8e12 },
      { symbol:'Dow Jones', price:40102, changePct:-0.05, mcapUsd:7e12 },
      // Majörler
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
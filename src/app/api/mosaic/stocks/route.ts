import { NextResponse } from 'next/server';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

const MAJORS = [
  'AAPL','MSFT','NVDA','AMZN','GOOGL','META','TSLA','BRK.B','AVGO',
  'JPM','V','MA','UNH','LLY','XOM','CVX','WMT','HD','KO','PEP','COST',
  'ADBE','NFLX','ORCL','AMD','INTC','CSCO','CRM'
];
const INDEX_LABELS: Record<string,string> = {
  '^spx': 'S&P 500', 'spx':'S&P 500', 'gspc':'S&P 500',
  '^ndx': 'Nasdaq 100', 'ndx':'Nasdaq 100',
  '^dji': 'Dow Jones', 'dji':'Dow Jones'
};

function parse(csv: string) {
  const lines = csv.trim().split('\n').slice(1);
  return lines.map(l => {
    const [symbol, , , open, , , close] = l.split(',');
    const raw = (symbol || '').toLowerCase();
    const name = INDEX_LABELS[raw] || raw.replace('.us','').toUpperCase();
    const c = parseFloat(close); const o = parseFloat(open);
    const chg = isFinite(c) && isFinite(o) && o !== 0 ? ((c - o) / o) * 100 : 0;
    return { symbol: name, price: c, changePct: chg };
  });
}

async function stooq(symbols: string[]) {
  const url = `https://stooq.com/q/l/?s=${symbols.join(',')}&f=sd2t2ohlcv&h&e=csv`;
  const r = await fetch(url, { next: { revalidate: 60 } });
  if (!r.ok) throw new Error(String(r.status));
  return parse(await r.text());
}

export async function GET() {
  try {
    const idx = await stooq(['spx','ndx','dji']);
    const stks = await stooq(MAJORS.map(s => s.toLowerCase()+'.us'));
    const items = [...idx, ...stks];
    return NextResponse.json({ items, ts: Date.now() });
  } catch {
    return NextResponse.json({ items: [
      { symbol:'S&P 500', price:5592, changePct:0.31 },
      { symbol:'Nasdaq 100', price:18321, changePct:0.48 },
      { symbol:'Dow Jones', price:40102, changePct:-0.05 },
      { symbol:'AAPL', price:226.3, changePct:0.72 },
      { symbol:'MSFT', price:457.0, changePct:-0.10 },
      { symbol:'NVDA', price:126.7, changePct:-0.40 },
      { symbol:'AMZN', price:204.6, changePct:0.66 },
      { symbol:'META', price:522.0, changePct:0.85 },
      { symbol:'TSLA', price:259.4, changePct:1.62 },
      { symbol:'AVGO', price:170.2, changePct:0.51 },
      { symbol:'JPM',  price:206.3, changePct:-0.84 },
      { symbol:'V',    price:278.0, changePct:0.66 },
      { symbol:'MA',   price:448.4, changePct:0.60 },
      { symbol:'UNH',  price:497.1, changePct:-0.22 },
      { symbol:'LLY',  price:912.2, changePct:0.45 },
      { symbol:'XOM',  price:113.2, changePct:-0.35 },
      { symbol:'CVX',  price:154.9, changePct:-0.28 },
      { symbol:'WMT',  price:69.2,  changePct:0.18 },
      { symbol:'HD',   price:337.5, changePct:0.12 },
      { symbol:'KO',   price:63.7,  changePct:0.09 },
      { symbol:'PEP',  price:170.4, changePct:0.15 },
      { symbol:'COST', price:870.2, changePct:0.20 },
    ], ts: Date.now(), mock:true });
  }
}
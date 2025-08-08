import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Sıra sabit
const ORDERED = [
  'BTC','ETH','SOL','XRP',
  'BNB','AVAX','HBAR','ADA',
  'XLM','DOGE','LINK','AAVE',
  'ENA','TRX','DOT','SUI'
];

// Coingecko id eşlemeleri
const IDMAP: Record<string,string> = {
  BTC:'bitcoin',
  ETH:'ethereum',
  SOL:'solana',
  XRP:'ripple',
  BNB:'binancecoin',
  AVAX:'avalanche-2',
  HBAR:'hedera-hashgraph',
  ADA:'cardano',
  XLM:'stellar',
  DOGE:'dogecoin',
  LINK:'chainlink',
  AAVE:'aave',
  ENA:'ethena',          // ENA
  TRX:'tron',
  DOT:'polkadot',
  SUI:'sui',
};

type Row = { symbol: string; price: number; changePct: number };

export async function GET() {
  try {
    const ids = ORDERED.map(s => IDMAP[s]).join(',');
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=false&price_change_percentage=24h`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();

    const byId: Record<string, Row> = {};
    for (const d of data) {
      const symbol = String(d.symbol || '').toUpperCase();
      byId[symbol] = {
        symbol,
        price: d.current_price ?? 0,
        changePct: d.price_change_percentage_24h ?? d.price_change_percentage_24h_in_currency ?? 0,
      };
    }

    const items: Row[] = ORDERED
      .map(sym => byId[sym] ?? null)
      .filter(Boolean) as Row[];

    // Eğer API bir kısmını getiremediyse fallback doldur
    if (items.length < ORDERED.length) {
      const FALLBACK: Record<string, Row> = {
        BTC:{symbol:'BTC',price:64320,changePct:1.85},
        ETH:{symbol:'ETH',price:3210,changePct:0.92},
        SOL:{symbol:'SOL',price:178,changePct:-0.23},
        XRP:{symbol:'XRP',price:0.54,changePct:-1.12},
        BNB:{symbol:'BNB',price:607.5,changePct:0.44},
        AVAX:{symbol:'AVAX',price:32.7,changePct:0.51},
        HBAR:{symbol:'HBAR',price:0.262,changePct:4.67},
        ADA:{symbol:'ADA',price:0.42,changePct:0.12},
        XLM:{symbol:'XLM',price:0.12,changePct:0.25},
        DOGE:{symbol:'DOGE',price:0.124,changePct:0.36},
        LINK:{symbol:'LINK',price:15.4,changePct:0.85},
        AAVE:{symbol:'AAVE',price:98.4,changePct:-0.31},
        ENA:{symbol:'ENA',price:0.645,changePct:3.2},
        TRX:{symbol:'TRX',price:0.137,changePct:0.22},
        DOT:{symbol:'DOT',price:6.3,changePct:0.4},
        SUI:{symbol:'SUI',price:1.25,changePct:-0.08},
      };
      const filled: Row[] = ORDERED.map(s => items.find(i => i.symbol === s) ?? FALLBACK[s]);
      return NextResponse.json({ items: filled, ts: Date.now() }, { headers:{'Cache-Control':'no-store'} });
    }

    return NextResponse.json({ items, ts: Date.now() }, { headers:{'Cache-Control':'no-store'} });
  } catch {
    // Tam fallback
    const items: Row[] = [
      'BTC','ETH','SOL','XRP','BNB','AVAX','HBAR','ADA','XLM','DOGE','LINK','AAVE','ENA','TRX','DOT','SUI'
    ].map(s => ({ symbol:s, price:0, changePct:0 }));
    return NextResponse.json({ items, ts: Date.now(), mock:true }, { headers:{'Cache-Control':'no-store'} });
  }
}
import { NextResponse } from 'next/server';

export const revalidate = 60; // 1 dk
export const dynamic = 'force-dynamic';

type CryptoItem = { symbol: string; price: number; changePct: number; mcapUsd: number };

export async function GET() {
  const ids = [
    'bitcoin','ethereum','ripple','binancecoin','solana','cardano','dogecoin','avalanche-2','sui','tron',
    'litecoin','pendle','ethena','hedera-hashgraph','toncoin','aave'
  ].join(',');
  try {
    const r = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`,
      { next: { revalidate: 60 } }
    );
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    const items: CryptoItem[] = data.map((d: any) => ({
      symbol: (d.symbol ?? '').toUpperCase(),
      price: d.current_price ?? 0,
      changePct: d.price_change_percentage_24h ?? 0,
      mcapUsd: d.market_cap ?? 0,
    }));
    return NextResponse.json({ items, ts: Date.now() });
  } catch (e) {
    // Fallback mock
    const items: CryptoItem[] = [
      { symbol:'BTC', price:64320, changePct:1.85, mcapUsd:1.27e12 },
      { symbol:'ETH', price:3210,  changePct:0.92, mcapUsd:3.8e11 },
      { symbol:'SOL', price:178.0, changePct:-0.23, mcapUsd:8.0e10 },
      { symbol:'BNB', price:607.5, changePct:0.44, mcapUsd:9.5e10 },
      { symbol:'XRP', price:0.54,  changePct:-1.12, mcapUsd:2.9e10 },
      { symbol:'ADA', price:0.42,  changePct:0.12, mcapUsd:1.5e10 },
      { symbol:'DOGE',price:0.124, changePct:0.36, mcapUsd:1.8e10 },
      { symbol:'AVAX',price:32.7,  changePct:0.51, mcapUsd:1.2e10 },
      { symbol:'SUI', price:1.25,  changePct:-0.08, mcapUsd:1.0e10 },
      { symbol:'TRX', price:0.137, changePct:0.22, mcapUsd:1.1e10 },
      { symbol:'LTC', price:74.1,  changePct:-0.14, mcapUsd:6.5e9  },
      { symbol:'AAVE',price:98.4,  changePct:-0.31, mcapUsd:1.5e9  },
    ];
    return NextResponse.json({ items, ts: Date.now(), mock:true }, { status: 200 });
  }
}
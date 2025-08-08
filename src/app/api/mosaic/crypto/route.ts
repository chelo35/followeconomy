import { NextResponse } from 'next/server';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Top 60 market cap
    const r = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=60&page=1&sparkline=false&price_change_percentage=24h',
      { next: { revalidate: 60 } }
    );
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    const items = data.map((d: any) => ({
      symbol: String(d.symbol || '').toUpperCase(),
      price: d.current_price ?? 0,
      changePct: d.price_change_percentage_24h ?? d.price_change_percentage_24h_in_currency ?? 0,
      mcapUsd: d.market_cap ?? 0,
    }));
    return NextResponse.json({ items, ts: Date.now() });
  } catch {
    // mock fallback (kısa)
    const items = [
      { symbol:'BTC', price:64320, changePct:1.85, mcapUsd:1.27e12 },
      { symbol:'ETH', price:3210,  changePct:0.92, mcapUsd:3.8e11 },
      { symbol:'SOL', price:178.0, changePct:-0.23, mcapUsd:8.0e10 },
      { symbol:'BNB', price:607.5, changePct:0.44, mcapUsd:9.5e10 },
    ];
    return NextResponse.json({ items, ts: Date.now(), mock:true });
  }
}
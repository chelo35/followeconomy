import { NextResponse } from 'next/server';
export const revalidate = 60;
export const dynamic = 'force-dynamic';

const EXCLUDE = new Set([
  'USDT','USDC','DAI','BUSD','TUSD','USDP','FDUSD','EURT','UST','USDE','PYUSD',
  'WBTC','WETH','STETH','RETH'
]);

export async function GET() {
  try {
    const r = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=120&page=1&sparkline=false&price_change_percentage=24h',
      { next: { revalidate: 60 } }
    );
    if (!r.ok) throw new Error(String(r.status));
    const data = await r.json();
    const items = data
      .filter((d: any) => !EXCLUDE.has(String(d.symbol || '').toUpperCase()))
      .map((d: any) => ({
        symbol: String(d.symbol || '').toUpperCase(),
        price: d.current_price ?? 0,
        changePct: d.price_change_percentage_24h ?? d.price_change_percentage_24h_in_currency ?? 0,
        mcapUsd: d.market_cap ?? 0,
      }));
    return NextResponse.json({ items, ts: Date.now() });
  } catch {
    const items = [
      { symbol:'BTC', price:64320, changePct:1.85, mcapUsd:1.27e12 },
      { symbol:'ETH', price:3210,  changePct:0.92, mcapUsd:3.8e11 },
    ];
    return NextResponse.json({ items, ts: Date.now(), mock:true });
  }
}
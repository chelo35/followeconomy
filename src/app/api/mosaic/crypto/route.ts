import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const EXCLUDE = new Set([
  'USDT','USDC','DAI','BUSD','TUSD','USDP','FDUSD','EURT','PYUSD','USDE',
  'WBTC','WETH','STETH','RETH'
]);

export async function GET() {
  try {
    const r = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=120&page=1&sparkline=false&price_change_percentage=24h',
      { cache: 'no-store' }
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
    return NextResponse.json({ items, ts: Date.now() }, { headers: { 'Cache-Control':'no-store' }});
  } catch {
    return NextResponse.json({
      items: [
        { symbol:'BTC', price:64320, changePct:1.85, mcapUsd:1.27e12 },
        { symbol:'ETH', price:3210,  changePct:0.92, mcapUsd:3.8e11 },
        { symbol:'SOL', price:178,   changePct:-0.23, mcapUsd:8e10  },
        { symbol:'XRP', price:0.54,  changePct:-1.12, mcapUsd:2.9e10 },
        { symbol:'BNB', price:607.5, changePct:0.44, mcapUsd:9.5e10 },
        { symbol:'AVAX',price:32.7,  changePct:0.51, mcapUsd:1.2e10 },
        { symbol:'HBAR',price:0.262, changePct:4.67, mcapUsd:0.9e10 },
        { symbol:'ADA', price:0.42,  changePct:0.12, mcapUsd:1.5e10 },
        { symbol:'XLM', price:0.12,  changePct:0.25, mcapUsd:0.4e10 },
        { symbol:'DOGE',price:0.124, changePct:0.36, mcapUsd:1.8e10 },
        { symbol:'LINK',price:15.4,  changePct:0.85, mcapUsd:1.0e10 },
        { symbol:'AAVE',price:98.4,  changePct:-0.31, mcapUsd:1.5e9  },
        { symbol:'ENA', price:0.645, changePct:3.20, mcapUsd:0.8e9  },
        { symbol:'TRX', price:0.137, changePct:0.22, mcapUsd:1.1e10 },
        { symbol:'DOT', price:6.30,  changePct:0.40, mcapUsd:0.8e10 },
        { symbol:'SUI', price:1.25,  changePct:-0.08, mcapUsd:1.0e10 },
      ],
      ts: Date.now(),
      mock:true
    }, { headers: { 'Cache-Control':'no-store' }});
  }
}
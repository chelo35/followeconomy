// src/app/api/crypto-grid/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const items = [
    'BTC','ETH','SOL','XRP','BNB','AVAX','HBAR','ADA',
    'XLM','DOGE','LINK','AAVE','ENA','TRX','DOT','SUI'
  ].map((s, i) => ({
    symbol: s,
    price: i < 4 ? 1000 + i : i < 8 ? 100 + i : i < 12 ? 1 + i/10 : i/100, // rastgele
    changePct: ((i % 2 ? 1 : -1) * (i + 1)) / 10,                           // +/- %
  }));

  return NextResponse.json(
    { items, ts: Date.now() },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
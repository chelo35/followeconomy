'use client';
import { useEffect, useState } from 'react';

type Row = { symbol: string; price: number; changePct: number };

function fmtPrice(p: number) {
  if (!isFinite(p)) return '—';
  const v = Math.abs(p);
  if (v >= 1000) return Math.round(p).toLocaleString('en-US');
  if (v >= 100)  return p.toFixed(2);
  if (v >= 1)    return p.toFixed(2);
  if (v >= 0.1)  return p.toFixed(3);
  if (v >= 0.01) return p.toFixed(4);
  if (v >= 0.001) return p.toFixed(5);
  if (v >= 0.0001) return p.toFixed(6);
  if (v >= 0.00001) return p.toFixed(7);
  if (v >= 0.000001) return p.toFixed(8);
  return p.toFixed(9);
}

export default function CryptoGrid() {
  const [items, setItems] = useState<Row[]>([]);
  const [ts, setTs] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const r = await fetch('/api/crypto-grid?cb=' + Date.now(), { cache: 'no-store' });
      const j = await r.json();
      setItems(j.items || []);
      setTs(j.ts || Date.now());
    };
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cg">
      <div className="cg-head">
        <h3>Crypto Grid</h3>
        <span className="cg-ts">{ts ? new Date(ts).toLocaleTimeString() : '—'}</span>
      </div>
      <div className="cg-grid">
        {items.map((it) => (
          <div key={it.symbol} className={`cg-tile ${it.changePct>=0?'up':'down'}`}>
            <div className="cg-row">
              <span className="cg-sym">{it.symbol}</span>
              <span className="cg-ch">{it.changePct>=0?'▲':'▼'} {Math.abs(it.changePct).toFixed(2)}%</span>
            </div>
            <div className="cg-price">{fmtPrice(it.price)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
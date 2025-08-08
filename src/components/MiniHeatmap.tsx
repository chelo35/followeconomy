'use client';
import { useEffect, useState } from 'react';

export type Tile = { symbol: string; price?: number; changePct: number; weight?: number };

export default function MiniHeatmap({
  title,
  endpoint,
  pollMs = 60_000,
}: { title: string; endpoint: string; pollMs?: number }) {
  const [items, setItems] = useState<Tile[]>([]);
  const [ts, setTs] = useState<number | null>(null);

  const load = async () => {
    try {
      const r = await fetch(endpoint, { cache: 'no-store' });
      const { items, ts } = await r.json();
      // ağırlık: varsa market cap, yoksa |change| ile sırala
      const norm = items.map((it: any) => ({
        symbol: it.symbol,
        price: it.price,
        changePct: it.changePct,
        weight: it.mcapUsd ?? Math.abs(it.changePct) ?? 1,
      }));
      // en önemliler öne
      norm.sort((a: Tile, b: Tile) => (b.weight! - a.weight!));
      setItems(norm.slice(0, 24)); // 24 kutu
      setTs(ts ?? Date.now());
    } catch {
      // sessiz düş
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
  }, []);

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  const tileColor = (pct: number) => {
    // -8..+8 range → alpha 0.15..0.6
    const a = 0.15 + (clamp(Math.abs(pct), 0, 8) / 8) * 0.45;
    const base = pct >= 0 ? '46, 204, 113' : '231, 76, 60'; // green / red
    return `rgba(${base}, ${a.toFixed(2)})`;
  };

  return (
    <div className="mh-widget">
      <div className="mh-head">
        <h3>{title}</h3>
        <span className="mh-ts">{ts ? new Date(ts).toLocaleTimeString() : '—'}</span>
      </div>
      <div className="mh-grid">
        {items.map((it) => (
          <div key={it.symbol} className="mh-tile" style={{ background: tileColor(it.changePct) }} title={it.symbol}>
            <div className="mh-sym">{it.symbol}</div>
            <div className="mh-p">
              {typeof it.price === 'number' ? (it.price >= 100 ? it.price.toFixed(0) : it.price.toFixed(3)) : '—'}
            </div>
            <div className={`mh-ch ${it.changePct >= 0 ? 'up' : 'down'}`}>
              {it.changePct >= 0 ? '▲' : '▼'} {Math.abs(it.changePct).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
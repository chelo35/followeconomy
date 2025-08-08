'use client';
import { useEffect, useMemo, useState } from 'react';

type Item = {
  symbol: string;
  price?: number;
  changePct: number;
  weight?: number;        // market cap, volume vs.
};

export default function TreemapHeatmap({
  title,
  endpoint,
  maxItems = 60,
  cols = 8,              // sol sütun 380px civarı için 8 iyi; istersen 10-12
  pollMs = 60_000,
}: {
  title: string;
  endpoint: string;
  maxItems?: number;
  cols?: number;
  pollMs?: number;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [ts, setTs] = useState<number | null>(null);
  const [focus, setFocus] = useState<string | null>(null);   // tek tık büyüt
  const [zoom, setZoom] = useState<Item | null>(null);       // çift tık modal

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(endpoint, { cache: 'no-store' });
        const j = await r.json();
        const arr: Item[] = (j.items || []).slice(0, maxItems).map((it: any) => ({
          symbol: String(it.symbol || '').toUpperCase(),
          price: typeof it.price === 'number' ? it.price : undefined,
          changePct: Number(it.changePct || 0),
          weight: Number(it.mcapUsd || it.weight || Math.abs(it.changePct) || 1),
        }));
        // büyükten küçüğe sırala
        arr.sort((a, b) => (b.weight! - a.weight!));
        setItems(arr);
        setTs(j.ts ?? Date.now());
      } catch {
        // sessizce bırak
      }
    };
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
  }, [endpoint, maxItems, pollMs]);

  // grid span'lerini hesapla (yaklaşık treemap)
  const tiles = useMemo(() => {
    if (!items.length) return [];
    const maxW = Math.max(...items.map(i => i.weight || 1));
    // Alan ~ weight^gamma ; gamma<1 → küçüklerin de alanı olsun
    const gamma = 0.6;
    const base = 1;            // min span
    const maxSpan = 3;         // 1..3 arası span (grid-auto-flow:dense ile yerleşir)
    return items.map(i => {
      const n = Math.pow((i.weight || 1) / maxW, gamma);
      const span = Math.max(base, Math.round(n * maxSpan));
      return { ...i, span };
    });
  }, [items]);

  const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
  const color = (pct: number) => {
    // -8..+8 bandında alpha 0.18..0.65
    const a = 0.18 + (clamp(Math.abs(pct), 0, 8) / 8) * 0.47;
    const base = pct >= 0 ? '46,204,113' : '231,76,60';
    return `rgba(${base}, ${a.toFixed(2)})`;
  };

  return (
    <div className="tm-widget">
      <div className="tm-head">
        <h3>{title}</h3>
        <span className="tm-ts">{ts ? new Date(ts).toLocaleTimeString() : '—'}</span>
      </div>

      <div
        className="tm-grid"
        style={{ ['--tm-cols' as any]: cols }}
      >
        {tiles.map((t) => {
          const focused = focus === t.symbol;
          const span = focused ? Math.min(4, (t as any).span + 1) : (t as any).span;
          return (
            <button
              key={t.symbol}
              className={`tm-tile ${focused ? 'is-focus' : ''} ${t.changePct >= 0 ? 'up' : 'down'}`}
              style={{
                gridColumn: `span ${span}`,
                gridRow: `span ${span}`,
                background: color(t.changePct),
              }}
              title={t.symbol}
              onClick={() => setFocus(focused ? null : t.symbol)}
              onDoubleClick={() => setZoom(t)}
            >
              <div className="tm-sym">{t.symbol}</div>
              <div className="tm-price">
                {typeof t.price === 'number'
                  ? (t.price >= 100 ? t.price.toFixed(0) : t.price.toFixed(3))
                  : '—'}
              </div>
              <div className="tm-ch">
                {t.changePct >= 0 ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%
              </div>
            </button>
          );
        })}
      </div>

      {zoom && (
        <div className="tm-modal" onClick={() => setZoom(null)}>
          <div className="tm-modal-card" onClick={(e) => e.stopPropagation()}>
            <header className="tm-modal-h">
              <strong>{zoom.symbol}</strong>
              <button className="tm-close" onClick={() => setZoom(null)}>✕</button>
            </header>
            <div className="tm-modal-body">
              <div className={`tm-modal-badge ${zoom.changePct >= 0 ? 'up' : 'down'}`}>
                {zoom.changePct >= 0 ? '▲' : '▼'} {Math.abs(zoom.changePct).toFixed(2)}%
              </div>
              <div className="tm-modal-price">
                {typeof zoom.price === 'number'
                  ? (zoom.price >= 100 ? zoom.price.toFixed(0) : zoom.price.toFixed(3))
                  : '—'}
              </div>
              <p className="tm-hint">Double-click from the grid to open; click outside to close.</p>
              {/* Buraya ileride minichart koyarız */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
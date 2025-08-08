'use client';
import { useEffect, useMemo, useState } from 'react';

type Item = {
  symbol: string;
  price?: number;
  changePct: number;
  weight?: number; // mcap/vol gibi – sıralama için
};

function formatPrice(p?: number) {
  if (p == null || !isFinite(p)) return '—';
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

export default function TreemapHeatmap({
  title,
  endpoint,
  cols = 6,
  rows = 8,          // iki widget aynı değerde olsun => aynı yükseklik
  pollMs = 60_000,
}: { title: string; endpoint: string; cols?: number; rows?: number; pollMs?: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [ts, setTs] = useState<number | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [zoom, setZoom] = useState<Item | null>(null);

  // veri
  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(endpoint, { cache: 'no-store' });
        const j = await r.json();
        const arr: Item[] = (j.items || []).map((it: any) => ({
          symbol: String(it.symbol || '').toUpperCase(),
          price: typeof it.price === 'number' ? it.price : undefined,
          changePct: Number(it.changePct || 0),
          weight: Number(it.mcapUsd || it.weight || Math.abs(it.changePct) || 1),
        }));
        // ağırlığa göre sırala
        arr.sort((a, b) => (b.weight! - a.weight!));
        setItems(arr.slice(0, cols * rows)); // uniform grid ⇒ tam sığacak kadar
        setTs(j.ts ?? Date.now());
      } catch {/* sessiz */}
    };
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
  }, [endpoint, cols, rows, pollMs]);

  const color = (pct: number) => {
    const a = Math.min(0.65, 0.18 + Math.min(8, Math.abs(pct)) / 8 * 0.47);
    return `rgba(${pct >= 0 ? '46,204,113' : '231,76,60'}, ${a.toFixed(2)})`;
  };

  const gridItems = useMemo(() => items, [items]);

  return (
    <div className="tm-widget">
      <div className="tm-head">
        <h3>{title}</h3>
        <span className="tm-ts">{ts ? new Date(ts).toLocaleTimeString() : '—'}</span>
      </div>

      <div
        className="tm-grid uniform"
        style={{ ['--tm-cols' as any]: cols, ['--tm-rows' as any]: rows }}
      >
        {gridItems.map((t) => {
          const isFocus = focus === t.symbol;
          return (
            <button
              key={t.symbol}
              className={`tm-tile ${isFocus ? 'is-focus' : ''} ${t.changePct >= 0 ? 'up':'down'}`}
              style={{
                gridColumn: `span ${isFocus ? 2 : 1}`,
                gridRow:    `span ${isFocus ? 2 : 1}`,
                background: color(t.changePct),
              }}
              title={t.symbol}
              onClick={() => setFocus(isFocus ? null : t.symbol)}
              onDoubleClick={() => setZoom(t)}
            >
              <div className="tm-sym" title={t.symbol}>{t.symbol}</div>
              <div className="tm-price" title={String(t.price ?? '')}>{formatPrice(t.price)}</div>
              <div className="tm-ch">{t.changePct >= 0 ? '▲':'▼'} {Math.abs(t.changePct).toFixed(2)}%</div>
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
              <div className="tm-modal-price">{formatPrice(zoom.price)}</div>
              <p className="tm-hint">Click outside to close. (Mini chart soon)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
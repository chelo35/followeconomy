'use client';
import { useEffect, useState } from 'react';

type Item = { symbol: string; price?: number; changePct: number; weight?: number };

function fmtPrice(p?: number) {
  if (p == null || !isFinite(p)) return '—';
  const v = Math.abs(p);
  if (v >= 1000) return Math.round(p).toLocaleString('en-US');
  if (v >= 100) return p.toFixed(2);
  if (v >= 1) return p.toFixed(2);
  if (v >= 0.1) return p.toFixed(3);
  if (v >= 0.01) return p.toFixed(4);
  if (v >= 0.001) return p.toFixed(5);
  if (v >= 0.0001) return p.toFixed(6);
  if (v >= 0.00001) return p.toFixed(7);
  if (v >= 0.000001) return p.toFixed(8);
  return p.toFixed(9);
}

export default function TreemapHeatmap({
  title, endpoint,
  cols = 5, rows = 8,             // biraz daha büyük kutu
  pollMs = 60_000,
}: { title: string; endpoint: string; cols?: number; rows?: number; pollMs?: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [ts, setTs] = useState<number | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [zoom, setZoom] = useState<Item | null>(null);

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
        // ağırlığa göre sırala ve tam sığacak kadar al
        arr.sort((a, b) => (b.weight! - a.weight!));
        setItems(arr.slice(0, cols * rows));
        setTs(j.ts ?? Date.now());
      } catch {/* sessiz */}
    };
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
  }, [endpoint, cols, rows, pollMs]);

  const color = (pct: number) => {
    const alpha = 0.2 + Math.min(8, Math.abs(pct)) / 8 * 0.45;
    return `rgba(${pct >= 0 ? '46,204,113' : '231,76,60'}, ${alpha.toFixed(2)})`;
  };

  return (
    <div className="tm-widget">
      <div className="tm-head">
        <h3>{title}</h3>
        <span className="tm-ts">{ts ? new Date(ts).toLocaleTimeString() : '—'}</span>
      </div>

      <div className="tm-grid uniform" style={{ ['--tm-cols' as any]: cols, ['--tm-rows' as any]: rows }}>
        {items.map((t) => {
          const isFocus = focus === t.symbol;               // tek tıkla 2x
          return (
            <button
              key={t.symbol}
              className={`tm-tile ${isFocus ? 'is-focus' : ''} ${t.changePct >= 0 ? 'up' : 'down'}`}
              style={{
                gridColumn: `span ${isFocus ? 2 : 1}`,
                gridRow:    `span ${isFocus ? 2 : 1}`,
                background: color(t.changePct),
              }}
              onClick={() => setFocus(isFocus ? null : t.symbol)}
              onDoubleClick={() => setZoom(t)}
              title={t.symbol}
            >
              <div className="tm-row">
                <span className="tm-sym" aria-label="symbol">{t.symbol}</span>
                <span className="tm-ch">{t.changePct >= 0 ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%</span>
              </div>
              {isFocus && <div className="tm-price">{fmtPrice(t.price)}</div>}
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
              <div className="tm-modal-price">{fmtPrice(zoom.price)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
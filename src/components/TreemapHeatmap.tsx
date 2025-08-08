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
  title,
  endpoint,
  cols = 4,
  rows = 4,
  rowHeight = 56,            // kutuları büyüt
  pollMs = 60_000,
  symbolsOrder,              // belirli sırayı uygula
}: {
  title: string;
  endpoint: string;
  cols?: number;
  rows?: number;
  rowHeight?: number;
  pollMs?: number;
  symbolsOrder?: string[];   // ['BTC','ETH',...]
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [ts, setTs] = useState<number | null>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const [zoom, setZoom] = useState<Item | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(endpoint, { cache: 'no-store' });
        const j = await r.json();
        let arr: Item[] = (j.items || []).map((it: any) => ({
          symbol: String(it.symbol || '').toUpperCase(),
          price: typeof it.price === 'number' ? it.price : undefined,
          changePct: Number(it.changePct || 0),
          weight: Number(it.mcapUsd || it.weight || Math.abs(it.changePct) || 1),
        }));

        // İstenilen sırayı/filtreyi uygula (sadece verilen semboller, verilen sırayla)
        if (symbolsOrder && symbolsOrder.length) {
          const map = new Map(arr.map(i => [i.symbol.toUpperCase(), i]));
          arr = symbolsOrder.map(s => map.get(s.toUpperCase())).filter(Boolean) as Item[];
        } else {
          // Ağırlığa göre sırala (fallback)
          arr.sort((a, b) => (b.weight! - a.weight!));
        }

        // Grid kadar elemana sabitle; eksikse boş tile koy
        const target = cols * rows;
        if (arr.length > target) arr = arr.slice(0, target);
        if (arr.length < target) {
          const blanks = Array.from({ length: target - arr.length }, () => null as any);
          arr = [...arr, ...blanks];
        }

        setItems(arr);
        setTs(j.ts ?? Date.now());
      } catch {/* sessiz */}
    };
    load();
    const id = setInterval(load, pollMs);
    return () => clearInterval(id);
  }, [endpoint, cols, rows, pollMs, symbolsOrder]);

  const color = (pct: number) => {
    if (pct == null || isNaN(pct)) return 'var(--surface-2)';
    const a = 0.2 + Math.min(8, Math.abs(pct)) / 8 * 0.45;
    return `rgba(${pct >= 0 ? '46,204,113' : '231,76,60'}, ${a.toFixed(2)})`;
  };

  return (
    <div className="tm-widget">
      <div className="tm-head">
        <h3>{title}</h3>
        <span className="tm-ts">{ts ? new Date(ts).toLocaleTimeString() : '—'}</span>
      </div>

      <div
        className="tm-grid uniform"
        style={{
          ['--tm-cols' as any]: cols,
          ['--tm-rows' as any]: rows,
          ['--tm-row-h' as any]: `${rowHeight}px`,
        }}
      >
        {items.map((t, idx) =>
          t ? (
            <button
              key={t.symbol + idx}
              className={`tm-tile ${focus === t.symbol ? 'is-focus' : ''} ${t.changePct >= 0 ? 'up' : 'down'}`}
              style={{
                gridColumn: `span ${focus === t.symbol ? 2 : 1}`,
                gridRow:    `span ${focus === t.symbol ? 2 : 1}`,
                background: color(t.changePct),
              }}
              onClick={() => setFocus(focus === t.symbol ? null : t.symbol)}
              onDoubleClick={() => setZoom(t)}
              title={t.symbol}
            >
              <div className="tm-row">
                <span className="tm-sym">{t.symbol}</span>
                <span className="tm-ch">
                  {t.changePct >= 0 ? '▲' : '▼'} {Math.abs(t.changePct).toFixed(2)}%
                </span>
              </div>
              {focus === t.symbol && <div className="tm-price">{fmtPrice(t.price)}</div>}
            </button>
          ) : (
            // Boş kutu: grid düzenini koru
            <div key={`blank-${idx}`} className="tm-tile tm-blank" />
          )
        )}
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
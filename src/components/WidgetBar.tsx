'use client';

type Stat = {
  title: string;
  value: string;
  change?: number;      // %+/- (opsiyonel)
  sub?: string;         // küçük alt etiket (opsiyonel)
  kind?: 'gauge'|'stat' // gauge: progress bar; stat: rakam
  pct?: number;         // gauge için 0–100
};

const cls = (...xs: (string|false|undefined)[]) => xs.filter(Boolean).join(' ');

export default function WidgetBar() {
  const items: Stat[] = [
    { title: 'Fear & Greed', kind: 'gauge', pct: 59, value: '59 / 100', sub: 'Neutral' },
    { title: 'Altcoin Season', kind: 'gauge', pct: 39, value: '39 / 100', sub: 'Bitcoin > Altcoins' },
    { title: 'Total Market Cap (TOTAL)', kind: 'stat', value: '$3.89T', change: 1.13, sub: 'All Crypto' },
    { title: 'TOTAL2 (ex-BTC)', kind: 'stat', value: '$1.97T', change: 1.05, sub: 'Altcoins' },
    { title: 'TOTAL3 (ex-BTC & ETH)', kind: 'stat', value: '$0.89T', change: 0.72, sub: 'Altcoins ex-ETH' },
  ];

  return (
    <section className="widget-bar" aria-label="Market overview">
      {items.map((it) => (
        <article key={it.title} className="widget">
          <header className="widget-h">
            <span className="w-title">{it.title}</span>
          </header>

          {it.kind === 'gauge' ? (
            <div className="gauge">
              <div className="gauge-track">
                <div className="gauge-fill" style={{ width: `${Math.min(100, Math.max(0, it.pct ?? 0))}%` }} />
              </div>
              <div className="gauge-val">{it.value}</div>
              {it.sub && <div className="w-sub">{it.sub}</div>}
            </div>
          ) : (
            <div className="stat">
              <div className="stat-val">{it.value}</div>
              <div className={cls('stat-change', typeof it.change === 'number' && (it.change >= 0 ? 'up':'down'))}>
                {typeof it.change === 'number' ? (it.change >= 0 ? '▲':'▼') + ' ' + Math.abs(it.change).toFixed(2) + '%' : '—'}
              </div>
              {it.sub && <div className="w-sub">{it.sub}</div>}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
'use client';

type Item = { label: string; value: string; change?: number };

export default function TickerRow({
  items,
  variant = 'crypto',
  speed = 40, // px/s
}: { items: Item[]; variant?: 'crypto' | 'global'; speed?: number }) {
  // iki kez render ederek kesintisiz akış
  const row = (
    <div className="ticker-track" style={{ animationDuration: `${items.length * (160 / speed)}s` }}>
      {items.map((it, i) => (
        <div className="ticker-item" key={`${it.label}-${i}`}>
          <span className="ti-label">{it.label}</span>
          <span className="ti-value">{it.value}</span>
          {typeof it.change === 'number' && (
            <span className={`ti-change ${it.change >= 0 ? 'up' : 'down'}`}>
              {it.change >= 0 ? '▲' : '▼'} {Math.abs(it.change).toFixed(2)}%
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`ticker ${variant}`}>
      {row}
      {row}
    </div>
  );
}
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

type Item = { label: string; value: string; change?: number };

export default function TickerRow({
  items,
  variant = 'crypto',
  speed = 80, // px/s
}: { items: Item[]; variant?: 'crypto' | 'global'; speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [dupCount, setDupCount] = useState(1);

  // İçerik genişliği konteyneri doldurmuyorsa, tek akış kesintisiz görünsün diye çoğalt
  const extended = useMemo(() => {
    const arr: Item[] = [];
    for (let i = 0; i < dupCount; i++) arr.push(...items);
    return arr;
  }, [items, dupCount]);

  useEffect(() => {
    const resize = () => {
      const c = containerRef.current;
      const m = measureRef.current;
      if (!c || !m) return;
      // en az 2x konteyner genişliği kadar içerik olsun (50% kaydırma için)
      const itemWidth = m.scrollWidth || 1;
      const need = Math.max(2, Math.ceil((c.offsetWidth * 2) / itemWidth));
      setDupCount(need);

      // hız = px/s → süre = genişlik / hız
      const duration = (m.scrollWidth * need) / speed;
      c.style.setProperty('--duration', `${duration}s`);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [items, speed]);

  const renderRow = (hidden?: boolean) => (
    <div className="ticker-track" aria-hidden={hidden} ref={hidden ? undefined : measureRef}>
      {extended.map((it, i) => (
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
    <div className={`ticker ${variant}`} ref={containerRef}>
      {renderRow(false)}
      {renderRow(true)}
    </div>
  );
}
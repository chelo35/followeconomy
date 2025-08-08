'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type Item = { label: string; value: string; change?: number };

export default function TickerRow({
  items,
  variant = 'crypto',
  speed = 80, // px/s
}: { items: Item[]; variant?: 'crypto' | 'global'; speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(3);     // içerik 3 kez tekrarlansın
  const [baseWidth, setBaseWidth] = useState(0);

  // tek kopyayı ölçmek için ayrı bir satır render etmeye gerek kalmasın diye:
  const extended = useMemo(() => {
    const arr: Item[] = [];
    for (let i = 0; i < repeat; i++) arr.push(...items);
    return arr;
  }, [items, repeat]);

  useLayoutEffect(() => {
    const measure = () => {
      const c = containerRef.current, t = trackRef.current;
      if (!c || !t) return;
      const total = t.scrollWidth || 1;
      const single = Math.max(1, Math.floor(total / repeat));
      setBaseWidth(single);

      // en az 2x konteyner kadar single genişlik lazım
      const need = Math.max(2, Math.ceil((c.clientWidth * 2) / single));
      if (need !== repeat) { setRepeat(need); return; }

      const duration = single / speed; // px/s → saniye
      c.style.setProperty('--shift', `${single}px`);
      c.style.setProperty('--duration', `${duration}s`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current!);
    return () => ro.disconnect();
  }, [items, speed, repeat]);

  return (
    <div className={`ticker ticker-row ${variant}`} ref={containerRef}>
      <div className="ticker-track ticker-animate" ref={trackRef} style={{ width: baseWidth ? `${baseWidth * repeat}px` : undefined }}>
        {extended.map((it, i) => (
          <div className="ticker-item ticker-chip" key={`${it.label}-${i}`}>
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
    </div>
  );
}
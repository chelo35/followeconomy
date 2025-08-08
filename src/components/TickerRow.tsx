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
  const [dupCount, setDupCount] = useState(2); // en az 2 kat

  // İçeriği dupCount kez çoğalt → tek track içinde kesintisiz görünür
  const extended = useMemo(() => {
    const arr: Item[] = [];
    for (let i = 0; i < dupCount; i++) arr.push(...items);
    return arr;
  }, [items, dupCount]);

  // Ölç ve gerekli kadar çoğalt + süreyi hesapla (debounce'lu)
  useLayoutEffect(() => {
    let raf: number | null = null;
    let to: any;

    const measure = () => {
      const c = containerRef.current;
      const t = trackRef.current;
      if (!c || !t) return;

      // Tek dizinin genişliği (items bir kere)
      // extended render edilmiş olsa da, tek tekrar genişliğini bulmak için
      // toplamı dupCount'a bölüyoruz.
      const totalWidth = t.scrollWidth || 1;
      const singleWidth = Math.max(1, Math.floor(totalWidth / dupCount));

      // En az 2× konteyner genişliği kadar içerik olmalı
      const need = Math.max(2, Math.ceil((c.offsetWidth * 2) / singleWidth));
      if (need !== dupCount) setDupCount(need);

      const duration = (singleWidth * need) / speed; // px/s
      c.style.setProperty('--duration', `${duration}s`);
      c.style.setProperty('--track-width', `${singleWidth * need}px`);
    };

    const onResize = () => {
      if (to) clearTimeout(to);
      to = setTimeout(() => {
        raf = requestAnimationFrame(measure);
      }, 60);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (to) clearTimeout(to);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items, speed, dupCount]);

  return (
    <div className={`ticker ${variant}`} ref={containerRef}>
      <div className="ticker-track" ref={trackRef}>
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
    </div>
  );
}
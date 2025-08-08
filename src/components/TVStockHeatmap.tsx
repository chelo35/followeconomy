'use client';
import { useEffect, useRef } from 'react';

export default function TVStockHeatmap({ height = 360 }:{ height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = ''; // cleanup
    const s = document.createElement('script');
    s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    s.async = true;
    s.innerHTML = JSON.stringify({
      exchanges: ['NYSE','NASDAQ'],
      dataSource: 'SPX500',     // S&P 500
      grouping: 'sector',
      locale: 'en',
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      enableScrolling: false,
      showToolbar: false,
      width: '100%',
      height
    });
    ref.current.appendChild(s);
  }, []);
  return <div className="tv-widget-container" ref={ref} />;
}
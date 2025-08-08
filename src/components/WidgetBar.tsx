'use client';
import { useEffect, useRef, useState } from 'react';

type Fg = { value:number; classification:string; ts:number };
type Alt = { value:number; note:string; ts:number };
type Caps = { total:number; btc_dominance?:number; eth_dominance?:number; ts:number };

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function WidgetBar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(false);

  const [fg, setFg] = useState<Fg|null>(null);
  const [alt, setAlt] = useState<Alt|null>(null);
  const [cap, setCap] = useState<Caps|null>(null);

  useEffect(() => {
    const f = async () => {
      const [a,b,c] = await Promise.all([
        fetch(`${API}/metrics/feargreed`).then(r=>r.json()).catch(()=>null),
        fetch(`${API}/metrics/altseason`).then(r=>r.json()).catch(()=>null),
        fetch(`${API}/metrics/totalcaps`).then(r=>r.json()).catch(()=>null),
      ]);
      setFg(a); setAlt(b); setCap(c);
    };
    f();
    const id = setInterval(f, 5*60*1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = barRef.current;
    const calc = () => {
      if (!el) return;
      const needScroll = el.scrollWidth > el.clientWidth + 8;
      const notAtEnd   = el.scrollLeft < (el.scrollWidth - el.clientWidth - 8);
      setHint(needScroll && notAtEnd);
    };
    calc();
    el?.addEventListener('scroll', calc, { passive: true });
    window.addEventListener('resize', calc);
    return () => { el?.removeEventListener('scroll', calc); window.removeEventListener('resize', calc); };
  }, []);

  return (
    <div className="widget-bar-wrap" ref={wrapRef}>
      <section className="widget-bar" ref={barRef} aria-label="Market overview">
        <article className="widget">
          <header className="widget-h"><span className="w-title">Fear & Greed</span></header>
          <div className="gauge">
            <div className="gauge-track"><div className="gauge-fill" style={{width: `${fg?.value ?? 0}%`}}/></div>
            <div className="gauge-val">{fg ? `${fg.value} / 100` : '—'}</div>
            <div className="w-sub">{fg?.classification ?? '—'}</div>
          </div>
        </article>

        <article className="widget">
          <header className="widget-h"><span className="w-title">Altcoin Season</span></header>
          <div className="gauge">
            <div className="gauge-track"><div className="gauge-fill" style={{width: `${alt?.value ?? 0}%`}}/></div>
            <div className="gauge-val">{alt ? `${alt.value} / 100` : '—'}</div>
            <div className="w-sub">{alt?.note ?? '—'}</div>
          </div>
        </article>

        <article className="widget">
          <header className="widget-h"><span className="w-title">Total Market Cap</span></header>
          <div className="stat">
            <div className="stat-val">{cap?.total ? `${(cap.total/1e12).toFixed(2)}T` : '—'}</div>
            <div className="w-sub">BTC: {cap?.btc_dominance?.toFixed(1) ?? '—'}% • ETH: {cap?.eth_dominance?.toFixed(1) ?? '—'}%</div>
          </div>
        </article>
      </section>

      <div className={`scroll-hint${hint ? ' show' : ''}`} aria-hidden="true" />
    </div>
  );
}
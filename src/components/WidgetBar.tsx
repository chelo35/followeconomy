'use client';
import { useEffect, useState } from 'react';

type Fg = { value:number; classification:string; ts:number };
type Alt = { value:number; note:string; ts:number };
type Caps = { total:number; btc_dominance?:number; eth_dominance?:number; ts:number };

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function WidgetBar() {
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

  return (
    <section className="widget-bar" aria-label="Market overview">
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
  );
}
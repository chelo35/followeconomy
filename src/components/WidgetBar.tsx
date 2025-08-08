'use client';

type Stat =
  | { type:'gauge'; title:string; pct:number; value:string; sub?:string }
  | { type:'stat';  title:string; value:string; change?:number; sub?:string };

export default function WidgetBar() {
  const items: Stat[] = [
    { type:'gauge', title:'Fear & Greed', pct:59, value:'59 / 100', sub:'Neutral' },
    { type:'gauge', title:'Altcoin Season', pct:39, value:'39 / 100', sub:'Bitcoin > Altcoins' },
    { type:'stat',  title:'Total Market Cap (TOTAL)',  value:'$3.89T', change:1.13, sub:'All Crypto' },
    { type:'stat',  title:'TOTAL2 (ex-BTC)',           value:'$1.97T', change:1.05, sub:'Altcoins' },
    { type:'stat',  title:'TOTAL3 (ex-BTC & ETH)',     value:'$0.89T', change:0.72, sub:'Altcoins ex-ETH' },
    { type:'stat',  title:'BTC Dominance',             value:'59.8%',  change:0.10, sub:'BTC share' },
    { type:'stat',  title:'DXY (US Dollar Index)',     value:'104.9',  change:-0.12 },
    { type:'stat',  title:'S&P 500',                   value:'5,592',  change:0.31 },
    { type:'stat',  title:'Nasdaq 100',                value:'18,321', change:0.48 },
    { type:'stat',  title:'Dow Jones',                 value:'40,102', change:-0.05 },
  ];

  return (
    <section className="widget-bar widgets" aria-label="Market overview">
      {items.map((it) => (
        <article key={it.title} className="widget widget--tight widget-card">
          <header className="widget-h"><span className="w-title title">{it.title}</span></header>
          {it.type === 'gauge' ? (
            <div className="gauge">
              <div className="gauge-track"><div className="gauge-fill" style={{ width: `${it.pct}%` }} /></div>
              <div className="gauge-val">{it.value}</div>
              {it.sub && <div className="w-sub">{it.sub}</div>}
            </div>
          ) : (
            <div className="stat">
              <div className="stat-val">{it.value}</div>
              <div className={`stat-change ${typeof it.change==='number' ? (it.change>=0?'up':'down') : ''}`}>
                {typeof it.change==='number' ? `${it.change>=0?'▲':'▼'} ${Math.abs(it.change).toFixed(2)}%` : '—'}
              </div>
              {it.sub && <div className="w-sub">{it.sub}</div>}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
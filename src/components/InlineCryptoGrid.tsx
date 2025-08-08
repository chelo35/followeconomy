'use client';
import { useEffect, useState } from 'react';

type Row = { symbol: string; price: number; changePct: number };
const ORDER = ['BTC','ETH','SOL','XRP','BNB','AVAX','HBAR','ADA','XLM','DOGE','LINK','AAVE','ENA','TRX','DOT','SUI'];

function fmtPrice(p:number){
  const v=Math.abs(p);
  if(!isFinite(p)) return '—';
  if(v>=1000) return Math.round(p).toLocaleString('en-US');
  if(v>=100)  return p.toFixed(2);
  if(v>=1)    return p.toFixed(2);
  if(v>=0.1)  return p.toFixed(3);
  if(v>=0.01) return p.toFixed(4);
  if(v>=0.001) return p.toFixed(5);
  if(v>=0.0001) return p.toFixed(6);
  if(v>=0.00001) return p.toFixed(7);
  if(v>=0.000001) return p.toFixed(8);
  return p.toFixed(9);
}

export default function InlineCryptoGrid(){
  const [items,setItems]=useState<Row[]>([]);
  const [ts,setTs]=useState<number>(Date.now());

  useEffect(()=>{ (async ()=>{
    const r=await fetch('/api/crypto-grid?cb='+Date.now(),{cache:'no-store'});
    const j=await r.json();
    const got:Row[]=(j.items||[]);
    // 4×4 grid: sıralamayı sabitle
    const filled = ORDER.map(s => got.find(x=>x.symbol?.toUpperCase()===s) ?? {symbol:s,price:0,changePct:0});
    setItems(filled); setTs(j.ts||Date.now());
  })(); },[]);

  const card:React.CSSProperties={border:'1px solid rgba(0,0,0,.12)',borderRadius:12,padding:8,overflow:'hidden'};
  const wrap:React.CSSProperties={border:'1px solid rgba(0,0,0,.15)',borderRadius:14,padding:10,background:'rgba(0,0,0,.03)'};

  return (
    <div style={wrap}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
        <h3 style={{margin:0,fontSize:14}}>Crypto Grid</h3>
        <span style={{fontSize:11,opacity:.65}}>{new Date(ts).toLocaleTimeString()}</span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gridAutoRows:'56px',gap:8}}>
        {items.map(it=>{
          const a=0.18+Math.min(8,Math.abs(it.changePct))/8*0.45;
          const bg=`rgba(${it.changePct>=0?'46,204,113':'231,76,60'},${a.toFixed(2)})`;
          return (
            <div key={it.symbol} style={{...card,background:bg}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:6}}>
                <span style={{fontWeight:800,fontSize:13,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{it.symbol}</span>
                <span style={{fontVariantNumeric:'tabular-nums',fontSize:12}}>{it.changePct>=0?'▲':'▼'} {Math.abs(it.changePct).toFixed(2)}%</span>
              </div>
              <div style={{fontVariantNumeric:'tabular-nums',fontSize:13,fontWeight:700}}>{fmtPrice(it.price)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
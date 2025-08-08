'use client';
export default function CryptoBubbles({ height = 360 }:{ height?: number }) {
  const dark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const theme = dark ? 'dark' : 'light';
  const src = `https://cryptobubbles.net/embed?theme=${theme}&symbol_type=symbol&show_24h_change=true&show_name=true&show_ticker=true&show_icon=true&show_perc=true&limit=120`;
  return (
    <iframe src={src} style={{ width:'100%', height, border:0, borderRadius:12 }} loading="lazy" />
  );
}
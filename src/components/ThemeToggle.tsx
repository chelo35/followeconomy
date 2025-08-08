'use client';

export default function ThemeToggle() {
  const set = (t: 'light' | 'dark') => {
    document.body.className = t;
    localStorage.setItem('fe-theme', t);
  };

  return (
    <div className="theme-toggle" aria-label="Tema">
      <button onClick={() => set('light')} className="tt-btn">🌕</button>
      <button onClick={() => set('dark')}  className="tt-btn">🌑</button>
    </div>
  );
}
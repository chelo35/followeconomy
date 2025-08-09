'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  "Markets","News","Crypto News","Economy News","Economic Calendar",
  "Charts","Watchlist","Alerts","AI Insights",
  "On-chain Data","Derivatives","Macro","Research",
  "FollowEconomy Pro","Settings","Language","Theme"
];

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function TopHeader() {
  const [lang, setLang] = useState('en');
  const [openSheet, setOpenSheet] = useState(false);
  const [page, setPage] = useState(0);
  const pagerRef = useRef<HTMLDivElement>(null);

  // 1 sayfada 8 link (2 sütun x 4 satır)
  const pages = useMemo(() => chunk(NAV_ITEMS, 8), []);

  // dots tıklanınca ilgili sayfaya kaydır
  const goTo = (i: number) => {
    const el = pagerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollTo({ left: i * w, behavior: "smooth" });
    setPage(i);
  };

  // scroll ile aktif sayfayı takip et
  const onScroll = () => {
    const el = pagerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== page) setPage(i);
  };

  return (
    <>
      {/* DESKTOP: mevcut header burada kalıyor */}
      <header className="topbar desktop-only">
      <div className="topbar-inner grid">
        {/* Logo */}
        <a href="/" className="logo" aria-label="FollowEconomy">
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary-light)" />
                <stop offset="100%" stopColor="var(--secondary-light)" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#lg)" />
            <path d="M6 13l3 3 9-9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="logo-text">
            <strong>FollowEconomy</strong>
            <span>www.followeconomy.com</span>
          </div>
        </a>

        <nav className="mainnav" aria-label="Main">
          <div className="nav-rail">
            <Link className="nav-link" href="/">Markets</Link>
            <Link className="nav-link" href="/news">News</Link>
            <Link className="nav-link" href="/news#crypto">Crypto News</Link>
            <Link className="nav-link" href="/news#economy">Economy News</Link>
            <Link className="nav-link" href="/calendar">Economic Calendar</Link>
            <a className="nav-link" href="#">Charts</a>
            <a className="nav-link" href="#">Watchlist</a>
            <a className="nav-link" href="#">Alerts</a>
            <a className="nav-link" href="#">On-chain Data</a>
            <a className="nav-link" href="#">AI Insights</a>
            <a className="nav-link" href="#">Derivatives</a>
            <a className="nav-link" href="#">Macro</a>
            {/* Research burada OLMAYACAK */}
          </div>
        </nav>

        {/* Right controls */}
        <div className="topbar-right">
          {/* >>> Pro alanı */}
          <div className="pro-slot">
            <a href="/research" className="pro-link">Research</a>
            <a href="/pro" className="pro-cta fe-pro-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 8l4 3 5-7 5 7 4-3-2 10H5L3 8z" fill="currentColor"/>
              </svg>
              <span>FollowEconomy</span>
              <strong>Pro</strong>
            </a>
          </div>

          <input className="search site-search" placeholder="Search on site…" aria-label="Search" />
          <ThemeToggle />
          <div className="auth">
            <button className="btn ghost">Log in</button>
            <button className="btn solid">Sign up</button>
          </div>
          <select className="lang" aria-label="Language" value={lang} onChange={(e)=>setLang(e.target.value)}>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="tr">TR</option>
          </select>
        </div>
      </div>
    </header>

      {/* MOBILE COMPACT HEADER */}
      <div className="topbar-mobile mobile-only">
        <div className="m-left">
          <a href="/" className="logo-sm">FollowEconomy</a>
        </div>
        <div className="m-right">
          <button className="icon-btn" aria-label="Search">🔍</button>
          <button className="icon-btn" aria-label="Theme">🌓</button>
          <a className="icon-btn" href="/login" aria-label="Login">↪︎</a>
          <button className="icon-btn" aria-label="Menu" onClick={() => setOpenSheet(true)}>⋯</button>
        </div>
      </div>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="bottom-nav mobile-only">
        <Link href="/" className="tab">Markets</Link>
        <Link href="/news" className="tab">News</Link>
        <Link href="/news#crypto" className="tab">Crypto</Link>
        <Link href="/calendar" className="tab">Calendar</Link>
        <button className="tab more" onClick={() => setOpenSheet(true)}>More</button>
      </nav>

      {/* MOBILE NAV SHEET */}
      {openSheet && (
        <div className="sheet-backdrop" onClick={() => setOpenSheet(false)}>
          <div className="sheet" onClick={(e)=>e.stopPropagation()}>
            <div className="sheet-head">
              <strong>Navigation</strong>
              <button className="icon-btn" onClick={() => setOpenSheet(false)}>✕</button>
            </div>

            {/* PAGER */}
            <div
              ref={pagerRef}
              className="sheet-pager"
              onScroll={onScroll}
            >
              {pages.map((items, idx) => (
                <div className="sheet-page" key={idx} aria-roledescription="page">
                  <div className="sheet-grid">
                    {items.map((label) => {
                      const href =
                        label === "Markets" ? "/" :
                        label === "News" ? "/news" :
                        label === "Crypto News" ? "/news#crypto" :
                        label === "Economy News" ? "/news#economy" :
                        label === "Economic Calendar" ? "/calendar" :
                        label === "FollowEconomy Pro" ? "/pro" :
                        `/${label.toLowerCase().replaceAll(' ','-')}`;
                      return (
                        <Link href={href} key={label} onClick={() => setOpenSheet(false)}>
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* DOTS */}
            <div className="sheet-dots" role="tablist" aria-label="Pages">
              {pages.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i===page?'active':''}`}
                  aria-label={`Go to page ${i+1}`}
                  aria-selected={i===page}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
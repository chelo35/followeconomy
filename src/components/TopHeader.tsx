'use client';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function TopHeader() {
  const [lang, setLang] = useState('en');

  return (
    <header className="topbar">
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
          <a className="nav-link" href="#">Markets</a>
          <a className="nav-link" href="#">News</a>
          <a className="nav-link" href="#">Crypto News</a>
          <a className="nav-link" href="#">Economic Calendar</a>
          <a className="nav-link" href="#">Charts</a>
          <a className="nav-link" href="#">Watchlist</a>
          <a className="nav-link" href="#">Alerts</a>
          <a className="nav-link" href="#">On-chain Data</a>
          <a className="nav-link" href="#">AI Insights</a>
          <a className="nav-link" href="#">Derivatives</a>
          <a className="nav-link" href="#">Macro</a>
          {/* Research burada OLMAYACAK */}
        </nav>

        {/* Right controls */}
        <div className="topbar-right">
          {/* >>> Pro alanı */}
          <div className="pro-slot">
            <a href="/research" className="pro-link">Research</a>
            <a href="/pro" className="pro-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 8l4 3 5-7 5 7 4-3-2 10H5L3 8z" fill="currentColor"/>
              </svg>
              <span>FollowEconomy</span>
              <strong>Pro</strong>
            </a>
          </div>

          <input className="search" placeholder="Search on site…" aria-label="Search" />
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
  );
}
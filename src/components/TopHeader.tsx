import ThemeToggle from './ThemeToggle';

export default function TopHeader() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
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

        {/* Nav (kripto odaklı) */}
        <nav className="mainnav" aria-label="Ana menü">
          <a className="nav-link" href="#">On-Chain Veriler</a>
          <a className="nav-link" href="#">Kripto Sinyal Botları</a>
          <a className="nav-link" href="#">Kripto ETF'leri</a>
          <a className="nav-link" href="#">Coin Haberleri</a>
          <a className="nav-link" href="#">Geliştirme Güncellemeleri</a>
        </nav>

        {/* Tema */}
        <ThemeToggle />
      </div>
    </header>
  );
}
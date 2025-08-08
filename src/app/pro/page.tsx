export const metadata = { title: 'FollowEconomy Pro — Plans' };

type Plan = {
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  features: string[];
  cta: { href: string; label: string };
};

const plans: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    features: [
      'Real-time tickers & news',
      'Basic watchlist',
      'Light/Dark theme',
    ],
    cta: { href: '/signup', label: 'Get Started' },
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    highlight: true,
    features: [
      'AI Insights & alerts',
      'On-chain dashboards',
      'Research notes (Pro)',
      'Ad-free experience',
      'Priority support',
    ],
    cta: { href: '/checkout/pro', label: 'Start Pro' },
  },
  {
    name: 'Pro+',
    price: '$39',
    period: '/mo',
    features: [
      'Everything in Pro',
      'Advanced signal bots',
      'API access (coming soon)',
      'Early features',
    ],
    cta: { href: '/checkout/pro-plus', label: 'Choose Pro+' },
  },
];

export default function ProPage() {
  return (
    <main className="container">
      <section className="pricing-hero">
        <h1>FollowEconomy <span className="gold">Pro</span></h1>
        <p>Deeper research, smarter alerts, on-chain analytics — all in one place.</p>
      </section>

      <section className="pricing-grid" aria-label="Plans">
        {plans.map((p) => (
          <article key={p.name} className={`pricing-card ${p.highlight ? 'is-popular' : ''}`}>
            {p.highlight && <div className="popular">Most Popular</div>}
            <header className="pricing-head">
              <h3>{p.name}</h3>
              <div className="price">
                <span className="amount">{p.price}</span>
                <span className="period">{p.period}</span>
              </div>
            </header>
            <ul className="features">
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a className={`pricing-cta ${p.highlight ? 'gold-btn' : ''}`} href={p.cta.href}>
              {p.cta.label}
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
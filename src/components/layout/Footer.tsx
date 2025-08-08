export default function Footer() {
  const footerSections = [
    {
      title: 'Cryptocurrencies',
      links: [
        'Bitcoin (BTC)',
        'Ethereum (ETH)', 
        'Solana (SOL)',
        'Cardano (ADA)',
        'Polygon (MATIC)',
        'Chainlink (LINK)',
        'View All Cryptos'
      ]
    },
    {
      title: 'Global Markets',
      links: [
        'US Stocks',
        'European Markets',
        'Asian Markets', 
        'Forex',
        'Commodities',
        'Indices',
        'Bonds'
      ]
    },
    {
      title: 'Tools & Analysis',
      links: [
        'Technical Analysis',
        'Economic Calendar',
        'Market Screener',
        'Portfolio Tracker',
        'Risk Calculator',
        'AI Insights',
        'Price Alerts'
      ]
    },
    {
      title: 'Education & Resources',
      links: [
        'Trading Academy',
        'Crypto Education',
        'Market Analysis',
        'Investment Guides',
        'Risk Management',
        'API Documentation',
        'Mobile Apps'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Contact',
        'Careers',
        'Press',
        'Terms of Service',
        'Privacy Policy',
        'Risk Disclosure'
      ]
    }
  ]

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10 mt-16 py-12">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-[#00d4ff] mb-4 text-lg font-semibold">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href="#"
                    className="block text-[#a0aec0] text-sm transition-colors duration-300 hover:text-[#00d4ff]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-[#a0aec0] text-sm">
            &copy; 2025 CryptoMarkets Pro. All rights reserved. | The content on this website is for informational purposes only and does not constitute investment advice. Trading involves risk.
          </p>
        </div>
      </div>
    </footer>
  )
}
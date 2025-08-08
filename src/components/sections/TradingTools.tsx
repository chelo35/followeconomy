"use client"

export default function TradingTools() {
  const tools = [
    {
      icon: '📊',
      title: 'Position Size Calculator',
      description: 'Calculate optimal position sizes based on your risk tolerance and account balance. Includes crypto-specific volatility adjustments.',
      action: 'Launch Calculator'
    },
    {
      icon: '💱',
      title: 'Multi-Currency Converter',
      description: 'Convert between 150+ fiat currencies and 5000+ cryptocurrencies with real-time exchange rates and historical data.',
      action: 'Open Converter'
    },
    {
      icon: '📈',
      title: 'Profit/Loss Calculator',
      description: 'Calculate potential profits, losses, and returns for various trading scenarios including leverage and fees.',
      action: 'Calculate P&L'
    },
    {
      icon: '🤖',
      title: 'AI Risk Analyzer',
      description: 'Advanced machine learning models analyze your portfolio risk and provide personalized recommendations.',
      action: 'Analyze Risk'
    },
    {
      icon: '⚡',
      title: 'Compound Interest Calculator',
      description: 'Plan your long-term crypto investments with compound interest calculations and DCA strategies.',
      action: 'Calculate Growth'
    },
    {
      icon: '🎯',
      title: 'Technical Analysis Scanner',
      description: 'AI-powered technical analysis across 1000+ crypto and traditional assets with buy/sell signals.',
      action: 'Start Scanning'
    },
    {
      icon: '💰',
      title: 'DeFi Yield Calculator',
      description: 'Compare yields across different DeFi protocols, calculate impermanent loss, and optimize your farming strategies.',
      action: 'Calculate Yields'
    },
    {
      icon: '🔮',
      title: 'Market Sentiment Analyzer',
      description: 'Real-time sentiment analysis from social media, news, and market data using advanced NLP algorithms.',
      action: 'Analyze Sentiment'
    },
    {
      icon: '📋',
      title: 'Portfolio Tracker',
      description: 'Track your crypto and traditional asset portfolio performance with advanced analytics and tax reporting.',
      action: 'Track Portfolio'
    }
  ]

  const handleToolClick = (toolTitle: string) => {
    console.log(`Opening ${toolTitle} tool`)
    // Bu kısım gerçek uygulamada modal açacak veya yeni sayfaya yönlendirecek
  }

  return (
    <div className="mt-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[#00d4ff] bg-clip-text text-transparent">
          🛠️ Professional Trading Tools
        </h2>
        <p className="text-[#a0aec0] text-lg">
          Advanced calculators, converters, and AI-powered analysis tools
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-[#00d4ff]/10 to-[#5a67d8]/10 rounded-[20px] p-8 border border-[#00d4ff]/20 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,212,255,0.2)] group cursor-pointer"
            onClick={() => handleToolClick(tool.title)}
          >
            <div className="w-15 h-15 bg-gradient-to-r from-[#00d4ff] to-[#5a67d8] rounded-2xl flex items-center justify-center text-2xl mb-6">
              {tool.icon}
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3">
              {tool.title}
            </h3>
            
            <p className="text-[#a0aec0] mb-6 leading-relaxed">
              {tool.description}
            </p>
            
            <button className="w-full bg-gradient-to-r from-[#00d4ff] to-[#5a67d8] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,212,255,0.3)]">
              {tool.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
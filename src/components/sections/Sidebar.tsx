'use client'
import { useState } from 'react'

export default function Sidebar() {
  const [fearGreedIndex] = useState(67)

  const marketOverviewData = [
    { label: 'Total Market Cap', value: '$1.68T', change: '+2.5%', positive: true },
    { label: '24h Volume', value: '$87.3B', change: '-5.2%', positive: false },
    { label: 'BTC Dominance', value: '52.3%', change: '+0.8%', positive: true },
    { label: 'ETH Dominance', value: '17.1%', change: '-0.3%', positive: false },
    { label: 'DeFi TVL', value: '$67.2B', change: '+8.3%', positive: true }
  ]

  const onChainData = [
    { network: 'Bitcoin', metric: 'Hash Rate', value: '450 EH/s', change: '+6.5%', positive: true },
    { network: 'Bitcoin', metric: 'Difficulty', value: '62.46T', change: '+3.2%', positive: true },
    { network: 'Bitcoin', metric: 'Mempool', value: '15MB', change: '-12.2%', positive: false },
    { network: 'Ethereum', metric: 'Gas Price', value: '25 gwei', change: '-8.4%', positive: false },
    { network: 'Ethereum', metric: 'Block Time', value: '12.1s', change: '+0.5%', positive: false },
    { network: 'Ethereum', metric: 'Validators', value: '875K', change: '+2.1%', positive: true }
  ]

  const topMovers = [
    { name: 'SOL', price: '$98.75', change: '+245%', positive: true },
    { name: 'AVAX', price: '$36.80', change: '+156%', positive: true },
    { name: 'LINK', price: '$14.32', change: '+98%', positive: true }
  ]

  const exchangeFlows = [
    { exchange: 'Binance', inflow: 35.6, outflow: 23.4, net: 12.2 },
    { exchange: 'Coinbase', inflow: 18.9, outflow: 31.2, net: -12.3 },
    { exchange: 'Kraken', inflow: 8.7, outflow: 6.3, net: 2.4 },
    { exchange: 'OKX', inflow: 15.2, outflow: 13.8, net: 1.4 }
  ]

  const getFearGreedColor = (index: number) => {
    if (index < 25) return 'text-red-600'
    if (index < 45) return 'text-orange-500'
    if (index < 55) return 'text-yellow-500'
    if (index < 75) return 'text-green-500'
    return 'text-green-600'
  }

  const getFearGreedLabel = (index: number) => {
    if (index < 25) return 'Extreme Fear'
    if (index < 45) return 'Fear'
    if (index < 55) return 'Neutral'
    if (index < 75) return 'Greed'
    return 'Extreme Greed'
  }

  return (
    <aside className="w-80 bg-[#2d2a46] border-l border-[#34314c] h-screen overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Fear & Greed Index */}
        <div className="cmc-card p-4">
          <h3 className="cmc-heading text-lg mb-4 flex items-center">
            🎯 Fear & Greed Index
          </h3>
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r="54"
                  fill="none" stroke="#e5e7eb" strokeWidth="8"
                />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none" stroke={fearGreedIndex >= 75 ? '#10b981' : fearGreedIndex >= 55 ? '#84cc16' : fearGreedIndex >= 45 ? '#eab308' : fearGreedIndex >= 25 ? '#f97316' : '#ef4444'}
                  strokeWidth="8"
                  strokeDasharray={`${fearGreedIndex * 3.39} 339`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getFearGreedColor(fearGreedIndex)}`}>
                    {fearGreedIndex}
                  </div>
                  <div className={`text-sm font-medium ${getFearGreedColor(fearGreedIndex)}`}>
                    {getFearGreedLabel(fearGreedIndex)}
                  </div>
                </div>
              </div>
            </div>
            <p className="cmc-text-secondary text-sm">Market sentiment analysis</p>
          </div>
        </div>

        {/* Market Overview */}
        <div className="cmc-card p-4">
          <h3 className="cmc-heading text-lg mb-4 flex items-center">
            📊 Market Overview <span className="ml-2 text-sm font-normal cmc-text-success">LIVE</span>
          </h3>
          <div className="space-y-3">
            {marketOverviewData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="cmc-text-secondary text-sm">{item.label}</span>
                <div className="text-right">
                  <div className="text-white font-medium text-sm">{item.value}</div>
                  <div className={`text-xs font-medium ${item.positive ? 'cmc-text-success' : 'cmc-text-error'}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OnChain Metrics */}
        <div className="cmc-card p-4">
          <h3 className="cmc-heading text-lg mb-4 flex items-center">
            ⛓️ OnChain Metrics
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="cmc-text-secondary text-sm font-medium mb-2">Bitcoin Network</h4>
              <div className="space-y-2">
                {onChainData.filter(item => item.network === 'Bitcoin').map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="cmc-text-secondary text-xs">{item.metric}</span>
                    <div className="text-right">
                      <div className="text-white text-xs font-medium">{item.value}</div>
                      <div className={`text-xs ${item.positive ? 'cmc-text-success' : 'cmc-text-error'}`}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="cmc-text-secondary text-sm font-medium mb-2">Ethereum Network</h4>
              <div className="space-y-2">
                {onChainData.filter(item => item.network === 'Ethereum').map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="cmc-text-secondary text-xs">{item.metric}</span>
                    <div className="text-right">
                      <div className="text-white text-xs font-medium">{item.value}</div>
                      <div className={`text-xs ${item.positive ? 'cmc-text-success' : 'cmc-text-error'}`}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Movers */}
        <div className="cmc-card p-4">
          <h3 className="cmc-heading text-lg mb-4 flex items-center">
            🚀 Top Movers (24h)
          </h3>
          <div className="space-y-3">
            {topMovers.map((coin, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></div>
                  <span className="text-white text-sm font-medium">{coin.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-medium">{coin.price}</div>
                  <div className="cmc-text-success text-xs font-medium">{coin.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange Flows */}
        <div className="cmc-card p-4">
          <h3 className="cmc-heading text-lg mb-4 flex items-center">
            💹 Exchange Flows (24h)
          </h3>
          <div className="cmc-text-secondary text-xs mb-3">Net flow in millions USD</div>
          <div className="space-y-3">
            {exchangeFlows.map((exchange, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{exchange.exchange}</span>
                  <span className={`text-sm font-medium ${exchange.net >= 0 ? 'cmc-text-success' : 'cmc-text-error'}`}>
                    {exchange.net >= 0 ? '+' : ''}${exchange.net.toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between cmc-text-secondary text-xs">
                  <span>In: ${exchange.inflow}M</span>
                  <span>Out: ${exchange.outflow}M</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="cmc-card p-4">
          <h3 className="cmc-heading text-lg mb-4 flex items-center">
            🛠️ Quick Tools
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-[#3861fb] hover:bg-[#3a3653] rounded transition-colors cmc-button">
              📊 Position Calculator
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[#3861fb] hover:bg-[#3a3653] rounded transition-colors cmc-button">
              💱 Currency Converter
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[#3861fb] hover:bg-[#3a3653] rounded transition-colors cmc-button">
              📈 Profit Calculator
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-[#3861fb] hover:bg-[#3a3653] rounded transition-colors cmc-button">
              📊 % Calculator
            </button>
          </div>
        </div>

      </div>
    </aside>
  )
}
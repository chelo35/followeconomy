'use client'
import { useState } from 'react'

const cryptoData = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 43622.97, change1h: 0.12, change24h: 2.40, change7d: 5.80, volume: 28500000000, marketCap: 845000000000, circulatingSupply: '19.75M BTC', icon: '₿', color: 'from-orange-400 to-yellow-500' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 2260.03, change1h: -0.23, change24h: -1.06, change7d: 3.20, volume: 15300000000, marketCap: 275000000000, circulatingSupply: '120.4M ETH', icon: 'Ξ', color: 'from-blue-400 to-purple-500' },
  { rank: 3, name: 'BNB', symbol: 'BNB', price: 315.43, change1h: 0.08, change24h: 0.70, change7d: -2.10, volume: 1200000000, marketCap: 47000000000, circulatingSupply: '149.5M BNB', icon: 'B', color: 'from-yellow-400 to-orange-500' },
  { rank: 4, name: 'Solana', symbol: 'SOL', price: 98.66, change1h: 1.23, change24h: 5.68, change7d: 12.30, volume: 2800000000, marketCap: 41200000000, circulatingSupply: '417.9M SOL', icon: 'S', color: 'from-purple-400 to-pink-500' },
  { rank: 5, name: 'XRP', symbol: 'XRP', price: 0.62, change1h: -0.45, change24h: -2.05, change7d: 1.80, volume: 1800000000, marketCap: 33500000000, circulatingSupply: '53.9B XRP', icon: 'X', color: 'from-gray-400 to-blue-500' },
  { rank: 6, name: 'Cardano', symbol: 'ADA', price: 0.52, change1h: 0.34, change24h: 3.26, change7d: 8.90, volume: 1200000000, marketCap: 18200000000, circulatingSupply: '35.0B ADA', icon: 'A', color: 'from-blue-400 to-teal-500' },
  { rank: 7, name: 'Avalanche', symbol: 'AVAX', price: 36.60, change1h: -0.78, change24h: -2.05, change7d: -1.20, volume: 800000000, marketCap: 13100000000, circulatingSupply: '358.2M AVAX', icon: 'Δ', color: 'from-red-400 to-pink-500' },
  { rank: 8, name: 'Polygon', symbol: 'MATIC', price: 0.92, change1h: 0.56, change24h: 1.63, change7d: 7.80, volume: 900000000, marketCap: 8400000000, circulatingSupply: '9.1B MATIC', icon: 'P', color: 'from-purple-500 to-indigo-500' },
  { rank: 9, name: 'Chainlink', symbol: 'LINK', price: 14.32, change1h: 0.89, change24h: 4.27, change7d: 8.94, volume: 650000000, marketCap: 7800000000, circulatingSupply: '544.5M LINK', icon: 'L', color: 'from-blue-400 to-cyan-500' },
  { rank: 10, name: 'Toncoin', symbol: 'TON', price: 5.47, change1h: -0.12, change24h: 2.15, change7d: 6.33, volume: 890000000, marketCap: 13900000000, circulatingSupply: '2.5B TON', icon: 'T', color: 'from-blue-500 to-purple-500' },
]

export default function CryptoMarketsTable() {
  const [activeTab, setActiveTab] = useState('top100')

  const formatPrice = (price: number) => {
    if (price < 1) return `${price.toFixed(4)}`
    if (price < 100) return `${price.toFixed(2)}`
    return `${price.toLocaleString()}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000000) return `${(volume / 1000000000).toFixed(1)}B`
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    return `${volume.toLocaleString()}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) return `${(marketCap / 1000000000).toFixed(0)}B`
    if (marketCap >= 1000000) return `${(marketCap / 1000000).toFixed(0)}M`
    return `${marketCap.toLocaleString()}`
  }

  return (
    <section className="bg-[#1e1932] py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section Header - CoinMarketCap Style */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="cmc-heading text-2xl mb-2">Today's Cryptocurrency Prices by Market Cap</h1>
            <p className="cmc-text-secondary text-sm">
              The global cryptocurrency market cap today is $1.68 Trillion, a <span className="cmc-text-success">2.5%</span> change in the last 24 hours.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse"></div>
              <span className="cmc-text-secondary">Live prices</span>
            </div>
          </div>
        </div>

        {/* CoinMarketCap Table */}
        <div className="cmc-table">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4">#</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-right py-3 px-4">Price</th>
                  <th className="text-right py-3 px-4">1h%</th>
                  <th className="text-right py-3 px-4">24h%</th>
                  <th className="text-right py-3 px-4">7d%</th>
                  <th className="text-right py-3 px-4">Market Cap</th>
                  <th className="text-right py-3 px-4">Volume(24h)</th>
                  <th className="text-right py-3 px-4">Circulating Supply</th>
                  <th className="text-center py-3 px-4">Last 7 Days</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((crypto) => (
                  <tr key={crypto.symbol} className="cmc-fade-in">
                    <td className="py-4 px-4">
                      <span className="font-medium text-[#a7a7cc]">{crypto.rank}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center text-white font-bold text-sm`}>
                          {crypto.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{crypto.name}</div>
                          <div className="text-xs text-[#a7a7cc]">{crypto.symbol}</div>
                        </div>
                        <button className="text-[#a7a7cc] hover:text-white text-xs">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-white">${formatPrice(crypto.price)}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${crypto.change1h >= 0 ? 'cmc-text-success' : 'cmc-text-error'}`}>
                        {crypto.change1h >= 0 ? '+' : ''}{crypto.change1h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${crypto.change24h >= 0 ? 'cmc-text-success' : 'cmc-text-error'}`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${crypto.change7d >= 0 ? 'cmc-text-success' : 'cmc-text-error'}`}>
                        {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-medium text-white">${formatMarketCap(crypto.marketCap)}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-medium text-white">${formatVolume(crypto.volume)}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-[#a7a7cc] text-sm">{crypto.circulatingSupply}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`h-12 w-20 rounded bg-gradient-to-r ${
                        crypto.change7d >= 0 
                          ? 'from-green-500/20 to-green-400/20' 
                          : 'from-red-500/20 to-red-400/20'
                      } flex items-center justify-center`}>
                        <svg className="w-12 h-6" viewBox="0 0 48 24">
                          <path 
                            d={`M 2 ${12 + (Math.random() - 0.5) * 10} 
                               Q 12 ${12 + (Math.random() - 0.5) * 8} 
                                 24 ${12 + (Math.random() - 0.5) * 6} 
                               T 46 ${12 + (crypto.change7d * 0.2)}`}
                            stroke={crypto.change7d >= 0 ? '#00d4aa' : '#ea3943'}
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - CoinMarketCap Style */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-4">
            <span className="cmc-text-secondary text-sm">Show rows:</span>
            <select className="bg-[#2d2a46] border border-[#34314c] rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-[#3861fb]">
              <option>100</option>
              <option>50</option>
              <option>20</option>
            </select>
            <div className="flex items-center space-x-2">
              <button className="bg-[#2d2a46] border border-[#34314c] rounded px-3 py-1 text-white text-sm hover:bg-[#3a3653] transition-colors">
                Load More
              </button>
              <button className="bg-[#3861fb] hover:bg-[#4a73fc] text-white px-4 py-1 rounded text-sm font-medium transition-colors">
                View All ➜
              </button>
            </div>
          </div>
          <div className="cmc-text-secondary text-sm">
            Showing 1-10 of 2,847 cryptocurrencies
          </div>
        </div>
      </div>
    </section>
  )
}
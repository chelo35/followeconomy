'use client'
import { useState } from 'react'

const cryptoData = [
  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: 43622.97, change24h: 2.40, change7d: 5.80, volume: 28500000000, marketCap: 845000000000, icon: '₿' },
  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: 2260.03, change24h: -1.06, change7d: 3.20, volume: 15300000000, marketCap: 275000000000, icon: 'Ξ' },
  { rank: 3, name: 'BNB', symbol: 'BNB', price: 315.43, change24h: 0.70, change7d: -2.10, volume: 1200000000, marketCap: 47000000000, icon: 'B' },
  { rank: 4, name: 'Solana', symbol: 'SOL', price: 98.66, change24h: 5.68, change7d: 12.30, volume: 2800000000, marketCap: 41200000000, icon: 'S' },
  { rank: 5, name: 'XRP', symbol: 'XRP', price: 0.62, change24h: -2.05, change7d: 1.80, volume: 1800000000, marketCap: 33500000000, icon: 'X' },
  { rank: 6, name: 'Cardano', symbol: 'ADA', price: 0.52, change24h: 3.26, change7d: 8.90, volume: 1200000000, marketCap: 18200000000, icon: 'A' },
  { rank: 7, name: 'Avalanche', symbol: 'AVAX', price: 36.60, change24h: -2.05, change7d: -1.20, volume: 800000000, marketCap: 13100000000, icon: 'Δ' },
  { rank: 8, name: 'Polygon', symbol: 'MATIC', price: 0.92, change24h: 1.63, change7d: 7.80, volume: 900000000, marketCap: 8400000000, icon: 'P' },
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
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cryptocurrency Markets</h2>
          <div className="text-sm text-gray-600">
            Updated every 5 seconds • Market Cap: $1.68T • 24h Vol: $87.3B • BTC Dominance: 52.3%
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          {[
            { id: 'top100', label: 'Top 100' },
            { id: 'trending', label: 'Trending' },
            { id: 'new', label: 'New Listings' },
            { id: 'volume', label: 'Volume Leaders' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Crypto Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h%</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">7d%</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (24h)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Chart</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cryptoData.map((crypto) => (
                  <tr key={crypto.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {crypto.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            {crypto.icon}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                          <div className="text-sm text-gray-500">{crypto.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatPrice(crypto.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className={`${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className={`${crypto.change7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.change7d >= 0 ? '+' : ''}{crypto.change7d.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {formatVolume(crypto.volume)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {formatMarketCap(crypto.marketCap)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="h-12 w-24 bg-gradient-to-r from-green-400 to-blue-500 rounded opacity-20"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Show More Button */}
        <div className="text-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors">
            View All Cryptocurrencies
          </button>
        </div>
      </div>
    </section>
  )
}
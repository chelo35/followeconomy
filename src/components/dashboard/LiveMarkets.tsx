'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Star, Activity, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercentage, abbreviateNumber } from '@/lib/utils'

interface CryptoAsset {
  rank: number
  symbol: string
  name: string
  price: number
  change24h: number
  change7d: number
  volume24h: number
  marketCap: number
  sparkline: number[]
  isUpdating?: boolean
  isTrending?: boolean
  isNew?: boolean
}

const cryptoData: CryptoAsset[] = [
  {
    rank: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.00,
    change24h: 2.35,
    change7d: 5.8,
    volume24h: 28500000000,
    marketCap: 845000000000,
    sparkline: [42000, 42200, 41800, 42500, 43100, 43250],
  },
  {
    rank: 2,
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2285.50,
    change24h: -1.20,
    change7d: 3.2,
    volume24h: 15300000000,
    marketCap: 275000000000,
    sparkline: [2300, 2280, 2250, 2270, 2290, 2285],
  },
  {
    rank: 3,
    symbol: 'BNB',
    name: 'BNB',
    price: 315.80,
    change24h: 0.85,
    change7d: -2.1,
    volume24h: 1200000000,
    marketCap: 47000000000,
    sparkline: [310, 312, 318, 315, 316, 315],
    isTrending: true,
  },
  {
    rank: 4,
    symbol: 'SOL',
    name: 'Solana',
    price: 98.75,
    change24h: 5.45,
    change7d: 12.3,
    volume24h: 2800000000,
    marketCap: 41200000000,
    sparkline: [92, 94, 96, 98, 99, 98],
    isTrending: true,
  },
  {
    rank: 5,
    symbol: 'XRP',
    name: 'XRP',
    price: 0.62,
    change24h: -2.15,
    change7d: 1.8,
    volume24h: 1800000000,
    marketCap: 33500000000,
    sparkline: [0.64, 0.63, 0.61, 0.62, 0.63, 0.62],
  },
  {
    rank: 6,
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.52,
    change24h: 3.15,
    change7d: 8.9,
    volume24h: 1200000000,
    marketCap: 18200000000,
    sparkline: [0.48, 0.49, 0.51, 0.52, 0.53, 0.52],
    isTrending: true,
  },
  {
    rank: 7,
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 36.80,
    change24h: -2.30,
    change7d: -1.2,
    volume24h: 800000000,
    marketCap: 13100000000,
    sparkline: [38, 37, 36, 37, 36, 36],
  },
  {
    rank: 8,
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.085,
    change24h: 1.85,
    change7d: -3.2,
    volume24h: 900000000,
    marketCap: 12000000000,
    sparkline: [0.082, 0.083, 0.086, 0.085, 0.084, 0.085],
  },
  {
    rank: 9,
    symbol: 'LINK',
    name: 'Chainlink',
    price: 14.32,
    change24h: 1.75,
    change7d: 4.5,
    volume24h: 600000000,
    marketCap: 8100000000,
    sparkline: [13.8, 14.0, 14.2, 14.3, 14.1, 14.3],
  },
  {
    rank: 10,
    symbol: 'MATIC',
    name: 'Polygon',
    price: 0.91,
    change24h: -0.85,
    change7d: 2.8,
    volume24h: 900000000,
    marketCap: 8400000000,
    sparkline: [0.92, 0.91, 0.90, 0.91, 0.92, 0.91],
    isNew: true,
  },
]

const tabs = [
  { id: 'top100', name: 'Top 100', icon: TrendingUp },
  { id: 'trending', name: 'Trending', icon: Zap },
  { id: 'new', name: 'New Listings', icon: Star },
  { id: 'volume', name: 'Volume Leaders', icon: Activity },
]

export function LiveMarkets() {
  const [activeTab, setActiveTab] = useState('top100')
  const [data, setData] = useState(cryptoData)

  // Filter data based on active tab
  const filteredData = data.filter(item => {
    switch (activeTab) {
      case 'trending':
        return item.isTrending
      case 'new':
        return item.isNew
      case 'volume':
        return item.volume24h > 1000000000 // > 1B volume
      default:
        return true
    }
  })

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map(item => {
          const priceChange = (Math.random() - 0.5) * 0.01 // ±0.5% change
          const newPrice = item.price * (1 + priceChange)
          const changeVariation = (Math.random() - 0.5) * 0.2
          const newChange = item.change24h + changeVariation

          return {
            ...item,
            price: newPrice,
            change24h: newChange,
            isUpdating: true,
          }
        })
      )

      // Remove updating flag after animation
      setTimeout(() => {
        setData(prev =>
          prev.map(item => ({ ...item, isUpdating: false }))
        )
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="widget-title">Live Crypto Markets</h2>
          <div className="flex items-center space-x-2">
            <div className="live-indicator pl-3">
              <span className="text-xs font-medium text-green-600">LIVE</span>
            </div>
            <span className="text-xs text-gray-500">Updated every 5 seconds</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                activeTab === tab.id ? 'tab-active' : 'tab-inactive'
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Name</th>
              <th className="text-right">Price</th>
              <th className="text-right">24h%</th>
              <th className="text-right">7d%</th>
              <th className="text-right">Volume (24h)</th>
              <th className="text-right">Market Cap</th>
              <th className="text-right">Chart</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((asset) => (
              <tr
                key={asset.symbol}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  asset.isUpdating ? (asset.change24h >= 0 ? 'pulse-green' : 'pulse-red') : ''
                )}
              >
                <td>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-600">#{asset.rank}</span>
                    {asset.isTrending && (
                      <Zap className="w-3 h-3 text-yellow-500" />
                    )}
                    {asset.isNew && (
                      <Star className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-600">{asset.symbol}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{asset.symbol}</div>
                      <div className="text-xs text-gray-500">{asset.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-right">
                  <span className={cn(
                    'font-semibold',
                    asset.isUpdating ? 'text-blue-600' : 'text-gray-900'
                  )}>
                    {formatCurrency(asset.price)}
                  </span>
                </td>
                <td className="text-right">
                  <div className={cn(
                    'inline-flex items-center space-x-1',
                    asset.change24h >= 0 ? 'green-profit' : 'red-loss'
                  )}>
                    {asset.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span>{formatPercentage(Math.abs(asset.change24h))}</span>
                  </div>
                </td>
                <td className="text-right">
                  <span className={cn(
                    'text-sm',
                    asset.change7d >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {formatPercentage(asset.change7d)}
                  </span>
                </td>
                <td className="text-right text-gray-600">
                  ${abbreviateNumber(asset.volume24h)}
                </td>
                <td className="text-right text-gray-600">
                  ${abbreviateNumber(asset.marketCap)}
                </td>
                <td className="text-right">
                  <div className="mini-chart">
                    <svg width="60" height="30" className="overflow-visible">
                      <polyline
                        points={asset.sparkline
                          .map((price, i) => `${i * 12},${30 - (price / Math.max(...asset.sparkline)) * 25}`)
                          .join(' ')}
                        fill="none"
                        stroke={asset.change24h >= 0 ? '#16a34a' : '#dc2626'}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredData.length} cryptocurrencies</span>
          <div className="flex items-center space-x-4">
            <span>Market Cap: $1.68T</span>
            <span>24h Volume: $87.3B</span>
            <span>BTC Dominance: 52.3%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
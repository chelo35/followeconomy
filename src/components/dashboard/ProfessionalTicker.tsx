'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercentage } from '@/lib/utils'

interface TickerItem {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: string
  isUpdating?: boolean
}

const tickerData: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change24h: 2.35, volume: '28.5B' },
  { symbol: 'ETH', name: 'Ethereum', price: 2285.50, change24h: -1.20, volume: '15.3B' },
  { symbol: 'BNB', name: 'Binance Coin', price: 315.80, change24h: 0.85, volume: '1.2B' },
  { symbol: 'SOL', name: 'Solana', price: 98.75, change24h: 5.45, volume: '2.8B' },
  { symbol: 'ADA', name: 'Cardano', price: 0.52, change24h: 3.15, volume: '1.2B' },
  { symbol: 'AVAX', name: 'Avalanche', price: 36.80, change24h: -2.30, volume: '0.8B' },
  { symbol: 'DOT', name: 'Polkadot', price: 7.45, change24h: 2.10, volume: '0.5B' },
  { symbol: 'MATIC', name: 'Polygon', price: 0.91, change24h: -0.85, volume: '0.9B' },
  { symbol: 'LINK', name: 'Chainlink', price: 14.32, change24h: 1.75, volume: '0.6B' },
  { symbol: 'UNI', name: 'Uniswap', price: 6.23, change24h: 4.8, volume: '0.3B' },
  { symbol: 'LTC', name: 'Litecoin', price: 72.15, change24h: -1.45, volume: '0.7B' },
  { symbol: 'ATOM', name: 'Cosmos', price: 9.85, change24h: 3.25, volume: '0.4B' },
]

export function ProfessionalTicker() {
  const [currentData, setCurrentData] = useState(tickerData)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => 
        prev.map(item => {
          const priceChange = (Math.random() - 0.5) * 0.02 // ±1% change
          const newPrice = item.price * (1 + priceChange)
          const changeVariation = (Math.random() - 0.5) * 0.5
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
        setCurrentData(prev => 
          prev.map(item => ({ ...item, isUpdating: false }))
        )
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center px-4 py-2">
          {/* Live Indicator */}
          <div className="flex items-center space-x-2 mr-6">
            <div className="live-indicator pl-3">
              <span className="text-sm font-medium text-green-600">LIVE</span>
            </div>
            <div className="text-xs text-gray-500">Real-time crypto prices</div>
          </div>

          {/* Scrolling Ticker */}
          <div className="flex-1 overflow-hidden">
            <div className="ticker-scroll flex space-x-8 whitespace-nowrap">
              {[...currentData, ...currentData].map((item, index) => (
                <div
                  key={`${item.symbol}-${index}`}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-1 rounded-md transition-all duration-300",
                    item.isUpdating ? (item.change24h >= 0 ? 'pulse-green' : 'pulse-red') : ''
                  )}
                >
                  {/* Symbol */}
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 text-sm">{item.symbol}</span>
                    <span className="text-xs text-gray-500">/USD</span>
                  </div>

                  {/* Price */}
                  <div className={cn(
                    "font-semibold text-sm",
                    item.isUpdating ? 'text-blue-600' : 'text-gray-900'
                  )}>
                    {formatCurrency(item.price)}
                  </div>

                  {/* Change */}
                  <div className={cn(
                    "flex items-center space-x-1",
                    item.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {item.change24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    <span className="text-xs font-medium">
                      {formatPercentage(Math.abs(item.change24h))}
                    </span>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Activity className="w-3 h-3" />
                    <span className="text-xs">{item.volume}</span>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-4 bg-gray-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Market Summary */}
          <div className="hidden lg:flex items-center space-x-6 ml-6">
            <div className="text-center">
              <div className="text-xs text-gray-500">Market Cap</div>
              <div className="text-sm font-semibold text-gray-900">$1.68T</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">24h Vol</div>
              <div className="text-sm font-semibold text-gray-900">$87.3B</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">BTC Dom</div>
              <div className="text-sm font-semibold professional-blue">52.3%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
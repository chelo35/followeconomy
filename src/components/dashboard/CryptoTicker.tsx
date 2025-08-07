'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils'

interface TickerItem {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
}

const mockData: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 2.35, volume: 28.5 },
  { symbol: 'ETH', name: 'Ethereum', price: 2285.50, change: -1.20, volume: 15.3 },
  { symbol: 'SOL', name: 'Solana', price: 98.75, change: 5.45, volume: 2.8 },
  { symbol: 'ADA', name: 'Cardano', price: 0.52, change: 3.15, volume: 1.2 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.91, change: -0.85, volume: 0.9 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.32, change: 1.75, volume: 0.6 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.45, change: 2.10, volume: 0.5 },
  { symbol: 'AVAX', name: 'Avalanche', price: 36.80, change: -2.30, volume: 0.8 },
]

export function CryptoTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-dark py-3 overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-hidden scrollbar-hide"
        style={{ width: '100%' }}
      >
        {[...mockData, ...mockData].map((item, index) => (
          <motion.div
            key={`${item.symbol}-${index}`}
            className="flex items-center space-x-3 px-4 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white font-semibold">{item.symbol}</span>
            <span className="text-gray-400 text-sm">{item.name}</span>
            <span className="text-white font-medium">{formatCurrency(item.price)}</span>
            <div className={cn("flex items-center space-x-1", getChangeColor(item.change))}>
              {item.change > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{formatPercentage(item.change)}</span>
            </div>
            <span className="text-gray-500 text-xs">Vol: ${item.volume}B</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
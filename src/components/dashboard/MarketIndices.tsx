'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatNumber, formatPercentage, getChangeColor } from '@/lib/utils'

const indices = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    value: 4478.25,
    change: 0.85,
    region: 'US',
  },
  {
    symbol: 'DJI',
    name: 'Dow Jones',
    value: 35123.36,
    change: 0.62,
    region: 'US',
  },
  {
    symbol: 'IXIC',
    name: 'NASDAQ',
    value: 14085.92,
    change: 1.24,
    region: 'US',
  },
  {
    symbol: 'FTSE',
    name: 'FTSE 100',
    value: 7512.89,
    change: -0.45,
    region: 'UK',
  },
  {
    symbol: 'DAX',
    name: 'DAX',
    value: 15891.24,
    change: -0.28,
    region: 'DE',
  },
  {
    symbol: 'N225',
    name: 'Nikkei 225',
    value: 32156.78,
    change: 1.85,
    region: 'JP',
  },
]

const regionColors: Record<string, string> = {
  US: 'from-blue-500 to-blue-600',
  UK: 'from-red-500 to-red-600',
  DE: 'from-yellow-500 to-yellow-600',
  JP: 'from-pink-500 to-pink-600',
}

export function MarketIndices() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Global Indices</h2>
        <Globe className="w-5 h-5 text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {indices.map((index, i) => (
          <motion.div
            key={index.symbol}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-dark rounded-lg p-3 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium text-white bg-gradient-to-r",
                    regionColors[index.region] || 'from-gray-500 to-gray-600'
                  )}>
                    {index.region}
                  </span>
                  <h3 className="text-sm font-medium text-white">{index.symbol}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">{index.name}</p>
              </div>
              <div className={cn(
                "flex items-center space-x-1",
                getChangeColor(index.change)
              )}>
                {index.change > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs font-medium">{formatPercentage(index.change)}</span>
              </div>
            </div>
            <p className="text-lg font-semibold text-white">
              {formatNumber(index.value, 2)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
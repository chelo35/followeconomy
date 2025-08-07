'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils'
import Image from 'next/image'

const trendingCoins = [
  {
    rank: 1,
    name: 'Solana',
    symbol: 'SOL',
    price: 98.75,
    change24h: 12.5,
    volume24h: 2.8,
    marketCap: 41.2,
    image: '/crypto/sol.png',
  },
  {
    rank: 2,
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.32,
    change24h: 8.3,
    volume24h: 0.6,
    marketCap: 8.1,
    image: '/crypto/link.png',
  },
  {
    rank: 3,
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.91,
    change24h: 6.7,
    volume24h: 0.9,
    marketCap: 8.4,
    image: '/crypto/matic.png',
  },
  {
    rank: 4,
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 36.80,
    change24h: 5.2,
    volume24h: 0.8,
    marketCap: 13.1,
    image: '/crypto/avax.png',
  },
  {
    rank: 5,
    name: 'Uniswap',
    symbol: 'UNI',
    price: 6.23,
    change24h: 4.8,
    volume24h: 0.2,
    marketCap: 4.7,
    image: '/crypto/uni.png',
  },
]

export function TrendingCoins() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Trending Coins</h2>
        <Star className="w-5 h-5 text-yellow-400" />
      </div>

      <div className="space-y-4">
        {trendingCoins.map((coin, index) => (
          <motion.div
            key={coin.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-dark rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm font-medium w-6">
                  #{coin.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-xs font-bold">{coin.symbol}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">{coin.name}</h3>
                  <p className="text-gray-400 text-sm">{coin.symbol}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white font-medium">{formatCurrency(coin.price)}</p>
                <div className={cn("flex items-center justify-end space-x-1", getChangeColor(coin.change24h))}>
                  {coin.change24h > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-sm">{formatPercentage(coin.change24h)}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-400">
                Vol 24h: <span className="text-gray-300">${coin.volume24h}B</span>
              </div>
              <div className="text-gray-400 text-right">
                MCap: <span className="text-gray-300">${coin.marketCap}B</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
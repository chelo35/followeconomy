'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils'

interface TickerItem {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  isUpdating?: boolean
}

const initialData: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 2.35, volume: 28.5 },
  { symbol: 'ETH', name: 'Ethereum', price: 2285.50, change: -1.20, volume: 15.3 },
  { symbol: 'SOL', name: 'Solana', price: 98.75, change: 5.45, volume: 2.8 },
  { symbol: 'ADA', name: 'Cardano', price: 0.52, change: 3.15, volume: 1.2 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.91, change: -0.85, volume: 0.9 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.32, change: 1.75, volume: 0.6 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.45, change: 2.10, volume: 0.5 },
  { symbol: 'AVAX', name: 'Avalanche', price: 36.80, change: -2.30, volume: 0.8 },
  { symbol: 'UNI', name: 'Uniswap', price: 6.23, change: 4.8, volume: 0.3 },
  { symbol: 'ATOM', name: 'Cosmos', price: 9.85, change: -1.5, volume: 0.4 },
]

export function CryptoTicker() {
  const [tickerData, setTickerData] = useState(initialData)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(prevData => 
        prevData.map(item => {
          const priceChange = (Math.random() - 0.5) * 0.02 // ±1% change
          const newPrice = item.price * (1 + priceChange)
          const newChange = item.change + (Math.random() - 0.5) * 0.5
          
          return {
            ...item,
            price: newPrice,
            change: newChange,
            isUpdating: true,
          }
        })
      )
      
      // Remove updating flag after animation
      setTimeout(() => {
        setTickerData(prevData => 
          prevData.map(item => ({ ...item, isUpdating: false }))
        )
      }, 300)
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-lg border-y border-white/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0wIDQwaDQwdi00MGgtNDB6Ii8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzAwZDRmZiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="py-3 px-4">
        <div 
          ref={scrollRef}
          className="flex space-x-8 overflow-x-hidden scrollbar-hide"
        >
          <motion.div 
            className="flex space-x-8 min-w-max"
            animate={{ x: [0, -50] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" }
            }}
          >
            {[...tickerData, ...tickerData].map((item, index) => (
              <motion.div
                key={`${item.symbol}-${index}`}
                className="flex items-center space-x-4 whitespace-nowrap group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                animate={item.isUpdating ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {/* Symbol with Icon */}
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30">
                      <span className="text-xs font-bold text-white">{item.symbol}</span>
                    </div>
                    {item.isUpdating && (
                      <motion.div
                        className="absolute -inset-1 rounded-full border-2 border-primary"
                        initial={{ scale: 0.8, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-white text-sm">{item.symbol}</span>
                    <span className="text-gray-400 text-xs ml-1">/USD</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <motion.div 
                    className={cn(
                      "font-semibold text-lg",
                      item.isUpdating ? "text-primary" : "text-white"
                    )}
                    key={item.price}
                    initial={{ scale: 1 }}
                    animate={{ scale: item.isUpdating ? [1, 1.1, 1] : 1 }}
                  >
                    {formatCurrency(item.price)}
                  </motion.div>
                </div>

                {/* Change */}
                <div className={cn(
                  "flex items-center space-x-1 min-w-[80px] justify-end",
                  getChangeColor(item.change)
                )}>
                  {item.change > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {formatPercentage(item.change)}
                  </span>
                </div>

                {/* Volume */}
                <div className="flex items-center space-x-1 text-gray-500 text-xs min-w-[60px]">
                  <Activity className="w-3 h-3" />
                  <span>${item.volume}B</span>
                </div>

                {/* Separator */}
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      {/* Side Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/50 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/50 to-transparent pointer-events-none"></div>
    </div>
  )
}
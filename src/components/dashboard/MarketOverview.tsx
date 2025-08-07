'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, abbreviateNumber } from '@/lib/utils'

const marketStats = [
  {
    label: 'Total Market Cap',
    value: 1.68,
    unit: 'T',
    change: 2.5,
    icon: DollarSign,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: '24h Volume',
    value: 87.3,
    unit: 'B',
    change: -5.2,
    icon: Activity,
    color: 'from-purple-500 to-pink-500',
  },
  {
    label: 'BTC Dominance',
    value: 51.2,
    unit: '%',
    change: 0.8,
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
  },
  {
    label: 'Active Traders',
    value: 2.4,
    unit: 'M',
    change: 12.5,
    icon: Users,
    color: 'from-green-500 to-emerald-500',
  },
]

export function MarketOverview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Market Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {marketStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-dark rounded-lg p-4 cursor-pointer card-hover"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "p-3 rounded-lg bg-gradient-to-r",
                stat.color
              )}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={cn(
                "flex items-center space-x-1 text-sm",
                stat.change > 0 ? "text-green-400" : "text-red-400"
              )}>
                {stat.change > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">
                {stat.value}{stat.unit}
              </p>
            </div>

            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 pt-3 border-t border-white/10"
              >
                <p className="text-xs text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
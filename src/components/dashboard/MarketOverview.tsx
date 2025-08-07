'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Zap, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, abbreviateNumber } from '@/lib/utils'

const marketStats = [
  {
    id: 'market_cap',
    label: 'Total Market Cap',
    value: 1.68,
    unit: 'T',
    change: 2.5,
    icon: DollarSign,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    description: 'Global crypto market capitalization',
  },
  {
    id: 'volume',
    label: '24h Volume',
    value: 87.3,
    unit: 'B',
    change: -5.2,
    icon: Activity,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    description: 'Total trading volume across exchanges',
  },
  {
    id: 'dominance',
    label: 'BTC Dominance',
    value: 51.2,
    unit: '%',
    change: 0.8,
    icon: TrendingUp,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    description: 'Bitcoin market share percentage',
  },
  {
    id: 'defi_tvl',
    label: 'DeFi TVL',
    value: 45.8,
    unit: 'B',
    change: 3.2,
    icon: Users,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    description: 'Total value locked in DeFi protocols',
  },
]

export function MarketOverview() {
  const [selectedStat, setSelectedStat] = useState<string | null>(null)

  return (
    <div className="glass p-8 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            Market Overview
          </h2>
          <p className="text-gray-400 mt-1">Real-time global cryptocurrency statistics</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {marketStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "group relative glass-dark p-6 rounded-xl cursor-pointer transition-all duration-300",
              selectedStat === stat.id ? "ring-2 ring-primary/50 bg-primary/5" : ""
            )}
            onClick={() => setSelectedStat(selectedStat === stat.id ? null : stat.id)}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Glow */}
            <div className={cn(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl",
              stat.color
            )}></div>
            
            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "p-3 rounded-xl bg-gradient-to-r border",
                  stat.color,
                  stat.borderColor
                )}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className={cn(
                  "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                  stat.change > 0 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                )}>
                  {stat.change > 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              </div>
              
              {/* Value */}
              <div className="mb-3">
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}{stat.unit}
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>

              {/* Description */}
              <motion.div
                initial={false}
                animate={{ 
                  height: selectedStat === stat.id ? 'auto' : 0,
                  opacity: selectedStat === stat.id ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-gray-400">{stat.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Last updated</span>
                    <span className="text-xs text-gray-400">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>

              {/* Hover Effect */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Sentiment Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 p-4 glass-dark rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-300">Market Sentiment</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-green-400">Bullish</div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-green-400"
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Extreme Fear</span>
          <span>Neutral</span>
          <span>Extreme Greed</span>
        </div>
      </motion.div>
    </div>
  )
}
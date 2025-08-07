'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FearGreedIndex() {
  const [value, setValue] = useState(65)
  const [sentiment, setSentiment] = useState<string>('Greed')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const getSentiment = (val: number) => {
      if (val <= 20) return 'Extreme Fear'
      if (val <= 40) return 'Fear'
      if (val <= 60) return 'Neutral'
      if (val <= 80) return 'Greed'
      return 'Extreme Greed'
    }
    setSentiment(getSentiment(value))
  }, [value])

  const getColor = () => {
    if (value <= 20) return '#ef4444' // red-500
    if (value <= 40) return '#f59e0b' // amber-500
    if (value <= 60) return '#eab308' // yellow-500
    if (value <= 80) return '#84cc16' // lime-500
    return '#22c55e' // green-500
  }

  const getIcon = () => {
    if (value <= 40) return AlertTriangle
    if (value <= 60) return Target
    return TrendingUp
  }

  const Icon = getIcon()

  // Simulate value changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      const newValue = Math.floor(Math.random() * 100)
      setValue(newValue)
      setTimeout(() => setIsAnimating(false), 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass p-8 rounded-2xl h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            Fear & Greed Index
          </h2>
          <p className="text-gray-400 mt-1">Market sentiment analysis</p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Circular Progress */}
        <div className="relative w-56 h-56 mb-8">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="100"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
              className="drop-shadow-sm"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="112"
              cy="112"
              r="100"
              stroke={getColor()}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 628" }}
              animate={{ 
                strokeDasharray: `${(value / 100) * 628} 628`,
                filter: `drop-shadow(0 0 8px ${getColor()})`
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="drop-shadow-lg"
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className={cn(
                "text-6xl font-bold mb-2",
                isAnimating ? "scale-110" : "scale-100"
              )}
              style={{ color: getColor() }}
              animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {value}
            </motion.div>
            <div className="text-lg text-gray-400 font-medium">/100</div>
            
            {/* Animated Icon */}
            <motion.div
              className="mt-4 p-3 rounded-full"
              style={{ backgroundColor: `${getColor()}20` }}
              animate={isAnimating ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-6 h-6" style={{ color: getColor() }} />
            </motion.div>
          </div>

          {/* Glow Effect */}
          <div 
            className="absolute inset-4 rounded-full opacity-20 blur-2xl"
            style={{ backgroundColor: getColor() }}
          />
        </div>

        {/* Sentiment Display */}
        <motion.div
          className="text-center mb-6"
          key={sentiment}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 
            className="text-3xl font-bold mb-2"
            style={{ color: getColor() }}
          >
            {sentiment}
          </h3>
          <p className="text-gray-400 text-sm">
            Current market sentiment based on volatility, momentum, social sentiment, and surveys
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="glass-dark p-4 rounded-xl text-center">
            <div className="text-sm text-gray-400 mb-1">Volatility</div>
            <div className="text-white font-semibold">
              {value > 60 ? 'High' : value > 40 ? 'Moderate' : 'Low'}
            </div>
          </div>
          <div className="glass-dark p-4 rounded-xl text-center">
            <div className="text-sm text-gray-400 mb-1">Momentum</div>
            <div className="text-white font-semibold">
              {value > 50 ? 'Bullish' : 'Bearish'}
            </div>
          </div>
          <div className="glass-dark p-4 rounded-xl text-center">
            <div className="text-sm text-gray-400 mb-1">Volume</div>
            <div className="text-white font-semibold">Above Avg</div>
          </div>
          <div className="glass-dark p-4 rounded-xl text-center">
            <div className="text-sm text-gray-400 mb-1">Social</div>
            <div className="text-white font-semibold">
              {value > 60 ? 'Positive' : value > 40 ? 'Neutral' : 'Negative'}
            </div>
          </div>
        </div>

        {/* Scale Indicator */}
        <div className="w-full mt-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          <div className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative overflow-hidden">
            {/* Current Position Indicator */}
            <motion.div
              className="absolute top-0 w-1 h-full bg-white shadow-lg"
              initial={{ left: '0%' }}
              animate={{ left: `${value}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Extreme Fear</span>
            <span>Extreme Greed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

export function FearGreedIndex() {
  const [value, setValue] = useState(65)
  const [sentiment, setSentiment] = useState<string>('Greed')

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
    if (value <= 20) return '#dc2626' // red
    if (value <= 40) return '#f59e0b' // amber
    if (value <= 60) return '#eab308' // yellow
    if (value <= 80) return '#84cc16' // lime
    return '#22c55e' // green
  }

  return (
    <div className="glass rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6">Fear & Greed Index</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="16"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke={getColor()}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 552" }}
              animate={{ strokeDasharray: `${(value / 100) * 552} 552` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-5xl font-bold text-white"
            >
              {value}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-gray-400"
            >
              /100
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-2" style={{ color: getColor() }}>
            {sentiment}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Market sentiment based on multiple indicators
          </p>
        </motion.div>

        <div className="w-full space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Volatility</span>
            <span className="text-white">Moderate</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Volume</span>
            <span className="text-white">Above Average</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Momentum</span>
            <span className="text-white">Bullish</span>
          </div>
        </div>
      </div>
    </div>
  )
}
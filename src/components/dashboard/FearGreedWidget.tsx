'use client'

import { useState, useEffect } from 'react'
import { Brain, TrendingUp } from 'lucide-react'

export function FearGreedWidget() {
  const [value] = useState(65)
  const [sentiment] = useState('Greed')

  const getColor = () => {
    if (value <= 20) return '#dc2626'
    if (value <= 40) return '#f59e0b'
    if (value <= 60) return '#eab308'
    if (value <= 80) return '#84cc16'
    return '#22c55e'
  }

  return (
    <div className="card-white p-6">
      <div className="widget-header">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 professional-blue" />
          <h2 className="widget-title">Fear & Greed Index</h2>
        </div>
      </div>

      <div className="text-center">
        <div className="gauge-container mx-auto mb-4">
          <svg width="200" height="200" className="transform -rotate-90">
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke={getColor()}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 502} 502`}
              style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold" style={{ color: getColor() }}>
              {value}
            </div>
            <div className="text-sm text-gray-500">/100</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2" style={{ color: getColor() }}>
          {sentiment}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Market sentiment analysis
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-gray-500 mb-1">Volatility</div>
            <div className="font-semibold">Moderate</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-gray-500 mb-1">Momentum</div>
            <div className="font-semibold">Bullish</div>
          </div>
        </div>
      </div>
    </div>
  )
}
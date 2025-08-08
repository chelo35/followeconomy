'use client'

import { useState } from 'react'
import { Calculator, DollarSign, Percent, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function TradingToolsWidget() {
  const [fromValue, setFromValue] = useState(1000)
  const [percentage, setPercentage] = useState(15)

  const calculateGain = () => {
    return fromValue * (1 + percentage / 100)
  }

  const quickTools = [
    { name: 'Position Calculator', icon: Calculator, href: '/tools/position' },
    { name: 'Currency Converter', icon: DollarSign, href: '/tools/converter' },
    { name: 'Profit Calculator', icon: Percent, href: '/tools/profit' },
  ]

  return (
    <div className="card-white p-6">
      <div className="widget-header">
        <h2 className="widget-title">Trading Tools</h2>
        <Link href="/tools" className="text-xs professional-blue hover:underline">
          View All
        </Link>
      </div>

      {/* Quick Calculator */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick % Calculator</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500">From Value ($)</label>
            <input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(Number(e.target.value))}
              className="calculator-input text-sm"
              placeholder="1000"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Percentage (%)</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="calculator-input text-sm"
              placeholder="15"
            />
          </div>
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Result:</span>
              <span className="text-lg font-bold professional-blue">
                ${calculateGain().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Links */}
      <div className="space-y-2">
        {quickTools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href as any}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <tool.icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{tool.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </Link>
        ))}
      </div>
    </div>
  )
}
'use client'

import { DollarSign, Activity, TrendingUp, Zap } from 'lucide-react'

const marketOverview = [
  {
    label: 'Total Market Cap',
    value: '$1.68T',
    change: '+2.5%',
    positive: true,
    icon: DollarSign,
  },
  {
    label: '24h Volume',
    value: '$87.3B',
    change: '-5.2%',
    positive: false,
    icon: Activity,
  },
  {
    label: 'BTC Dominance',
    value: '52.3%',
    change: '+0.8%',
    positive: true,
    icon: TrendingUp,
  },
  {
    label: 'ETH Dominance',
    value: '17.1%',
    change: '-0.3%',
    positive: false,
    icon: Zap,
  },
  {
    label: 'DeFi TVL',
    value: '$67.2B',
    change: '+8.3%',
    positive: true,
    icon: DollarSign,
  },
]

export function MarketOverviewSidebar() {
  return (
    <div className="card-white p-6">
      <div className="widget-header">
        <h2 className="widget-title">Market Overview</h2>
        <div className="live-indicator pl-3">
          <span className="text-xs font-medium text-green-600">LIVE</span>
        </div>
      </div>

      <div className="space-y-4">
        {marketOverview.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <item.icon className="w-4 h-4 text-gray-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                <div className="text-lg font-bold text-gray-900">{item.value}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              item.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
'use client'

import { Activity, Zap, Database, Network } from 'lucide-react'

const btcMetrics = [
  { label: 'Hash Rate', value: '450 EH/s', icon: Zap },
  { label: 'Difficulty', value: '62.46T', icon: Activity },
  { label: 'Mempool', value: '15MB', icon: Database },
]

const ethMetrics = [
  { label: 'Gas Price', value: '25 gwei', icon: Activity },
  { label: 'Block Time', value: '12.1s', icon: Zap },
  { label: 'Validators', value: '875K', icon: Network },
]

export function OnChainMetrics() {
  return (
    <div className="card-white p-6">
      <div className="widget-header">
        <h2 className="widget-title">OnChain Metrics</h2>
      </div>

      <div className="space-y-6">
        {/* Bitcoin Network */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xs">₿</span>
            </span>
            <span>Bitcoin Network</span>
          </h3>
          <div className="space-y-2">
            {btcMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <metric.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{metric.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ethereum Network */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs">Ξ</span>
            </span>
            <span>Ethereum Network</span>
          </h3>
          <div className="space-y-2">
            {ethMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <metric.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{metric.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
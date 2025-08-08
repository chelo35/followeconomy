'use client'

import { TrendingUp, Volume2, Eye, Zap } from 'lucide-react'

const binanceData = {
  volumeSurge: [
    { symbol: 'SOL', surge: '+245%', price: '$98.75' },
    { symbol: 'AVAX', surge: '+156%', price: '$36.80' },
    { symbol: 'LINK', surge: '+98%', price: '$14.32' },
  ],
  newListings: [
    { symbol: 'NEW1', name: 'New Token 1', price: '$0.045' },
    { symbol: 'NEW2', name: 'New Token 2', price: '$1.23' },
  ],
  futuresData: {
    openInterest: '$45.2B',
    fundingRate: '+0.015%',
  },
}

export function BinanceData() {
  return (
    <div className="card-white p-6">
      <div className="widget-header">
        <h2 className="widget-title">Binance Data</h2>
        <span className="text-xs text-yellow-600 font-medium">🔶 Official Data</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Volume Surge */}
        <div className="metric-card">
          <div className="flex items-center space-x-2 mb-4">
            <Volume2 className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Volume Surge (24h)</h3>
          </div>
          <div className="space-y-3">
            {binanceData.volumeSurge.map((item) => (
              <div key={item.symbol} className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{item.symbol}</span>
                <div className="text-right">
                  <div className="text-green-600 font-semibold text-sm">{item.surge}</div>
                  <div className="text-gray-500 text-xs">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Futures Data */}
        <div className="metric-card">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Futures Market</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Open Interest</div>
              <div className="text-xl font-bold text-gray-900">{binanceData.futuresData.openInterest}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Funding Rate</div>
              <div className="text-lg font-semibold text-green-600">{binanceData.futuresData.fundingRate}</div>
            </div>
          </div>
        </div>

        {/* New Listings */}
        <div className="metric-card">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-900">New Listings</h3>
          </div>
          <div className="space-y-3">
            {binanceData.newListings.map((item) => (
              <div key={item.symbol} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{item.symbol}</div>
                  <div className="text-xs text-gray-500">{item.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Activity, Zap, Users, ArrowUpRight, ArrowDownRight, Database, Network } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NetworkMetric {
  id: string
  name: string
  network: string
  value: string
  change: number
  unit: string
  icon: React.ComponentType<any>
  color: string
  description: string
}

interface ExchangeFlow {
  exchange: string
  inflow: number
  outflow: number
  netFlow: number
  logo: string
}

const networkMetrics: NetworkMetric[] = [
  {
    id: 'btc_hash',
    name: 'Hash Rate',
    network: 'Bitcoin',
    value: '450',
    change: 5.2,
    unit: 'EH/s',
    icon: Zap,
    color: 'text-orange-600',
    description: 'Network computing power',
  },
  {
    id: 'eth_gas',
    name: 'Gas Price',
    network: 'Ethereum',
    value: '25',
    change: -12.5,
    unit: 'gwei',
    icon: Activity,
    color: 'text-blue-600',
    description: 'Average transaction fee',
  },
  {
    id: 'tvl',
    name: 'Total TVL',
    network: 'DeFi',
    value: '67.2',
    change: 8.3,
    unit: 'B',
    icon: Database,
    color: 'text-green-600',
    description: 'Total value locked in DeFi',
  },
  {
    id: 'addresses',
    name: 'Active Addresses',
    network: 'Bitcoin',
    value: '1.2',
    change: 3.1,
    unit: 'M',
    icon: Users,
    color: 'text-purple-600',
    description: 'Daily active addresses',
  },
  {
    id: 'transactions',
    name: 'Transactions',
    network: 'Ethereum',
    value: '1.8',
    change: 15.2,
    unit: 'M',
    icon: Network,
    color: 'text-indigo-600',
    description: 'Daily transaction count',
  },
]

const exchangeFlows: ExchangeFlow[] = [
  {
    exchange: 'Binance',
    inflow: 125.3,
    outflow: 89.7,
    netFlow: 35.6,
    logo: '🔶',
  },
  {
    exchange: 'Coinbase',
    inflow: 78.4,
    outflow: 102.1,
    netFlow: -23.7,
    logo: '🔵',
  },
  {
    exchange: 'Kraken',
    inflow: 45.2,
    outflow: 38.9,
    netFlow: 6.3,
    logo: '🐙',
  },
  {
    exchange: 'OKX',
    inflow: 92.1,
    outflow: 87.3,
    netFlow: 4.8,
    logo: '⚫',
  },
]

export function OnChainData() {
  const [metrics, setMetrics] = useState(networkMetrics)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev =>
        prev.map(metric => ({
          ...metric,
          change: metric.change + (Math.random() - 0.5) * 2,
        }))
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Network Activity Widgets */}
      <div className="card-white p-6">
        <div className="widget-header">
          <h2 className="widget-title">Network Activity</h2>
          <div className="flex items-center space-x-2">
            <div className="live-indicator pl-3">
              <span className="text-xs font-medium text-green-600">LIVE</span>
            </div>
            <span className="text-xs text-gray-500">Updated every minute</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="metric-card group">
              <div className="flex items-start justify-between mb-4">
                <div className={cn('p-2 rounded-lg bg-gray-100', metric.color)}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  'text-xs px-2 py-1 rounded-md font-medium',
                  metric.change >= 0 ? 'green-profit' : 'red-loss'
                )}>
                  {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </div>
              </div>

              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.name}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{metric.network}</span>
                <span className="text-xs text-gray-400">{metric.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exchange Flow Data */}
      <div className="card-white p-6">
        <div className="widget-header">
          <h2 className="widget-title">Exchange Flows (24h)</h2>
          <span className="text-xs text-gray-500">Net flow in millions USD</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exchangeFlows.map((flow) => (
            <div key={flow.exchange} className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{flow.logo}</span>
                  <span className="font-semibold text-gray-900">{flow.exchange}</span>
                </div>
                <div className={cn(
                  'flex items-center space-x-1 text-xs px-2 py-1 rounded-md font-medium',
                  flow.netFlow >= 0 ? 'exchange-flow-positive' : 'exchange-flow-negative'
                )}>
                  {flow.netFlow >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  <span>${Math.abs(flow.netFlow)}M</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Inflow:</span>
                  <span className="text-green-600 font-medium">${flow.inflow}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Outflow:</span>
                  <span className="text-red-600 font-medium">${flow.outflow}M</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Net Flow:</span>
                    <span className={cn(
                      'font-bold',
                      flow.netFlow >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {flow.netFlow >= 0 ? '+' : ''}${flow.netFlow}M
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-sm text-gray-500">Total Inflow:</span>
                <span className="ml-2 font-semibold text-green-600">
                  ${exchangeFlows.reduce((sum, flow) => sum + flow.inflow, 0)}M
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Outflow:</span>
                <span className="ml-2 font-semibold text-red-600">
                  ${exchangeFlows.reduce((sum, flow) => sum + flow.outflow, 0)}M
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Net Flow:</span>
              <span className="ml-2 font-bold text-green-600">
                +${exchangeFlows.reduce((sum, flow) => sum + flow.netFlow, 0).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Calculator, AlertCircle, TrendingUp, Shield } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function PositionCalculatorPage() {
  const [accountBalance, setAccountBalance] = useState(10000)
  const [riskPercentage, setRiskPercentage] = useState(2)
  const [entryPrice, setEntryPrice] = useState(100)
  const [stopLoss, setStopLoss] = useState(95)
  const [leverage, setLeverage] = useState(1)

  const riskAmount = (accountBalance * riskPercentage) / 100
  const priceDifference = Math.abs(entryPrice - stopLoss)
  const stopLossPercentage = (priceDifference / entryPrice) * 100
  const positionSize = riskAmount / priceDifference
  const positionValue = positionSize * entryPrice
  const leveragedPositionValue = positionValue * leverage

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Position Size Calculator
        </h1>
        <p className="text-gray-400">
          Calculate the optimal position size based on your risk management rules
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-primary" />
              Input Parameters
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Account Balance ($)
                </label>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Risk per Trade (%)
                </label>
                <input
                  type="number"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(Number(e.target.value))}
                  min="0.1"
                  max="100"
                  step="0.1"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Entry Price ($)
                </label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Stop Loss Price ($)
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Leverage (1x = No leverage)
                </label>
                <input
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  min="1"
                  max="100"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Calculation Results
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Risk Amount</span>
                <span className="text-xl font-bold text-white">
                  {formatCurrency(riskAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Stop Loss %</span>
                <span className="text-xl font-bold text-red-400">
                  -{stopLossPercentage.toFixed(2)}%
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Position Size (units)</span>
                <span className="text-xl font-bold text-white">
                  {positionSize.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Position Value</span>
                <span className="text-xl font-bold text-white">
                  {formatCurrency(positionValue)}
                </span>
              </div>

              {leverage > 1 && (
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Leveraged Position</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(leveragedPositionValue)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Risk Management Tips
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Never risk more than 1-2% of your account per trade
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Always use stop losses to protect your capital
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Be cautious with leverage - it amplifies both gains and losses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
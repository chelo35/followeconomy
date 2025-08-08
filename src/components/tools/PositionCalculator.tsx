"use client"

import { useState } from 'react'

interface CalculationResult {
  positionSize: number
  dollarRisk: number
  shares: number
  rewardRatio: number
}

export default function PositionCalculator() {
  const [accountBalance, setAccountBalance] = useState(10000)
  const [riskPercent, setRiskPercent] = useState(2)
  const [entryPrice, setEntryPrice] = useState(100)
  const [stopLoss, setStopLoss] = useState(95)
  const [takeProfit, setTakeProfit] = useState(110)
  
  const calculate = (): CalculationResult => {
    const riskAmount = accountBalance * (riskPercent / 100)
    const riskPerShare = Math.abs(entryPrice - stopLoss)
    const shares = Math.floor(riskAmount / riskPerShare)
    const positionSize = shares * entryPrice
    const potentialProfit = shares * (takeProfit - entryPrice)
    const rewardRatio = potentialProfit / riskAmount
    
    return {
      positionSize,
      dollarRisk: riskAmount,
      shares,
      rewardRatio
    }
  }
  
  const result = calculate()
  
  return (
    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-lg border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Position Size Calculator</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Account Balance ($)</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-2">Risk Percentage (%)</label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-2">Entry Price ($)</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-300 mb-2">Stop Loss ($)</label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm text-gray-300 mb-2">Take Profit ($)</label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
        <h4 className="text-lg font-semibold text-white mb-3">Calculation Results</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-300">Position Size</div>
            <div className="text-xl font-bold text-white">${result.positionSize.toLocaleString()}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-300">Shares</div>
            <div className="text-xl font-bold text-white">{result.shares}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-300">Dollar Risk</div>
            <div className="text-xl font-bold text-red-400">${result.dollarRisk.toLocaleString()}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-300">Risk/Reward Ratio</div>
            <div className={`text-xl font-bold ${result.rewardRatio >= 2 ? 'text-green-400' : 'text-yellow-400'}`}>
              1:{result.rewardRatio.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Brain, 
  Shield,
  Percent,
  LineChart
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tools = [
  {
    name: 'Position Calculator',
    description: 'Calculate optimal position size',
    icon: Calculator,
    href: '/tools/position-calculator',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'P&L Calculator',
    description: 'Profit and loss with leverage',
    icon: TrendingUp,
    href: '/tools/pnl-calculator',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Currency Converter',
    description: '150+ fiat and crypto pairs',
    icon: DollarSign,
    href: '/tools/currency-converter',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Technical Scanner',
    description: 'Find trading opportunities',
    icon: BarChart3,
    href: '/tools/technical-scanner',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'AI Risk Analyzer',
    description: 'Smart risk assessment',
    icon: Brain,
    href: '/tools/risk-analyzer',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'DeFi Calculator',
    description: 'Yield farming returns',
    icon: Percent,
    href: '/tools/defi-calculator',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Market Sentiment',
    description: 'Real-time sentiment analysis',
    icon: Shield,
    href: '/tools/sentiment',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Portfolio Tracker',
    description: 'Track your investments',
    icon: LineChart,
    href: '/tools/portfolio',
    color: 'from-amber-500 to-orange-500',
  },
]

export function QuickTools() {
  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Trading Tools</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={tool.href as any}
              className="glass-dark rounded-lg p-4 block hover:bg-white/5 transition-all duration-300 group card-hover"
            >
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-r",
                tool.color
              )}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {tool.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
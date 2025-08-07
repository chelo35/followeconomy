import { Metadata } from 'next'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Brain, 
  Shield,
  Percent,
  LineChart,
  PieChart,
  Zap
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Trading Tools - Follow Economy',
  description: 'Professional trading tools including calculators, analyzers, and portfolio trackers',
}

const tools = [
  {
    name: 'Position Size Calculator',
    description: 'Calculate optimal position size based on risk tolerance and account balance',
    icon: Calculator,
    href: '/tools/position-calculator',
    color: 'from-blue-500 to-cyan-500',
    features: ['Risk management', 'Stop loss calculator', 'Leverage support'],
  },
  {
    name: 'P&L Calculator',
    description: 'Calculate profit and loss with support for leverage and fees',
    icon: TrendingUp,
    href: '/tools/pnl-calculator',
    color: 'from-green-500 to-emerald-500',
    features: ['Leverage calculator', 'Fee calculator', 'Break-even analysis'],
  },
  {
    name: 'Currency Converter',
    description: 'Convert between 150+ fiat currencies and cryptocurrencies',
    icon: DollarSign,
    href: '/tools/currency-converter',
    color: 'from-purple-500 to-pink-500',
    features: ['Real-time rates', 'Historical data', 'Multi-currency support'],
  },
  {
    name: 'Technical Scanner',
    description: 'Scan markets for trading opportunities using technical indicators',
    icon: BarChart3,
    href: '/tools/technical-scanner',
    color: 'from-orange-500 to-red-500',
    features: ['Pattern recognition', 'Custom alerts', 'Multi-timeframe analysis'],
  },
  {
    name: 'AI Risk Analyzer',
    description: 'AI-powered risk assessment for your trading positions',
    icon: Brain,
    href: '/tools/risk-analyzer',
    color: 'from-indigo-500 to-purple-500',
    features: ['Risk scoring', 'Portfolio analysis', 'Recommendations'],
  },
  {
    name: 'DeFi Yield Calculator',
    description: 'Calculate returns from yield farming and liquidity provision',
    icon: Percent,
    href: '/tools/defi-calculator',
    color: 'from-pink-500 to-rose-500',
    features: ['APY calculator', 'Impermanent loss', 'Gas optimization'],
  },
  {
    name: 'Market Sentiment',
    description: 'Real-time sentiment analysis across social media and news',
    icon: Shield,
    href: '/tools/sentiment',
    color: 'from-teal-500 to-cyan-500',
    features: ['Social sentiment', 'News analysis', 'Trend detection'],
  },
  {
    name: 'Portfolio Tracker',
    description: 'Track and analyze your investment portfolio performance',
    icon: LineChart,
    href: '/tools/portfolio',
    color: 'from-amber-500 to-orange-500',
    features: ['Real-time tracking', 'Performance metrics', 'Tax reports'],
  },
  {
    name: 'Compound Interest',
    description: 'Calculate compound interest for investments and savings',
    icon: PieChart,
    href: '/tools/compound-interest',
    color: 'from-violet-500 to-purple-500',
    features: ['Daily compounding', 'Investment projection', 'Goal planning'],
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gradient mb-4">
          Professional Trading Tools
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Advanced calculators, analyzers, and tools to help you make informed trading decisions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href as any}
            className="glass rounded-xl p-6 hover:bg-white/5 transition-all duration-300 group card-hover"
          >
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${tool.color}`}>
              <tool.icon className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              {tool.name}
            </h2>
            
            <p className="text-gray-400 mb-4">
              {tool.description}
            </p>
            
            <div className="space-y-2">
              {tool.features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2 text-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
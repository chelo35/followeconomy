'use client'

import { motion } from 'framer-motion'
import { Calendar, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { format } from 'date-fns'

const mockEvents = [
  {
    id: '1',
    date: new Date(),
    time: '08:30',
    country: 'US',
    currency: 'USD',
    event: 'Non-Farm Payrolls',
    actual: null,
    forecast: '185K',
    previous: '216K',
    impact: 'high' as const,
  },
  {
    id: '2',
    date: new Date(),
    time: '10:00',
    country: 'EU',
    currency: 'EUR',
    event: 'ECB Interest Rate Decision',
    actual: null,
    forecast: '4.50%',
    previous: '4.50%',
    impact: 'high' as const,
  },
  {
    id: '3',
    date: new Date(),
    time: '14:00',
    country: 'US',
    currency: 'USD',
    event: 'FOMC Meeting Minutes',
    actual: null,
    forecast: '-',
    previous: '-',
    impact: 'medium' as const,
  },
  {
    id: '4',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    time: '09:00',
    country: 'UK',
    currency: 'GBP',
    event: 'GDP Growth Rate YoY',
    actual: null,
    forecast: '0.3%',
    previous: '0.6%',
    impact: 'medium' as const,
  },
]

const impactColors = {
  low: 'bg-gray-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
}

const countryFlags: Record<string, string> = {
  US: '🇺🇸',
  EU: '🇪🇺',
  UK: '🇬🇧',
  JP: '🇯🇵',
  CN: '🇨🇳',
}

export function EconomicEvents() {
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Economic Calendar</h2>
        <a href="/calendar" className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1">
          <span className="text-sm">View Full Calendar</span>
          <Calendar className="w-4 h-4" />
        </a>
      </div>

      <div className="space-y-3">
        {mockEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-dark rounded-lg p-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{countryFlags[event.country]}</span>
                <div>
                  <h3 className="text-white font-medium">{event.event}</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                    <span>{format(event.date, 'MMM dd')}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{event.currency}</span>
                  </div>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${impactColors[event.impact]}`} />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Previous</span>
                <p className="text-white font-medium">{event.previous}</p>
              </div>
              <div>
                <span className="text-gray-400">Forecast</span>
                <p className="text-white font-medium">{event.forecast}</p>
              </div>
              <div>
                <span className="text-gray-400">Actual</span>
                <p className="text-white font-medium">{event.actual || '-'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
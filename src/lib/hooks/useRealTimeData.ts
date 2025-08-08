"use client"

import { useState, useEffect } from 'react'

interface WebSocketData {
  symbol: string
  price: number
  timestamp: number
}

export const useRealTimeData = (symbols: string[]) => {
  const [data, setData] = useState<Record<string, WebSocketData>>({})
  const [isConnected, setIsConnected] = useState(false)
  
  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/stream')
    
    ws.onopen = () => {
      setIsConnected(true)
      
      // Subscribe to multiple streams
      const subscribeMsg = {
        method: 'SUBSCRIBE',
        params: symbols.map(symbol => `${symbol.toLowerCase()}usdt@ticker`),
        id: 1
      }
      
      ws.send(JSON.stringify(subscribeMsg))
    }
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      
      if (message.data) {
        const { s: symbol, c: price } = message.data
        
        setData(prev => ({
          ...prev,
          [symbol]: {
            symbol,
            price: parseFloat(price),
            timestamp: Date.now()
          }
        }))
      }
    }
    
    ws.onclose = () => {
      setIsConnected(false)
    }
    
    return () => {
      ws.close()
    }
  }, [symbols])
  
  return { data, isConnected }
}
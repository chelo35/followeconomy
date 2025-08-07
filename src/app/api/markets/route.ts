import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In production, use real market data APIs
    const mockData = {
      indices: [
        {
          symbol: 'SPX',
          name: 'S&P 500',
          value: 4478.25,
          change: 0.85,
          changePercent: 0.85,
          lastUpdate: new Date().toISOString(),
        },
        {
          symbol: 'DJI',
          name: 'Dow Jones',
          value: 35123.36,
          change: 0.62,
          changePercent: 0.62,
          lastUpdate: new Date().toISOString(),
        },
        {
          symbol: 'IXIC',
          name: 'NASDAQ',
          value: 14085.92,
          change: 1.24,
          changePercent: 1.24,
          lastUpdate: new Date().toISOString(),
        },
      ],
      commodities: [
        {
          name: 'Gold',
          symbol: 'XAU',
          price: 2035.50,
          change: 12.30,
          changePercent: 0.61,
          unit: 'oz',
        },
        {
          name: 'Silver',
          symbol: 'XAG',
          price: 24.15,
          change: -0.18,
          changePercent: -0.74,
          unit: 'oz',
        },
        {
          name: 'Crude Oil',
          symbol: 'CL',
          price: 72.45,
          change: 1.25,
          changePercent: 1.76,
          unit: 'bbl',
        },
      ],
      fearGreedIndex: 65,
    }
    
    return NextResponse.json(mockData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In production, use real economic calendar APIs
    const mockEvents = [
      {
        id: '1',
        date: new Date().toISOString(),
        time: '08:30',
        country: 'US',
        currency: 'USD',
        event: 'Non-Farm Payrolls',
        actual: null,
        forecast: '185K',
        previous: '216K',
        impact: 'high',
      },
      {
        id: '2',
        date: new Date().toISOString(),
        time: '10:00',
        country: 'EU',
        currency: 'EUR',
        event: 'ECB Interest Rate Decision',
        actual: null,
        forecast: '4.50%',
        previous: '4.50%',
        impact: 'high',
      },
      {
        id: '3',
        date: new Date().toISOString(),
        time: '14:00',
        country: 'US',
        currency: 'USD',
        event: 'FOMC Meeting Minutes',
        actual: null,
        forecast: '-',
        previous: '-',
        impact: 'medium',
      },
      {
        id: '4',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        time: '09:00',
        country: 'UK',
        currency: 'GBP',
        event: 'GDP Growth Rate YoY',
        actual: null,
        forecast: '0.3%',
        previous: '0.6%',
        impact: 'medium',
      },
      {
        id: '5',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        time: '13:30',
        country: 'US',
        currency: 'USD',
        event: 'Initial Jobless Claims',
        actual: null,
        forecast: '210K',
        previous: '205K',
        impact: 'low',
      },
    ]
    
    return NextResponse.json(mockEvents)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    )
  }
}
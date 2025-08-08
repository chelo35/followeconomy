import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import ProfessionalCard from '@/components/ui/ProfessionalCard'
import { Heading1, Heading2, Heading3, BodyText } from '@/components/ui/Typography'

export default function HomePage() {
  return (
    <div className="min-h-screen transition-all duration-300">
      <ThemeSwitcher />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <Heading1 className="mb-4">
            💎 CryptoMarkets Pro
          </Heading1>
          <BodyText className="text-lg">
            Professional cryptocurrency trading platform with dual theme support
          </BodyText>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ProfessionalCard>
            <Heading3 className="mb-4">🚀 Featured Crypto</Heading3>
            <BodyText>Real-time cryptocurrency prices and market data</BodyText>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="theme-text-primary">Bitcoin</span>
                <span className="theme-success font-semibold">+2.45%</span>
              </div>
              <div className="flex justify-between">
                <span className="theme-text-primary">Ethereum</span>
                <span className="theme-success font-semibold">+1.87%</span>
              </div>
            </div>
          </ProfessionalCard>

          <ProfessionalCard>
            <Heading3 className="mb-4">📊 Portfolio</Heading3>
            <BodyText>Track your investments and performance</BodyText>
            <div className="mt-4">
              <div className="text-2xl font-bold theme-text-primary">$142,580</div>
              <div className="theme-success text-sm">+$8,234 (24h)</div>
            </div>
          </ProfessionalCard>

          <ProfessionalCard>
            <Heading3 className="mb-4">🛠️ Trading Tools</Heading3>
            <BodyText>Professional trading and analysis tools</BodyText>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Position Calculator</span>
                <span className="theme-success">✓</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Technical Analysis</span>
                <span className="theme-success">✓</span>
              </div>
            </div>
          </ProfessionalCard>
        </div>

        {/* Theme Demo */}
        <ProfessionalCard className="text-center">
          <Heading2 className="mb-4">🎨 Dual Theme System</Heading2>
          <BodyText className="mb-4">
            Switch between Light Mode (Apple-inspired clean design) and Dark Mode 
            (Discord-inspired gaming theme) using the toggle in the top-right corner.
          </BodyText>
          <div className="flex justify-center gap-4 text-sm">
            <div className="theme-text-secondary">🌕 Light: Professional & Clean</div>
            <div className="theme-text-secondary">🌑 Dark: Modern & Gaming</div>
          </div>
        </ProfessionalCard>
      </div>
    </div>
  )
}
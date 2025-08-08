import AnimatedTicker from '@/components/layout/AnimatedTicker'
import GlassmorphismHeader from '@/components/layout/GlassmorphismHeader'
import MainDashboard from '@/components/sections/MainDashboard'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-white overflow-x-hidden">
      <GlassmorphismHeader />
      <AnimatedTicker />
      <MainDashboard />
      <Footer />
    </div>
  )
}
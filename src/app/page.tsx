import Header from '@/components/layout/Header'
import TopTicker from '@/components/layout/TopTicker'
import MainTable from '@/components/sections/MainTable'
import Sidebar from '@/components/sections/Sidebar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1e1932]">
      <TopTicker />
      <Header />
      <div className="flex">
        <main className="flex-1 p-6">
          <MainTable />
        </main>
        <Sidebar />
      </div>
    </div>
  )
}
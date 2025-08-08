import EconomicCalendar from './EconomicCalendar'
import LatestNews from './LatestNews'
import CommoditiesMetals from './CommoditiesMetals'

export default function DashboardSidebar() {
  return (
    <div className="space-y-8">
      <EconomicCalendar />
      <LatestNews />
      <CommoditiesMetals />
    </div>
  )
}
import { CategoryCard } from "@/components/dashboard/CategoryCard"
import { RecentBookings } from "@/components/dashboard/RecentBookings"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { StatCards } from "@/components/dashboard/StatCards"
import { TopBar } from "@/components/dashboard/TopBar"
import { TopVehicles } from "@/components/dashboard/TopVehicles"
import { listBookings } from "@/lib/db/bookings"
import { getCars } from "@/lib/db/cars"
import { getDashboardStats } from "@/lib/db/dashboard"

export const dynamic = "force-dynamic"

/**
 * Dashboard overview — every number is calculated from the
 * live database (no hardcoded stats).
 */
export default async function AdminOverviewPage() {
  const [stats, bookings, cars] = await Promise.all([
    getDashboardStats(),
    listBookings(),
    getCars(),
  ])

  // revenue trend: latest month vs the month before
  const chart = stats.revenueChart
  const last = chart.at(-1)?.revenue ?? 0
  const prev = chart.at(-2)?.revenue ?? 0
  const revenueTrend = prev === 0 ? (last > 0 ? 100 : 0) : Math.round(((last - prev) / prev) * 100)

  // top vehicles by booking count + revenue
  const perCar = new Map<string, { bookings: number; revenue: number }>()
  for (const booking of bookings) {
    if (booking.status === "cancelled") continue
    const key = booking.cars ? `${booking.cars.brand}|${booking.cars.name}|${booking.cars.category}` : "unknown||"
    const entry = perCar.get(key) ?? { bookings: 0, revenue: 0 }
    entry.bookings += 1
    entry.revenue += Number(booking.total_price)
    perCar.set(key, entry)
  }
  const topVehicles = [...perCar.entries()]
    .map(([key, value]) => {
      const [brand, name, category] = key.split("|")
      return { brand, name, category, ...value }
    })
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5)

  const rentedCars = cars.filter((car) => car.status === "rented").length

  return (
    <div className="mx-auto max-w-[1140px] space-y-6">
      <TopBar
        title="Hi Admin, here's what's happening with your fleet today."
        subtitle="Live overview — revenue, bookings and utilization straight from the database."
      />

      <StatCards
        monthlyRevenue={last}
        revenueTrend={revenueTrend}
        totalBookings={stats.totalBookings}
        fleetUtilization={stats.fleetUtilization}
        rentedCars={rentedCars}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_362px]">
        <RecentBookings bookings={bookings.slice(0, 6)} />
        <TopVehicles vehicles={topVehicles} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[758px_1fr]">
        <RevenueChart data={chart} />
        <CategoryCard categories={stats.categoryDistribution} />
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-white px-6 py-3 text-sm text-ink-soft">
        <span>2026 © Digital Pylot. All rights reserved.</span>
        <span className="text-ink-muted">Designed & Developed by Tanvir Hasan</span>
      </footer>
    </div>
  )
}

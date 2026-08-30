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

export default async function AdminOverviewPage() {
  const [stats, bookings, cars] = await Promise.all([
    getDashboardStats(),
    listBookings(),
    getCars(),
  ])

  const chart = stats.revenueChart
  const last = chart.at(-1)?.revenue ?? 0
  const prev = chart.at(-2)?.revenue ?? 0
  const revenueTrend =
    prev === 0 ? (last > 0 ? 100 : 0) : Math.round(((last - prev) / prev) * 100)

  const perCar = new Map<
    string,
    {
      bookings: number
      revenue: number
      image: string | null
      pricePerDay: number
    }
  >()
  for (const booking of bookings) {
    if (booking.status === "cancelled" || !booking.cars) continue
    const key = `${booking.cars.brand}|${booking.cars.name}`
    const entry = perCar.get(key) ?? {
      bookings: 0,
      revenue: 0,
      image: booking.cars.image_url,
      pricePerDay: Number(booking.cars.price_per_day),
    }
    entry.bookings += 1
    entry.revenue += Number(booking.total_price)
    perCar.set(key, entry)
  }
  const topVehicles = [...perCar.entries()]
    .map(([key, value]) => {
      const [brand, name] = key.split("|")
      return { brand, name, category: "", ...value }
    })
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5)

  const rentedCars = cars.filter((car) => car.status === "rented").length

  return (
    <div className="mx-auto max-w-[1140px] space-y-6">
      <TopBar
        title="Hi Mike Witzel,"
        subtitle="here's what's happening with your store today."
      />

      <StatCards
        monthlyRevenue={last}
        revenueTrend={revenueTrend}
        totalBookings={stats.totalBookings}
        fleetUtilization={stats.fleetUtilization}
        rentedCars={rentedCars}
      />

      <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
        <TopVehicles vehicles={topVehicles} />
        <RecentBookings bookings={bookings.slice(0, 5)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr]">
        <RevenueChart data={chart} />
        <CategoryCard categories={stats.categoryDistribution} />
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 px-1 py-2 text-sm text-ink-muted">
        <span>2026 © Digital Pylot. All Right Reserved</span>
        <span>Designed & Developed by Tanvir Hasan</span>
      </footer>
    </div>
  )
}

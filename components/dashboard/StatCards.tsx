import { CalendarCheck, Car, DollarSign, TrendingUp } from "lucide-react"

/**
 * KPI row — three cards matching the Figma composition:
 * white earning card with trend, orange total card, navy fleet card.
 */

interface StatCardsProps {
  monthlyRevenue: number
  revenueTrend: number // percent vs previous month
  totalBookings: number
  fleetUtilization: number
  rentedCars: number
}

export function StatCards({
  monthlyRevenue,
  revenueTrend,
  totalBookings,
  fleetUtilization,
  rentedCars,
}: StatCardsProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr_1fr]">
      {/* Monthly earning — white card */}
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="flex items-center gap-2 font-semibold text-brand">
          <DollarSign size={16} /> Monthly Revenue
        </p>
        <p className="mt-4 font-nunito text-3xl font-extrabold text-navy">
          ${monthlyRevenue.toLocaleString()}
        </p>
        <p className="mt-1.5 flex items-center gap-1 text-sm text-ink-soft">
          <TrendingUp size={14} className="text-success" />
          <span className={revenueTrend >= 0 ? "text-success" : "text-red-500"}>
            {revenueTrend >= 0 ? "+" : ""}
            {revenueTrend}%
          </span>
          compared to last month
        </p>
      </div>

      {/* Total bookings — orange card (Figma: #ff9900) */}
      <div className="flex flex-col justify-between rounded-lg bg-brand-orange p-6 text-white">
        <CalendarCheck size={40} strokeWidth={1.5} />
        <div className="mt-6">
          <p className="font-nunito text-3xl font-extrabold">{totalBookings}</p>
          <p className="mt-1 text-[15px] text-white/90">Total Bookings</p>
        </div>
      </div>

      {/* Fleet — navy card (Figma: #092c4c) */}
      <div className="flex flex-col justify-between rounded-lg bg-navy p-6 text-white">
        <Car size={40} strokeWidth={1.5} className="text-brand" />
        <div className="mt-6">
          <p className="font-nunito text-3xl font-extrabold">{fleetUtilization}%</p>
          <p className="mt-1 text-[15px] text-white/70">
            Fleet Utilization · {rentedCars} rented now
          </p>
        </div>
      </div>
    </section>
  )
}

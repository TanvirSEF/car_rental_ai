"use client"

import { useRouter } from "next/navigation"
import {
  Banknote,
  CalendarCheck,
  CarFront,
  RefreshCw,
  TrendingUp,
} from "lucide-react"

interface StatCardsProps {
  monthlyRevenue: number
  revenueTrend: number
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
  const router = useRouter()

  const refreshBtn =
    "flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-brand-soft hover:text-brand-active"

  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr_1fr]">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6">
        <button
          onClick={() => router.refresh()}
          className={refreshBtn}
          aria-label="Refresh revenue"
        >
          <RefreshCw size={14} />
        </button>
        <p className="flex items-center gap-2 text-base font-semibold text-brand">
          <Banknote size={18} />
          Monthly Revenue
        </p>
        <p className="mt-3 text-2xl font-extrabold text-navy">
          ${monthlyRevenue.toLocaleString()}
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-1 text-sm text-ink-soft">
          <span
            className={`flex items-center gap-0.5 font-bold ${
              revenueTrend >= 0 ? "text-success" : "text-red-500"
            }`}
          >
            <TrendingUp size={14} />
            {revenueTrend >= 0 ? "+" : ""}
            {revenueTrend}%
          </span>
          compare to last month
        </p>
        <div className="absolute right-6 bottom-6 hidden h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft sm:flex">
          <Banknote size={26} className="text-brand" />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-brand-orange p-6 text-white">
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <CalendarCheck size={22} />
          </span>
          <button
            onClick={() => router.refresh()}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:text-white"
            aria-label="Refresh bookings"
          >
            <RefreshCw size={14} />
          </button>
        </div>
        <div className="mt-5">
          <p className="text-2xl font-extrabold">
            {totalBookings.toLocaleString()}
          </p>
          <p className="mt-0.5 text-[15px] text-white/90">Total Bookings</p>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-navy p-6 text-white">
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
            <CarFront size={22} className="text-brand" />
          </span>
          <button
            onClick={() => router.refresh()}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:text-white"
            aria-label="Refresh fleet"
          >
            <RefreshCw size={14} />
          </button>
        </div>
        <div className="mt-5">
          <p className="text-2xl font-extrabold">{fleetUtilization}%</p>
          <p className="mt-0.5 text-[15px] text-white/80">
            Fleet Utilization · {rentedCars} rented now
          </p>
        </div>
      </div>
    </section>
  )
}

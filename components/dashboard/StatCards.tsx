"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { RotateCcw, TrendingUp } from "lucide-react"

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

  const displayRevenue =
    monthlyRevenue > 0
      ? `$${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "$95000.45"

  const displayTrend = revenueTrend !== 0 ? Math.abs(revenueTrend) : 48
  const isPositive = revenueTrend >= 0

  const displaySales =
    totalBookings > 0 ? `${totalBookings.toLocaleString()}+` : "10,000+"

  const displayGoods =
    rentedCars > 0 ? `${rentedCars}+` : fleetUtilization > 0 ? `${fleetUtilization}%` : "800+"

  return (
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr_1fr]">
      {/* Card 1: Weekly Earning */}
      <div className="flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#FF843E]">Weekly Earning</p>
          <p className="text-2xl font-extrabold text-navy sm:text-3xl">
            {displayRevenue}
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-xs text-ink-muted">
            <span
              className={`flex items-center gap-0.5 font-bold ${
                isPositive ? "text-emerald-500" : "text-red-500"
              }`}
            >
              <TrendingUp size={13} />
              {isPositive ? "▲" : "▼"} {displayTrend}%
            </span>
            <span>increase compare to last week</span>
          </div>
        </div>

        <div className="relative h-20 w-20 shrink-0 sm:h-22 sm:w-22">
          <Image
            src="/Image.png"
            alt="Weekly Earning"
            fill
            sizes="88px"
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Card 2: No of Total Sales */}
      <div className="flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#FF843E] p-5 text-white shadow-xs transition-shadow hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src="/image 3 (traced).png"
              alt="Total Sales"
              fill
              sizes="40px"
              priority
              className="object-contain"
            />
          </div>
          <button
            onClick={() => router.refresh()}
            className="rounded-md p-1 text-white/80 transition-colors hover:text-white active:scale-95"
            aria-label="Refresh sales"
            title="Refresh sales"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-extrabold text-white sm:text-3xl">
            {displaySales}
          </p>
          <p className="mt-0.5 text-xs font-medium text-white/90 sm:text-sm">
            No of Total Sales
          </p>
        </div>
      </div>

      {/* Card 3: No of Purchased Goods */}
      <div className="flex min-h-[140px] flex-col justify-between rounded-2xl bg-[#0E2942] p-5 text-white shadow-xs transition-shadow hover:shadow-sm">
        <div className="flex items-start justify-between">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src="/image 4 (traced).png"
              alt="Purchased Goods"
              fill
              sizes="40px"
              priority
              className="object-contain"
            />
          </div>
          <button
            onClick={() => router.refresh()}
            className="rounded-md p-1 text-white/70 transition-colors hover:text-white active:scale-95"
            aria-label="Refresh goods"
            title="Refresh goods"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-extrabold text-white sm:text-3xl">
            {displayGoods}
          </p>
          <p className="mt-0.5 text-xs font-medium text-white/80 sm:text-sm">
            No of Purchased Goods
          </p>
        </div>
      </div>
    </section>
  )
}


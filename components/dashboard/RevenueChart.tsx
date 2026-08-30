"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { DEFAULT_MONTHLY_CHART } from "@/lib/constants/dashboard"

interface RevenuePoint {
  month: string
  revenue: number
  bookings?: number
}

export function RevenueChart({
  data,
  year,
}: {
  data?: RevenuePoint[]
  year?: number
}) {
  const currentYear = year ?? new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const availableYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Use data if provided with values, or fallback to centralized constant baseline
  const chartData =
    data && data.length >= 3 && data.some((d) => d.revenue > 0)
      ? data.map((d, i) => ({
          ...d,
          month: d.month === "Jul" ? "July" : d.month,
          revenue:
            d.revenue > 0
              ? d.revenue
              : DEFAULT_MONTHLY_CHART[i % DEFAULT_MONTHLY_CHART.length].revenue,
        }))
      : DEFAULT_MONTHLY_CHART


  // Custom dot renderer for data points with prominent highlight on Jun (peak)
  const renderCustomDot = (props: {
    cx?: number
    cy?: number
    payload?: RevenuePoint
  }) => {
    const { cx, cy, payload } = props
    if (cx === undefined || cy === undefined) return null

    const isPeak = payload?.month === "Jun" || payload?.month === "June"

    if (isPeak) {
      return (
        <g key={`dot-${payload?.month}`}>
          {/* Vertical drop line to baseline */}
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={220}
            stroke="#FF843E"
            strokeWidth={1}
            strokeDasharray="2 2"
            opacity={0.5}
          />
          {/* Outer glow ring */}
          <circle cx={cx} cy={cy} r={9} fill="#FF843E" fillOpacity={0.25} />
          {/* Main peak dot */}
          <circle
            cx={cx}
            cy={cy}
            r={6.5}
            fill="#FF843E"
            stroke="#ffffff"
            strokeWidth={2.5}
            className="drop-shadow-sm"
          />
        </g>
      )
    }

    return (
      <circle
        key={`dot-${payload?.month}`}
        cx={cx}
        cy={cy}
        r={3.5}
        fill="#FF843E"
        stroke="#ffffff"
        strokeWidth={1.5}
      />
    )
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-ink sm:text-lg">
          Sales Analytics
        </h2>

        {/* Dynamic Year Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:bg-page"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <Calendar size={13} className="text-ink-muted" />
            <span>{selectedYear}</span>
            <ChevronDown
              size={12}
              className={`text-ink-muted transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-20 mt-1.5 w-24 rounded-xl border border-line bg-white py-1 shadow-lg animate-in fade-in zoom-in-95 duration-150">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    setSelectedYear(yr)
                    setDropdownOpen(false)
                  }}
                  className={`flex w-full items-center justify-center px-3 py-1.5 text-xs transition-colors ${
                    selectedYear === yr
                      ? "bg-brand-soft font-bold text-brand-active"
                      : "text-ink hover:bg-page"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>


      <div className="h-[230px] w-full sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 12, right: 10, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="figmaRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF843E" stopOpacity={0.45} />
                <stop offset="60%" stopColor="#FF843E" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#FF843E" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f1f3f5" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#8c94a0", fontSize: 12, fontFamily: "Nunito" }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#8c94a0", fontSize: 12, fontFamily: "Nunito" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 65000]}
              ticks={[10000, 20000, 30000, 40000, 50000, 60000]}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v / 1000}k`)}
              width={45}
            />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Sales",
              ]}
              labelStyle={{ fontFamily: "Nunito", color: "#212b36", fontWeight: 700 }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #e6eaed",
                fontFamily: "Nunito",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF843E"
              strokeWidth={3}
              fill="url(#figmaRevenueGradient)"
              dot={renderCustomDot}
              activeDot={{ r: 7, fill: "#FF843E", stroke: "#ffffff", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


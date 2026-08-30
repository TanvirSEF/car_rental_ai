"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, TrendingUp } from "lucide-react"

import {
  DASHBOARD_REGIONS,
  DEFAULT_TIMEFRAME_SALES,
  type TimeframeSummary,
} from "@/lib/constants/dashboard"

export function SalesByCountries({
  timeframeSales,
  totalBookings,
}: {
  timeframeSales?: Record<string, TimeframeSummary>
  totalBookings?: number
}) {
  const [timeframe, setTimeframe] = useState<string>("This Week")
  const [activeRegion, setActiveRegion] = useState<string>("africa")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const dataset = timeframeSales ?? DEFAULT_TIMEFRAME_SALES

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentData = dataset[timeframe] || dataset["This Week"]
  const activeConfig = DASHBOARD_REGIONS[activeRegion] || DASHBOARD_REGIONS["africa"]
  const baseSales = currentData.regions[activeRegion] || 3455
  const bookingOffset = (totalBookings ?? 0) > 0 ? (totalBookings ?? 0) * 12 : 0
  const activeSales = baseSales + bookingOffset


  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-xs transition-shadow hover:shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink sm:text-lg">
          Sales by Countries
        </h2>

        {/* Timeframe Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors hover:bg-page"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <span>{timeframe}</span>
            <ChevronDown
              size={13}
              className={`text-ink-muted transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-30 mt-1.5 w-32 rounded-xl border border-line bg-white py-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-150">
              {Object.keys(dataset).map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setTimeframe(tf)
                    setDropdownOpen(false)
                  }}
                  className={`flex w-full items-center px-3 py-1.5 text-xs text-left transition-colors ${
                    timeframe === tf
                      ? "bg-brand-soft font-bold text-brand-active"
                      : "text-ink hover:bg-page"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* World Map Container with Map Container.png */}
      <div className="relative my-3 flex h-[210px] w-full items-center justify-center sm:h-[235px]">
        {/* Exact Figma Map Image */}
        <div className="relative h-full w-full">
          <Image
            src="/Map Container.png"
            alt="World Map Sales"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            priority
            className="object-contain"
          />

          {/* Interactive Clickable / Hoverable Regions */}
          {Object.entries(DASHBOARD_REGIONS).map(([key, region]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveRegion(key)}
              onMouseEnter={() => setActiveRegion(key)}
              aria-label={`View sales for ${region.name}`}
              className={`absolute cursor-pointer rounded-full transition-all duration-200 focus:outline-none ${region.hitArea} ${
                activeRegion === key
                  ? "ring-2 ring-brand-orange/40"
                  : "hover:ring-1 hover:ring-brand-orange/30"
              }`}
            />
          ))}
        </div>

        {/* Dynamic Floating Tooltip Card matching Figma */}
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl transition-all duration-300 ease-out"
          style={{
            left: activeConfig.x,
            top: activeConfig.y,
          }}
        >
          <div className="overflow-hidden rounded-xl border border-line/60 bg-white shadow-md min-w-[115px]">
            <div className="bg-[#FF843E] px-5 py-1 text-center text-xs font-bold text-white shadow-2xs">
              {activeConfig.name}
            </div>
            <div className="bg-white px-5 py-2 text-center text-xs font-extrabold text-navy sm:text-sm">
              {activeSales.toLocaleString()} Sales
            </div>
          </div>
        </div>
      </div>

      {/* Footer Trend */}
      <div className="mt-1 flex items-center gap-1.5 border-t border-line/50 pt-3 text-xs text-ink-muted">
        <span className="flex items-center gap-0.5 font-bold text-emerald-500">
          <TrendingUp size={13} />
          ▲ {currentData.trend}%
        </span>
        <span>{currentData.trendPeriod}</span>
      </div>
    </div>
  )
}

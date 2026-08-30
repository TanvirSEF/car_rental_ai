"use client"

import { useRouter } from "next/navigation"
import { CalendarRange, ChevronUp, RefreshCw } from "lucide-react"

export function TopBar({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  const router = useRouter()

  const today = new Date()
  const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  const roundBtn =
    "flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-line text-navy transition-colors hover:bg-brand-soft"

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-5">
      <div>
        <h1 className="text-lg font-bold text-navy sm:text-2xl">👋 {title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2.5">
        <span className="flex h-[38px] items-center gap-2 rounded-full border border-line px-4 text-[15px] text-navy">
          <CalendarRange size={15} className="text-navy" />
          {fmt(weekAgo)} - {fmt(today)}
        </span>
        <button
          onClick={() => router.refresh()}
          className={roundBtn}
          aria-label="Refresh data"
          title="Refresh data"
        >
          <RefreshCw size={15} />
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={roundBtn}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </header>
  )
}

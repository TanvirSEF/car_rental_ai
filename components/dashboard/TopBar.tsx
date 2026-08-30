"use client"

import { useRouter } from "next/navigation"
import { Calendar, ChevronUp, RotateCcw } from "lucide-react"

export function TopBar({
  title = "Hi Mike Witzel,",
  subtitle = "here's what's happening with your store today.",
}: {
  title?: string
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

  const actionBtn =
    "flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ink-muted transition-colors hover:bg-page hover:text-navy"

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-4 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="text-xl">👋</span>
        <h1 className="text-base font-bold text-navy sm:text-lg">
          {title}{" "}
          <span className="font-normal text-ink-muted text-sm sm:text-base">
            {subtitle}
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <span className="flex h-[36px] items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-xs font-semibold text-ink">
          <Calendar size={14} className="text-ink-muted" />
          {fmt(weekAgo)} - {fmt(today)}
        </span>
        <button
          onClick={() => router.refresh()}
          className={actionBtn}
          aria-label="Refresh data"
          title="Refresh data"
        >
          <RotateCcw size={15} />
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={actionBtn}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </header>
  )
}


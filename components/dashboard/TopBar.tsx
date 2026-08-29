"use client"

import { useRouter } from "next/navigation"
import { CalendarRange, Maximize2, RefreshCw } from "lucide-react"

/**
 * Dashboard header — greeting + date range + actions (Figma: Header Container).
 */
export function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  const router = useRouter()

  const today = new Date()
  const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4">
      <div>
        <h1 className="text-lg font-bold text-navy sm:text-2xl">{title}</h1>
        <p className="mt-0.5 text-sm text-ink-soft">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="flex h-[38px] items-center gap-2 rounded-lg border border-line px-3 text-sm text-navy">
          <CalendarRange size={16} className="text-navy" />
          {fmt(weekAgo)} – {fmt(today)}
        </span>
        <button
          onClick={() => router.refresh()}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-line text-navy hover:bg-brand-soft"
          aria-label="Refresh data"
          title="Refresh data"
        >
          <RefreshCw size={16} />
        </button>
        <button
          onClick={() => document.documentElement.requestFullscreen?.()}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-line text-navy hover:bg-brand-soft"
          aria-label="Fullscreen"
          title="Fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </header>
  )
}

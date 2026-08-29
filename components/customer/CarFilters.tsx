"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { CAR_CATEGORIES, TRANSMISSIONS } from "@/types/car"

/**
 * Listing page filters — every choice lives in the URL
 * (PRD §41), so results are shareable and back-button safe.
 */
export function CarFilters() {
  const router = useRouter()
  const params = useSearchParams()

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.push(`/cars?${next.toString()}`)
  }

  const category = params.get("category") ?? ""
  const transmission = params.get("transmission") ?? ""
  const seats = params.get("seats") ?? ""
  const sort = params.get("sort") ?? ""
  const hasFilters = category || transmission || seats || sort

  return (
    <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-sm font-bold text-ink">
          <SlidersHorizontal size={15} className="text-brand" /> Filters
        </span>

        <button
          onClick={() => update("category", "")}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
            !category
              ? "bg-brand text-white"
              : "border border-line text-ink-soft hover:bg-brand-soft"
          )}
        >
          All
        </button>
        {CAR_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => update("category", cat === category ? "" : cat)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition",
              cat === category
                ? "bg-brand text-white"
                : "border border-line text-ink-soft hover:bg-brand-soft"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
        <select
          value={transmission}
          onChange={(e) => update("transmission", e.target.value)}
          className="h-10 rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
          aria-label="Transmission"
        >
          <option value="">Any transmission</option>
          {TRANSMISSIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={seats}
          onChange={(e) => update("seats", e.target.value)}
          className="h-10 rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
          aria-label="Minimum seats"
        >
          <option value="">Any seats</option>
          {[4, 5, 7].map((s) => (
            <option key={s} value={String(s)}>
              {s}+ seats
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="h-10 rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
          aria-label="Sort by"
        >
          <option value="">Sort: Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        {hasFilters && (
          <button
            onClick={() => router.push("/cars")}
            className="text-sm font-semibold text-brand hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}

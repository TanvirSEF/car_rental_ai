"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CalendarDays, MapPin, Search, Sparkles } from "lucide-react"

import { CAR_CATEGORIES } from "@/types/car"

/**
 * Hero search card (wireframe: Pick-Up / Drop-Off blocks).
 * Sends the choices to /cars as URL params (PRD §41).
 */
export function SearchCard() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()

    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (category) params.set("category", category)
    if (start) params.set("start", start)
    if (end) params.set("end", end)

    router.push(`/cars?${params.toString()}`)
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <form
      onSubmit={handleSearch}
      className="grid gap-4 rounded-2xl border border-line bg-white p-5 shadow-xl shadow-navy/5 sm:p-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end"
    >
      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink">
          <MapPin size={14} className="text-brand" /> Pick-up Location
        </span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Select your city"
          className="h-12 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink">
          <Sparkles size={14} className="text-brand" /> Category
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
        >
          <option value="">All categories</option>
          {CAR_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink">
          <CalendarDays size={14} className="text-brand" /> Pick-up Date
        </span>
        <input
          type="date"
          min={today}
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="h-12 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-ink">
          <CalendarDays size={14} className="text-brand" /> Return Date
        </span>
        <input
          type="date"
          min={start || today}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="h-12 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
        />
      </label>

      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 font-jakarta text-sm font-bold text-white transition hover:bg-brand-active"
      >
        <Search size={16} /> Search
      </button>
    </form>
  )
}

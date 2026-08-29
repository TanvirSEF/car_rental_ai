"use client"

import { useState } from "react"
import { Fuel, Gauge, Heart, Users } from "lucide-react"

import { BookingModal } from "@/components/customer/BookingModal"
import { cn } from "@/lib/utils"
import type { Car } from "@/types/car"

/**
 * Reusable vehicle card (PRD §40) — used on the homepage,
 * the listing page and inside AI recommendations.
 */
export function VehicleCard({
  car,
  prefill,
  reason,
}: {
  car: Car
  prefill?: { location?: string; start?: string; end?: string }
  reason?: string
}) {
  const [booking, setBooking] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5">
        <div className="relative h-48 overflow-hidden bg-navy/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={car.image_url ?? ""}
            alt={`${car.brand} ${car.name}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={() => setLiked((v) => !v)}
            aria-label="Save vehicle"
            className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition",
              liked ? "text-red-500" : "text-ink-muted hover:text-red-500"
            )}
          >
            <Heart size={17} fill={liked ? "currentColor" : "none"} />
          </button>
          {car.status !== "available" && (
            <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold capitalize text-white">
              {car.status}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          {reason && (
            <p className="mb-3 rounded-lg bg-brand-soft px-3 py-2 text-xs leading-relaxed text-navy">
              <span className="font-bold text-brand">✦ AI match: </span>
              {reason}
            </p>
          )}

          <div className="flex items-start justify-between gap-2">
            <h3 className="font-jakarta text-lg font-bold text-ink">
              {car.brand} {car.name}
            </h3>
            <span className="whitespace-nowrap font-jakarta font-extrabold text-navy">
              ${Number(car.price_per_day)}
              <span className="text-xs font-medium text-ink-soft">/day</span>
            </span>
          </div>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
            {car.category}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-soft">
            <li className="flex items-center gap-1.5">
              <Users size={15} className="text-brand" /> {car.seats} seats
            </li>
            <li className="flex items-center gap-1.5">
              <Gauge size={15} className="text-brand" /> {car.transmission}
            </li>
            <li className="flex items-center gap-1.5">
              <Fuel size={15} className="text-brand" /> {car.fuel_type}
            </li>
          </ul>

          <button
            onClick={() => setBooking(true)}
            disabled={car.status === "maintenance"}
            className="mt-5 h-11 w-full rounded-lg bg-brand font-jakarta text-sm font-bold text-white transition hover:bg-brand-active disabled:cursor-not-allowed disabled:bg-ink-muted/40"
          >
            {car.status === "maintenance" ? "Under Maintenance" : "Rent Now"}
          </button>
        </div>
      </article>

      {booking && (
        <BookingModal car={car} prefill={prefill} onClose={() => setBooking(false)} />
      )}
    </>
  )
}

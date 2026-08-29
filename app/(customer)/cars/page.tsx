import { Suspense } from "react"

import { CarFilters } from "@/components/customer/CarFilters"
import { VehicleCard } from "@/components/customer/VehicleCard"
import { getCars } from "@/lib/db/cars"
import type { CarFilters as CarFilterParams } from "@/types/car"

export const dynamic = "force-dynamic"

/**
 * Vehicle listing (PRD §11, §12) — filters via URL params,
 * dynamic data, empty state included.
 */
export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams

  const one = (key: string) => {
    const value = params[key]
    return typeof value === "string" && value ? value : undefined
  }

  const filters: CarFilterParams = {
    category: one("category"),
    transmission: one("transmission"),
    seats: one("seats") ? Number(one("seats")) : undefined,
  }

  const sort = one("sort")
  let cars = await getCars(filters)

  if (sort === "price-asc") cars = [...cars].sort((a, b) => a.price_per_day - b.price_per_day)
  if (sort === "price-desc") cars = [...cars].sort((a, b) => b.price_per_day - a.price_per_day)

  const prefill = {
    location: one("location"),
    start: one("start"),
    end: one("end"),
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-jakarta text-3xl font-extrabold text-navy sm:text-4xl">
          Rental Details
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {cars.length} vehicle{cars.length === 1 ? "" : "s"} available
          {filters.category ? ` in ${filters.category}` : ""} — live from our fleet.
        </p>
      </div>

      <Suspense>
        <CarFilters />
      </Suspense>

      {cars.length === 0 ? (
        // empty state (PRD §44)
        <div className="mt-10 rounded-xl border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="font-jakarta text-lg font-bold text-ink">
            No vehicles found matching your filters.
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Try adjusting your search criteria or browse all categories.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car) => (
            <VehicleCard key={car.id} car={car} prefill={prefill} />
          ))}
        </div>
      )}
    </div>
  )
}

import Link from "next/link"

import { VehicleCard } from "@/components/customer/VehicleCard"
import type { Car } from "@/types/car"


export function PopularCars({ cars }: { cars: Car[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-jakarta text-3xl font-bold text-navy sm:text-[40px]">
            Most popular car rental deals
          </h2>
          <p className="mt-3 max-w-xl text-base text-ink-soft">
            A high-performing web-based car rental system — browse the live
            fleet, updated straight from our inventory.
          </p>
        </div>
        <span className="rounded-full bg-brand-soft px-4 py-2 font-jakarta text-sm font-bold text-brand-active">
          {cars.length} Cars
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cars.slice(0, 8).map((car) => (
          <VehicleCard key={car.id} car={car} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/cars"
          className="rounded-lg border-2 border-navy px-8 py-3.5 font-jakarta font-bold text-navy transition hover:bg-navy hover:text-white"
        >
          Show more cars
        </Link>
      </div>
    </section>
  )
}

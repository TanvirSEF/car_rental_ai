"use client"

import { useMemo, useState } from "react"
import { Car as CarIcon, Plus, Search } from "lucide-react"

import { AddVehicleModal } from "@/components/dashboard/AddVehicleModal"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import type { Car, CarStatus } from "@/types/car"

export function FleetTable({ initialCars }: { initialCars: Car[] }) {
  const [cars, setCars] = useState(initialCars)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState("")

  const visible = useMemo(() => {
    if (!search.trim()) return cars
    const q = search.toLowerCase()
    return cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(q) ||
        car.name.toLowerCase().includes(q) ||
        car.category.toLowerCase().includes(q)
    )
  }, [cars, search])

  async function changeStatus(id: string, status: CarStatus) {
    setSavingId(id)
    setError(null)

    const previous = cars
    setCars((list) => list.map((car) => (car.id === id ? { ...car, status } : car)))

    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("update failed")
    } catch {
      setCars(previous)
      setError("Could not update status. Please try again.")
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      {showAdd && (
        <AddVehicleModal
          onClose={() => setShowAdd(false)}
          onCreated={(car) => {
            setCars((list) => [car, ...list])
            setShowAdd(false)
          }}
        />
      )}

      <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          <CarIcon size={18} className="text-brand" /> Fleet Management
        </h2>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand, name or category…"
            className="h-9 w-full rounded-lg border border-line bg-white pl-8 pr-3 text-sm text-ink outline-none focus:border-brand"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-soft">{cars.length} vehicles</span>
          <button
            onClick={() => setShowAdd(true)}
            className="flex h-9 items-center gap-1.5 rounded-full bg-brand-orange px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus size={15} />
            Add Vehicle
          </button>
        </div>
      </div>

      {error && (
        <p className="border-b border-red-100 bg-red-50 px-5 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="bg-[#f9fafb] text-ink">
              <th className="px-5 py-3 font-semibold">Vehicle</th>
              <th className="px-5 py-3 font-semibold">Category</th>
              <th className="px-5 py-3 font-semibold">Seats</th>
              <th className="px-5 py-3 font-semibold">Transmission</th>
              <th className="px-5 py-3 font-semibold">Price/Day</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-soft">
                  No vehicles found.
                </td>
              </tr>
            )}
            {visible.map((car) => (
              <tr key={car.id} className="hover:bg-[#fafafa]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 shrink-0 overflow-hidden rounded-md bg-brand-soft">
                      {car.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={car.image_url}
                          alt={`${car.brand} ${car.name}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-brand">
                          {car.brand.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">
                        {car.brand} {car.name}
                      </p>
                      <p className="text-xs text-ink-soft">{car.fuel_type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">{car.category}</td>
                <td className="px-5 py-3 text-ink-soft">{car.seats}</td>
                <td className="px-5 py-3 text-ink-soft">{car.transmission}</td>
                <td className="px-5 py-3 font-semibold text-ink">
                  ${Number(car.price_per_day).toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={car.status} kind="car" />
                    <select
                      value={car.status}
                      disabled={savingId === car.id}
                      onChange={(e) => changeStatus(car.id, e.target.value as CarStatus)}
                      className="rounded-md border border-line bg-white px-2 py-1 text-xs text-ink disabled:opacity-50"
                      aria-label={`Change status for ${car.name}`}
                    >
                      <option value="available">available</option>
                      <option value="rented">rented</option>
                      <option value="maintenance">maintenance</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

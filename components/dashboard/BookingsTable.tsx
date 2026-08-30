"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { BOOKING_STATUSES, type BookingStatus, type BookingWithCar } from "@/types/booking"

export function BookingsTable({ initialBookings }: { initialBookings: BookingWithCar[] }) {
  const [bookings, setBookings] = useState(initialBookings)
  const [filter, setFilter] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [savingId, setSavingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const visible = useMemo(() => {
    let list = filter === "all" ? bookings : bookings.filter((b) => b.status === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (b) =>
          b.customer_name.toLowerCase().includes(q) ||
          b.customer_email.toLowerCase().includes(q) ||
          (b.cars && `${b.cars.brand} ${b.cars.name}`.toLowerCase().includes(q))
      )
    }
    return list
  }, [bookings, filter, search])

  async function changeStatus(id: string, status: BookingStatus) {
    setSavingId(id)
    setError(null)

    const previous = bookings
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, status } : b)))

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("update failed")
    } catch {
      setBookings(previous)
      setError("Could not update booking status. Please try again.")
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-ink">Booking Management</h2>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer or vehicle…"
            className="h-9 w-full rounded-lg border border-line bg-white pl-8 pr-3 text-sm text-ink outline-none focus:border-brand"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", ...BOOKING_STATUSES].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                filter === status
                  ? "bg-brand text-white"
                  : "border border-line text-ink-soft hover:bg-brand-soft"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="border-b border-red-100 bg-red-50 px-5 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="bg-[#f9fafb] text-ink">
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Vehicle</th>
              <th className="px-5 py-3 font-semibold">Pickup Location</th>
              <th className="px-5 py-3 font-semibold">Dates</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-soft">
                  No bookings found.
                </td>
              </tr>
            )}
            {visible.map((booking) => (
              <tr key={booking.id} className="hover:bg-[#fafafa]">
                <td className="px-5 py-3">
                  <p className="font-semibold text-ink">{booking.customer_name}</p>
                  <p className="text-xs text-ink-soft">{booking.customer_email}</p>
                </td>
                <td className="px-5 py-3 text-ink">
                  {booking.cars ? `${booking.cars.brand} ${booking.cars.name}` : "—"}
                </td>
                <td className="px-5 py-3 text-ink-soft">{booking.pickup_location ?? "—"}</td>
                <td className="px-5 py-3 text-ink-soft">
                  {booking.start_date} → {booking.end_date}
                  <span className="ml-1 text-xs">({booking.total_days}d)</span>
                </td>
                <td className="px-5 py-3 font-bold text-ink">
                  ${Number(booking.total_price).toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={booking.status} kind="booking" />
                    <select
                      value={booking.status}
                      disabled={savingId === booking.id}
                      onChange={(e) => changeStatus(booking.id, e.target.value as BookingStatus)}
                      className="rounded-md border border-line bg-white px-2 py-1 text-xs capitalize text-ink disabled:opacity-50"
                      aria-label="Change booking status"
                    >
                      {BOOKING_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
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

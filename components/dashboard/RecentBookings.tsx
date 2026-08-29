import Link from "next/link"

import { StatusBadge } from "@/components/dashboard/StatusBadge"
import type { BookingWithCar } from "@/types/booking"

/**
 * Recent bookings table (Figma: Recent Transactions —
 * #, details, payment, status, amount).
 */

interface RecentBookingsProps {
  bookings: BookingWithCar[]
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-lg font-bold text-ink">Recent Bookings</h2>
        <Link
          href="/admin/bookings"
          className="rounded border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-brand-soft"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="bg-[#f9fafb] text-ink">
              <th className="px-5 py-3 font-semibold">#</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Vehicle</th>
              <th className="px-5 py-3 font-semibold">Dates</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-soft">
                  No bookings available yet.
                </td>
              </tr>
            )}
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="hover:bg-[#fafafa]">
                <td className="px-5 py-3 text-ink-muted">{index + 1}</td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-ink">{booking.customer_name}</p>
                  <p className="text-xs text-ink-soft">{booking.customer_email}</p>
                </td>
                <td className="px-5 py-3 text-ink">
                  {booking.cars ? `${booking.cars.brand} ${booking.cars.name}` : "—"}
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {booking.start_date} → {booking.end_date}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={booking.status} kind="booking" />
                </td>
                <td className="px-5 py-3 text-right font-bold text-ink">
                  ${Number(booking.total_price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

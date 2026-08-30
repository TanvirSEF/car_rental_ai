import Link from "next/link"
import { Clock } from "lucide-react"

import { StatusBadge } from "@/components/dashboard/StatusBadge"
import type { BookingWithCar } from "@/types/booking"

function timeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} Min${mins > 1 ? "s" : ""}`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} Hr${hours > 1 ? "s" : ""}`
  const days = Math.floor(hours / 24)
  return `${days} Day${days > 1 ? "s" : ""}`
}

export function RecentBookings({ bookings }: { bookings: BookingWithCar[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-lg font-bold text-ink">Recent Transactions</h2>
        <Link
          href="/admin/bookings"
          className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-ink hover:bg-brand-soft"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-y border-line bg-[#f9fafb]">
              <th className="w-12 px-5 py-3 font-semibold text-ink">#</th>
              <th className="px-5 py-3 font-semibold text-ink">
                Order Details
              </th>
              <th className="px-5 py-3 font-semibold text-ink">Payment</th>
              <th className="px-5 py-3 font-semibold text-ink">Status</th>
              <th className="px-5 py-3 text-right font-semibold text-ink">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  No bookings available yet.
                </td>
              </tr>
            )}
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="hover:bg-[#fafafa]">
                <td className="px-5 py-3.5 text-ink-muted">{index + 1}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-brand-soft">
                      {booking.cars?.image_url ? (
                        <img
                          src={booking.cars.image_url}
                          alt={`${booking.cars.brand} ${booking.cars.name}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-brand">
                          {(booking.cars?.brand ?? "DP")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-ink">
                        {booking.cars
                          ? `${booking.cars.brand} ${booking.cars.name}`
                          : "Vehicle removed"}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                        <Clock size={11} />
                        {timeAgo(booking.created_at)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-ink">
                    {booking.customer_name}
                  </p>
                  <a
                    href={`mailto:${booking.customer_email}`}
                    className="text-xs text-[#2a85e0] underline"
                  >
                    {booking.customer_email}
                  </a>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={booking.status} kind="booking" />
                </td>
                <td className="px-5 py-3.5 text-right font-bold text-ink">
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

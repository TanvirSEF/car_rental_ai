import { BookingsTable } from "@/components/dashboard/BookingsTable"
import { TopBar } from "@/components/dashboard/TopBar"
import { listBookings } from "@/lib/db/bookings"

export const dynamic = "force-dynamic"

export default async function BookingsPage() {
  const bookings = await listBookings()

  return (
    <div className="mx-auto max-w-[1140px] space-y-6">
      <TopBar
        title="Booking Management"
        subtitle="Approve requests, activate rentals and close completed bookings."
      />
      <BookingsTable initialBookings={bookings} />
    </div>
  )
}

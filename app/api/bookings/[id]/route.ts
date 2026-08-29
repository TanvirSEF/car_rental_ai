import { fail, ok } from "@/lib/api"
import { updateBookingStatus } from "@/lib/db/bookings"
import { BOOKING_STATUSES } from "@/types/booking"
import { updateBookingStatusSchema } from "@/lib/validation"

/**
 * PATCH /api/bookings/:id — update booking status (PRD §30).
 * Example body: { "status": "approved" }
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateBookingStatusSchema.safeParse(body)

    if (!parsed.success) {
      return fail(`Invalid status. Allowed values: ${BOOKING_STATUSES.join(", ")}`)
    }

    const booking = await updateBookingStatus(id, parsed.data.status)
    return ok(booking)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update booking"
    console.error("PATCH /api/bookings/[id] failed:", error)
    return fail(message, message === "Booking not found" ? 404 : 500)
  }
}

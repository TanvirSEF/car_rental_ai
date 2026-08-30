import { fail, ok } from "@/lib/api"
import { isAdminRequest } from "@/lib/auth"
import { updateBookingStatus } from "@/lib/db/bookings"
import { BOOKING_STATUSES } from "@/types/booking"
import { updateBookingStatusSchema } from "@/lib/validation"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest(request))) return fail("Unauthorized", 401)

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

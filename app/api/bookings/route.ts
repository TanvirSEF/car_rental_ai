import { triggerBookingCreated } from "@/lib/automation"
import { fail, ok } from "@/lib/api"
import { isAdminRequest } from "@/lib/auth"
import { BookingConflictError, createBooking, listBookings } from "@/lib/db/bookings"
import { createBookingSchema } from "@/lib/validation"

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return fail("Unauthorized", 401)

  try {
    const status = new URL(request.url).searchParams.get("status") ?? undefined
    const bookings = await listBookings(status)
    return ok(bookings)
  } catch (error) {
    console.error("GET /api/bookings failed:", error)
    return fail("Unable to load bookings", 500)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = createBookingSchema.safeParse(body)

    if (!parsed.success) {
      return fail(parsed.error.issues[0].message)
    }

    const booking = await createBooking(parsed.data)

    triggerBookingCreated(booking)

    return ok({ bookingId: booking.id, status: booking.status }, 201)
  } catch (error) {
    if (error instanceof BookingConflictError) return fail(error.message, 409)
    const message = error instanceof Error ? error.message : "Unable to create booking"
    console.error("POST /api/bookings failed:", error)
    return fail(message, message === "Vehicle not found" ? 404 : 500)
  }
}

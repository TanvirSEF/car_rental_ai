import { fail, ok } from "@/lib/api"
import { createBooking, listBookings } from "@/lib/db/bookings"
import { createBookingSchema } from "@/lib/validation"

/**
 * GET /api/bookings — booking list for the admin dashboard (PRD §25).
 * Optional filter: /api/bookings?status=pending
 */
export async function GET(request: Request) {
  try {
    const status = new URL(request.url).searchParams.get("status") ?? undefined
    const bookings = await listBookings(status)
    return ok(bookings)
  } catch (error) {
    console.error("GET /api/bookings failed:", error)
    return fail("Unable to load bookings", 500)
  }
}

/**
 * POST /api/bookings — create a booking request (PRD §29).
 * Server validates input, verifies the vehicle and calculates the price.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = createBookingSchema.safeParse(body)

    if (!parsed.success) {
      return fail(parsed.error.issues[0].message)
    }

    const { carId, customerName, email, phone, pickupLocation, startDate, endDate } =
      parsed.data

    const booking = await createBooking({
      carId,
      customerName,
      email,
      phone,
      pickupLocation,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
    })

    return ok({ bookingId: booking.id, status: booking.status }, 201)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create booking"
    console.error("POST /api/bookings failed:", error)
    return fail(message, message === "Vehicle not found" ? 404 : 500)
  }
}

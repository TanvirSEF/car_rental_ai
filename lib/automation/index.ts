import { getCarById } from "@/lib/db/cars"
import { sendBookingConfirmation } from "@/lib/automation/email"
import { sendBookingWebhook } from "@/lib/automation/webhook"
import type { Booking } from "@/types/booking"

/**
 * Event: booking.created (PRD §33).
 * Fired after a booking is successfully stored. Runs in the
 * background — a notification failure never breaks the booking.
 */
export function triggerBookingCreated(booking: Booking): void {
  void (async () => {
    try {
      const car = await getCarById(booking.car_id)
      if (!car) return

      await Promise.allSettled([
        sendBookingConfirmation(booking, car),
        sendBookingWebhook(booking, car),
      ])
    } catch (error) {
      console.error("[automation] booking.created failed:", error)
    }
  })()
}

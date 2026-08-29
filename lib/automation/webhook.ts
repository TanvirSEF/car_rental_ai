import type { Booking } from "@/types/booking"
import type { Car } from "@/types/car"

/**
 * Admin webhook notification — booking.created event (PRD §35).
 * Works with Discord, Slack, Make.com or any custom endpoint.
 * Skips gracefully when AUTOMATION_WEBHOOK_URL is not set.
 */

interface WebhookPayload {
  event: "booking.created"
  bookingId: string
  customer: { name: string; email: string; phone: string | null }
  vehicle: { name: string; brand: string; category: string }
  rental: { start: string; end: string; days: number }
  totalAmount: number
  status: string
}

export async function sendBookingWebhook(booking: Booking, car: Car): Promise<void> {
  const url = process.env.AUTOMATION_WEBHOOK_URL
  if (!url) {
    console.log(`[automation:webhook] skipped (no URL) — booking ${booking.id}`)
    return
  }

  const payload: WebhookPayload = {
    event: "booking.created",
    bookingId: booking.id,
    customer: {
      name: booking.customer_name,
      email: booking.customer_email,
      phone: booking.customer_phone,
    },
    vehicle: { name: car.name, brand: car.brand, category: car.category },
    rental: { start: booking.start_date, end: booking.end_date, days: booking.total_days },
    totalAmount: Number(booking.total_price),
    status: booking.status,
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    console.error(`[automation:webhook] endpoint replied ${res.status}`)
  } else {
    console.log(`[automation:webhook] booking.created delivered`)
  }
}

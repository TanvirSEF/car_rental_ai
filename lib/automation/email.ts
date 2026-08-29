import nodemailer from "nodemailer"

import type { Booking } from "@/types/booking"
import type { Car } from "@/types/car"

/**
 * Customer confirmation email via Gmail SMTP (PRD §34).
 * Runs only when SMTP env vars are filled — until then it
 * logs and skips, so booking creation never fails.
 */

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null // not configured yet — skip silently
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

function buildHtml(booking: Booking, car: Car): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto;">
      <h2>Hello ${booking.customer_name},</h2>
      <p>Your booking request has been received successfully.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; background: #f5f5f5;">Booking ID</td><td style="padding: 8px;">${booking.id}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5;">Vehicle</td><td style="padding: 8px;">${car.brand} ${car.name}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5;">Pickup</td><td style="padding: 8px;">${booking.start_date}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5;">Return</td><td style="padding: 8px;">${booking.end_date}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5;">Duration</td><td style="padding: 8px;">${booking.total_days} day(s)</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5;">Total</td><td style="padding: 8px;"><b>$${booking.total_price}</b></td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5;">Status</td><td style="padding: 8px;">${booking.status}</td></tr>
      </table>
      <p>Thank you for choosing our service.</p>
    </div>
  `
}

export async function sendBookingConfirmation(booking: Booking, car: Car): Promise<void> {
  const transporter = getTransporter()
  if (!transporter) {
    console.log(`[automation:email] skipped (SMTP not configured) — booking ${booking.id}`)
    return
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? process.env.SMTP_USER,
    to: booking.customer_email,
    subject: `Booking Received — ${car.brand} ${car.name}`,
    html: buildHtml(booking, car),
  })

  console.log(`[automation:email] confirmation sent to ${booking.customer_email}`)
}

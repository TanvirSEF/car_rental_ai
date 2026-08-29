"use client"

import { useState } from "react"
import { CheckCircle2, LoaderCircle, X } from "lucide-react"

import type { Car } from "@/types/car"

/**
 * Booking modal (PRD §13, §14): customer info + dates →
 * POST /api/bookings → success view. Price is previewed
 * client-side but always recalculated on the server.
 */
export function BookingModal({
  car,
  onClose,
  prefill,
}: {
  car: Car
  onClose: () => void
  prefill?: { location?: string; start?: string; end?: string }
}) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    pickupLocation: prefill?.location ?? "",
    startDate: prefill?.start ?? "",
    endDate: prefill?.end ?? "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  const days =
    form.startDate && form.endDate
      ? Math.max(
          1,
          Math.round(
            (new Date(form.endDate).getTime() - new Date(form.startDate).getTime()) /
              (24 * 60 * 60 * 1000)
          )
        )
      : 0
  const totalPrice = days * Number(car.price_per_day)
  const today = new Date().toISOString().slice(0, 10)

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car.id,
          customerName: form.customerName,
          email: form.email,
          phone: form.phone,
          pickupLocation: form.pickupLocation,
          startDate: form.startDate,
          endDate: form.endDate,
        }),
      })
      const body = await res.json()

      if (!res.ok) {
        setError(body.message ?? "Unable to create booking")
        return
      }

      setBookingId(body.data.bookingId)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {bookingId ? (
          // ---- success state (PRD §43, §49) ----
          <div className="py-6 text-center">
            <CheckCircle2 size={56} className="mx-auto text-success" />
            <h3 className="mt-4 font-jakarta text-2xl font-bold text-navy">
              Booking request received!
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Booking ID: <span className="font-semibold text-ink">{bookingId.slice(0, 8)}</span>
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              A confirmation email is on its way to{" "}
              <span className="font-semibold text-ink">{form.email}</span>. Our team
              will approve your {car.brand} {car.name} rental shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-brand px-8 py-3 font-jakarta font-bold text-white hover:bg-brand-active"
            >
              Done
            </button>
          </div>
        ) : (
          // ---- booking form ----
          <>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-jakarta text-xl font-bold text-navy">
                  Book {car.brand} {car.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  ${Number(car.price_per_day)}/day · {car.seats} seats ·{" "}
                  {car.transmission}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-ink-muted hover:bg-brand-soft"
                aria-label="Close booking"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">
                    Full Name
                  </span>
                  <input
                    required
                    value={form.customerName}
                    onChange={set("customerName")}
                    placeholder="John Doe"
                    className="h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">
                    Phone
                  </span>
                  <input
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+880 17xxx-xxxxx"
                    className="h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="john@example.com"
                  className="h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">
                  Pick-up Location
                </span>
                <input
                  value={form.pickupLocation}
                  onChange={set("pickupLocation")}
                  placeholder="Dhaka Airport"
                  className="h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">
                    Pick-up Date
                  </span>
                  <input
                    required
                    type="date"
                    min={today}
                    value={form.startDate}
                    onChange={set("startDate")}
                    className="h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">
                    Return Date
                  </span>
                  <input
                    required
                    type="date"
                    min={form.startDate || today}
                    value={form.endDate}
                    onChange={set("endDate")}
                    className="h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                  />
                </label>
              </div>

              {/* dynamic price preview (PRD §15) */}
              {days > 0 && (
                <div className="flex items-center justify-between rounded-lg bg-brand-soft px-4 py-3">
                  <span className="text-sm font-semibold text-ink">
                    {days} day{days > 1 ? "s" : ""} × ${Number(car.price_per_day)}
                  </span>
                  <span className="font-jakarta text-lg font-extrabold text-navy">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              )}

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand font-jakarta font-bold text-white transition hover:bg-brand-active disabled:opacity-60"
              >
                {loading && <LoaderCircle size={16} className="animate-spin" />}
                {loading ? "Processing your booking..." : "Confirm Booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

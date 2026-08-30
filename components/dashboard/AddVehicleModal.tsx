"use client"

import { useState } from "react"
import { LoaderCircle, X } from "lucide-react"

import { CAR_CATEGORIES, TRANSMISSIONS, type Car } from "@/types/car"

const fieldCls =
  "h-10 w-full rounded-lg border border-line px-3 text-sm text-ink outline-none focus:border-brand"

export function AddVehicleModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (car: Car) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(event.currentTarget)

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          brand: form.get("brand"),
          category: form.get("category"),
          transmission: form.get("transmission"),
          fuelType: form.get("fuelType"),
          seats: form.get("seats"),
          pricePerDay: form.get("pricePerDay"),
          imageUrl: form.get("imageUrl") || undefined,
          description: form.get("description") || undefined,
        }),
      })
      const body = await res.json()

      if (!res.ok) {
        setError(body.message ?? "Could not create vehicle")
        return
      }

      onCreated(body.data as Car)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Add Vehicle</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-ink-muted hover:bg-brand-soft hover:text-brand-active"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Brand</span>
              <input name="brand" required placeholder="Toyota" className={fieldCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Name</span>
              <input name="name" required placeholder="Corolla" className={fieldCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Category</span>
              <select name="category" required className={fieldCls} defaultValue="Economy">
                {CAR_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">
                Transmission
              </span>
              <select
                name="transmission"
                required
                className={fieldCls}
                defaultValue="Automatic"
              >
                {TRANSMISSIONS.map((transmission) => (
                  <option key={transmission} value={transmission}>
                    {transmission}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Fuel Type</span>
              <input name="fuelType" required placeholder="Petrol" className={fieldCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Seats</span>
              <input
                name="seats"
                type="number"
                min={2}
                max={20}
                required
                defaultValue={5}
                className={fieldCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">
                Price / Day ($)
              </span>
              <input
                name="pricePerDay"
                type="number"
                min={1}
                step="0.01"
                required
                placeholder="45"
                className={fieldCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">
                Image URL
              </span>
              <input
                name="imageUrl"
                type="url"
                placeholder="https://…"
                className={fieldCls}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">
              Description (optional)
            </span>
            <textarea
              name="description"
              rows={3}
              maxLength={500}
              placeholder="Short description shown on the customer site"
              className="w-full rounded-lg border border-line px-3 py-2 text-sm text-ink outline-none focus:border-brand"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-full border border-line px-5 text-sm font-semibold text-ink hover:bg-brand-soft"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 items-center gap-2 rounded-full bg-brand-orange px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <LoaderCircle size={15} className="animate-spin" />}
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Top vehicles list (Figma: Best Seller card — ranked product rows).
 */

export interface TopVehicle {
  name: string
  brand: string
  category: string
  bookings: number
  revenue: number
}

export function TopVehicles({ vehicles }: { vehicles: TopVehicle[] }) {
  const max = Math.max(...vehicles.map((v) => v.bookings), 1)

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-lg font-bold text-ink">Top Vehicles</h2>
        <span className="rounded border border-line px-3 py-1.5 text-xs font-semibold text-ink">
          By Bookings
        </span>
      </div>

      <ul className="flex-1 divide-y divide-line">
        {vehicles.length === 0 && (
          <li className="px-5 py-8 text-center text-sm text-ink-soft">
            No booking data yet.
          </li>
        )}
        {vehicles.map((vehicle, index) => (
          <li key={`${vehicle.brand}-${vehicle.name}`} className="px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-active">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {vehicle.brand} {vehicle.name}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {vehicle.category} · {vehicle.bookings} bookings · $
                    {vehicle.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-[#f2f2f2] sm:block">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${(vehicle.bookings / max) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

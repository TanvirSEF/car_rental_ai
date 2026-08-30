import Link from "next/link"

export interface TopVehicle {
  name: string
  brand: string
  category: string
  image: string | null
  pricePerDay: number
  bookings: number
  revenue: number
}

export function TopVehicles({ vehicles }: { vehicles: TopVehicle[] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-lg font-bold text-ink">Top Vehicles</h2>
        <Link
          href="/admin/fleet"
          className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-ink hover:bg-brand-soft"
        >
          View All
        </Link>
      </div>

      <ul className="flex-1 divide-y divide-line">
        {vehicles.length === 0 && (
          <li className="px-5 py-8 text-center text-sm text-ink-soft">
            No booking data yet.
          </li>
        )}
        {vehicles.map((vehicle) => (
          <li
            key={`${vehicle.brand}-${vehicle.name}`}
            className="flex items-center gap-3 px-5 py-3.5"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-brand-soft">
              {vehicle.image ? (
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-bold text-brand">
                  {vehicle.brand.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-ink">
                {vehicle.brand} {vehicle.name}
              </p>
              <p className="text-[13px] text-ink-muted">
                ${vehicle.pricePerDay}/day
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-ink-muted">Sales</p>
              <p className="text-[15px] font-bold text-ink">
                {vehicle.bookings}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Bookings by vehicle category (Figma: Sales by Countries card).
 * Simple horizontal bars — percentages come from the stats API.
 */

export function CategoryCard({
  categories,
}: {
  categories: { category: string; count: number; percentage: number }[]
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Bookings by Category</h2>
        <span className="rounded border border-line px-3 py-1.5 text-sm text-ink-soft">
          All Time
        </span>
      </div>

      <ul className="space-y-4">
        {categories.length === 0 && (
          <li className="text-sm text-ink-soft">No booking data yet.</li>
        )}
        {categories.map((cat) => (
          <li key={cat.category}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">{cat.category}</span>
              <span className="text-ink-soft">
                {cat.count} · {cat.percentage}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#f2f2f2]">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${cat.percentage}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

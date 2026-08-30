import { TrendingUp } from "lucide-react"

export function CategoryCard({
  categories,
}: {
  categories: { category: string; count: number; percentage: number }[]
}) {
  const top = categories[0]

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">Bookings by Category</h2>
        <span className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft">
          All Time
        </span>
      </div>

      <ul className="flex-1 space-y-4">
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

      {top && (
        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm">
          <span className="flex items-center gap-1 font-bold text-success">
            <TrendingUp size={14} />
            {top.percentage}%
          </span>
          <span className="text-ink-soft">
            of all bookings are {top.category} rentals
          </span>
        </div>
      )}
    </div>
  )
}

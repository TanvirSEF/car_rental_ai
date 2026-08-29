import { cn } from "@/lib/utils"

/**
 * Status badges shared by booking + fleet tables (PRD §24, §25).
 */

const BOOKING_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600 ring-amber-200",
  approved: "bg-blue-50 text-blue-600 ring-blue-200",
  active: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  completed: "bg-slate-100 text-slate-600 ring-slate-200",
  cancelled: "bg-red-50 text-red-600 ring-red-200",
}

const CAR_STYLES: Record<string, string> = {
  available: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  rented: "bg-blue-50 text-blue-600 ring-blue-200",
  maintenance: "bg-amber-50 text-amber-600 ring-amber-200",
}

export function StatusBadge({ status, kind }: { status: string; kind: "booking" | "car" }) {
  const styles = kind === "booking" ? BOOKING_STYLES : CAR_STYLES

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1",
        styles[status] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      )}
    >
      {status}
    </span>
  )
}

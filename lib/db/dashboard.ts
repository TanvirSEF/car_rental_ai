import { getSupabase } from "@/lib/supabase/client"
import type { Booking } from "@/types/booking"
import type { Car } from "@/types/car"

/**
 * Dashboard statistics (PRD §22, §23, §31).
 * Data volume is small, so we aggregate in JavaScript —
 * simple to read, easy to extend.
 */

export interface DashboardStats {
  totalRevenue: number
  totalBookings: number
  activeRentals: number
  fleetUtilization: number
  revenueChart: { month: string; revenue: number; bookings: number }[]
  categoryDistribution: { category: string; count: number; percentage: number }[]
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = getSupabase()

  const [{ data: cars, error: carsError }, { data: bookings, error: bookingsError }] =
    await Promise.all([
      supabase.from("cars").select("id, category, status"),
      supabase.from("bookings").select("*"),
    ])

  if (carsError) throw new Error(carsError.message)
  if (bookingsError) throw new Error(bookingsError.message)

  const carRows = cars as Pick<Car, "id" | "category" | "status">[]
  const bookingRows = bookings as Booking[]

  // ---- KPI cards -----------------------------------------------------------

  const revenueStatuses = ["completed", "approved"] // PRD §22
  const totalRevenue = bookingRows
    .filter((b) => revenueStatuses.includes(b.status))
    .reduce((sum, b) => sum + Number(b.total_price), 0)

  const totalBookings = bookingRows.length
  const activeRentals = bookingRows.filter((b) => b.status === "active").length

  const rentedCars = carRows.filter((c) => c.status === "rented").length
  const fleetUtilization =
    carRows.length === 0 ? 0 : Math.round((rentedCars / carRows.length) * 100)

  // ---- revenue + booking trend by month (PRD §23) --------------------------

  const byMonth = new Map<string, { revenue: number; bookings: number }>()

  for (const b of bookingRows) {
    const created = new Date(b.created_at)
    const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`
    const entry = byMonth.get(key) ?? { revenue: 0, bookings: 0 }
    if (revenueStatuses.includes(b.status)) entry.revenue += Number(b.total_price)
    entry.bookings += 1
    byMonth.set(key, entry)
  }

  const revenueChart = [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({
      month: MONTH_LABELS[Number(key.split("-")[1]) - 1],
      revenue: value.revenue,
      bookings: value.bookings,
    }))

  // ---- vehicle category distribution (PRD §23) ------------------------------

  const categoryOfCar = new Map(carRows.map((c) => [c.id, c.category]))
  const byCategory = new Map<string, number>()

  for (const b of bookingRows) {
    const category = categoryOfCar.get(b.car_id) ?? "Other"
    byCategory.set(category, (byCategory.get(category) ?? 0) + 1)
  }

  const categoryDistribution = [...byCategory.entries()]
    .map(([category, count]) => ({
      category,
      count,
      percentage: totalBookings === 0 ? 0 : Math.round((count / totalBookings) * 100),
    }))
    .sort((a, b) => b.count - a.count)

  return {
    totalRevenue,
    totalBookings,
    activeRentals,
    fleetUtilization,
    revenueChart,
    categoryDistribution,
  }
}

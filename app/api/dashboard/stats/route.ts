import { fail, ok } from "@/lib/api"
import { getDashboardStats } from "@/lib/db/dashboard"

/**
 * GET /api/dashboard/stats — KPIs, revenue trend and category mix (PRD §31).
 */
export async function GET() {
  try {
    const stats = await getDashboardStats()
    return ok(stats)
  } catch (error) {
    console.error("GET /api/dashboard/stats failed:", error)
    return fail("Unable to load dashboard statistics", 500)
  }
}

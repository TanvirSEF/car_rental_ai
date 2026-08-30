import { fail, ok } from "@/lib/api"
import { isAdminRequest } from "@/lib/auth"
import { getDashboardStats } from "@/lib/db/dashboard"

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return fail("Unauthorized", 401)

  try {
    const stats = await getDashboardStats()
    return ok(stats)
  } catch (error) {
    console.error("GET /api/dashboard/stats failed:", error)
    return fail("Unable to load dashboard statistics", 500)
  }
}

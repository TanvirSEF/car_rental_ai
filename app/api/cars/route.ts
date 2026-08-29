import { fail, ok } from "@/lib/api"
import { getCars } from "@/lib/db/cars"
import { carFilterSchema } from "@/lib/validation"

/**
 * GET /api/cars — list vehicles with optional filters (PRD §27.1).
 * Example: /api/cars?category=SUV&maxPrice=150
 */
export async function GET(request: Request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams)
    const parsed = carFilterSchema.safeParse(params)

    if (!parsed.success) {
      return fail(parsed.error.issues[0].message)
    }

    const cars = await getCars(parsed.data)
    return ok(cars)
  } catch (error) {
    console.error("GET /api/cars failed:", error)
    return fail("Unable to load vehicles", 500)
  }
}

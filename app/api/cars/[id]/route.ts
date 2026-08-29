import { fail, ok } from "@/lib/api"
import { getCarById } from "@/lib/db/cars"

/**
 * GET /api/cars/:id — single vehicle (PRD §28).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const car = await getCarById(id)

    if (!car) return fail("Vehicle not found", 404)

    return ok(car)
  } catch (error) {
    console.error("GET /api/cars/[id] failed:", error)
    return fail("Unable to load vehicle", 500)
  }
}

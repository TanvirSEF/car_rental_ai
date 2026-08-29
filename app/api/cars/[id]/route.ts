import { fail, ok } from "@/lib/api"
import { getCarById, updateCarStatus } from "@/lib/db/cars"
import { CAR_STATUSES } from "@/types/car"
import { updateCarStatusSchema } from "@/lib/validation"

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

/**
 * PATCH /api/cars/:id — fleet status update (PRD §24).
 * Example body: { "status": "maintenance" }
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateCarStatusSchema.safeParse(body)

    if (!parsed.success) {
      return fail(`Invalid status. Allowed values: ${CAR_STATUSES.join(", ")}`)
    }

    const car = await updateCarStatus(id, parsed.data.status)
    return ok(car)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update vehicle"
    console.error("PATCH /api/cars/[id] failed:", error)
    return fail(message, message === "Vehicle not found" ? 404 : 500)
  }
}

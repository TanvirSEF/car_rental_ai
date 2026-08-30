import { z } from "zod"

import { fail, ok } from "@/lib/api"
import { recommendVehicles } from "@/lib/ai/recommend"

const recommendSchema = z.object({
  message: z
    .string()
    .trim()
    .min(5, "Please describe what kind of car you need")
    .max(500, "Please keep your request under 500 characters"),
})

/**
 * POST /api/ai/recommend — "Find My Perfect Car" (PRD §32).
 * Body: { "message": "I need a comfortable car for 5 people..." }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = recommendSchema.safeParse(body)

    if (!parsed.success) {
      return fail(parsed.error.issues[0].message)
    }

    const recommendations = await recommendVehicles(parsed.data.message)
    return ok(recommendations)
  } catch (error) {
    console.error("POST /api/ai/recommend failed:", error)

    // friendly fallback, the UI shows this directly (PRD §42)
    return fail("We couldn't generate a recommendation right now. Please try again or browse available vehicles manually.", 502)
  }
}

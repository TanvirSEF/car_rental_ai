import OpenAI from "openai"

import { getCars } from "@/lib/db/cars"
import type { Car } from "@/types/car"

/**
 * AI vehicle recommendation — "Find My Perfect Car" (PRD §16–§20).
 *
 * Flow: user message → available inventory as context → OpenAI
 * (JSON mode) → validated car ids + reasons. The model can only
 * pick cars that actually exist in the database, so it cannot
 * invent fake vehicles.
 */

let openai: OpenAI | undefined

function getOpenAI(): OpenAI {
  if (openai) return openai

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured")

  openai = new OpenAI({ apiKey })
  return openai
}

const SYSTEM_PROMPT = `You are an intelligent vehicle recommendation assistant for a car rental platform.

Your task is to recommend the best available vehicles based on the user's requirements.

Rules:
- You must ONLY recommend vehicles from the provided inventory, using their exact carId.
- Never invent vehicles or prices.
- Recommend 1 to 3 vehicles, best match first.
- Keep each reason short (1-2 sentences), friendly and specific to the user's needs.

Consider: budget, number of passengers, travel type, comfort, vehicle category and rental duration.

Respond with valid JSON only, in this exact shape:
{"recommendations":[{"carId":"...","reason":"..."}]}`

function buildInventoryContext(cars: Car[]): string {
  return cars
    .map(
      (car) =>
        `- carId: ${car.id} | ${car.brand} ${car.name} | ${car.category} | $${car.price_per_day}/day | ` +
        `${car.seats} seats | ${car.transmission} | ${car.fuel_type} | ${car.description ?? ""}`
    )
    .join("\n")
}

export interface Recommendation {
  carId: string
  reason: string
  car: Car
}

export async function recommendVehicles(message: string): Promise<Recommendation[]> {
  // 1. only cars that can actually be booked
  const cars = await getCars({ status: "available" })
  if (cars.length === 0) return []

  // 2. ask the model with the real inventory as context
  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.4,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Available inventory:\n${buildInventoryContext(cars)}\n\nCustomer request: ${message}`,
      },
    ],
  })

  const raw = completion.choices[0]?.message?.content ?? "{}"
  const parsed = JSON.parse(raw) as { recommendations?: { carId: string; reason: string }[] }

  // 3. validate every carId against the inventory (PRD §20 — no hallucinations)
  const carById = new Map(cars.map((car) => [car.id, car]))

  return (parsed.recommendations ?? [])
    .filter((rec) => carById.has(rec.carId))
    .slice(0, 3)
    .map((rec) => ({
      carId: rec.carId,
      reason: rec.reason,
      car: carById.get(rec.carId) as Car,
    }))
}

import { getSupabase } from "@/lib/supabase/client"
import type { Car, CarFilters } from "@/types/car"

/**
 * Data access for vehicles (used by /api/cars routes).
 */

export async function getCars(filters: CarFilters = {}): Promise<Car[]> {
  let query = getSupabase()
    .from("cars")
    .select("*")
    .order("price_per_day", { ascending: true })

  if (filters.category) query = query.eq("category", filters.category)
  if (filters.brand) query = query.eq("brand", filters.brand)
  if (filters.minPrice) query = query.gte("price_per_day", filters.minPrice)
  if (filters.maxPrice) query = query.lte("price_per_day", filters.maxPrice)
  if (filters.transmission) query = query.eq("transmission", filters.transmission)
  if (filters.seats) query = query.gte("seats", filters.seats)
  if (filters.status) query = query.eq("status", filters.status)

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data as Car[]
}

export async function getCarById(id: string): Promise<Car | null> {
  const { data, error } = await getSupabase()
    .from("cars")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    // not found, or the id is not even a valid uuid — same answer either way
    if (error.code === "PGRST116" || error.message.includes("invalid input syntax")) {
      return null
    }
    throw new Error(error.message)
  }

  return data as Car
}

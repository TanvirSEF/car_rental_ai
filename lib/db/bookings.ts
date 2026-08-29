import { getSupabase } from "@/lib/supabase/client"
import type { Booking, BookingStatus, BookingWithCar } from "@/types/booking"
import type { Car } from "@/types/car"

/**
 * Data access + business logic for bookings.
 */

const DAY_MS = 24 * 60 * 60 * 1000

export function calcRentalDays(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  return Math.max(1, Math.round((end - start) / DAY_MS))
}

export async function listBookings(status?: string): Promise<BookingWithCar[]> {
  let query = getSupabase()
    .from("bookings")
    .select("*, cars(name, brand, category)")
    .order("created_at", { ascending: false })

  if (status) query = query.eq("status", status)

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data as BookingWithCar[]
}

interface CreateBookingArgs {
  carId: string
  customerName: string
  email: string
  phone: string
  pickupLocation?: string
  startDate: string
  endDate: string
}

/**
 * Creates a pending booking request (PRD §13, §29).
 * Price is always calculated server-side from the car's daily rate —
 * never trusted from the client (PRD §15, §52).
 */
export async function createBooking(args: CreateBookingArgs): Promise<Booking> {
  const supabase = getSupabase()

  // 1. vehicle must exist and not be in maintenance
  const { data: car, error: carError } = await supabase
    .from("cars")
    .select("*")
    .eq("id", args.carId)
    .single<Car>()

  if (carError || !car) throw new Error("Vehicle not found")
  if (car.status === "maintenance")
    throw new Error("This vehicle is currently under maintenance")

  // 2. dynamic pricing
  const totalDays = calcRentalDays(args.startDate, args.endDate)
  const totalPrice = totalDays * Number(car.price_per_day)

  // 3. create the booking record
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      car_id: args.carId,
      customer_name: args.customerName,
      customer_email: args.email,
      customer_phone: args.phone,
      pickup_location: args.pickupLocation ?? null,
      start_date: args.startDate,
      end_date: args.endDate,
      total_days: totalDays,
      total_price: totalPrice,
      status: "pending",
    })
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return data as Booking
}

/**
 * Updates a booking status and keeps the fleet in sync:
 * active booking → car becomes "rented",
 * completed/cancelled → car returns to "available" (PRD §24, §25).
 */
export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking> {
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single()

  if (error) {
    if (error.code === "PGRST116") throw new Error("Booking not found")
    throw new Error(error.message)
  }

  // fleet sync — best effort, never blocks the status update
  const carStatus = status === "active" ? "rented" : status === "completed" || status === "cancelled" ? "available" : null
  if (carStatus) {
    await supabase.from("cars").update({ status: carStatus }).eq("id", data.car_id)
  }

  return data as Booking
}

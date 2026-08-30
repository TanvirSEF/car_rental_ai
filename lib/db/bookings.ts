import { getSupabase } from "@/lib/supabase/client"
import type { Booking, BookingStatus, BookingWithCar } from "@/types/booking"
import type { Car } from "@/types/car"

const DAY_MS = 24 * 60 * 60 * 1000

export class BookingConflictError extends Error {}

export function calcRentalDays(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  return Math.max(1, Math.round((end - start) / DAY_MS))
}

export async function listBookings(status?: string): Promise<BookingWithCar[]> {
  let query = getSupabase()
    .from("bookings")
    .select("*, cars(name, brand, category, image_url, price_per_day)")
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

export async function createBooking(args: CreateBookingArgs): Promise<Booking> {
  const supabase = getSupabase()

  const { data: car, error: carError } = await supabase
    .from("cars")
    .select("*")
    .eq("id", args.carId)
    .single<Car>()

  if (carError || !car) throw new Error("Vehicle not found")
  if (car.status === "maintenance")
    throw new BookingConflictError("This vehicle is currently under maintenance")

  const { data: overlapping } = await supabase
    .from("bookings")
    .select("id")
    .eq("car_id", args.carId)
    .in("status", ["pending", "approved", "active"])
    .lte("start_date", args.endDate)
    .gte("end_date", args.startDate)
    .limit(1)

  if (overlapping && overlapping.length > 0)
    throw new BookingConflictError(
      "This vehicle is already booked for the selected dates"
    )

  const totalDays = calcRentalDays(args.startDate, args.endDate)
  const totalPrice = totalDays * Number(car.price_per_day)

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

  if (status === "active") {
    await supabase.from("cars").update({ status: "rented" }).eq("id", data.car_id)
  } else if (status === "completed" || status === "cancelled") {
    const { data: stillActive } = await supabase
      .from("bookings")
      .select("id")
      .eq("car_id", data.car_id)
      .eq("status", "active")
      .neq("id", data.id)
      .limit(1)

    if (!stillActive?.length) {
      await supabase
        .from("cars")
        .update({ status: "available" })
        .eq("id", data.car_id)
    }
  }

  return data as Booking
}

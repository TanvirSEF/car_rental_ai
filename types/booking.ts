import type { Car } from "./car";

/** Database row shape of the `bookings` table. */
export interface Booking {
  id: string;
  car_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  pickup_location: string | null;
  start_date: string;
  end_date: string;
  total_days: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

/** Booking joined with its car (used by dashboard tables). */
export interface BookingWithCar extends Booking {
  cars: Pick<Car, "name" | "brand" | "category"> | null;
}

export const BOOKING_STATUSES = ["pending", "approved", "active", "completed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

/** Payload for POST /api/bookings (PRD §29). */
export interface CreateBookingInput {
  carId: string;
  customerName: string;
  email: string;
  phone: string;
  pickupLocation?: string;
  startDate: string;
  endDate: string;
}

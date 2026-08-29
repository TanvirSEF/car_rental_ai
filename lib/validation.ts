import { z } from "zod"

import { BOOKING_STATUSES } from "@/types/booking"
import { CAR_STATUSES } from "@/types/car"

/**
 * Zod schemas for API input validation (PRD §53).
 */

export const createBookingSchema = z.object({
  carId: z.uuid("Valid vehicle id is required"),
  customerName: z.string().min(2, "Customer name is required"),
  email: z.email("Valid email is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  pickupLocation: z.string().min(2).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export const updateBookingStatusSchema = z.object({
  status: z.enum(BOOKING_STATUSES),
})

export const updateCarStatusSchema = z.object({
  status: z.enum(CAR_STATUSES),
})

export const carFilterSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  transmission: z.string().optional(),
  seats: z.coerce.number().int().positive().optional(),
  status: z.string().optional(),
})

import { z } from "zod"

import { BOOKING_STATUSES } from "@/types/booking"
import { CAR_STATUSES } from "@/types/car"

const today = () => new Date().toISOString().slice(0, 10)

export const createBookingSchema = z
  .object({
    carId: z.uuid("Valid vehicle id is required"),
    customerName: z.string().min(2, "Customer name is required").max(80),
    email: z.email("Valid email is required").max(120),
    phone: z.string().min(6, "Valid phone number is required").max(30),
    pickupLocation: z.string().min(2).max(120).optional(),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    error: "Return date must be after the pick-up date",
    path: ["endDate"],
  })
  .refine((data) => data.startDate >= today(), {
    error: "Pick-up date cannot be in the past",
    path: ["startDate"],
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

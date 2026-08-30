import { z } from "zod"

import { BOOKING_STATUSES } from "@/types/booking"
import { CAR_CATEGORIES, CAR_STATUSES, TRANSMISSIONS } from "@/types/car"

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

export const createCarSchema = z.object({
  name: z.string().trim().min(2, "Vehicle name is required").max(60),
  brand: z.string().trim().min(2, "Brand is required").max(60),
  category: z.enum(CAR_CATEGORIES),
  transmission: z.enum(TRANSMISSIONS),
  fuelType: z.string().trim().min(2, "Fuel type is required").max(40),
  seats: z.coerce.number().int().min(2, "At least 2 seats").max(20),
  pricePerDay: z.coerce
    .number()
    .positive("Price per day must be positive")
    .max(10000, "Price per day is too high"),
  imageUrl: z.url("Image URL must be valid").max(500).optional().or(z.literal("")),
  description: z.string().trim().max(500).optional(),
})

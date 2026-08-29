/** Database row shape of the `cars` table. */
export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  price_per_day: number;
  seats: number;
  transmission: Transmission;
  fuel_type: string;
  image_url: string | null;
  status: CarStatus;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const CAR_CATEGORIES = ["SUV", "Sedan", "Luxury", "Electric", "Economy"] as const;
export type CarCategory = (typeof CAR_CATEGORIES)[number];

export const CAR_STATUSES = ["available", "rented", "maintenance"] as const;
export type CarStatus = (typeof CAR_STATUSES)[number];

export const TRANSMISSIONS = ["Automatic", "Manual"] as const;
export type Transmission = (typeof TRANSMISSIONS)[number];

/** Query params accepted by GET /api/cars (PRD §27.1). */
export interface CarFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  transmission?: string;
  seats?: number;
  status?: string;
}

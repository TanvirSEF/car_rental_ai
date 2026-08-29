-- ============================================================
-- Car Rental Platform — Database Schema
-- Run this in Supabase Studio SQL editor (or via psql)
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Table: cars
-- ------------------------------------------------------------
create table if not exists public.cars (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  brand         text not null,
  category      text not null check (category in ('SUV', 'Sedan', 'Luxury', 'Electric', 'Economy')),
  price_per_day numeric not null check (price_per_day > 0),
  seats         int not null check (seats > 0),
  transmission  text not null check (transmission in ('Automatic', 'Manual')),
  fuel_type     text not null,
  image_url     text,
  status        text not null default 'available' check (status in ('available', 'rented', 'maintenance')),
  description   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Table: bookings
-- One car can have many bookings (PRD §38)
-- ------------------------------------------------------------
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  car_id          uuid not null references public.cars (id) on delete cascade,
  customer_name   text not null,
  customer_email  text not null,
  customer_phone  text,
  pickup_location text,
  start_date      date not null,
  end_date        date not null check (end_date > start_date),
  total_days      int not null check (total_days > 0),
  total_price     numeric not null check (total_price >= 0),
  status          text not null default 'pending'
                  check (status in ('pending', 'approved', 'active', 'completed', 'cancelled')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
create index if not exists idx_cars_status      on public.cars (status);
create index if not exists idx_cars_category    on public.cars (category);
create index if not exists idx_bookings_car_id  on public.bookings (car_id);
create index if not exists idx_bookings_status  on public.bookings (status);
create index if not exists idx_bookings_created on public.bookings (created_at);

-- ------------------------------------------------------------
-- Auto-update updated_at on every row change
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cars_updated_at on public.cars;
create trigger trg_cars_updated_at
  before update on public.cars
  for each row execute function public.set_updated_at();

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- API access for anon / authenticated roles
-- (self-hosted Supabase usually grants these by default,
--  explicit grants keep it working regardless)
-- ------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.cars to anon, authenticated;
grant select, insert, update, delete on public.bookings to anon, authenticated;

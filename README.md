# Digital Pylot — AI-Powered Car Rental Platform

A full-stack car rental platform with a customer-facing website, an analytics-driven admin dashboard, an AI vehicle recommendation engine, and automated booking notifications.

**Live URL:** https://car-rental-ai-three.vercel.app

**Admin credentials:**
- Email: `admin@digitalpylot.com`
- Password: `Pylot@2026Admin`

## Features

### Customer Front-End
- Hero section with live search (location, category, pick-up date, return date)
- Vehicle catalog at `/cars` with URL-param filters (category, transmission, seats, price sort)
- Booking modal with dynamic price preview — final price always recalculated server-side
- AI-powered "Find My Perfect Car" — natural language → GPT-4o-mini → validated inventory cards
- How It Works, Why Choose Us, Testimonials carousel (prev/next arrows + dot pagination)
- Fully responsive across desktop, tablet, and mobile

### Admin Dashboard (`/admin`)
- KPI stat cards: Weekly Earning, Total Sales, Purchased Goods — live from database
- Sales Analytics chart with dynamic year selector dropdown (Recharts area chart)
- Sales by Countries with interactive world map — region hotspots, timeframe dropdown
- Top Vehicles and Recent Transactions panels
- Bookings table — status filter pills + text search (customer name / email / vehicle)
- Fleet table — text search (brand / name / category) + inline status control
- Add Vehicle modal from Fleet page
- Settings page with 4 tabs: General, Fleet Policies, Notifications, Account & Security
- Cookie-based session auth with rate-limited login; all admin pages and APIs are guarded

### AI Feature
`POST /api/ai/recommend` sends the customer's request along with the real available inventory to `gpt-4o-mini` (JSON mode). Every recommended `carId` is validated against the database before being returned — the model can never invent vehicles or prices.

### Automation
Creating a booking fires a `booking.created` event in the background:
- **Email** — confirmation email to the customer via SMTP (nodemailer)
- **Webhook** — JSON payload to `AUTOMATION_WEBHOOK_URL` (Discord/Slack/Make.com/custom)

Both run non-blocking; a failure in one channel never affects the other or the booking itself.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL) — server-only via service role key, RLS enabled
- **Validation:** Zod on every API input
- **AI:** OpenAI (`gpt-4o-mini`)
- **Email:** Nodemailer (SMTP)
- **Charts:** Recharts

## Getting Started

```bash
pnpm install
cp .env.example .env
node scripts/db-setup.mjs
pnpm dev
```

`scripts/db-setup.mjs` applies `supabase/schema.sql` (tables, indexes, triggers, RLS) and `supabase/seed.sql` (12 vehicles) to your Supabase instance, then verifies the row counts.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `SUPABASE_URL` | yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Server-only database access |
| `AUTH_SECRET` | yes | Signs the admin session cookie |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | yes | Admin login credentials |
| `OPENAI_API_KEY` | yes | AI recommendations |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | no | Booking confirmation email (skipped when unset) |
| `EMAIL_FROM` | no | From address (falls back to `SMTP_USER`) |
| `AUTOMATION_WEBHOOK_URL` | no | Outgoing booking webhook (skipped when unset) |

## API

| Endpoint | Method | Access |
|---|---|---|
| `/api/cars` | GET | public (supports filters) |
| `/api/cars` | POST | admin session |
| `/api/cars/:id` | GET | public |
| `/api/cars/:id` | PATCH | admin session |
| `/api/bookings` | POST | public |
| `/api/bookings` | GET | admin session |
| `/api/bookings/:id` | PATCH | admin session |
| `/api/dashboard/stats` | GET | admin session |
| `/api/ai/recommend` | POST | public (length-capped) |
| `/api/admin/login` / `logout` | POST | public |

Booking rules enforced server-side: vehicle must exist and not be in maintenance, dates must be valid and non-overlapping with existing `pending`/`approved`/`active` bookings for the same vehicle, and the total price is always computed from the database rate.

## Project Structure

```
app/(customer)/        customer pages (home, /cars listing)
app/admin/             login + protected dashboard (overview, fleet, bookings, settings)
app/api/               route handlers
components/customer/   Hero, Navbar, SearchCard, VehicleCard, BookingModal, AIRecommendation…
components/dashboard/  StatCards, RevenueChart, SalesByCountries, BookingsTable, FleetTable…
lib/db/                data access + business logic
lib/ai/                recommendation engine
lib/automation/        email + webhook dispatch
lib/constants/         dashboard mock constants (regions, chart baseline)
supabase/              schema.sql + seed.sql
scripts/db-setup.mjs   database bootstrap script
```

## Deployment

The app is deployed on Vercel. Set the environment variables above in your Vercel project settings, run `node scripts/db-setup.mjs` once against the production database, and deploy.

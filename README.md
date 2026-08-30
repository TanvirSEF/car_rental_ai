# Digital Pylot — AI-Powered Car Rental Platform

A full-stack car rental platform with a customer-facing website, an analytics-driven admin dashboard, an AI vehicle recommendation engine, and automated booking notifications.

**Live URL:** https://car-rental-ai-three.vercel.app

## Features

### Customer Front-End
- Vehicle catalog with live data, category/brand/price/transmission/seat filters
- Search interface with location and date pick-up/return selection
- Booking modal with dynamic price preview (final price is always recalculated server-side)
- AI-powered "Find My Perfect Car" recommendation
- Fully responsive across desktop, tablet, and mobile

### Admin Dashboard (`/admin`)
- KPI stat cards, revenue trend chart, fleet category mix, top vehicles
- Bookings table with status management (`pending → approved → active → completed/cancelled`)
- Fleet management with vehicle status control (`available / rented / maintenance`)
- Cookie-based session auth with rate-limited login; all admin pages and admin APIs are guarded

### AI Feature
`POST /api/ai/recommend` sends the customer's request along with the **real available inventory** to `gpt-4o-mini` (JSON mode). Every recommended `carId` is validated against the database before being returned, so the model can never invent vehicles or prices.

### Automation
Creating a booking fires a `booking.created` event in the background:
- **Email** — confirmation email to the customer via SMTP (nodemailer)
- **Webhook** — JSON payload to `AUTOMATION_WEBHOOK_URL` (Discord/Slack/Make.com/custom)

Both run non-blocking; a failure in one channel never affects the other or the booking itself.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL) accessed exclusively from the server via the service role key — RLS enabled, no anon access
- **Validation:** Zod on every API input
- **AI:** OpenAI (`gpt-4o-mini`)
- **Email:** Nodemailer (SMTP)

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
app/(customer)/        customer pages (home, cars)
app/admin/             login + protected dashboard (overview, fleet, bookings)
app/api/               route handlers
components/            customer / dashboard / admin UI components
lib/db/                data access + business logic
lib/ai/                recommendation engine
lib/automation/        email + webhook dispatch
supabase/              schema.sql + seed.sql
scripts/db-setup.mjs   database bootstrap script
```

## Deployment

The app is deployed on Vercel. Set the environment variables above in your Vercel project settings, run `node scripts/db-setup.mjs` once against the production database, and deploy.

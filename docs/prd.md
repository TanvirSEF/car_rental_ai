# Product Requirements Document (PRD)

# Digital Pylot – AI-Powered Car Rental Platform & Admin Dashboard

**Project Type:** Full-Stack Technical Assessment
**Position:** Web Designer / Web Developer + AI Automation
**Company:** Digital Pylot
**Project Duration:** 48 Hours
**Document Version:** 1.0
**Status:** Implementation Ready

---

# 1. Project Overview

## 1.1 Project Summary

This project is a full-stack car rental platform consisting of two primary interfaces:

1. A modern, customer-facing car rental website
2. A functional and analytics-driven admin dashboard

In addition to the frontend and dashboard implementation, the platform will demonstrate practical AI integration and workflow automation.

The objective is not simply to convert a Figma design into code. The application should demonstrate the ability to:

- Translate UI designs into production-quality interfaces
- Build responsive and reusable frontend components
- Create functional backend APIs
- Manage dynamic application data
- Integrate AI into a real user workflow
- Automate business events
- Design a clean and scalable application architecture

The final application should function as a realistic car rental management platform where customers can discover vehicles, receive AI-powered recommendations, submit booking requests, and trigger automated notifications.

---

# 2. Original Technical Assessment Requirements

The assessment contains two main design sections and an AI/automation implementation requirement.

> **Important:** The complete Figma must be reviewed before starting implementation.
>
> **Figma Design:** https://www.figma.com/design/YZVObhEegXBdtzHYA2u0fk/Task?node-id=0-1&t=NRNpRefi9zeYfc-1

## 2.1 Admin Dashboard

The provided Figma dashboard must be converted into a functional application.

Core requirements include:

- Accurately recreate the provided dashboard design
- Use dynamic, mock, or API-driven data instead of static UI-only content
- Implement functional charts
- Display dynamic statistics
- Implement data tables
- Add relevant filters
- Ensure mobile responsiveness
- Maintain clean and reusable code

## 2.2 Customer Front-End

The provided Figma includes a wireframe for a car rental website.

The implementation should:

- Follow the overall structure of the provided wireframe
- Improve the visual design
- Create a polished and modern user experience
- Implement vehicle cards
- Implement a rental/search interface
- Add relevant interactions
- Support desktop, tablet, and mobile devices

## 2.3 AI Implementation

At least one meaningful AI feature must be implemented.

Possible implementations include:

- AI Chatbot
- AI Vehicle Recommendation
- AI Lead Qualification
- AI Customer Support
- Another relevant AI-powered feature

For this project, the primary AI feature will be:

> **AI-Powered Vehicle Recommendation Assistant**

## 2.4 API and Automation

The project may include:

- Custom backend APIs
- Database integration
- Webhook architecture
- External service integrations
- Automated workflows

The selected implementation will include:

- Next.js API Route Handlers
- Supabase database integration
- Booking event automation
- Email notification
- Optional webhook-based admin alert

---

# 3. Project Goals

The primary goals of the project are:

### Goal 1 — High Quality UI Implementation

Accurately implement the provided Figma dashboard while maintaining responsive behavior and reusable components.

### Goal 2 — Improved Customer Experience

Transform the provided car rental wireframe into a polished, premium, modern rental website.

### Goal 3 — Functional Full-Stack Architecture

Create a unified frontend and backend architecture using Next.js App Router.

### Goal 4 — Meaningful AI Integration

Implement an AI feature that solves a real customer problem instead of adding AI as a decorative feature.

### Goal 5 — Event-Driven Automation

Automatically trigger business workflows when important events occur, such as a new booking request.

### Goal 6 — Code Quality

Demonstrate:

- Clean folder structure
- Reusable components
- Type safety
- Separation of concerns
- Maintainable API architecture
- Proper error handling

---

# 4. Success Criteria

The project will be considered successful if it demonstrates the following:

## UI/UX

- Figma dashboard is accurately implemented
- Customer website looks polished and intentional
- Mobile responsiveness is properly handled
- Interactions feel natural

## Functionality

- Vehicle data is dynamic
- Search works
- Filters work
- Booking flow works
- Dashboard statistics are calculated dynamically
- Charts render meaningful data
- Tables support interaction

## AI

- AI receives actual user input
- AI uses available vehicle inventory as context
- AI provides useful recommendations
- AI output affects the UI dynamically

## Automation

- Booking creation triggers an automated workflow
- Customer receives confirmation
- Admin can receive a notification
- Automation logic is separated from UI logic

## Evaluation Weightage (from the assessment)

The original assessment document defines the following evaluation weights:

| Evaluation Criteria                          | Weight |
| -------------------------------------------- | ------ |
| UI/UX & Figma implementation                 | 20%    |
| Dashboard development & functionality        | 20%    |
| Frontend development & responsiveness       | 20%    |
| AI implementation                            | 15%    |
| API & automation                             | 15%    |
| Code quality & problem-solving               | 10%    |

Key takeaway for prioritization:

```text
UI/UX + Dashboard + Frontend = 60% of the evaluation
AI + API/Automation          = 30%
Code Quality                 = 10%
```

Design and frontend implementation carry the highest weight, so UI polish and Figma accuracy should never be sacrificed for backend or feature breadth.

---

# 5. Proposed Technical Architecture

## 5.1 Architecture Overview

The application will use a unified full-stack architecture based on Next.js.

```text
                        ┌─────────────────────┐
                        │     Next.js App     │
                        │                     │
                        │ Customer Frontend   │
                        │ Admin Dashboard     │
                        └──────────┬──────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
             Next.js APIs     AI Service      Automation
                    │              │              │
                    ▼              ▼              ▼
                Supabase      Groq/OpenAI      Resend/Webhook
                    │
                    ▼
              PostgreSQL DB
```

---

# 6. Technology Stack

| Layer         | Technology             | Purpose                      |
| ------------- | ---------------------- | ---------------------------- |
| Framework     | Next.js App Router     | Full-stack application       |
| Language      | TypeScript             | Type safety                  |
| Styling       | Tailwind CSS           | Responsive UI development    |
| UI Components | shadcn/ui              | Reusable UI primitives       |
| Charts        | Recharts               | Dashboard analytics          |
| Database      | Supabase PostgreSQL    | Persistent application data  |
| Backend       | Next.js Route Handlers | API development              |
| AI            | Groq / OpenAI          | Vehicle recommendation       |
| Email         | Resend                 | Booking confirmation         |
| Automation    | Webhooks               | Admin workflow notifications |
| Deployment    | Vercel                 | Application hosting          |

---

# 7. Architecture Decision

## 7.1 Why Next.js App Router

Next.js App Router is selected because the project has a short 48-hour deadline and requires both frontend and backend functionality.

Advantages include:

- Single repository
- Frontend and backend in one project
- Built-in API Route Handlers
- Easy Vercel deployment
- No separate CORS configuration
- Server-side environment variable protection
- Easy integration with external APIs
- Strong TypeScript support

---

## 7.2 Why Supabase

Supabase will be used as the primary database platform.

Reasons:

- Fast PostgreSQL setup
- Hosted database
- Easy JavaScript SDK
- No database server configuration
- Suitable for rapid prototyping
- Can support persistent data

For the scope of this assessment, direct Supabase integration is preferred over adding unnecessary ORM complexity.

### Important Architecture Decision

Prisma will remain optional.

For a 48-hour assessment:

```text
Next.js
   ↓
Supabase Client
   ↓
PostgreSQL
```

is simpler than:

```text
Next.js
   ↓
Prisma
   ↓
Database Adapter
   ↓
PostgreSQL
```

The project should prioritize working functionality and clean architecture over unnecessary tooling.

---

# 8. Application Modules

The application will contain the following primary modules:

```text
Application
│
├── Customer Website
│   ├── Homepage
│   ├── Vehicle Search
│   ├── Vehicle Listing
│   ├── Vehicle Details
│   ├── Booking Flow
│   └── AI Vehicle Recommendation
│
├── Admin Dashboard
│   ├── Overview
│   ├── Analytics
│   ├── Fleet Management
│   └── Booking Management
│
├── Backend APIs
│   ├── Cars API
│   ├── Booking API
│   ├── Dashboard API
│   └── AI Recommendation API
│
└── Automation
    ├── Booking Confirmation
    └── Admin Notification
```

---

# 9. Customer-Facing Application

## 9.1 Homepage

The homepage will be designed as a premium car rental experience.

Primary sections:

1. Navigation
2. Hero section
3. Vehicle search
4. Featured vehicles
5. AI recommendation section
6. Why choose us
7. Popular destinations or rental categories
8. Call to action
9. Footer

The exact structure should follow the provided Figma wireframe while improving:

- Typography
- Spacing
- Visual hierarchy
- Color system
- Card design
- Hover interactions
- Responsive behavior

---

# 10. Vehicle Search System

The search interface should allow users to filter vehicles based on multiple parameters.

## Search Parameters

Potential fields include:

- Pick-up location
- Pick-up date
- Return date
- Vehicle category

Example:

```text
Location: Dhaka
Pickup: 2026-09-01
Return: 2026-09-05
Category: SUV
```

The frontend will send these parameters to the vehicle filtering system.

---

# 11. Vehicle Listing

Vehicles will be displayed using reusable vehicle cards.

Each card should include:

- Vehicle image
- Vehicle name
- Brand
- Category
- Passenger capacity
- Transmission
- Fuel type
- Daily rental price
- Availability status
- View details action
- Book now action

Example:

```text
Toyota Land Cruiser

Category: SUV
Seats: 7
Transmission: Automatic
Fuel: Petrol

$120/day

[View Details] [Book Now]
```

---

# 12. Filtering and Sorting

The vehicle listing page should support dynamic filtering.

## Filters

- Vehicle category
- Brand
- Price range
- Transmission
- Seating capacity
- Availability

## Sorting

- Price: Low to High
- Price: High to Low
- Most Popular
- Recommended

The filtering logic should update the displayed vehicles dynamically.

---

# 13. Booking Flow

The booking process should allow customers to create a rental booking request.

## Booking Flow

```text
Select Vehicle
      ↓
Click Book Now
      ↓
Open Booking Form
      ↓
Enter Customer Information
      ↓
Select Rental Dates
      ↓
Calculate Total Price
      ↓
Submit Booking
      ↓
Create Booking Record
      ↓
Trigger Automation
```

---

# 14. Booking Form Fields

The booking form may include:

```text
Customer Name
Email Address
Phone Number
Pickup Location
Pickup Date
Return Date
Selected Vehicle
```

---

# 15. Dynamic Pricing

The total rental price should be calculated dynamically.

Formula:

```text
Total Price = Daily Rate × Number of Rental Days
```

Example:

```text
Daily Rate: $80
Rental Duration: 5 Days

Total = $400
```

Optional additions:

- Service fee
- Tax
- Discount

---

# 16. AI-Powered Vehicle Recommendation

## 16.1 Feature Name

**Find My Perfect Car**

This will be the primary AI feature of the application.

---

## 16.2 User Problem

Customers may not know which vehicle is best for their needs.

For example:

> "We are four people planning a five-day trip. We have a medium budget and need a comfortable car for a long road trip."

Instead of forcing users to manually compare vehicles, the AI assistant analyzes their requirements.

---

## 16.3 User Input

The user can provide natural language preferences.

Examples:

```text
I need a car for a family trip with 5 people.
```

```text
I want an affordable car for city travel.
```

```text
We are planning a mountain trip and need something comfortable.
```

```text
I need a luxury car for a business trip.
```

---

# 17. AI Recommendation Architecture

```text
User Input
    ↓
AI Recommendation Form
    ↓
POST /api/ai/recommend
    ↓
Fetch Available Vehicles
    ↓
Build AI Context
    ↓
Send Prompt to AI Model
    ↓
Structured JSON Response
    ↓
Validate Response
    ↓
Return Recommended Vehicle IDs
    ↓
Frontend Renders Vehicle Cards
```

---

# 18. AI Context Strategy

The AI should not randomly invent vehicles.

Before calling the AI model, the backend should provide the available vehicle inventory.

Example context:

```text
Available Vehicles:

1. Toyota Corolla
Price: $45/day
Seats: 5
Category: Sedan
Best For: City and business travel

2. Toyota Land Cruiser
Price: $120/day
Seats: 7
Category: SUV
Best For: Family and long trips

3. BMW 5 Series
Price: $150/day
Seats: 5
Category: Luxury
Best For: Premium business travel
```

The AI should only recommend vehicles from this available inventory.

---

# 19. AI System Prompt

Example system behavior:

```text
You are an intelligent vehicle recommendation assistant.

Your task is to recommend the best available vehicles based on the user's requirements.

You must only recommend vehicles provided in the inventory.

Consider:

- Budget
- Number of passengers
- Travel type
- Comfort requirements
- Vehicle category
- Rental duration

Return valid structured JSON.
```

---

# 20. AI Response Structure

The AI endpoint should return structured data.

Example:

```json
{
  "recommendations": [
    {
      "carId": "car_001",
      "reason": "This SUV is suitable for a family trip because it has 7 seats and good long-distance comfort."
    },
    {
      "carId": "car_002",
      "reason": "This sedan is a more affordable option for comfortable city and highway travel."
    }
  ]
}
```

The frontend should then map `carId` values to actual vehicle data from the database.

This prevents AI hallucinations from directly generating fake car information.

---

# 21. Admin Dashboard

The admin dashboard will allow administrators to monitor platform activity.

Main sections:

```text
Dashboard
├── Overview
├── Analytics
├── Fleet Management
└── Booking Management
```

---

# 22. Dashboard Overview

The dashboard overview should display dynamic KPI cards.

Suggested metrics:

### Total Revenue

```text
$24,500
```

Calculated from completed or approved bookings.

### Total Bookings

```text
328
```

Calculated from booking records.

### Active Rentals

```text
42
```

Bookings currently active.

### Fleet Utilization

```text
78%
```

Calculated using:

```text
Rented Vehicles / Total Vehicles × 100
```

---

# 23. Dashboard Analytics

## Revenue Chart

A line or area chart displaying revenue over time.

Example:

```text
January   $4,200
February  $5,800
March     $6,400
April     $7,200
```

The chart should support a time range if feasible:

- Weekly
- Monthly
- Yearly

---

## Booking Trend

Display booking volume over time.

Example:

```text
Jan: 24 bookings
Feb: 38 bookings
Mar: 45 bookings
Apr: 60 bookings
```

---

## Vehicle Category Distribution

Show the popularity of vehicle categories.

Example:

```text
SUV        40%
Sedan      30%
Luxury     20%
Economy    10%
```

Visualization options:

- Pie chart
- Donut chart
- Bar chart

---

# 24. Fleet Management

The fleet management section should display all vehicles.

Table fields:

| Vehicle        | Category | Price/Day | Status      | Actions |
| -------------- | -------- | --------- | ----------- | ------- |
| Toyota Corolla | Sedan    | $45       | Available   | Edit    |
| BMW X5         | SUV      | $120      | Rented      | Edit    |
| Tesla Model 3  | Electric | $100      | Maintenance | Edit    |

---

## Vehicle Status

Supported statuses:

```text
Available
Rented
Under Maintenance
```

The UI should use appropriate visual status indicators.

---

## Fleet Actions

Depending on implementation time, support:

- Add vehicle
- Edit vehicle
- Update vehicle status
- Delete vehicle

At minimum, status updates should be functional.

---

# 25. Booking Management

The booking management section will display incoming customer bookings.

Table example:

| Customer  | Vehicle | Dates     | Amount | Status   |
| --------- | ------- | --------- | ------ | -------- |
| John Doe  | BMW X5  | Aug 20–25 | $600   | Pending  |
| Sarah Lee | Tesla   | Aug 21–23 | $300   | Approved |

---

## Booking Statuses

```text
Pending
Approved
Active
Completed
Cancelled
```

Admins should be able to update booking statuses.

---

# 26. Backend API Architecture

The backend will be implemented using Next.js Route Handlers.

Suggested structure:

```text
app/api
│
├── cars
│   └── route.ts
│
├── cars/[id]
│   └── route.ts
│
├── bookings
│   └── route.ts
│
├── bookings/[id]
│   └── route.ts
│
├── dashboard
│   └── stats
│       └── route.ts
│
└── ai
    └── recommend
        └── route.ts
```

---

# 27. API Specifications

## 27.1 Get Vehicles

### Endpoint

```text
GET /api/cars
```

### Optional Query Parameters

```text
category
brand
minPrice
maxPrice
transmission
seats
status
```

### Example

```text
GET /api/cars?category=SUV&maxPrice=150
```

### Response

```json
{
  "success": true,
  "data": []
}
```

---

# 28. Get Single Vehicle

### Endpoint

```text
GET /api/cars/:id
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

---

# 29. Create Booking

### Endpoint

```text
POST /api/bookings
```

### Request

```json
{
  "carId": "uuid",
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "+123456789",
  "startDate": "2026-09-01",
  "endDate": "2026-09-05"
}
```

### Response

```json
{
  "success": true,
  "bookingId": "uuid",
  "status": "Pending"
}
```

---

# 30. Update Booking Status

### Endpoint

```text
PATCH /api/bookings/:id
```

### Request

```json
{
  "status": "Approved"
}
```

---

# 31. Dashboard Statistics

### Endpoint

```text
GET /api/dashboard/stats
```

### Response

```json
{
  "success": true,
  "data": {
    "totalRevenue": 24500,
    "totalBookings": 328,
    "activeRentals": 42,
    "fleetUtilization": 78,
    "revenueChart": [],
    "categoryDistribution": []
  }
}
```

---

# 32. AI Recommendation API

### Endpoint

```text
POST /api/ai/recommend
```

### Request

```json
{
  "message": "I need a comfortable car for 5 people for a long family trip."
}
```

### Backend Workflow

```text
Receive User Message
        ↓
Fetch Available Cars
        ↓
Prepare Inventory Context
        ↓
Generate Structured AI Prompt
        ↓
Call AI Provider
        ↓
Parse Structured Response
        ↓
Validate Recommended IDs
        ↓
Return Recommendation
```

### Response

```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "carId": "uuid",
        "reason": "Suitable for family travel with sufficient seating capacity."
      }
    ]
  }
}
```

---

# 33. Automation Architecture

Automation will be triggered after successful booking creation.

## Event

```text
Booking Created
```

## Workflow

```text
POST /api/bookings
        ↓
Validate Request
        ↓
Create Booking in Database
        ↓
Calculate Booking Summary
        ↓
Trigger Automation
        ↓
├── Send Customer Email
│
└── Send Admin Webhook
```

---

# 34. Customer Email Automation

After a successful booking, an automated email should be sent to the customer.

Email provider:

```text
Resend
```

Email content should include:

- Customer name
- Booking ID
- Vehicle name
- Pickup date
- Return date
- Rental duration
- Total amount
- Booking status

Example:

```text
Hello John,

Your booking request has been received successfully.

Vehicle: BMW X5
Pickup: September 1
Return: September 5
Total: $480

Booking Status: Pending

Thank you for choosing our service.
```

---

# 35. Admin Webhook Automation

A webhook can be triggered for every new booking.

Example payload:

```json
{
  "event": "booking.created",
  "bookingId": "booking_uuid",
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "vehicle": {
    "name": "BMW X5"
  },
  "totalAmount": 480
}
```

Possible destinations:

- Make.com
- Discord
- Slack
- Custom webhook endpoint

---

# 36. Recommended Automation Strategy

For the assessment, the following is recommended:

## Primary Automation

```text
New Booking
      ↓
Database Record Created
      ↓
Resend Email
      ↓
Customer Confirmation
```

## Secondary Automation

```text
New Booking
      ↓
Webhook
      ↓
Make.com / Discord
      ↓
Admin Notification
```

This demonstrates both:

- External API integration
- Event-driven automation

---

# 37. Database Design

## Cars Table

```text
cars

id
name
brand
category
price_per_day
seats
transmission
fuel_type
image_url
status
description
created_at
updated_at
```

---

## Bookings Table

```text
bookings

id
car_id
customer_name
customer_email
customer_phone
pickup_location
start_date
end_date
total_days
total_price
status
created_at
updated_at
```

---

# 38. Data Relationships

```text
Car
 │
 │ 1
 │
 │
 └───────────────
                 │
                 │ Many
                 ▼
              Booking
```

One car can have multiple booking records.

---

# 39. Suggested Project Folder Structure

```text
src
│
├── app
│   │
│   ├── (customer)
│   │   ├── page.tsx
│   │   ├── cars
│   │   │   └── page.tsx
│   │   └── booking
│   │
│   ├── admin
│   │   ├── page.tsx
│   │   ├── fleet
│   │   └── bookings
│   │
│   └── api
│       ├── cars
│       ├── bookings
│       ├── dashboard
│       └── ai
│
├── components
│   │
│   ├── ui
│   │
│   ├── customer
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── SearchForm.tsx
│   │   ├── VehicleCard.tsx
│   │   └── AIRecommendation.tsx
│   │
│   └── dashboard
│       ├── Sidebar.tsx
│       ├── StatCard.tsx
│       ├── RevenueChart.tsx
│       ├── FleetTable.tsx
│       └── BookingTable.tsx
│
├── lib
│   ├── supabase
│   ├── ai
│   ├── automation
│   └── utils.ts
│
├── types
│   ├── car.ts
│   ├── booking.ts
│   └── dashboard.ts
│
└── hooks
```

---

# 40. Component Architecture Principles

Components should follow these principles:

## Reusable

Avoid repeating UI logic.

Example:

```text
VehicleCard
```

should be reusable across:

- Homepage
- Vehicle listing
- AI recommendations

---

## Data Driven

Avoid writing static content directly inside components.

Instead:

```tsx
vehicles.map((vehicle) => (
  <VehicleCard vehicle={vehicle} />
))
```

---

## Separation of Concerns

UI components should not contain unnecessary database logic.

Recommended pattern:

```text
Component
    ↓
API / Server Action
    ↓
Service Layer
    ↓
Database / External API
```

---

# 41. State Management Strategy

For the scope of this project, avoid unnecessary global state complexity.

Recommended:

- React `useState`
- URL search parameters
- Server-side data fetching
- React Query / SWR only if necessary

Examples:

```text
Search Filters → URL Params / Local State

Booking Modal → Local State

Dashboard Data → API Fetch

AI Recommendation → API Request State
```

Do not introduce Redux unless the project actually requires it.

---

# 42. Error Handling

The application should handle common failure cases.

## API Errors

Example:

```json
{
  "success": false,
  "message": "Unable to create booking"
}
```

---

## AI Errors

Possible scenarios:

- AI provider unavailable
- Invalid AI response
- Empty recommendation
- API key error

The UI should display a user-friendly message.

Example:

```text
We couldn't generate a recommendation right now.
Please try again or browse available vehicles manually.
```

---

# 43. Loading States

Important asynchronous actions should display loading states.

Examples:

### Vehicle Search

```text
Searching vehicles...
```

### AI Recommendation

```text
Finding the perfect car for you...
```

### Booking Submission

```text
Processing your booking...
```

### Dashboard

Use skeleton loading components where appropriate.

---

# 44. Empty States

The UI should handle scenarios where no data is available.

Example:

```text
No vehicles found matching your filters.
Try adjusting your search criteria.
```

Example:

```text
No bookings available yet.
```

---

# 45. Responsive Design Requirements

The application should support:

## Mobile

```text
< 640px
```

## Tablet

```text
640px – 1024px
```

## Desktop

```text
> 1024px
```

---

# 46. Responsive Strategy

## Desktop

- Full dashboard sidebar
- Multi-column vehicle grids
- Full table visibility

## Tablet

- Collapsible navigation
- Reduced grid columns
- Horizontally scrollable tables

## Mobile

- Drawer navigation
- Single-column layout
- Optimized forms
- Touch-friendly buttons
- Compact dashboard cards

---

# 47. Dashboard Mobile Behavior

The admin dashboard should specifically handle mobile layouts.

Recommended behavior:

```text
Desktop
Sidebar + Content

Mobile
Hamburger
    ↓
Drawer Sidebar
    ↓
Single Column Content
```

Tables should use:

```text
Horizontal Scroll
```

rather than attempting to compress too many columns.

---

# 48. UI/UX Principles

The customer website should communicate:

- Premium
- Reliable
- Modern
- Simple
- Fast

Design priorities:

- Clear typography hierarchy
- Consistent spacing
- Accessible contrast
- Strong call-to-action buttons
- Minimal unnecessary decoration
- Smooth micro-interactions

---

# 49. Suggested User Journey

## Customer Journey

```text
Landing Page
     ↓
Search Vehicles
     ↓
Apply Filters
     ↓
View Vehicle
     ↓
Optional AI Recommendation
     ↓
Select Vehicle
     ↓
Booking Form
     ↓
Submit Booking
     ↓
Success Confirmation
     ↓
Email Notification
```

---

# 50. Suggested Admin Journey

```text
Admin Dashboard
      ↓
View KPIs
      ↓
Review Analytics
      ↓
Check New Bookings
      ↓
Approve / Update Status
      ↓
Manage Fleet
```

---

# 51. Environment Variables

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

GROQ_API_KEY=
OPENAI_API_KEY=

RESEND_API_KEY=

AUTOMATION_WEBHOOK_URL=
```

Sensitive keys must never be exposed to the client.

---

# 52. API Security Considerations

Even though this is an assessment project:

- Keep secret keys server-side
- Validate API input
- Validate booking dates
- Validate vehicle IDs
- Prevent invalid status updates
- Handle API failures gracefully

---

# 53. Recommended Validation

Use:

```text
Zod
```

Example validation:

```text
Booking Request
├── customerName required
├── valid email
├── valid phone
├── valid car ID
├── start date required
└── end date must be after start date
```

---

# 54. Performance Considerations

The application should aim for:

- Optimized images
- Lazy loading where appropriate
- Avoiding unnecessary client components
- Server Components where beneficial
- Efficient database queries
- Minimal unnecessary dependencies

---

# 55. Code Quality Standards

The codebase should demonstrate:

- TypeScript interfaces
- Reusable components
- Meaningful naming
- Small focused functions
- Avoided duplication
- Organized imports
- Error handling
- Consistent API response format

---

# 56. Recommended API Response Format

Success:

```json
{
  "success": true,
  "data": {}
}
```

Failure:

```json
{
  "success": false,
  "message": "Error message"
}
```

This keeps API responses consistent.

---

# 57. Priority Matrix

## Priority 1 — Must Have

These must be completed.

- Customer frontend
- Admin dashboard
- Responsive design
- Dynamic data
- Charts
- Vehicle search
- Vehicle cards
- Booking flow
- One working AI feature
- One working automation
- Live deployment
- README

---

## Priority 2 — Should Have

Complete if time allows.

- Advanced filters
- CRUD fleet management
- Booking status management
- Multiple dashboard filters
- Admin webhook notification

---

## Priority 3 — Nice to Have

Only implement if the core application is already complete.

- Authentication
- Dark mode
- Advanced analytics
- Saved vehicles
- AI chatbot in addition to recommendation
- Advanced admin permissions

---

# 58. Important Scope Decision

Because the deadline is only 48 hours, the project should prioritize:

```text
Complete + Polished + Functional
```

instead of:

```text
Many Features + Partially Finished
```

The strongest submission will likely be:

### One Excellent Customer Website

-

### One Accurate Functional Dashboard

-

### One Real AI Feature

-

### One Real Automation Workflow

rather than trying to build a complete enterprise car rental SaaS.

---

# 59. 48-Hour Implementation Plan

## Phase 1 — Project Setup

### Estimated Time: 0–4 Hours

Tasks:

- Initialize Next.js
- Configure TypeScript
- Setup Tailwind
- Setup shadcn/ui
- Setup Supabase
- Create database schema
- Add seed data
- Configure environment variables

Deliverable:

```text
Working project foundation
```

---

## Phase 2 — Customer Website

### Estimated Time: 4–16 Hours

Tasks:

- Analyze Figma wireframe
- Build navigation
- Build hero section
- Build search interface
- Build vehicle cards
- Build listing page
- Implement filters
- Build booking modal
- Implement responsive behavior

Deliverable:

```text
Complete responsive customer frontend
```

---

## Phase 3 — Admin Dashboard

### Estimated Time: 16–28 Hours

Tasks:

- Analyze dashboard Figma
- Build dashboard layout
- Build sidebar
- Build KPI cards
- Build charts
- Build fleet table
- Build booking table
- Implement filters
- Implement responsive dashboard

Deliverable:

```text
Functional analytics dashboard
```

---

## Phase 4 — Backend APIs

### Estimated Time: 28–34 Hours

Tasks:

- Cars API
- Booking API
- Dashboard stats API
- Database queries
- Validation
- Error handling

Deliverable:

```text
Functional backend architecture
```

---

## Phase 5 — AI Integration

### Estimated Time: 34–39 Hours

Tasks:

- AI recommendation UI
- AI API route
- Inventory context
- Prompt engineering
- Structured response
- Recommendation cards
- Error handling

Deliverable:

```text
Functional AI recommendation feature
```

---

## Phase 6 — Automation

### Estimated Time: 39–42 Hours

Tasks:

- Booking event trigger
- Resend integration
- Confirmation email
- Webhook integration
- Admin notification

Deliverable:

```text
Event-driven automation
```

---

## Phase 7 — Final QA

### Estimated Time: 42–46 Hours

Tasks:

- Mobile testing
- Tablet testing
- Desktop testing
- Fix layout issues
- Test APIs
- Test AI
- Test booking automation

---

## Phase 8 — Deployment & Documentation

### Estimated Time: 46–48 Hours

Tasks:

- Deploy to Vercel
- Configure environment variables
- Test production build
- Create README
- Add architecture explanation
- Add screenshots if possible
- Prepare submission links

---

# 60. README Requirements

The README should include:

## Project Introduction

Brief explanation of the application.

## Features

List:

- Customer car rental frontend
- Admin dashboard
- Analytics
- Vehicle filtering
- Booking system
- AI recommendation
- Email automation
- Webhook automation

## Technology Stack

List all major technologies.

## Local Setup

Example:

```bash
git clone repository-url

cd project

npm install

npm run dev
```

## Environment Variables

Document required variables without exposing secrets.

## AI Architecture

Explain:

```text
User Input
→ API
→ Inventory Context
→ AI Model
→ Structured Recommendation
```

## Automation Workflow

Explain:

```text
Booking Created
→ Database
→ Email
→ Webhook
```

## Deployment

Include:

- Live URL
- Repository URL

---

# 61. Final Submission Checklist

Before submission verify:

## Frontend

- [ ] Customer frontend complete
- [ ] Wireframe structure followed
- [ ] Premium UI applied
- [ ] Responsive desktop
- [ ] Responsive tablet
- [ ] Responsive mobile
- [ ] Vehicle cards functional
- [ ] Search functional
- [ ] Filters functional
- [ ] Booking flow functional

## Dashboard

- [ ] Figma accurately implemented
- [ ] Dynamic statistics
- [ ] Charts functional
- [ ] Tables functional
- [ ] Filters functional
- [ ] Mobile responsive

## AI

- [ ] AI API working
- [ ] User can submit natural language request
- [ ] AI receives vehicle inventory context
- [ ] AI returns valid recommendations
- [ ] Recommendations render as UI cards

## Automation

- [ ] Booking event trigger works
- [ ] Email automation works
- [ ] Webhook automation works

## Engineering

- [ ] TypeScript used
- [ ] Clean folder structure
- [ ] Reusable components
- [ ] API validation
- [ ] Error handling
- [ ] Environment variables configured

## Deployment

- [ ] Production build successful
- [ ] Vercel deployment working
- [ ] Live website accessible
- [ ] GitHub / GitLab repository public
- [ ] README complete

---

# 62. Final Recommended Architecture

The recommended architecture for this technical assessment is:

```text
Next.js App Router
│
├── Customer Frontend
│   ├── Server Components
│   └── Client Components
│
├── Admin Dashboard
│   ├── Analytics
│   ├── Fleet Management
│   └── Booking Management
│
├── Route Handlers
│   ├── Cars
│   ├── Bookings
│   ├── Dashboard
│   └── AI Recommendation
│
├── Supabase
│   ├── Cars
│   └── Bookings
│
├── AI Provider
│   └── Groq / OpenAI
│
└── Automation
    ├── Resend Email
    └── Webhook Notification
```

---

# 63. Final Implementation Strategy

For this assessment, the project should focus on demonstrating depth rather than unnecessary feature quantity.

The ideal final product should communicate:

> "I can accurately implement design, build responsive frontend interfaces, create backend APIs, structure data, integrate AI into a meaningful product feature, and automate real business workflows."

The most important implementation combination is:

```text
Excellent UI Implementation
+
Functional Admin Dashboard
+
Real Database/API
+
Useful AI Recommendation
+
Event-Driven Automation
+
Clean Code
```

This approach directly aligns the project with the expected responsibilities of a:

**Web Designer / Web Developer + AI Automation Specialist**

and demonstrates both frontend craftsmanship and practical AI/automation engineering capabilities.

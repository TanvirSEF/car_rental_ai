import { z } from "zod"

import { fail, ok } from "@/lib/api"
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isAdminCredentials,
} from "@/lib/auth"

/**
 * POST /api/admin/login — credential check + session cookie.
 * Generic error message never reveals which field was wrong.
 */

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry) return false
  if (entry.resetAt < now) {
    attempts.delete(ip)
    return false
  }
  return entry.count >= 5
}

function recordFailure(ip: string) {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 })
    return
  }
  entry.count += 1
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"

    if (isRateLimited(ip)) {
      return fail("Too many attempts. Please wait a minute and try again.", 429)
    }

    const parsed = loginSchema.safeParse(await request.json())
    if (!parsed.success) {
      return fail("Invalid email or password", 401)
    }

    const { email, password } = parsed.data

    if (!isAdminCredentials(email, password)) {
      recordFailure(ip)
      return fail("Invalid email or password", 401)
    }

    const token = await createSessionToken()

    const response = ok({ authenticated: true })
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    })
    return response
  } catch (error) {
    console.error("POST /api/admin/login failed:", error)
    return fail("Login failed. Please try again.", 500)
  }
}

import { ok } from "@/lib/api"
import { SESSION_COOKIE } from "@/lib/auth"

/**
 * POST /api/admin/logout — clears the session cookie.
 */
export async function POST() {
  const response = ok({ authenticated: false })
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 })
  return response
}

import { NextResponse, type NextRequest } from "next/server"

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth"

/**
 * Route guard (Next.js 16 Proxy):
 * every /admin page requires a valid session cookie,
 * except the login page itself.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  const valid = await verifySessionToken(token)

  if (valid) return NextResponse.next()

  const loginUrl = new URL("/admin/login", request.url)
  loginUrl.searchParams.set("next", pathname + search)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}

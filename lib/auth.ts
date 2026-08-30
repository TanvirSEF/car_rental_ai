export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error("AUTH_SECRET is not configured")
  return secret
}

async function hmac(payload: string): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
  return crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
}

export async function createSessionToken(): Promise<string> {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE
  const signature = await hmac(expiry.toString())
  const hex = [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("")
  return `${expiry}.${hex}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false

  const [expiry, hex] = token.split(".")
  if (!expiry || !hex) return false
  if (Number(expiry) < Math.floor(Date.now() / 1000)) return false

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  )

  const bytes = new Uint8Array(hex.match(/.{2}/g)?.map((b) => parseInt(b, 16)) ?? [])
  return crypto.subtle.verify("HMAC", key, bytes, new TextEncoder().encode(expiry))
}

function safeEqual(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export function isAdminCredentials(email: string, password: string): boolean {
  return safeEqual(email, process.env.ADMIN_EMAIL ?? "") && safeEqual(password, process.env.ADMIN_PASSWORD ?? "")
}

export function getSessionTokenFromRequest(request: Request): string | undefined {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1)
}

export async function isAdminRequest(request: Request): Promise<boolean> {
  return verifySessionToken(getSessionTokenFromRequest(request))
}

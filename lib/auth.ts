/**
 * Admin session — HMAC-SHA256 signed cookie token.
 *
 * Uses Web Crypto (crypto.subtle) so the same code runs in the
 * Node runtime (login route) and the Proxy runtime (route guard).
 * No dependencies, and crypto.subtle.verify compares signatures
 * in constant time.
 */

export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

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

/** Token shape: "<expiry-epoch>.<hex-signature-of-expiry>" */
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

  // expired?
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

/** True when the given credentials match the env-configured admin. */
export function isAdminCredentials(email: string, password: string): boolean {
  return (
    email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
  )
}

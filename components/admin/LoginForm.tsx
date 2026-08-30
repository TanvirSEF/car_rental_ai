"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { LoaderCircle, Lock, Mail } from "lucide-react"

/**
 * Admin login form — posts credentials to /api/admin/login,
 * then continues to the page the admin originally wanted.
 */
export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get("next") ?? "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const body = await res.json()

      if (!res.ok) {
        setError(body.message ?? "Login failed")
        return
      }

      router.push(next)
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-line bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Image src="/Logo.png" alt="Best Car" width={115} height={36} priority />
        <p className="text-sm text-ink-soft">Admin Dashboard Login</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
          <span className="flex items-center gap-2 rounded-lg border border-line px-3 focus-within:border-brand">
            <Mail size={16} className="text-ink-muted" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@digitalpylot.com"
              className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Password</span>
          <span className="flex items-center gap-2 rounded-lg border border-line px-3 focus-within:border-brand">
            <Lock size={16} className="text-ink-muted" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </span>
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand font-nunito text-sm font-bold text-white transition hover:bg-brand-active disabled:opacity-60"
        >
          {loading && <LoaderCircle size={16} className="animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}

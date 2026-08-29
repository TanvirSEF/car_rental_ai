"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LoaderCircle, LogOut } from "lucide-react"

/**
 * Sidebar logout — clears the session cookie then
 * sends the admin back to the login page.
 */
export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex h-[37px] w-full items-center gap-2.5 rounded-lg px-3 font-nunito text-sm font-medium text-ink hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
    >
      {loading ? (
        <LoaderCircle size={16} className="animate-spin text-ink-muted" />
      ) : (
        <LogOut size={16} className="text-ink-muted" />
      )}
      Logout
    </button>
  )
}

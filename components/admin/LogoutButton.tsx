"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LoaderCircle, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Sidebar logout — clears the session cookie then
 * sends the admin back to the login page.
 */
export function LogoutButton({ collapsed = false }: { collapsed?: boolean }) {
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
      title={collapsed ? "Logout" : undefined}
      className={cn(
        "flex items-center rounded-lg font-nunito text-sm font-medium text-ink transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-60",
        collapsed
          ? "h-[42px] w-[42px] mx-auto justify-center"
          : "h-[38px] w-full gap-2.5 px-3"
      )}
      aria-label="Logout"
    >
      {loading ? (
        <LoaderCircle size={18} className="animate-spin text-ink-muted" />
      ) : (
        <LogOut size={18} className="text-ink-muted" />
      )}
      {!collapsed && <span>Logout</span>}
    </button>
  )
}


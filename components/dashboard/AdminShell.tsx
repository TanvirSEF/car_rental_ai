"use client"

import { useState } from "react"
import { Car, Menu } from "lucide-react"

import { Sidebar } from "@/components/dashboard/Sidebar"

/**
 * Dashboard shell: sidebar + main content area.
 * Holds the mobile drawer state, so pages stay server components.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-page font-nunito">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* mobile top bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-white px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-navy hover:bg-brand-soft"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <span className="flex items-center gap-2 font-nunito font-extrabold text-navy">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
            <Car size={14} />
          </span>
          Digital Pylot
        </span>
      </div>

      <main className="min-h-[calc(100vh-56px)] px-4 py-6 sm:px-6 lg:ml-[252px] lg:px-8">
        {children}
      </main>
    </div>
  )
}

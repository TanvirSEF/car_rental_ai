"use client"

import { useState } from "react"

import { Header } from "@/components/dashboard/Header"
import { Sidebar } from "@/components/dashboard/Sidebar"

import { cn } from "@/lib/utils"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="font-nunito min-h-screen bg-page">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <div
        className={cn(
          "transition-[padding] duration-300",
          !collapsed && "lg:pl-[252px]"
        )}
      >
        <Header onMenu={() => setOpen(true)} collapsed={collapsed} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-7">{children}</main>
      </div>
    </div>
  )
}

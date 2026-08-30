"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { AddVehicleModal } from "@/components/dashboard/AddVehicleModal"
import { Header } from "@/components/dashboard/Header"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { cn } from "@/lib/utils"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const router = useRouter()

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
          "transition-all duration-300 ease-in-out",
          collapsed ? "lg:pl-[74px]" : "lg:pl-[252px]"
        )}
      >
        <Header
          onMenu={() => setOpen(true)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((value) => !value)}
          onAddNew={() => setShowAddVehicle(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-7">{children}</main>
      </div>

      {showAddVehicle && (
        <AddVehicleModal
          onClose={() => setShowAddVehicle(false)}
          onCreated={() => {
            setShowAddVehicle(false)
            router.refresh()
          }}
        />
      )}
    </div>
  )
}


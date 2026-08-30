"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarRange,
  Car,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

import { LogoutButton } from "@/components/admin/LogoutButton"

import { cn } from "@/lib/utils"

/**
 * Admin sidebar — recreates the Figma sidebar style:
 * 252px, white, grouped menus, active item = soft orange pill.
 * Desktop: fixed. Mobile: slide-in drawer.
 */

interface MenuItem {
  name: string
  href: string
  icon: LucideIcon
  exact?: boolean
}

const MENU_GROUPS: { label: string; items: MenuItem[] }[] = [
  {
    label: "Main",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Fleet",
    items: [
      { name: "Vehicles", href: "/admin/fleet", icon: Car },
      { name: "Bookings", href: "/admin/bookings", icon: CalendarRange },
    ],
  },
  {
    label: "System",
    items: [{ name: "Customer Site", href: "/", icon: Users }],
  },
]

export function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapse,
}: {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <>
      {/* mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col border-r border-line bg-white transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
          !collapsed && "lg:translate-x-0"
        )}
      >
        {/* Title */}
        <div className="flex h-[65px] items-center justify-between border-b border-line px-4">
          <Link href="/admin" onClick={onClose}>
            <Image src="/Logo.png" alt="Best Car" width={115} height={36} priority />
          </Link>
          <button
            onClick={onToggleCollapse}
            className="hidden h-[26px] w-[26px] items-center justify-center rounded-full bg-brand-orange text-white transition-opacity hover:opacity-90 lg:flex"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className="rounded-md p-1 text-ink-muted hover:bg-brand-soft lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {MENU_GROUPS.map((group) => (
            <div key={group.label} className="space-y-2">
              <p className="font-nunito text-xs font-bold uppercase tracking-wide text-navy">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex h-[37px] items-center justify-between rounded-lg px-3 font-nunito text-sm font-medium",
                        active
                          ? "bg-brand-soft text-brand-active"
                          : "text-ink hover:bg-brand-soft/60"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <item.icon
                          size={16}
                          className={active ? "text-brand-active" : "text-ink-muted"}
                        />
                        {item.name}
                      </span>
                      <ChevronRight
                        size={14}
                        className={active ? "text-brand-active" : "text-ink-muted"}
                      />
                    </Link>
                  )
                })}
              </div>
              <div className="border-b border-line" />
            </div>
          ))}

          <LogoutButton />
        </nav>
      </aside>
    </>
  )
}

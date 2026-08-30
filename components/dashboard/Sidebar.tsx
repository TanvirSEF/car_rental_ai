"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarRange,
  Car,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"

import { LogoutButton } from "@/components/admin/LogoutButton"
import { cn } from "@/lib/utils"

/**
 * Admin sidebar — recreates the Figma sidebar style:
 * 252px expanded / 74px collapsed icon rail, white, grouped menus,
 * active item = soft orange pill with bold highlight.
 * Desktop: fixed collapsible rail. Mobile: slide-in drawer.
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
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Customer Site", href: "/", icon: Users },
    ],
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
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-line bg-white transition-all duration-300 ease-in-out",
          // Mobile open/close drawer
          open ? "translate-x-0 w-[252px]" : "-translate-x-full lg:translate-x-0",
          // Desktop expanded vs collapsed rail
          collapsed ? "lg:w-[74px]" : "lg:w-[252px]"
        )}
      >
        {/* Header / Logo section */}
        <div
          className={cn(
            "flex h-[65px] items-center border-b border-line px-4 transition-all duration-300",
            collapsed ? "justify-between px-2" : "justify-between"
          )}
        >
          {/* Logo when expanded */}
          <div className={cn("flex items-center gap-2", collapsed && "lg:hidden")}>
            <Link href="/admin" onClick={onClose} className="flex items-center">
              <Image
                src="/Logo.png"
                alt="Best Car"
                width={115}
                height={36}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Mini logo when collapsed on desktop */}
          {collapsed && (
            <Link
              href="/admin"
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft font-extrabold text-brand-active text-sm transition-transform hover:scale-105"
              title="Best Car"
            >
              BC
            </Link>
          )}

          {/* Desktop collapse toggle button */}
          <button
            onClick={onToggleCollapse}
            className="hidden h-[26px] w-[26px] items-center justify-center rounded-full bg-brand-orange text-white shadow-xs transition-all hover:scale-105 hover:opacity-90 active:scale-95 lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronsRight size={14} strokeWidth={2.5} />
            ) : (
              <ChevronsLeft size={14} strokeWidth={2.5} />
            )}
          </button>

          {/* Mobile drawer close button */}
          <button
            className="rounded-md p-1 text-ink-muted hover:bg-brand-soft lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation items */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300",
            collapsed ? "px-2 py-4 space-y-4" : "px-4 py-5 space-y-5"
          )}
        >
          {MENU_GROUPS.map((group, idx) => (
            <div key={group.label} className="space-y-1.5">
              {!collapsed && (
                <p className="px-2 font-nunito text-[11px] font-bold uppercase tracking-wider text-ink-muted/80">
                  {group.label}
                </p>
              )}
              {collapsed && idx > 0 && (
                <div className="my-2 border-t border-line/60" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href, item.exact)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      title={collapsed ? item.name : undefined}
                      className={cn(
                        "flex items-center rounded-lg font-nunito text-sm font-medium transition-all",
                        collapsed
                          ? "h-[42px] w-[42px] mx-auto justify-center"
                          : "h-[38px] justify-between px-3",
                        active
                          ? "bg-brand-soft text-brand-active font-semibold shadow-xs"
                          : "text-ink hover:bg-brand-soft/60 hover:text-navy"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <item.icon
                          size={18}
                          className={active ? "text-brand-active" : "text-ink-muted"}
                        />
                        {!collapsed && <span>{item.name}</span>}
                      </span>
                      {!collapsed && (
                        <ChevronRight
                          size={14}
                          className={active ? "text-brand-active" : "text-ink-muted/60"}
                        />
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          <div className={cn("pt-3", !collapsed && "border-t border-line")}>
            <LogoutButton collapsed={collapsed} />
          </div>
        </nav>
      </aside>
    </>
  )
}


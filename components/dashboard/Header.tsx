"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  Bell,
  Car,
  ChevronDown,
  Globe,
  Mail,
  Maximize2,
  Menu,
  Monitor,
  Plus,
  Search,
  Settings,
} from "lucide-react"

const iconBtn =
  "flex h-[34px] w-[34px] items-center justify-center text-ink-soft transition-colors hover:text-navy"

export function Header({ onMenu }: { onMenu: () => void }) {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }

  return (
    <header className="sticky top-0 z-30 flex h-[65px] items-center gap-3 border-b border-line bg-white px-4 sm:px-6 lg:px-8">
      <button
        onClick={onMenu}
        className="rounded-md p-2 text-navy hover:bg-brand-soft lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <Link href="/admin" className="flex items-center gap-2 lg:hidden">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-white">
          <Car size={14} />
        </span>
        <span className="font-extrabold text-navy">Digital Pylot</span>
      </Link>

      <div className="hidden h-[39px] w-[230px] items-center gap-2 rounded-lg border border-line bg-white px-3 xl:flex">
        <Search size={15} className="shrink-0 text-ink-muted" />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search"
          className="h-full w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-muted/70"
        />
        <kbd className="flex h-[23px] items-center gap-0.5 rounded-md border border-line bg-white px-1.5 text-[10px] font-medium text-navy">
          ⌘ K
        </kbd>
      </div>

      <button className="hidden h-[34px] items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm text-ink hover:bg-page 2xl:flex">
        <Car size={16} className="text-navy" />
        Digital Pylot
        <ChevronDown size={14} className="text-ink-muted" />
      </button>

      <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
        <Link
          href="/admin/fleet"
          className="hidden h-[34px] items-center gap-1.5 rounded-full bg-brand-orange px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-90 sm:flex"
        >
          <Plus size={15} />
          Add New
        </Link>

        <Link
          href="/"
          className="hidden h-[34px] items-center gap-1.5 rounded-full bg-navy px-4 text-[13px] font-medium text-white transition-opacity hover:opacity-90 md:flex"
        >
          <Monitor size={14} />
          Customer Site
        </Link>

        <span
          className={`${iconBtn} hidden rounded-[10px] bg-[#fafafa] lg:flex`}
        >
          <Globe size={16} />
        </span>

        <button
          onClick={toggleFullscreen}
          className={`${iconBtn} hidden rounded-[10px] bg-[#fafafa] lg:flex`}
          aria-label="Toggle fullscreen"
        >
          <Maximize2 size={15} />
        </button>

        <a
          href="mailto:admin@digitalpylot.com"
          className={`${iconBtn} relative rounded-lg bg-[#f7f7f7]`}
          aria-label="Mail"
        >
          <Mail size={16} />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            01
          </span>
        </a>

        <button
          className={`${iconBtn} rounded-lg bg-[#f7f7f7]`}
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>

        <button
          className={`${iconBtn} hidden rounded-lg bg-[#f7f7f7] sm:flex`}
          aria-label="Settings"
        >
          <Settings size={16} />
        </button>

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
          DP
        </span>
      </div>
    </header>
  )
}

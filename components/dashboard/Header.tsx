"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  Bell,
  Car,
  ChevronDown,
  ChevronsRight,
  Mail,
  Maximize2,
  Menu,
  Monitor,
  Plus,
  Search,
  Settings,
} from "lucide-react"

const actionBtn =
  "flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-[#f7f7f7] text-ink-soft transition-colors hover:bg-[#efefef] hover:text-navy"


export function Header({
  onMenu,
  collapsed,
  onToggleCollapse,
  onAddNew,
}: {
  onMenu: () => void
  collapsed: boolean
  onToggleCollapse?: () => void
  onAddNew?: () => void
}) {
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
    <header className="sticky top-0 z-30 flex h-[65px] items-center justify-between border-b border-line bg-white px-4 sm:px-6 lg:px-8">
      {/* Left side: Mobile hamburger / Desktop collapse toggle & Search */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenu}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-[#f7f7f7] text-ink-soft transition-colors hover:text-navy lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>

        {/* Mobile Logo */}
        <Link href="/admin" className="flex items-center lg:hidden">
          <Image
            src="/Logo.png"
            alt="Best Car"
            width={95}
            height={30}
            priority
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Expand Toggle when sidebar is collapsed */}
        {collapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden h-[28px] w-[28px] items-center justify-center rounded-full bg-brand-orange text-white shadow-xs transition-all hover:scale-105 hover:opacity-90 active:scale-95 lg:flex"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <ChevronsRight size={15} strokeWidth={2.5} />
          </button>
        )}

        {/* Search Bar */}
        <div className="hidden h-[38px] w-[240px] items-center gap-2 rounded-lg border border-line bg-white px-3 sm:flex xl:w-[280px]">
          <Search size={15} className="shrink-0 text-ink-muted/70" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-muted/70"
          />
          <kbd className="inline-flex h-[22px] shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-line bg-[#f8f9fa] px-2 text-[11px] font-semibold text-navy shadow-2xs">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </div>
      </div>

      {/* Right side: Actions matching Figma */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Coming Soon Dropdown */}
        <button
          type="button"
          className="hidden h-[38px] items-center gap-2 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-ink transition-colors hover:bg-page 2xl:flex"
        >
          <Car size={15} className="text-ink" />
          <span>Coming Soon</span>
          <ChevronDown size={14} className="text-ink-muted" />
        </button>

        {/* Add New Button */}
        <button
          onClick={onAddNew}
          type="button"
          className="flex h-[38px] items-center gap-1.5 rounded-lg bg-[#FF843E] px-3.5 text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#e67328] active:scale-98"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add New</span>
        </button>

        {/* POS Button */}
        <Link
          href="/"
          className="hidden h-[38px] items-center gap-1.5 rounded-lg bg-[#102A43] px-3.5 text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#0c2236] active:scale-98 md:flex"
        >
          <Monitor size={14} strokeWidth={2} />
          <span>POS</span>
        </Link>

        {/* Country Flag (US) */}
        <div
          className={`${actionBtn} hidden cursor-pointer lg:flex`}
          title="United States"
        >
          <svg
            className="h-4.5 w-4.5 rounded-full object-cover shadow-2xs"
            viewBox="0 0 512 512"
          >
            <mask id="us-mask">
              <circle cx="256" cy="256" r="256" fill="#fff" />
            </mask>
            <g mask="url(#us-mask)">
              <path fill="#BD3D44" d="M0 0h512v512H0z" />
              <path
                stroke="#FFF"
                strokeWidth="39.38"
                d="M0 59.08h512M0 137.84h512M0 216.62h512M0 295.38h512M0 374.15h512M0 452.92h512"
              />
              <path fill="#192F5D" d="M0 0h256v275.69H0z" />
              <g fill="#FFF" transform="scale(0.85) translate(12, 10)">
                <circle cx="45" cy="30" r="9" />
                <circle cx="95" cy="30" r="9" />
                <circle cx="145" cy="30" r="9" />
                <circle cx="195" cy="30" r="9" />
                <circle cx="245" cy="30" r="9" />
                <circle cx="70" cy="65" r="9" />
                <circle cx="120" cy="65" r="9" />
                <circle cx="170" cy="65" r="9" />
                <circle cx="220" cy="65" r="9" />
                <circle cx="45" cy="100" r="9" />
                <circle cx="95" cy="100" r="9" />
                <circle cx="145" cy="100" r="9" />
                <circle cx="195" cy="100" r="9" />
                <circle cx="245" cy="100" r="9" />
                <circle cx="70" cy="135" r="9" />
                <circle cx="120" cy="135" r="9" />
                <circle cx="170" cy="135" r="9" />
                <circle cx="220" cy="135" r="9" />
                <circle cx="45" cy="170" r="9" />
                <circle cx="95" cy="170" r="9" />
                <circle cx="145" cy="170" r="9" />
                <circle cx="195" cy="170" r="9" />
                <circle cx="245" cy="170" r="9" />
                <circle cx="70" cy="205" r="9" />
                <circle cx="120" cy="205" r="9" />
                <circle cx="170" cy="205" r="9" />
                <circle cx="220" cy="205" r="9" />
                <circle cx="45" cy="240" r="9" />
                <circle cx="95" cy="240" r="9" />
                <circle cx="145" cy="240" r="9" />
                <circle cx="195" cy="240" r="9" />
                <circle cx="245" cy="240" r="9" />
              </g>
            </g>
          </svg>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className={`${actionBtn} hidden lg:flex`}
          aria-label="Toggle fullscreen"
          title="Toggle fullscreen"
        >
          <Maximize2 size={15} />
        </button>

        {/* Mail Button with '01' Badge */}
        <a
          href="mailto:admin@digitalpylot.com"
          className={`${actionBtn} relative`}
          aria-label="Messages"
          title="Messages"
        >
          <Mail size={16} />
          <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EA5455] px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-white">
            01
          </span>
        </a>

        {/* Notifications Bell */}
        <button
          className={actionBtn}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={16} />
        </button>

        {/* Settings */}
        <button
          className={`${actionBtn} hidden sm:flex`}
          aria-label="Settings"
          title="Settings"
        >
          <Settings size={16} />
        </button>

        {/* User Profile Avatar */}
        <div
          className="h-[38px] w-[38px] shrink-0 overflow-hidden rounded-lg border border-line shadow-xs"
          title="Admin Profile"
        >
          <Image
            src="/image 1.png"
            alt="Admin"
            width={38}
            height={38}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}


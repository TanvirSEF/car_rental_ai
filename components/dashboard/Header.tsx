"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  Bell,
  Car,
  Check,
  ChevronDown,
  ChevronsRight,
  ExternalLink,
  LogOut,
  Mail,
  Maximize2,
  Menu,
  Minimize2,
  Monitor,
  Plus,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react"

const actionBtn =
  "flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-[#f7f7f7] text-ink-soft transition-all hover:bg-[#efefef] hover:text-navy cursor-pointer active:scale-95 relative"

const BRANCHES = [
  { id: "main", name: "Main Hub (Downtown)", status: "Active" },
  { id: "airport", name: "Airport Express Terminal", status: "Active" },
  { id: "uptown", name: "Uptown Luxury Garage", status: "Active" },
]

const LANGUAGES = [
  { code: "en", name: "English (US)", flag: "🇺🇸" },
  { code: "es", name: "Español (ES)", flag: "🇪🇸" },
  { code: "fr", name: "Français (FR)", flag: "🇫🇷" },
  { code: "bn", name: "বাংলা (BD)", flag: "🇧🇩" },
  { code: "ae", name: "العربية (UAE)", flag: "🇦🇪" },
]

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    title: "New Booking #BK-9482",
    desc: "Tesla Model 3 reserved by Sarah Jenkins",
    time: "5m ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Payment Received",
    desc: "$1,250.00 via Stripe for Ford Mustang GT",
    time: "25m ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Vehicle Return Due",
    desc: "BMW M4 Competition scheduled in 2 hours",
    time: "1h ago",
    unread: false,
  },
]

const INITIAL_MESSAGES = [
  {
    id: "m1",
    sender: "David Miller",
    subject: "Porsche 911 Availability",
    preview: "Is the Porsche 911 GT3 available for rental this coming weekend?",
    time: "2m ago",
    unread: true,
  },
  {
    id: "m2",
    sender: "Elena Gomez",
    subject: "Airport Pickup Details",
    preview: "Confirmation received. Can I request terminal 2 curbside pickup?",
    time: "1h ago",
    unread: false,
  },
]

const QUICK_SEARCH_LINKS = [
  { title: "Manage Fleet & Cars", href: "/admin/fleet", icon: Car },
  { title: "Customer Bookings", href: "/admin/bookings", icon: Monitor },
  { title: "Admin Overview", href: "/admin", icon: ShieldCheck },
  { title: "Customer Portal", href: "/", icon: ExternalLink },
]

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
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<
    | "branch"
    | "lang"
    | "messages"
    | "notifications"
    | "profile"
    | "pos"
    | null
  >(null)

  const [selectedBranch, setSelectedBranch] = useState("Main Hub (Downtown)")
  const [selectedLang, setSelectedLang] = useState("en")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  const navRef = useRef<HTMLDivElement>(null)

  // Keyboard shortcut for Search (⌘ K or Ctrl K)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.key) return

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen(true)
        setTimeout(() => searchRef.current?.focus(), 50)
      }
      if (event.key === "Escape") {
        setActiveDropdown(null)
        setSearchOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false))
    }
  }

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch {
      // ignore
    }
    router.push("/admin/login")
    router.refresh()
  }

  const unreadMessagesCount = messages.filter((m) => m.unread).length
  const unreadNotifsCount = notifications.filter((n) => n.unread).length

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-30 flex h-[65px] items-center justify-between border-b border-line bg-white px-4 sm:px-6 lg:px-8"
    >
      {/* Left side: Mobile hamburger / Desktop collapse toggle & Search */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenu}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-[#f7f7f7] text-ink-soft transition-colors hover:text-navy lg:hidden cursor-pointer"
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
            className="hidden h-[28px] w-[28px] items-center justify-center rounded-full bg-brand-orange text-white shadow-xs transition-all hover:scale-105 hover:opacity-90 active:scale-95 lg:flex cursor-pointer"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <ChevronsRight size={15} strokeWidth={2.5} />
          </button>
        )}

        {/* Search Bar with live search dropdown */}
        <div className="relative hidden sm:block">
          <div className="flex h-[38px] w-[240px] items-center gap-2 rounded-lg border border-line bg-white px-3 xl:w-[280px] focus-within:border-brand-orange/60 focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all">
            <Search size={15} className="shrink-0 text-ink-muted/70" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-muted/70"
            />
            <kbd className="inline-flex h-[22px] shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border border-line bg-[#f8f9fa] px-2 text-[11px] font-semibold text-navy shadow-2xs">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>

          {/* Search Dropdown Results */}
          {searchOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-[300px] xl:w-[340px] rounded-xl border border-line bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                Quick Navigation
              </div>
              <div className="space-y-1">
                {QUICK_SEARCH_LINKS.filter((link) =>
                  link.title.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-ink transition-colors hover:bg-brand-soft hover:text-brand-active"
                  >
                    <link.icon size={15} className="text-ink-muted" />
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Actions matching Figma */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Branch / Store Selector Dropdown ("Coming Soon" in Figma) */}
        <div className="relative hidden 2xl:block">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((v) => (v === "branch" ? null : "branch"))
            }
            className="flex h-[38px] items-center gap-2 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-ink transition-colors hover:bg-page cursor-pointer"
          >
            <Car size={15} className="text-brand-orange" />
            <span className="max-w-[140px] truncate">{selectedBranch}</span>
            <ChevronDown
              size={14}
              className={`text-ink-muted transition-transform duration-200 ${
                activeDropdown === "branch" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "branch" && (
            <div className="absolute right-0 mt-1.5 w-60 rounded-xl border border-line bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                Select Fleet Location
              </div>
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBranch(b.name)
                    setActiveDropdown(null)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                    selectedBranch === b.name
                      ? "bg-brand-soft font-bold text-brand-active"
                      : "text-ink hover:bg-page"
                  }`}
                >
                  <span>{b.name}</span>
                  {selectedBranch === b.name && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add New Button -> Triggers Vehicle Creation Modal */}
        <button
          onClick={onAddNew}
          type="button"
          className="flex h-[38px] items-center gap-1.5 rounded-lg bg-[#FF843E] px-3.5 text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#e67328] active:scale-98 cursor-pointer"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add New</span>
        </button>

        {/* POS Button -> Quick Booking / Point of Sale Drawer */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((v) => (v === "pos" ? null : "pos"))
            }
            className="hidden h-[38px] items-center gap-1.5 rounded-lg bg-[#102A43] px-3.5 text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#0c2236] active:scale-98 md:flex cursor-pointer"
          >
            <Monitor size={14} strokeWidth={2} />
            <span>POS</span>
          </button>

          {activeDropdown === "pos" && (
            <div className="absolute right-0 mt-1.5 w-72 rounded-xl border border-line bg-white p-3 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <span className="text-xs font-bold text-navy">Point of Sale (POS)</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Terminal Online
                </span>
              </div>
              <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                Create instant walk-in reservations, process customer counter check-ins, or manage fleet handovers.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  href="/admin/bookings"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-navy py-2 text-xs font-bold text-white transition-colors hover:bg-navy-light"
                >
                  <span>Open Walk-in Reservations</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-line py-1.5 text-xs font-medium text-ink transition-colors hover:bg-page"
                >
                  <ExternalLink size={13} />
                  <span>Launch Customer Terminal</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Country Flag / Language Dropdown */}
        <div className="relative hidden lg:block">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((v) => (v === "lang" ? null : "lang"))
            }
            className={`${actionBtn}`}
            title="Change Language"
          >
            <svg
              className="h-4.5 w-4.5 rounded-full object-cover shadow-2xs"
              viewBox="0 0 512 512"
            >
              <mask id="us-mask-active">
                <circle cx="256" cy="256" r="256" fill="#fff" />
              </mask>
              <g mask="url(#us-mask-active)">
                <path fill="#BD3D44" d="M0 0h512v512H0z" />
                <path
                  stroke="#FFF"
                  strokeWidth="39.38"
                  d="M0 59.08h512M0 137.84h512M0 216.62h512M0 295.38h512M0 374.15h512M0 452.92h512"
                />
                <path fill="#192F5D" d="M0 0h256v275.69H0z" />
              </g>
            </svg>
          </button>

          {activeDropdown === "lang" && (
            <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-line bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                Language / Locale
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code)
                    setActiveDropdown(null)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer ${
                    selectedLang === lang.code
                      ? "bg-brand-soft font-bold text-brand-active"
                      : "text-ink hover:bg-page"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {selectedLang === lang.code && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className={`${actionBtn} hidden lg:flex`}
          aria-label="Toggle fullscreen"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

        {/* Mail Button with '01' Badge & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((v) => (v === "messages" ? null : "messages"))
            }
            className={`${actionBtn}`}
            aria-label="Messages"
            title="Messages"
          >
            <Mail size={16} />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EA5455] px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-white">
                0{unreadMessagesCount}
              </span>
            )}
          </button>

          {activeDropdown === "messages" && (
            <div className="absolute right-0 mt-1.5 w-80 rounded-xl border border-line bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
                <span className="text-xs font-bold text-ink">Inquiries & Messages</span>
                <button
                  onClick={() =>
                    setMessages((prev) =>
                      prev.map((m) => ({ ...m, unread: false }))
                    )
                  }
                  className="text-[11px] font-semibold text-brand-orange hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-line/60">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 transition-colors hover:bg-page cursor-pointer ${
                      msg.unread ? "bg-brand-soft/40" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy">
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-ink-muted">{msg.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-ink truncate">
                      {msg.subject}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-soft line-clamp-2">
                      {msg.preview}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-line p-2 text-center">
                <Link
                  href="/admin"
                  onClick={() => setActiveDropdown(null)}
                  className="text-xs font-bold text-brand-orange hover:underline"
                >
                  View all in inbox
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell & Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((v) =>
                v === "notifications" ? null : "notifications"
              )
            }
            className={actionBtn}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-orange ring-2 ring-white" />
            )}
          </button>

          {activeDropdown === "notifications" && (
            <div className="absolute right-0 mt-1.5 w-80 rounded-xl border border-line bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
                <span className="text-xs font-bold text-ink">Notifications</span>
                <button
                  onClick={() =>
                    setNotifications((prev) =>
                      prev.map((n) => ({ ...n, unread: false }))
                    )
                  }
                  className="text-[11px] font-semibold text-brand-orange hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-line/60">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 transition-colors hover:bg-page cursor-pointer ${
                      notif.unread ? "bg-brand-soft/40" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-ink-muted">
                        {notif.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-soft">{notif.desc}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-line p-2 text-center">
                <Link
                  href="/admin/bookings"
                  onClick={() => setActiveDropdown(null)}
                  className="text-xs font-bold text-brand-orange hover:underline"
                >
                  View all activity
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Settings Button -> Direct Link or Quick Preferences */}
        <Link
          href="/admin/settings"
          className={`${actionBtn} hidden sm:flex`}
          aria-label="Settings"
          title="Admin Settings"
        >
          <Settings size={16} />
        </Link>

        {/* User Profile Avatar with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown((v) => (v === "profile" ? null : "profile"))
            }
            className="h-[38px] w-[38px] shrink-0 overflow-hidden rounded-lg border border-line shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Admin Account"
          >
            <Image
              src="/image 1.png"
              alt="Admin"
              width={38}
              height={38}
              priority
              className="h-full w-full object-cover"
            />
          </button>

          {activeDropdown === "profile" && (
            <div className="absolute right-0 mt-1.5 w-60 rounded-xl border border-line bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 border-b border-line p-2">
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line">
                  <Image
                    src="/image 1.png"
                    alt="Mike Witzel"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-navy">
                    Mike Witzel
                  </p>
                  <p className="truncate text-[11px] text-ink-muted">
                    Super Administrator
                  </p>
                </div>
              </div>

              <div className="mt-1 space-y-1">
                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-ink transition-colors hover:bg-page"
                >
                  <ExternalLink size={14} className="text-ink-muted" />
                  <span>Customer Website</span>
                </Link>
                <Link
                  href="/admin/fleet"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-ink transition-colors hover:bg-page"
                >
                  <Car size={14} className="text-ink-muted" />
                  <span>Manage Fleet</span>
                </Link>
                <Link
                  href="/admin/settings"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-ink transition-colors hover:bg-page"
                >
                  <Settings size={14} className="text-ink-muted" />
                  <span>Account Settings</span>
                </Link>

                <div className="border-t border-line/60 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

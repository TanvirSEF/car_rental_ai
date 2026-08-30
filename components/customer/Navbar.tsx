"use client"

import Link from "next/link"
import { useState } from "react"
import { Car, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

const LINKS = [
  { label: "Home", href: "/" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Rental Details", href: "/cars" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Testimonial", href: "/#testimonials" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
            <Car size={20} />
          </span>
          <span className="font-jakarta text-xl font-extrabold text-navy">
            Digital Pylot
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-jakarta text-[15px] font-semibold text-ink transition hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admin/login"
            className="font-jakarta text-[15px] font-medium text-ink hover:text-brand"
          >
            Admin
          </Link>
          <Link
            href="/cars"
            className="rounded-lg bg-navy px-5 py-2.5 font-jakarta text-[15px] font-semibold text-white transition hover:bg-navy/90"
          >
            Book Now
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-navy hover:bg-brand-soft lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div className={cn("lg:hidden", open ? "block" : "hidden")}>
        <ul className="space-y-1 border-t border-line bg-white px-4 py-4">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 font-jakarta font-semibold text-ink hover:bg-brand-soft"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/cars"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-navy px-3 py-2.5 text-center font-jakarta font-semibold text-white"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

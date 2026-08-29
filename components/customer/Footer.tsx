import Link from "next/link"
import { Car } from "lucide-react"

/**
 * Social brand icons as inline SVG — lucide-react no longer
 * ships brand icons, so these are drawn directly.
 */
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.6-.1-1.4-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.1h1.7L7.4 4.8H5.6l11.1 14.3Z" />
    </svg>
  )
}

/**
 * Customer site footer (wireframe: logo + vision, link
 * columns, socials, copyright bar).
 */
const COLUMNS = [
  {
    title: "About",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Featured", href: "/cars" },
      { label: "Partnership", href: "/#why-choose-us" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Events", href: "/#" },
      { label: "Blog", href: "/#" },
      { label: "Podcast", href: "/#" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Discord", href: "/#" },
      { label: "Instagram", href: "/#" },
      { label: "Twitter", href: "/#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                <Car size={20} />
              </span>
              <span className="font-jakarta text-xl font-extrabold">Digital Pylot</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Our vision is to provide convenience and help grow your rental
              business — a high-performing platform for any rent-a-car company.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: TwitterIcon, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-jakarta text-base font-bold">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-white/60">©2026 Digital Pylot. All rights reserved</p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/#" className="transition hover:text-brand">
              Terms & Condition
            </Link>
            <Link href="/#" className="transition hover:text-brand">
              Privacy & Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

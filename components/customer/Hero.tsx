import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { SearchCard } from "@/components/customer/SearchCard"

/**
 * Hero section (wireframe: heading, sub-text, trust note,
 * CTA buttons, car image, search card).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* soft decorative glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-32 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
              <ShieldCheck size={15} className="text-brand" />
              100% trusted car rental platform
            </p>

            <h1 className="font-jakarta text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-[56px]">
              Fast and easy way to{" "}
              <span className="text-brand">rent a car</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
              A high-performing car rental platform for any rent-a-car
              company — browse live inventory, get AI-powered
              recommendations and book in under a minute.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cars"
                className="rounded-lg bg-brand px-7 py-3.5 font-jakarta font-bold text-white transition hover:bg-brand-active"
              >
                Booking Now
              </Link>
              <Link
                href="/#ai-recommend"
                className="rounded-lg border border-white/25 px-7 py-3.5 font-jakarta font-bold text-white transition hover:border-brand hover:text-brand"
              >
                See all cars
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1000&q=80"
              alt="Premium car available for rent"
              className="w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 rounded-xl bg-white p-4 shadow-xl">
              <p className="font-jakarta text-2xl font-extrabold text-navy">12+</p>
              <p className="text-sm text-ink-soft">Cars in fleet</p>
            </div>
          </div>
        </div>

        {/* search card overlapping the hero bottom */}
        <div className="mt-14 lg:-mb-24">
          <SearchCard />
        </div>
      </div>
    </section>
  )
}

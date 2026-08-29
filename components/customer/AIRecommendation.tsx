"use client"

import { useState } from "react"
import { LoaderCircle, Sparkles } from "lucide-react"

import { VehicleCard } from "@/components/customer/VehicleCard"
import type { Car } from "@/types/car"

/**
 * "Find My Perfect Car" — the primary AI feature (PRD §16).
 * Natural-language request → POST /api/ai/recommend →
 * validated inventory cards with the AI's reasoning.
 */

const EXAMPLES = [
  "I need a car for a family trip with 5 people",
  "I want an affordable car for city travel",
  "We are planning a mountain trip and need something comfortable",
  "I need a luxury car for a business trip",
]

interface Recommendation {
  carId: string
  reason: string
  car: Car
}

export function AIRecommendation() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Recommendation[] | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const body = await res.json()

      if (!res.ok) {
        setError(body.message ?? "Something went wrong")
        return
      }

      setResults(body.data as Recommendation[])
      if ((body.data as Recommendation[]).length === 0) {
        setError("No matching vehicles found — try describing your trip differently.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai-recommend" className="bg-navy py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-sm font-semibold text-brand">
            <Sparkles size={14} /> AI-Powered
          </p>
          <h2 className="font-jakarta text-3xl font-bold text-white sm:text-[40px]">
            Find my perfect car
          </h2>
          <p className="mt-4 text-base text-white/70">
            Don&apos;t know which vehicle fits your trip? Describe it in plain
            words — our AI picks the best matches from the live fleet.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            required
            minLength={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. 6 people, 5-day family trip, medium budget"
            className="h-14 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-brand"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-brand px-7 font-jakarta font-bold text-white transition hover:bg-brand-active disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Sparkles size={17} />
            )}
            {loading ? "Finding the perfect car for you..." : "Recommend"}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => setMessage(example)}
              className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/60 transition hover:border-brand hover:text-brand"
            >
              {example}
            </button>
          ))}
        </div>

        {error && (
          <p className="mx-auto mt-8 max-w-2xl rounded-xl bg-white/10 px-5 py-4 text-center text-sm text-white/80">
            {error}
          </p>
        )}

        {results && results.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((rec) => (
              <VehicleCard key={rec.carId} car={rec.car} reason={rec.reason} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

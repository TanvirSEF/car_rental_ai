"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

/**
 * Testimonials Carousel (PRD & Wireframe: "Trusted by thousands of happy customers")
 * Supports multi-page review sliding, pagination dots, and arrow navigation.
 */

const REVIEW_PAGES = [
  [
    {
      name: "Viezh Robert",
      location: "Warsaw, Poland",
      quote:
        "Wow... I am very happy with this rental service, it turned out to be more than my expectations and so far there have been no problems.",
      rating: 4.5,
    },
    {
      name: "Yessica Christy",
      location: "Shanxi, China",
      quote:
        "The booking flow is so smooth — I described my trip to the AI assistant and it found the perfect SUV for my family in seconds.",
      rating: 4.5,
    },
    {
      name: "Kim Young Jou",
      location: "Seoul, South Korea",
      quote:
        "I like the price transparency! No hidden charges, clean cars, and the confirmation email arrived instantly. Highly recommended.",
      rating: 4.5,
    },
  ],
  [
    {
      name: "Alexander Wright",
      location: "London, UK",
      quote:
        "Outstanding customer support and the vehicle was pristine. Pickup at the airport was quick, taking less than 5 minutes.",
      rating: 5.0,
    },
    {
      name: "Sophie Martin",
      location: "Paris, France",
      quote:
        "Super sleek booking process and the GPS/child seat add-ons were ready on arrival. Best rental experience in Europe so far.",
      rating: 4.8,
    },
    {
      name: "Marcus Vance",
      location: "Chicago, USA",
      quote:
        "The AI recommendation matched me with a Tesla Model 3 that made my road trip effortless. Zero hassle from booking to drop-off.",
      rating: 4.7,
    },
  ],
  [
    {
      name: "Elena Rostova",
      location: "Munich, Germany",
      quote:
        "Flexible dates, competitive pricing, and high quality fleet. I will definitely use this platform for all my future business trips.",
      rating: 4.9,
    },
    {
      name: "Carlos Gomez",
      location: "Madrid, Spain",
      quote:
        "Booking from my phone was effortless. Transparent cancellation policy and instantaneous email confirmation.",
      rating: 4.6,
    },
    {
      name: "Liam Tanaka",
      location: "Tokyo, Japan",
      quote:
        "Clean interfaces, responsive customer care, and perfectly maintained cars. The EV charging stations guide was super helpful.",
      rating: 4.8,
    },
  ],
]

export function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = REVIEW_PAGES.length

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const currentReviews = REVIEW_PAGES[currentPage]

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-jakarta text-3xl font-bold text-navy sm:text-[40px]">
          Trusted by thousands of happy customers
        </h2>
        <p className="mt-4 text-base text-ink-soft">
          Real experiences from renters across the platform.
        </p>
      </div>

      {/* Review Cards Grid with Animation */}
      <div className="grid gap-6 md:grid-cols-3 transition-all duration-300">
        {currentReviews.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-navy/5"
          >
            <div>
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(review.rating)
                        ? "fill-brand text-brand"
                        : "fill-brand/30 text-brand/30"
                    }
                  />
                ))}
                <span className="ml-1 text-sm font-semibold text-ink">
                  {review.rating}
                </span>
              </div>

              <blockquote className="text-sm leading-relaxed text-ink-soft">
                “{review.quote}”
              </blockquote>
            </div>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-line/40 pt-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-jakarta font-bold text-brand">
                {review.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-jakarta font-bold text-ink">
                  {review.name}
                </p>
                <p className="truncate text-xs text-ink-muted">
                  {review.location}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Navigation Controls & Pagination Dots */}
      <div className="mt-10 flex items-center justify-center gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition hover:border-brand hover:bg-brand-soft hover:text-brand active:scale-95 cursor-pointer shadow-2xs"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {REVIEW_PAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === index
                  ? "w-8 bg-navy"
                  : "w-2.5 bg-[#dde0e4] hover:bg-navy/50"
              }`}
              aria-label={`Go to testimonial page ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition hover:border-brand hover:bg-brand-soft hover:text-brand active:scale-95 cursor-pointer shadow-2xs"
          aria-label="Next testimonials"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}

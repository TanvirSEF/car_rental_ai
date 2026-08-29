import { ChevronLeft, ChevronRight, Star } from "lucide-react"

/**
 * Testimonials (wireframe: "Trusted by Thousands of Happy
 * Customer" with 3 review cards, dots and arrows).
 */
const REVIEWS = [
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
]

export function Testimonials() {
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

      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-navy/5"
          >
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
              <span className="ml-1 text-sm font-semibold text-ink">{review.rating}</span>
            </div>

            <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
              “{review.quote}”
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft font-jakarta font-bold text-brand">
                {review.name.charAt(0)}
              </span>
              <div>
                <p className="font-jakarta font-bold text-ink">{review.name}</p>
                <p className="text-xs text-ink-muted">{review.location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition hover:border-brand hover:text-brand"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          <span className="h-2.5 w-8 rounded-full bg-navy" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#dde0e4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#dde0e4]" />
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition hover:border-brand hover:text-brand"
          aria-label="Next testimonials"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}

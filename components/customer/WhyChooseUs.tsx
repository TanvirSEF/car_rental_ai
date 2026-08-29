import { Headset, MapPinned, Tag } from "lucide-react"

/**
 * Why choose us (wireframe: 3 feature rows with icon squares).
 */
const FEATURES = [
  {
    icon: Headset,
    title: "Customer Support",
    text: "Extremely responsive customer support — our team is ready to help before, during and after your rental.",
  },
  {
    icon: Tag,
    title: "Best Price Guaranteed",
    text: "Transparent, competitive prices for every category — what you see is exactly what you pay.",
  },
  {
    icon: MapPinned,
    title: "Many Locations",
    text: "Convenient pick-up points near every major city and airport. Just choose and drive.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-jakarta text-3xl font-bold text-navy sm:text-[40px]">
            Why choose us
          </h2>
          <p className="mt-4 text-base text-ink-soft">
            A high-performing car rental platform built around your convenience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 rounded-xl border border-line bg-page p-6 transition hover:border-brand/40 hover:shadow-lg hover:shadow-navy/5"
            >
              <span className="flex h-[51px] w-[51px] shrink-0 items-center justify-center rounded-[10px] bg-brand text-white">
                <feature.icon size={24} />
              </span>
              <div>
                <h3 className="font-jakarta text-lg font-bold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

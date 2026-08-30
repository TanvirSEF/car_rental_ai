import { CalendarCheck, MapPin, MousePointerClick } from "lucide-react"

const STEPS = [
  {
    icon: MapPin,
    title: "Choose Location",
    text: "Pick your city and browse live vehicle availability near you.",
  },
  {
    icon: CalendarCheck,
    title: "Pick-up Date",
    text: "Select your rental dates — total price is calculated instantly.",
  },
  {
    icon: MousePointerClick,
    title: "Book Your Car",
    text: "Confirm your booking and receive an email within seconds.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-jakarta text-3xl font-bold text-navy sm:text-[40px]">
          How it works
        </h2>
        <p className="mt-4 text-base text-ink-soft sm:text-lg">
          Renting a car in three simple steps — no paperwork, no waiting.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative text-center">
            <div className="mx-auto mb-5 flex h-[106px] w-[106px] items-center justify-center rounded-[30px] bg-brand-soft">
              <step.icon size={42} className="text-brand" strokeWidth={1.6} />
            </div>
            <h3 className="font-jakarta text-xl font-bold text-ink">{step.title}</h3>
            <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-ink-soft">
              {step.text}
            </p>

            {index < STEPS.length - 1 && (
              <div className="absolute right-[-28px] top-[53px] hidden h-px w-[56px] border-t-2 border-dashed border-brand/40 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

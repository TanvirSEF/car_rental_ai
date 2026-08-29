import { AIRecommendation } from "@/components/customer/AIRecommendation"
import { Hero } from "@/components/customer/Hero"
import { HowItWorks } from "@/components/customer/HowItWorks"
import { PopularCars } from "@/components/customer/PopularCars"
import { Testimonials } from "@/components/customer/Testimonials"
import { WhyChooseUs } from "@/components/customer/WhyChooseUs"
import { getCars } from "@/lib/db/cars"

export const dynamic = "force-dynamic"

/**
 * Customer homepage (PRD §9.1) — follows the Figma wireframe
 * structure with a premium visual layer. Vehicle data is live.
 */
export default async function HomePage() {
  const cars = await getCars()

  return (
    <>
      <Hero />
      <HowItWorks />
      <PopularCars cars={cars} />
      <AIRecommendation />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}

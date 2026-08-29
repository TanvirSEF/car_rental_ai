import { Footer } from "@/components/customer/Footer"
import { Navbar } from "@/components/customer/Navbar"

/**
 * Customer site shell — navbar + footer around every public page.
 */
export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page font-jakarta">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

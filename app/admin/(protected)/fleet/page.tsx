import { FleetTable } from "@/components/dashboard/FleetTable"
import { TopBar } from "@/components/dashboard/TopBar"
import { getCars } from "@/lib/db/cars"

export const dynamic = "force-dynamic"

export default async function FleetPage() {
  const cars = await getCars()

  return (
    <div className="mx-auto max-w-[1140px] space-y-6">
      <TopBar
        title="Fleet Management"
        subtitle="All vehicles with live status — send a car to maintenance or back to available."
      />
      <FleetTable initialCars={cars} />
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  Bell,
  Building,
  Check,
  CreditCard,
  Save,
  Shield,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "fleet" | "notifications" | "security">(
    "general"
  )
  const [saved, setSaved] = useState(false)

  // Form states
  const [storeName, setStoreName] = useState("Best.car / Digital Pylot")
  const [contactEmail, setContactEmail] = useState("support@digitalpylot.com")
  const [contactPhone, setContactPhone] = useState("+1 (555) 234-5678")
  const [currency, setCurrency] = useState("USD ($)")
  const [timezone, setTimezone] = useState("America/New_York (UTC-5)")

  // Rental policy states
  const [minAge, setMinAge] = useState("21")
  const [deposit, setDeposit] = useState("500")
  const [cancellationWindow, setCancellationWindow] = useState("24")
  const [fuelPolicy, setFuelPolicy] = useState("full-to-full")

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [lowInventoryAlert, setLowInventoryAlert] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="mx-auto max-w-[1140px] space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-nunito text-2xl font-bold text-ink sm:text-3xl">
            Settings & Preferences
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Manage your store details, rental policies, notification preferences, and security.
          </p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-brand-orange/90 active:scale-98 cursor-pointer"
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          <span>{saved ? "Changes Saved!" : "Save Changes"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-line pb-3">
        {[
          { id: "general", label: "General & Store", icon: Building },
          { id: "fleet", label: "Rental Policies", icon: CreditCard },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "security", label: "Account & Security", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-soft text-brand-active shadow-2xs"
                  : "text-ink-soft hover:bg-page hover:text-ink"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Form Content */}
      <div className="rounded-2xl border border-line bg-white p-6 shadow-xs sm:p-8">
        {activeTab === "general" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-ink sm:text-lg">
              Store Information & Regional Settings
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Store / Brand Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Primary Support Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Default Display Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                >
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>BDT (৳)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  System Timezone
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "fleet" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-ink sm:text-lg">
              Rental & Reservation Policies
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Minimum Driver Age (Years)
                </label>
                <input
                  type="number"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Standard Security Deposit ($)
                </label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Free Cancellation Window (Hours prior)
                </label>
                <input
                  type="number"
                  value={cancellationWindow}
                  onChange={(e) => setCancellationWindow(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Fuel Return Policy
                </label>
                <select
                  value={fuelPolicy}
                  onChange={(e) => setFuelPolicy(e.target.value)}
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange focus:bg-white"
                >
                  <option value="full-to-full">Full to Full</option>
                  <option value="same-to-same">Same to Same</option>
                  <option value="pre-purchase">Pre-purchase</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-ink sm:text-lg">
              Automated Email & System Notifications
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between rounded-xl border border-line p-4 transition-colors hover:bg-page cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-ink">Instant Booking Confirmation</p>
                  <p className="text-xs text-ink-muted">
                    Send automated booking confirmations and invoices to customers upon approval.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-5 w-5 rounded accent-brand-orange cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-line p-4 transition-colors hover:bg-page cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-ink">Low Inventory Alerts</p>
                  <p className="text-xs text-ink-muted">
                    Receive dashboard and email alerts when available vehicle count drops below 2.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={lowInventoryAlert}
                  onChange={(e) => setLowInventoryAlert(e.target.checked)}
                  className="h-5 w-5 rounded accent-brand-orange cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-line p-4 transition-colors hover:bg-page cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-ink">Weekly Revenue & Fleet Digest</p>
                  <p className="text-xs text-ink-muted">
                    Receive weekly summary performance reports every Monday morning.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyReport}
                  onChange={(e) => setWeeklyReport(e.target.checked)}
                  className="h-5 w-5 rounded accent-brand-orange cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-ink sm:text-lg">
              Admin Account & Authentication Security
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Admin Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Mike Witzel"
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Administrator Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@digitalpylot.com"
                  readOnly
                  className="h-10 w-full rounded-xl border border-line bg-page px-3 text-sm text-ink-muted outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-ink">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="h-10 w-full rounded-xl border border-line bg-[#fcfcfc] px-3 text-sm text-ink outline-none focus:border-brand-orange"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

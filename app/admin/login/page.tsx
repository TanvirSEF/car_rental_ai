import Link from "next/link"
import { Suspense } from "react"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { LoginForm } from "@/components/admin/LoginForm"

export const metadata: Metadata = {
  title: "Admin Login — Digital Pylot",
}

/**
 * Standalone login page (outside the dashboard shell).
 */
export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-page px-4 font-nunito">
      <Link
        href="/"
        className="absolute left-5 top-5 flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-brand-soft sm:left-8 sm:top-8"
      >
        <ArrowLeft size={16} className="text-navy" />
        Back to Home
      </Link>

      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}

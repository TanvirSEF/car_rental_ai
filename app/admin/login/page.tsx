import { Suspense } from "react"
import type { Metadata } from "next"

import { LoginForm } from "@/components/admin/LoginForm"

export const metadata: Metadata = {
  title: "Admin Login — Digital Pylot",
}

/**
 * Standalone login page (outside the dashboard shell).
 */
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4 font-nunito">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}

import type { Metadata } from "next"

import { AdminShell } from "@/components/dashboard/AdminShell"

export const metadata: Metadata = {
  title: "Admin Dashboard — Digital Pylot",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}

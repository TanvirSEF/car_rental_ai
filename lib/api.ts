import { NextResponse } from "next/server"

/**
 * Consistent API response helpers (PRD §56).
 * Every endpoint returns { success: true, data } or { success: false, message }.
 */

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status })
}

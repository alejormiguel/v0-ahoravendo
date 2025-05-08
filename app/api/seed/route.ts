import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed"

export async function GET() {
  const result = await seedDatabase()

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

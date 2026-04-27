import { NextResponse } from "next/server";
import type { StudentProfile } from "@/lib/types";

export async function POST(request: Request) {
  const profile = (await request.json()) as StudentProfile;

  return NextResponse.json({
    ok: true,
    profile,
    database: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "Supabase client configured"
      : "Mock profile save. Add Supabase env vars and tables for production persistence."
  });
}

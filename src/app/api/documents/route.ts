import { NextResponse } from "next/server";
import type { DocumentRecord } from "@/lib/types";

export async function POST(request: Request) {
  const record = (await request.json()) as DocumentRecord;

  return NextResponse.json({
    ok: true,
    record,
    storage: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "Ready to store with Supabase Storage"
      : "Mock metadata saved in browser local storage"
  });
}

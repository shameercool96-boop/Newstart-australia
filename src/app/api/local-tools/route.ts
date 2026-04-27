import { NextResponse } from "next/server";
import { CITY_PROFILES } from "@/data/demo";
import type { City } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get("city") || "Melbourne") as City;
  const profile = CITY_PROFILES[city] ?? CITY_PROFILES.Melbourne;

  return NextResponse.json({
    city: profile.city,
    supermarkets: profile.supermarkets,
    cheapFood: profile.cheapFood,
    transport: {
      card: profile.transportCard,
      link: profile.transportLink
    },
    mapsSearches: profile.mapsSearches,
    provider: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      ? "Google Maps API key configured"
      : "Mock data. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable live maps integration."
  });
}

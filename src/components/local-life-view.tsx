"use client";

import { ExternalLink, Map, MapPin, ShoppingBasket, Train, Utensils } from "lucide-react";
import { CITY_PROFILES } from "@/data/demo";
import type { City, StudentProfile } from "@/lib/types";
import { LinkButton } from "@/components/ui/button";

export function LocalLifeView({ profile }: { profile: StudentProfile }) {
  const city = CITY_PROFILES[profile.city as City];

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <MapPin className="h-8 w-8 text-teal" />
        <p className="mt-5 text-sm font-semibold text-teal">Local life tools</p>
        <h1 className="mt-2 text-3xl font-semibold">{city.city} survival map</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Quick local anchors for groceries, transport, cheap food, study spaces, and Google Maps
          searches. The API route is ready for a live Google Maps integration.
        </p>
        <div className="mt-6 rounded-[20px] bg-white/10 p-5">
          <div className="flex items-center gap-3">
            <Train className="h-5 w-5 text-gold" />
            <div>
              <p className="text-sm text-muted">Transport card</p>
              <p className="font-semibold">{city.transportCard}</p>
            </div>
          </div>
          <LinkButton
            href={city.transportLink.href}
            className="mt-5 w-full"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            {city.transportLink.label}
          </LinkButton>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <LocalList
          icon={ShoppingBasket}
          title="Nearby supermarket ideas"
          items={city.supermarkets}
          tone="text-mint"
        />
        <LocalList icon={Utensils} title="Cheap food spots" items={city.cheapFood} tone="text-gold" />

        <article className="glass rounded-[24px] p-5 sm:p-6 md:col-span-2">
          <div className="flex items-center gap-3">
            <Map className="h-6 w-6 text-teal" />
            <h2 className="text-xl font-semibold">Quick Google Maps searches</h2>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {city.mapsSearches.map((link) => (
              <LinkButton
                key={link.href}
                href={link.href}
                className="justify-between rounded-[16px]"
                icon={<ExternalLink className="h-4 w-4" />}
              >
                {link.label}
              </LinkButton>
            ))}
          </div>
        </article>

        <article className="glass rounded-[24px] p-5 sm:p-6 md:col-span-2">
          <h2 className="text-xl font-semibold">Google Maps API path</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            For production, call `/api/local-tools?city={city.city}` from the client, then replace the
            mock response with Places API nearby search using `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` or a
            server-only API key in a route handler.
          </p>
        </article>
      </section>
    </div>
  );
}

function LocalList({
  icon: Icon,
  title,
  items,
  tone
}: {
  icon: typeof ShoppingBasket;
  title: string;
  items: string[];
  tone: string;
}) {
  return (
    <article className="glass rounded-[24px] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Icon className={`h-6 w-6 ${tone}`} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-[16px] bg-white/10 px-4 py-3 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

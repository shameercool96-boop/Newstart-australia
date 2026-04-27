import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="glass max-w-md rounded-[24px] p-7 text-center">
        <Compass className="mx-auto h-10 w-10 text-teal" />
        <h1 className="mt-5 text-2xl font-semibold">This stop is not on the map</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          The page you tried to open does not exist in NewStart Australia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}

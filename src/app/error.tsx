"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="glass max-w-md rounded-[24px] p-7 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-coral" />
        <h1 className="mt-5 text-2xl font-semibold">Something went off track</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{error.message}</p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}

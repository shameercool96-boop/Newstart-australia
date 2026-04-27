import { Plane } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass flex items-center gap-3 rounded-[20px] px-5 py-4 text-sm text-muted">
        <Plane className="h-5 w-5 animate-pulse text-teal" />
        Preparing your NewStart dashboard
      </div>
    </main>
  );
}

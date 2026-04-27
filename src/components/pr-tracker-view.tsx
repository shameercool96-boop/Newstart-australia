"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import { PATHWAYS } from "@/data/demo";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";

export function PrTrackerView({
  completed,
  onToggle
}: {
  completed: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-5">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <ShieldCheck className="h-8 w-8 text-teal" />
        <p className="mt-5 text-sm font-semibold text-teal">PR pathway tracker</p>
        <h1 className="mt-2 text-3xl font-semibold">Turn PR from rumor into evidence</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          This is not migration advice. It helps students track the evidence and decisions they need
          to discuss with a registered migration agent or official sources.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {PATHWAYS.map((pathway) => {
          const done = pathway.checkpoints.filter((checkpoint) =>
            completed.includes(`${pathway.id}:${checkpoint}`)
          ).length;
          const progress = Math.round((done / pathway.checkpoints.length) * 100);

          return (
            <article key={pathway.id} className="glass rounded-[24px] p-5 sm:p-6">
              <span className="rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal">
                Visa {pathway.visa}
              </span>
              <h2 className="mt-4 text-xl font-semibold">{pathway.label}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{pathway.summary}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted">Evidence progress</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <ProgressBar value={progress} className="mt-3" />
              <div className="mt-5 grid gap-2">
                {pathway.checkpoints.map((checkpoint) => {
                  const id = `${pathway.id}:${checkpoint}`;
                  const active = completed.includes(id);

                  return (
                    <button
                      key={checkpoint}
                      onClick={() => onToggle(id)}
                      className={cn(
                        "rounded-[14px] border px-3 py-3 text-left text-sm leading-5 transition",
                        active
                          ? "border-teal/40 bg-teal/15 text-foreground"
                          : "border-white/10 bg-white/10 text-muted hover:bg-white/10"
                      )}
                    >
                      {checkpoint}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 grid gap-2">
                {pathway.links.map((link) => (
                  <LinkButton
                    key={link.href}
                    href={link.href}
                    className="min-h-10 justify-between px-3 text-xs"
                    icon={<ExternalLink className="h-3.5 w-3.5" />}
                  >
                    {link.label}
                  </LinkButton>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

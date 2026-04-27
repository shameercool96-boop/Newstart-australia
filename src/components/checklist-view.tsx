"use client";

import { CheckCircle2, ExternalLink, ListChecks } from "lucide-react";
import { CHECKLIST_ITEMS, CITY_PROFILES, FIRST_WEEK_ICONS } from "@/data/demo";
import type { City, StudentProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";

export function ChecklistView({
  profile,
  completedTasks,
  onToggle
}: {
  profile: StudentProfile;
  completedTasks: string[];
  onToggle: (id: string) => void;
}) {
  const cityProfile = CITY_PROFILES[profile.city as City];
  const progress = Math.round((completedTasks.length / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <ListChecks className="h-8 w-8 text-teal" />
        <p className="mt-5 text-sm font-semibold text-teal">First 7 days in {profile.city}</p>
        <h1 className="mt-2 text-3xl font-semibold">Get operational fast</h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          These are the boring-but-expensive tasks students usually regret delaying: phone, bank,
          TFN, transport, health cover, and rental basics.
        </p>
        <div className="mt-6 rounded-[20px] bg-white/10 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Setup completed</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <ProgressBar value={progress} className="mt-3" />
          <p className="mt-4 text-sm leading-6 text-muted">
            Local transport: <span className="font-semibold text-foreground">{cityProfile.transportCard}</span>
          </p>
          <LinkButton
            href={cityProfile.transportLink.href}
            className="mt-4 w-full"
            icon={<ExternalLink className="h-4 w-4" />}
          >
            {cityProfile.transportLink.label}
          </LinkButton>
        </div>
      </section>

      <section className="grid gap-4">
        {CHECKLIST_ITEMS.map((item) => {
          const Icon = FIRST_WEEK_ICONS[item.id];
          const done = completedTasks.includes(item.id);
          const cityNote = item.cityNote?.[profile.city as City];

          return (
            <article
              key={item.id}
              className={cn(
                "glass rounded-[24px] p-5 transition sm:p-6",
                done && "border-mint/35 bg-mint/10"
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-white/10">
                    <Icon className={cn("h-6 w-6", done ? "text-mint" : "text-teal")} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {item.day}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">{item.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{item.description}</p>
                    {cityNote && (
                      <p className="mt-3 rounded-[14px] bg-teal/10 p-3 text-sm leading-6 text-slate-100">
                        {cityNote}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant={done ? "secondary" : "primary"}
                  onClick={() => onToggle(item.id)}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  className="shrink-0"
                >
                  {done ? "Done" : "Mark done"}
                </Button>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
                <ol className="grid gap-2">
                  {item.steps.map((step) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-slate-200/84">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="flex flex-wrap items-start gap-2 lg:max-w-[260px] lg:justify-end">
                  {item.links.map((link) => (
                    <LinkButton
                      key={link.href}
                      href={link.href}
                      className="min-h-10 px-3 text-xs"
                      icon={<ExternalLink className="h-3.5 w-3.5" />}
                    >
                      {link.label}
                    </LinkButton>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

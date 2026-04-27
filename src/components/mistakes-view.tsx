"use client";

import { ExternalLink, ShieldAlert } from "lucide-react";
import { MISTAKES } from "@/data/demo";
import { LinkButton } from "@/components/ui/button";

export function MistakesView() {
  return (
    <div className="grid gap-5">
      <section className="glass rounded-[28px] p-5 sm:p-7">
        <ShieldAlert className="h-8 w-8 text-coral" />
        <p className="mt-5 text-sm font-semibold text-coral">Avoid mistakes</p>
        <h1 className="mt-2 text-3xl font-semibold">The traps that cost students real money</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          This section is blunt on purpose. It is easier to prevent visa, job, rental, and tax
          problems than to fix them after you are tired and under pressure.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {MISTAKES.map(({ id, title, severity, summary, actions, icon: Icon, source }) => (
          <article key={id} className="glass rounded-[24px] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-coral/15">
                  <Icon className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <span className="rounded-full bg-coral/15 px-3 py-1 text-xs font-semibold text-coral">
                    {severity} risk
                  </span>
                  <h2 className="mt-3 text-xl font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{summary}</p>
                </div>
              </div>
            </div>
            <ul className="mt-5 grid gap-2">
              {actions.map((action) => (
                <li key={action} className="flex gap-3 text-sm leading-6 text-slate-200/84">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
            {source && (
              <LinkButton
                href={source.href}
                className="mt-5 min-h-10 px-3 text-xs"
                icon={<ExternalLink className="h-3.5 w-3.5" />}
              >
                {source.label}
              </LinkButton>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

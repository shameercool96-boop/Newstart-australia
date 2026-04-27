"use client";

import { Download, ExternalLink, FileText, Minus, Plus, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { JOB_OPTIONS } from "@/data/demo";
import type { JobPlan } from "@/lib/types";
import { currency } from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress";

export function JobsView({
  jobPlan,
  onChange
}: {
  jobPlan: JobPlan;
  onChange: (plan: JobPlan) => void;
}) {
  const [hourlyRate, setHourlyRate] = useState(30);
  const [hours, setHours] = useState(18);
  const [taxRate, setTaxRate] = useState(12);
  const gross = hourlyRate * hours;
  const net = Math.round(gross * (1 - taxRate / 100));
  const fortnightHours = hours * 2;
  const limitWarning = fortnightHours > 48;

  const jobProgress = useMemo(
    () =>
      Math.round(
        (jobPlan.applicationsThisWeek / Math.max(jobPlan.targetApplications, 1)) * 100
      ),
    [jobPlan.applicationsThisWeek, jobPlan.targetApplications]
  );

  function updateApplications(delta: number) {
    onChange({
      ...jobPlan,
      applicationsThisWeek: Math.max(0, jobPlan.applicationsThisWeek + delta),
      status: jobPlan.applicationsThisWeek + delta > 0 ? "Applying" : "Resume ready"
    });
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.82fr]">
      <section className="glass rounded-[28px] p-5 sm:p-7 xl:col-span-2">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal">Job & income hub</p>
            <h1 className="mt-2 text-3xl font-semibold">Earn without risking your visa or wages</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
              Focus on roles students actually use to get started, then track hours, applications,
              and realistic take-home income.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <LinkButton href="/resume-template.txt" icon={<Download className="h-4 w-4" />}>
              Resume template
            </LinkButton>
            <LinkButton
              href="https://www.seek.com.au/part-time-student-jobs"
              icon={<ExternalLink className="h-4 w-4" />}
            >
              Seek
            </LinkButton>
            <LinkButton
              href="https://au.indeed.com/q-international-student-part-time-jobs.html"
              icon={<ExternalLink className="h-4 w-4" />}
            >
              Indeed
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {JOB_OPTIONS.map((job) => (
          <article key={job.id} className="glass rounded-[24px] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{job.fit}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold">
                {job.averagePay}
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Setup checklist</p>
                <ul className="mt-3 grid gap-2">
                  {job.setup.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-200/84">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[18px] border border-coral/25 bg-coral/10 p-4">
                <p className="text-sm font-semibold text-coral">Watch out</p>
                <p className="mt-2 text-sm leading-6 text-slate-200/84">{job.watchOut}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.links.map((link) => (
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
          </article>
        ))}
      </section>

      <aside className="grid content-start gap-5">
        <section className="glass rounded-[24px] p-5 sm:p-6">
          <WalletCards className="h-6 w-6 text-teal" />
          <h2 className="mt-4 text-xl font-semibold">Earnings calculator</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Quick estimate only. Awards, penalties, tax residency, and deductions can change this.
          </p>
          <div className="mt-5 grid gap-4">
            <NumberField label="Hourly rate" prefix="$" value={hourlyRate} onChange={setHourlyRate} />
            <NumberField label="Hours per week" value={hours} onChange={setHours} />
            <NumberField label="Estimated tax %" suffix="%" value={taxRate} onChange={setTaxRate} />
          </div>
          <div className="mt-5 rounded-[18px] bg-white/10 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Weekly gross</span>
              <span className="font-semibold">{currency(gross)}</span>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-muted">Estimated take-home</span>
              <span className="font-semibold text-mint">{currency(net)}</span>
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-muted">Fortnight hours</span>
              <span className={limitWarning ? "font-semibold text-coral" : "font-semibold"}>
                {fortnightHours}h
              </span>
            </div>
            {limitWarning && (
              <p className="mt-4 rounded-[14px] bg-coral/15 p-3 text-sm leading-6 text-coral">
                This exceeds the common 48 hours per fortnight study-period limit for Student visa
                holders. Check your visa conditions before accepting shifts.
              </p>
            )}
          </div>
        </section>

        <section className="glass rounded-[24px] p-5 sm:p-6">
          <FileText className="h-6 w-6 text-lilac" />
          <h2 className="mt-4 text-xl font-semibold">Applications this week</h2>
          <div className="mt-4 flex items-center justify-between rounded-[18px] bg-white/10 p-4">
            <Button
              variant="ghost"
              onClick={() => updateApplications(-1)}
              icon={<Minus className="h-4 w-4" />}
              aria-label="Decrease applications"
            />
            <div className="text-center">
              <div className="text-3xl font-semibold">{jobPlan.applicationsThisWeek}</div>
              <div className="text-xs text-muted">of {jobPlan.targetApplications} target</div>
            </div>
            <Button
              variant="ghost"
              onClick={() => updateApplications(1)}
              icon={<Plus className="h-4 w-4" />}
              aria-label="Increase applications"
            />
          </div>
          <ProgressBar value={jobProgress} className="mt-4" tone="lilac" />
          <p className="mt-4 text-sm leading-6 text-muted">
            Resume rhythm: send fewer, better applications with suburb availability, visa work rights,
            and shift availability clearly listed.
          </p>
        </section>
      </aside>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-muted">{label}</span>
      <div className="flex min-h-12 items-center rounded-[14px] border border-white/15 bg-white/10 px-3">
        {prefix && <span className="text-muted">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={0}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-2 outline-none"
        />
        {suffix && <span className="text-muted">{suffix}</span>}
      </div>
    </label>
  );
}

"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  FileText,
  ShieldAlert,
  WalletCards
} from "lucide-react";
import { CHECKLIST_ITEMS, CITY_PROFILES, DEFAULT_JOB_PLAN, QUICK_STATS } from "@/data/demo";
import type { BudgetCategory, City, JobPlan, SectionId, StudentProfile } from "@/lib/types";
import { clamp, currency } from "@/lib/utils";
import { ProgressBar, ProgressRing } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function DashboardView({
  profile,
  completedTasks,
  budget,
  jobPlan,
  documentsCount,
  onNavigate
}: {
  profile: StudentProfile;
  completedTasks: string[];
  budget: BudgetCategory[];
  jobPlan: JobPlan;
  documentsCount: number;
  onNavigate: (section: SectionId) => void;
}) {
  const cityProfile = CITY_PROFILES[profile.city as City];
  const totalPlanned = budget.reduce((sum, item) => sum + item.planned, 0);
  const totalSpent = budget.reduce((sum, item) => sum + item.spent, 0);
  const moneyLeft = totalPlanned - totalSpent;
  const progress = Math.round((completedTasks.length / CHECKLIST_ITEMS.length) * 100);
  const jobProgress = Math.round(
    (jobPlan.applicationsThisWeek / Math.max(jobPlan.targetApplications, 1)) * 100
  );
  const plan = jobPlan ?? DEFAULT_JOB_PLAN;

  return (
    <div className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
      <section className="glass overflow-hidden rounded-[28px]">
        <div className="relative min-h-[310px] p-5 sm:p-7">
          <div className="absolute inset-0">
            <Image
              src="/welcome-banner.jpg"
              alt="Welcome to Melbourne student banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/72 to-background/25" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="relative max-w-2xl">
            <p className="text-sm font-semibold text-teal">Personalized for {profile.city}</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
              Welcome. Your first week has a plan now.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200/82">
              From {profile.country || "overseas"} to {cityProfile.city}, this dashboard focuses on
              the things that protect your money, visa, documents, and job search.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => onNavigate("checklist")} icon={<CheckCircle2 className="h-4 w-4" />}>
                Continue first week
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigate("assistant")}
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Ask AI helper
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="glass rounded-[28px] p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal">Today&apos;s score</p>
            <h2 className="mt-2 text-2xl font-semibold">Settlement progress</h2>
          </div>
          <ProgressRing value={progress} label="ready" />
        </div>
        <div className="mt-5 grid gap-3">
          <DashboardSignal
            icon={Clock}
            label="Tasks pending"
            value={`${CHECKLIST_ITEMS.length - completedTasks.length} left`}
            tone="text-gold"
          />
          <DashboardSignal
            icon={WalletCards}
            label="Money left this week"
            value={currency(moneyLeft)}
            tone={moneyLeft < 0 ? "text-coral" : "text-mint"}
          />
          <DashboardSignal icon={BriefcaseBusiness} label="Job status" value={plan.status} tone="text-teal" />
          <DashboardSignal
            icon={FileText}
            label="Vault"
            value={documentsCount ? `${documentsCount} docs stored` : "No docs yet"}
            tone="text-lilac"
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:col-span-2 xl:grid-cols-4">
        {QUICK_STATS.map(({ label, value, icon: Icon }) => (
          <article key={label} className="soft-panel rounded-[20px] p-5">
            <Icon className="h-5 w-5 text-teal" />
            <p className="mt-4 text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-sm leading-5 text-muted">{label}</p>
          </article>
        ))}
      </section>

      <section className="glass rounded-[28px] p-5 sm:p-7 xl:col-span-2">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="soft-panel rounded-[20px] p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-mint" />
              <h3 className="font-semibold">First 7 days</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {completedTasks.length} of {CHECKLIST_ITEMS.length} setup tasks are marked done.
            </p>
            <ProgressBar value={progress} className="mt-5" tone="mint" />
          </article>

          <article className="soft-panel rounded-[20px] p-5">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="h-5 w-5 text-gold" />
              <h3 className="font-semibold">Budget pressure</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              You have spent {currency(totalSpent)} of {currency(totalPlanned)} planned this week.
            </p>
            <ProgressBar value={clamp((totalSpent / totalPlanned) * 100)} className="mt-5" tone="gold" />
          </article>

          <article className="soft-panel rounded-[20px] p-5">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-teal" />
              <h3 className="font-semibold">Job activity</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {plan.applicationsThisWeek} of {plan.targetApplications} target applications sent this week.
            </p>
            <ProgressBar value={clamp(jobProgress)} className="mt-5" tone="teal" />
          </article>
        </div>
      </section>

      <section className="glass rounded-[28px] p-5 sm:p-7 xl:col-span-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-coral">Do not skip</p>
            <h2 className="mt-2 text-2xl font-semibold">High-value warnings</h2>
          </div>
          <Button variant="secondary" onClick={() => onNavigate("mistakes")} icon={<ShieldAlert className="h-4 w-4" />}>
            Review warnings
          </Button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            "Track all paid work against visa limits.",
            "Never pay rental bond without paperwork.",
            "Check minimum pay before accepting cash shifts."
          ].map((item) => (
            <div key={item} className="rounded-[18px] border border-coral/25 bg-coral/10 p-4 text-sm leading-6">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DashboardSignal({
  icon: Icon,
  label,
  value,
  tone
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[18px] bg-white/10 p-4">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${tone}`} />
        <span className="text-sm text-muted">{label}</span>
      </div>
      <span className="text-right text-sm font-semibold">{value}</span>
    </div>
  );
}

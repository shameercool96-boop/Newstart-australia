"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetricCard({
  icon: Icon,
  label,
  value,
  tone = "text-teal"
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="apple-card grid min-h-[150px] content-between rounded-[28px] p-5"
    >
      <Icon className={cn("h-6 w-6", tone)} />
      <div>
        <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-sm text-muted">{label}</p>
      </div>
    </motion.article>
  );
}

export function TaskCard({
  index,
  title,
  meta,
  done,
  onStart
}: {
  index: number;
  title: string;
  meta: string;
  done: boolean;
  onStart: () => void;
}) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "apple-card rounded-[28px] p-5 transition",
        done && "border-mint/25 bg-mint/5"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white">
            {done ? <CheckCircle2 className="h-5 w-5" /> : index}
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted">{meta}</p>
        </div>
      </div>
      <button
        onClick={onStart}
        className={cn(
          "mt-6 inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold transition",
          done
            ? "bg-mint/12 text-mint hover:bg-mint/18"
            : "bg-teal text-white hover:bg-teal/90"
        )}
      >
        {done ? "Review" : "Start"}
      </button>
    </motion.article>
  );
}

export function StepCard({
  index,
  children
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="flex gap-4 rounded-[22px] bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.05)]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-white">
        {index}
      </span>
      <span className="pt-1 text-base font-medium leading-6 text-foreground">{children}</span>
    </motion.li>
  );
}

export function AlertCard({
  icon: Icon,
  title,
  tone = "text-coral"
}: {
  icon: LucideIcon;
  title: string;
  tone?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="flex min-h-20 items-center gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_16px_48px_rgba(0,0,0,0.05)]"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100">
        <Icon className={cn("h-5 w-5", tone)} />
      </span>
      <p className="text-base font-semibold leading-6 text-foreground">{title}</p>
    </motion.article>
  );
}

export function BudgetRing({
  spent,
  planned
}: {
  spent: number;
  planned: number;
}) {
  const safePlanned = Math.max(planned, 1);
  const percentage = Math.min(Math.round((spent / safePlanned) * 100), 100);
  const background = `conic-gradient(#0071e3 ${percentage * 3.6}deg, #e8e8ed 0deg)`;

  return (
    <div className="grid place-items-center">
      <div
        className="grid h-48 w-48 place-items-center rounded-full"
        style={{ background }}
        aria-label={`${percentage}% of weekly budget used`}
      >
        <div className="grid h-36 w-36 place-items-center rounded-full bg-white text-center shadow-inner">
          <div>
            <p className="text-4xl font-semibold tracking-tight">{percentage}%</p>
            <p className="mt-1 text-sm text-muted">used</p>
          </div>
        </div>
      </div>
    </div>
  );
}
